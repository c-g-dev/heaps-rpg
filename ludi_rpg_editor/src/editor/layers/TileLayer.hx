package editor.layers;

import js.Browser;
import js.html.Element;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import editor.layers.Layer;
import editor.layers.LayerTagsHelper;
import editor.palette.Palette;
import editor.palette.TilePalette;
import editor.palette.Tile;
import editor.palette.Tileset;
import uuid.Uuid;
import editor.MapEditor;
import editor.commands.TileCommands.PaintTileCommand;
import editor.commands.TileCommands.EraseTileCommand;
import editor.commands.TileCommands.PaintMultipleTilesCommand;
import editor.commands.TileCommands.StrokeCommand;
import editor.commands.TileCommands.MoveTilesCommand;
import editor.ui.LayerTagControl;

class TileLayer implements Layer {
    public var id: String;
    public var name: String;
    public var visible: Bool;
    public var opacity: Float;
    public var type: String;
    public var tags: Array<String>;
    
    private var tiles: Map<String, Int>; 
    private var currentTool: String;
    private var isDrawing: Bool;
    private var editor: MapEditor;
    
    
    private var palette: TilePalette;
    private var tilesetImagePath: String;
    
    
    private var isSelecting: Bool = false;
    private var selectionStartX: Float = 0;
    private var selectionStartY: Float = 0;
    private var selectionEndX: Float = 0;
    private var selectionEndY: Float = 0;
    private var selectedTiles: Map<String, Bool> = new Map(); 
    
    
    private var isMoving: Bool = false;
    private var moveStartX: Float = 0;
    private var moveStartY: Float = 0;
    private var moveOffsetX: Float = 0;
    private var moveOffsetY: Float = 0;
    private var originalTileData: Map<String, Int> = new Map(); 
    
    
    private var hoverPreviewX: Int = -1;
    private var hoverPreviewY: Int = -1;
    private var showHoverPreview: Bool = false;
    
    
    private var currentStroke: Map<String, Int> = new Map(); 
    private var strokeOriginalData: Map<String, Null<Int>> = new Map(); 
    private var isInStroke: Bool = false;
    
    public function new(editor: MapEditor) {
        this.editor = editor;
        id = Uuid.v4();
        name = "Tile Layer " + id.substr(0, 8);
        visible = true;
        opacity = 1.0;
        type = "tile";
        tags = [];
        
        tiles = new Map();
        currentTool = "select";
        isDrawing = false;
        
        
        isSelecting = false;
        selectedTiles = new Map();
        
        
        isMoving = false;
        originalTileData = new Map();
        
        
        currentStroke = new Map();
        strokeOriginalData = new Map();
        isInStroke = false;
        
        
        palette = new TilePalette(editor);
        tilesetImagePath = "";
        
        
        if (palette.getElement().parentNode != Browser.document.body) {
            Browser.document.body.appendChild(palette.getElement());
        }
        palette.hide();
    }
    
    public function render(ctx: CanvasRenderingContext2D, viewX: Float, viewY: Float, zoom: Float): Void {
        
        var tileSize = editor.getGridTileSize();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        var startX = Math.floor(viewX / tileSize);
        var startY = Math.floor(viewY / tileSize);
        var endX = Math.ceil((viewX + ctx.canvas.width / zoom) / tileSize);
        var endY = Math.ceil((viewY + ctx.canvas.height / zoom) / tileSize);
        
        
        startX = Std.int(Math.max(0, startX));
        startY = Std.int(Math.max(0, startY));
        endX = Std.int(Math.min(mapWidth, endX));
        endY = Std.int(Math.min(mapHeight, endY));
        
        
        for (y in startY...endY) {
            for (x in startX...endX) {
                var key = '$x,$y';
                if (tiles.exists(key)) {
                    var tileId = tiles.get(key);
                    renderTile(ctx, x, y, tileId);
                }
            }
        }
    }
    
    private function renderTile(ctx: CanvasRenderingContext2D, x: Int, y: Int, tileId: Int): Void {
        var tileSize = editor.getGridTileSize();
        
        
        var tile: Tile = null;
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            tile = tilePalette.getTileById(tileId);
        }
        
        if (tile != null) {
            var canvas = tile.getPreviewCanvas();
            ctx.drawImage(canvas, x * tileSize, y * tileSize, tileSize, tileSize);
        } else {
            
            var colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
                         "#FECA57", "#DDA0DD", "#98D8C8", "#F7DC6F"];
            ctx.fillStyle = colors[tileId % colors.length];
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
    
    public function onMouseDown(worldX: Float, worldY: Float, button: Int): Bool {
        Log.trace('onMouseDown: ${worldX}, ${worldY}, ${button} ${currentTool}');
        
        
        clearHoverPreview();
        
        if (button == 0) { 
            var tileSize = editor.getGridTileSize();
            var mapWidth = editor.getGridMapWidth();
            var mapHeight = editor.getGridMapHeight();
            
            var tileX = Math.floor(worldX / tileSize);
            var tileY = Math.floor(worldY / tileSize);
            Log.trace('tileX: ${tileX}, tileY: ${tileY}');
            Log.trace('mapWidth: ${mapWidth}, mapHeight: ${mapHeight}');
            
            if (tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
                switch (currentTool) {
                    case "select":
                        
                        isSelecting = true;
                        selectionStartX = worldX;
                        selectionStartY = worldY;
                        selectionEndX = worldX;
                        selectionEndY = worldY;
                        
                        selectedTiles.clear();
                        return true;
                        
                    case "move":
                        
                        var key = '$tileX,$tileY';
                        Log.trace('selectedTiles: ${selectedTiles}');
                        Log.trace('key: ${key}');
                        if (selectedTiles.exists(key) && Lambda.count(selectedTiles) > 0) {
                            Log.trace('startMove');
                            startMove(worldX, worldY);
                            return true;
                        }
                        return false;
                        
                    case "paint":
                        isDrawing = true;
                        startStroke();
                        paintTileInStroke(tileX, tileY);
                        return true;
                        
                    case "erase":
                        isDrawing = true;
                        startStroke();
                        eraseTileInStroke(tileX, tileY);
                        return true;
                }
            }
        }
        return false;
    }
    
    public function onMouseMove(worldX: Float, worldY: Float): Bool {
        if (isSelecting) {
            
            selectionEndX = worldX;
            selectionEndY = worldY;
            updateSelection();
            return true;
        } else if (isMoving) {
            
            moveOffsetX = worldX - moveStartX;
            moveOffsetY = worldY - moveStartY;
            return true;
        } else if (isDrawing) {
            var tileSize = editor.getGridTileSize();
            var mapWidth = editor.getGridMapWidth();
            var mapHeight = editor.getGridMapHeight();
            
            var tileX = Math.floor(worldX / tileSize);
            var tileY = Math.floor(worldY / tileSize);
            
            if (tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
                switch (currentTool) {
                    case "paint":
                        paintTileInStroke(tileX, tileY);
                        return true;
                        
                    case "erase":
                        eraseTileInStroke(tileX, tileY);
                        return true;
                }
            }
        } else {
            
            var tileSize = editor.getGridTileSize();
            var mapWidth = editor.getGridMapWidth();
            var mapHeight = editor.getGridMapHeight();
            
            var tileX = Math.floor(worldX / tileSize);
            var tileY = Math.floor(worldY / tileSize);
            
            if (tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
                
                if (currentTool == "paint" && palette is TilePalette) {
                    var tilePalette = cast(palette, TilePalette);
                    var selectedItem = tilePalette.getSelectedItem();
                    if (selectedItem != null) {
                        hoverPreviewX = tileX;
                        hoverPreviewY = tileY;
                        showHoverPreview = true;
                        return true;
                    }
                }
            }
            
            
            showHoverPreview = false;
        }
        return false;
    }
    
    public function onMouseUp(worldX: Float, worldY: Float, button: Int): Bool {
        if (isSelecting) {
            
            selectionEndX = worldX;
            selectionEndY = worldY;
            updateSelection();
            isSelecting = false;
            Log.trace('Selection completed: ${selectedTiles.keys()}');
            return true;
        } else if (isMoving) {
            
            finishMove();
            return true;
        } else if (isDrawing) {
            isDrawing = false;
            
            finishStroke();
            return true;
        }
        return false;
    }
    
    public function onMouseLeave(): Void {
        
        clearHoverPreview();
    }
    
    private function clearHoverPreview(): Void {
        if (showHoverPreview) {
            showHoverPreview = false;
            hoverPreviewX = -1;
            hoverPreviewY = -1;
        }
    }
    
    private function updateSelection(): Void {
        var tileSize = editor.getGridTileSize();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        
        selectedTiles.clear();
        
        
        var minX = Math.floor(Math.min(selectionStartX, selectionEndX) / tileSize);
        var maxX = Math.floor(Math.max(selectionStartX, selectionEndX) / tileSize);
        var minY = Math.floor(Math.min(selectionStartY, selectionEndY) / tileSize);
        var maxY = Math.floor(Math.max(selectionStartY, selectionEndY) / tileSize);
        
        
        minX = Std.int(Math.max(0, minX));
        maxX = Std.int(Math.min(mapWidth - 1, maxX));
        minY = Std.int(Math.max(0, minY));
        maxY = Std.int(Math.min(mapHeight - 1, maxY));
        
        
        for (y in minY...(maxY + 1)) {
            for (x in minX...(maxX + 1)) {
                var key = '$x,$y';
                if (tiles.exists(key)) {
                    selectedTiles.set(key, true);
                }
            }
        }
        
        Log.trace('Selected tiles: ${Lambda.count(selectedTiles)} tiles');
    }
    
    private function startMove(worldX: Float, worldY: Float): Void {
        isMoving = true;
        moveStartX = worldX;
        moveStartY = worldY;
        moveOffsetX = 0;
        moveOffsetY = 0;
        
        
        originalTileData.clear();
        for (key in selectedTiles.keys()) {
            if (tiles.exists(key)) {
                originalTileData.set(key, tiles.get(key));
            }
        }
        
        Log.trace('Started moving ${Lambda.count(selectedTiles)} tiles');
    }
    
    private function finishMove(): Void {
        Log.trace('finishMove');
        if (!isMoving) return;
        
        var tileSize = editor.getGridTileSize();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        
        var tileOffsetX = Math.round(moveOffsetX / tileSize);
        var tileOffsetY = Math.round(moveOffsetY / tileSize);
        
        if (tileOffsetX == 0 && tileOffsetY == 0) {
            
            isMoving = false;
            return;
        }
        
        
        var newPositions = new Map<String, Int>();
        var originalPositionsCopy = new Map<String, Int>();
        for (key in originalTileData.keys()) {
            originalPositionsCopy.set(key, originalTileData.get(key));
        }
        
        for (key in selectedTiles.keys()) {
            var parts = key.split(",");
            var oldX = Std.parseInt(parts[0]);
            var oldY = Std.parseInt(parts[1]);
            var newX = oldX + tileOffsetX;
            var newY = oldY + tileOffsetY;
            
            
            if (newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
                var newKey = '$newX,$newY';
                var tileId = originalPositionsCopy.get(key);
                if (tileId != null) {
                    newPositions.set(newKey, tileId);
                }
            }
        }
        
        
        if (Lambda.count(originalPositionsCopy) > 0) {
            var command = new MoveTilesCommand(this, originalPositionsCopy, newPositions, editor);
            editor.executeCommand(command);
            
            
            selectedTiles.clear();
            for (key in newPositions.keys()) {
                selectedTiles.set(key, true);
            }
        }
        
        isMoving = false;
        originalTileData.clear();
        
        Log.trace('Moved tiles by offset: $tileOffsetX, $tileOffsetY');
    }
    
    public function renderSelectionOverlay(ctx: CanvasRenderingContext2D): Void {
        var tileSize = editor.getGridTileSize();
        
        
        if (isSelecting) {
            var minX = Math.min(selectionStartX, selectionEndX);
            var maxX = Math.max(selectionStartX, selectionEndX);
            var minY = Math.min(selectionStartY, selectionEndY);
            var maxY = Math.max(selectionStartY, selectionEndY);
            
            ctx.strokeStyle = "#00AAFF";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
            ctx.setLineDash([]);
        }
        
        
        for (key in selectedTiles.keys()) {
            var parts = key.split(",");
            var x = Std.parseInt(parts[0]);
            var y = Std.parseInt(parts[1]);
            
            var renderX = x * tileSize;
            var renderY = y * tileSize;
            
            
            if (isMoving) {
                renderX += Std.int(moveOffsetX);
                renderY += Std.int(moveOffsetY);
                
                
                ctx.fillStyle = "rgba(255, 255, 0, 0.4)"; 
                ctx.fillRect(renderX, renderY, tileSize, tileSize);
                
                ctx.strokeStyle = "#FFFF00";
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.strokeRect(renderX, renderY, tileSize, tileSize);
                ctx.setLineDash([]);
            } else {
                
                ctx.fillStyle = "rgba(0, 170, 255, 0.3)";
                ctx.fillRect(renderX, renderY, tileSize, tileSize);
                
                ctx.strokeStyle = "#00AAFF";
                ctx.lineWidth = 2;
                ctx.strokeRect(renderX, renderY, tileSize, tileSize);
            }
        }
        
        
        renderHoverPreview(ctx);
    }
    
    private function renderHoverPreview(ctx: CanvasRenderingContext2D): Void {
        if (!showHoverPreview || hoverPreviewX < 0 || hoverPreviewY < 0) return;
        if (!(palette is TilePalette)) return;
        
        var tilePalette = cast(palette, TilePalette);
        var selectedItem = tilePalette.getSelectedItem();
        if (selectedItem == null) return;
        
        var tileSize = editor.getGridTileSize();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        
        ctx.save();
        ctx.globalAlpha = 0.6; 
        
        
        if (selectedItem is Array) {
            var selectedTiles = cast(selectedItem, Array<Dynamic>);
            if (selectedTiles.length > 1) {
                
                var dimensions = tilePalette.getSelectionDimensions();
                
                for (offsetY in 0...dimensions.height) {
                    for (offsetX in 0...dimensions.width) {
                        var targetX = hoverPreviewX + offsetX;
                        var targetY = hoverPreviewY + offsetY;
                        
                        
                        if (targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
                            var tile = tilePalette.getTileAtSelectionOffset(offsetX, offsetY);
                            if (tile != null) {
                                renderPreviewTile(ctx, targetX, targetY, tile, tileSize);
                            }
                        }
                    }
                }
            } else if (selectedTiles.length == 1 && selectedTiles[0] is Tile) {
                
                var tile = cast(selectedTiles[0], Tile);
                renderPreviewTile(ctx, hoverPreviewX, hoverPreviewY, tile, tileSize);
            }
        } else if (selectedItem is Tile) {
            
            var tile = cast(selectedItem, Tile);
            renderPreviewTile(ctx, hoverPreviewX, hoverPreviewY, tile, tileSize);
        }
        
        
        ctx.restore();
    }
    
    private function renderPreviewTile(ctx: CanvasRenderingContext2D, x: Int, y: Int, tile: Tile, tileSize: Int): Void {
        var canvas = tile.getPreviewCanvas();
        ctx.drawImage(canvas, x * tileSize, y * tileSize, tileSize, tileSize);
        
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
    
    private function paintTile(tileX: Int, tileY: Int): Void {
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            var selectedItem = tilePalette.getSelectedItem();
            Log.trace('paintTile: ${tileX}, ${tileY} ${selectedItem}');
            
            if (selectedItem != null) {
                
                if (selectedItem is Array) {
                    var selectedTiles = cast(selectedItem, Array<Dynamic>);
                    if (selectedTiles.length > 1) {
                        paintMultipleTilesWithCommand(tileX, tileY, tilePalette);
                        return;
                    }
                }
                
                
                var selectedTile: Tile = null;
                if (selectedItem is Tile) {
                    selectedTile = cast(selectedItem, Tile);
                } else if (selectedItem is Array) {
                    var selectedTiles = cast(selectedItem, Array<Dynamic>);
                    if (selectedTiles.length > 0 && selectedTiles[0] is Tile) {
                        selectedTile = cast(selectedTiles[0], Tile);
                    }
                }
                
                if (selectedTile != null) {
                    var command = new PaintTileCommand(this, tileX, tileY, selectedTile.id, editor);
                    editor.executeCommand(command);
                }
            }
        }
    }
    
    private function paintMultipleTilesWithCommand(startX: Int, startY: Int, tilePalette: TilePalette): Void {
        var dimensions = tilePalette.getSelectionDimensions();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        Log.trace('paintMultipleTiles: ${startX}, ${startY}, dimensions: ${dimensions.width}x${dimensions.height}');
        
        var tileData = new Map<String, Int>();
        
        
        for (offsetY in 0...dimensions.height) {
            for (offsetX in 0...dimensions.width) {
                var targetX = startX + offsetX;
                var targetY = startY + offsetY;
                
                
                if (targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
                    var selectedTile = tilePalette.getTileAtSelectionOffset(offsetX, offsetY);
                    if (selectedTile != null) {
                        var key = '$targetX,$targetY';
                        tileData.set(key, selectedTile.id);
                    }
                }
            }
        }
        
        if (tileData.keys().hasNext()) {
            var command = new PaintMultipleTilesCommand(this, tileData, editor);
            editor.executeCommand(command);
        }
    }
    
    private function eraseTile(tileX: Int, tileY: Int): Void {
        var command = new EraseTileCommand(this, tileX, tileY, editor);
        editor.executeCommand(command);
    }
    
    
    private function startStroke(): Void {
        if (!isInStroke) {
            isInStroke = true;
            currentStroke.clear();
            strokeOriginalData.clear();
            Log.trace("Starting new stroke");
        }
    }
    
    private function paintTileInStroke(tileX: Int, tileY: Int): Void {
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            var selectedItem = tilePalette.getSelectedItem();
            
            if (selectedItem != null) {
                
                if (selectedItem is Array) {
                    var selectedTiles = cast(selectedItem, Array<Dynamic>);
                    if (selectedTiles.length > 1) {
                        paintMultipleTilesInStroke(tileX, tileY, tilePalette);
                        return;
                    }
                }
                
                
                var selectedTile: Tile = null;
                if (selectedItem is Tile) {
                    selectedTile = cast(selectedItem, Tile);
                } else if (selectedItem is Array) {
                    var selectedTiles = cast(selectedItem, Array<Dynamic>);
                    if (selectedTiles.length > 0 && selectedTiles[0] is Tile) {
                        selectedTile = cast(selectedTiles[0], Tile);
                    }
                }
                
                if (selectedTile != null) {
                    addTileToStroke(tileX, tileY, selectedTile.id);
                }
            }
        }
    }
    
    private function paintMultipleTilesInStroke(startX: Int, startY: Int, tilePalette: TilePalette): Void {
        var dimensions = tilePalette.getSelectionDimensions();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        
        for (offsetY in 0...dimensions.height) {
            for (offsetX in 0...dimensions.width) {
                var targetX = startX + offsetX;
                var targetY = startY + offsetY;
                
                
                if (targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
                    var selectedTile = tilePalette.getTileAtSelectionOffset(offsetX, offsetY);
                    if (selectedTile != null) {
                        addTileToStroke(targetX, targetY, selectedTile.id);
                    }
                }
            }
        }
    }
    
    private function eraseTileInStroke(tileX: Int, tileY: Int): Void {
        
        addTileToStroke(tileX, tileY, -1); 
    }
    
    private function addTileToStroke(x: Int, y: Int, tileId: Int): Void {
        var key = '$x,$y';
        
        
        if (!strokeOriginalData.exists(key)) {
            strokeOriginalData.set(key, getTile(x, y));
        }
        
        
        if (tileId == -1) {
            
            currentStroke.remove(key);
            removeTile(x, y);
        } else {
            
            currentStroke.set(key, tileId);
            setTile(x, y, tileId);
        }
        
        
        editor.render();
    }
    
    private function finishStroke(): Void {
        if (!isInStroke) return;
        
        isInStroke = false;
        
        if (currentStroke.keys().hasNext() || hasErasedTilesInStroke()) {
            
            var strokeData = new Map<String, Int>();
            var originalData = new Map<String, Null<Int>>();
            
            
            for (key in currentStroke.keys()) {
                strokeData.set(key, currentStroke.get(key));
                originalData.set(key, strokeOriginalData.get(key));
            }
            
            
            for (key in strokeOriginalData.keys()) {
                if (!currentStroke.exists(key)) {
                    
                    originalData.set(key, strokeOriginalData.get(key));
                }
            }
            
            var strokeCommand = new StrokeCommand(this, strokeData, originalData, editor);
            editor.executeCommand(strokeCommand);
            
            Log.trace("Finished stroke with " + Lambda.count(strokeData) + " tiles painted and " + 
                  (Lambda.count(originalData) - Lambda.count(strokeData)) + " tiles erased");
        }
        
        currentStroke.clear();
        strokeOriginalData.clear();
    }
    
    private function hasErasedTilesInStroke(): Bool {
        for (key in strokeOriginalData.keys()) {
            if (!currentStroke.exists(key)) {
                return true;
            }
        }
        return false;
    }
    
    public function onToolChanged(toolId: String): Void {
        
        if (isInStroke) {
            finishStroke();
        }
        
        currentTool = toolId;
        isDrawing = false;
        
        
        clearHoverPreview();
        
        
        if (toolId != "select") {
            isSelecting = false;
            
        }
        
        
        if (toolId != "move") {
            isMoving = false;
            originalTileData.clear();
        }
    }
    
    public function getPreviewCanvas(width: Int, height: Int): CanvasElement {
        var canvas = Browser.document.createCanvasElement();
        canvas.width = width;
        canvas.height = height;
        
        var ctx = canvas.getContext2d();
        ctx.fillStyle = "#2d2d2d";
        ctx.fillRect(0, 0, width, height);
        
        
        var tileSize = editor.getGridTileSize();
        var mapWidth = editor.getGridMapWidth();
        var mapHeight = editor.getGridMapHeight();
        
        var scale = Math.min(width / (mapWidth * tileSize), height / (mapHeight * tileSize));
        ctx.scale(scale, scale);
        
        for (key in tiles.keys()) {
            var parts = key.split(",");
            var x = Std.parseInt(parts[0]);
            var y = Std.parseInt(parts[1]);
            var tileId = tiles.get(key);
            
            var colors = [
                "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
                "#FECA57", "#DDA0DD", "#98D8C8", "#F7DC6F"
            ];
            
            ctx.fillStyle = colors[tileId % colors.length];
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
        
        return canvas;
    }
    
    public function getPalette(): Palette {
        return palette;
    }
    
    public function setPalette(palette: Palette): Void {
        if (palette is TilePalette) {
            this.palette = cast(palette, TilePalette);
        }
    }
    
    public function setTilesetImagePath(path: String): Void {
        tilesetImagePath = path;
    }
    
    public function getTilesetImagePath(): String {
        return tilesetImagePath;
    }
    
    public function getTilesetData(): String {
        
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            return tilePalette.getTilesetImageData();
        }
        return null;
    }
    
    public function serialize(): Dynamic {
        var tilesArray = [];
        for (key in tiles.keys()) {
            var parts = key.split(",");
            var x = Std.parseInt(parts[0]);
            var y = Std.parseInt(parts[1]);
            var tileId = tiles.get(key);
            tilesArray.push({
                x: x,
                y: y,
                tileId: tileId
            });
        }
        
        return {
            id: id,
            name: name,
            visible: visible,
            opacity: opacity,
            type: type,
            tags: LayerTagsHelper.serializeTags(tags),
            tiles: tilesArray,
            tilesetImagePath: tilesetImagePath
        };
    }
    
    public function deserialize(data: Dynamic, deserializeCallback: Void -> Void): Void {
        if (data != null) {
            if (data.id != null) id = data.id;
            if (data.name != null) name = data.name;
            if (data.visible != null) visible = data.visible;
            if (data.opacity != null) opacity = data.opacity;
            if (data.type != null) type = data.type;
            
            
            LayerTagsHelper.deserializeTags(tags, data);
            
            
            
            
            
            if (data.tilesetImagePath != null) tilesetImagePath = data.tilesetImagePath;
            
            tiles.clear();
            if (data.tiles != null) {
                var tilesArray: Array<Dynamic> = data.tiles;
                for (tile in tilesArray) {
                    if (tile.x != null && tile.y != null && tile.tileId != null) {
                        var key = '${tile.x},${tile.y}';
                        tiles.set(key, tile.tileId);
                    }
                }
            }
            
            
            if (data.tilesetData != null && palette is TilePalette) {
                var tilePalette = cast(palette, TilePalette);
                tilePalette.loadTilesetFromDataUrl(data.tilesetData, deserializeCallback);
            }
        }
    }
    
    public function createPropertyPanel(): Element {
        var panel = Browser.document.createDivElement();
        panel.className = "layer-properties-content";
        
        
        var nameLabel = Browser.document.createLabelElement();
        nameLabel.textContent = "Layer Name: ";
        panel.appendChild(nameLabel);
        
        var nameInput = Browser.document.createInputElement();
        nameInput.type = "text";
        nameInput.value = name;
        nameInput.addEventListener("input", function(e) {
            name = nameInput.value;
        });
        panel.appendChild(nameInput);
        
        panel.appendChild(Browser.document.createBRElement());
        panel.appendChild(Browser.document.createBRElement());
        
        
        var opacityLabel = Browser.document.createLabelElement();
        opacityLabel.textContent = "Opacity: ";
        panel.appendChild(opacityLabel);
        
        var opacityInput = Browser.document.createInputElement();
        opacityInput.type = "range";
        opacityInput.min = "0";
        opacityInput.max = "100";
        opacityInput.value = Std.string(Math.round(opacity * 100));
        opacityInput.addEventListener("input", function(e) {
            opacity = Std.parseFloat(opacityInput.value) / 100;
        });
        panel.appendChild(opacityInput);
        
        var opacityValue = Browser.document.createSpanElement();
        opacityValue.textContent = " " + opacityInput.value + "%";
        opacityInput.addEventListener("input", function(e) {
            opacityValue.textContent = " " + opacityInput.value + "%";
        });
        panel.appendChild(opacityValue);
        
        panel.appendChild(Browser.document.createBRElement());
        panel.appendChild(Browser.document.createBRElement());
        
        
        var tilesetLabel = Browser.document.createLabelElement();
        tilesetLabel.textContent = "Tileset Image: ";
        panel.appendChild(tilesetLabel);
        
        var tilesetPathInput = Browser.document.createInputElement();
        tilesetPathInput.type = "text";
        tilesetPathInput.value = tilesetImagePath;
        tilesetPathInput.placeholder = "Path to tileset image...";
        tilesetPathInput.addEventListener("input", function(e) {
            setTilesetImagePath(tilesetPathInput.value);
        });
        panel.appendChild(tilesetPathInput);
        panel.appendChild(Browser.document.createBRElement());
        
        
        var browseBtn = Browser.document.createButtonElement();
        browseBtn.textContent = "Load Tileset...";
        browseBtn.className = "show-palette-btn";
        if (palette.isVisible()) {
            browseBtn.classList.add("active");
        }
        browseBtn.addEventListener("click", function(e) {
            var fileInput = Browser.document.createInputElement();
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.addEventListener("change", function(e) {
                if (fileInput.files.length > 0) {
                    var file = fileInput.files[0];
                    tilesetPathInput.value = file.name;
                    setTilesetImagePath(file.name);
                    
                    
                    if (palette is TilePalette) {
                        var tilePalette = cast(palette, TilePalette);
                        tilePalette.loadTilesetFromFile(file);
                    }
                }
            });
            fileInput.click();
        });
        panel.appendChild(browseBtn);
        panel.appendChild(Browser.document.createBRElement());
        panel.appendChild(Browser.document.createBRElement());
        
        
        var paletteLabel = Browser.document.createLabelElement();
        paletteLabel.textContent = "Palette: ";
        panel.appendChild(paletteLabel);
        
        var showPaletteBtn = Browser.document.createButtonElement();
        showPaletteBtn.textContent = palette.isVisible() ? "Hide Palette" : "Show Palette";
        showPaletteBtn.className = "show-palette-btn";
        if (palette.isVisible()) {
            showPaletteBtn.classList.add("active");
        }
        
        
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            tilePalette.setOnVisibilityChanged(function(isVisible: Bool) {
                if (isVisible) {
                    showPaletteBtn.textContent = "Hide Palette";
                    showPaletteBtn.classList.add("active");
                } else {
                    showPaletteBtn.textContent = "Show Palette";
                    showPaletteBtn.classList.remove("active");
                }
            });
        }
        
        showPaletteBtn.addEventListener("click", function(e) {
            if (palette.isVisible()) {
                palette.hide();
                showPaletteBtn.textContent = "Show Palette";
                showPaletteBtn.classList.remove("active");
            } else {
                palette.show();
                showPaletteBtn.textContent = "Hide Palette";
                showPaletteBtn.classList.add("active");
            }
        });
        panel.appendChild(showPaletteBtn);
        panel.appendChild(Browser.document.createBRElement());
        panel.appendChild(Browser.document.createBRElement());
        
        
        var tagControl = new LayerTagControl(editor, this);
        panel.appendChild(tagControl.getElement());
        
        return panel;
    }
    
    private function loadTilesetFromFile(file: js.html.File): Void {
        
        if (palette is TilePalette) {
            var tilePalette = cast(palette, TilePalette);
            tilePalette.loadTilesetFromFile(file);
        }
    }
    
    
    public function getTile(x: Int, y: Int): Null<Int> {
        var key = '$x,$y';
        return tiles.get(key);
    }
    
    public function setTile(x: Int, y: Int, tileId: Int): Void {
        var key = '$x,$y';
        tiles.set(key, tileId);
    }
    
    public function removeTile(x: Int, y: Int): Void {
        var key = '$x,$y';
        tiles.remove(key);
    }
    
    
    public function addTag(tag: String): Bool {
        return LayerTagsHelper.addTag(tags, tag);
    }
    
    public function removeTag(tag: String): Bool {
        return LayerTagsHelper.removeTag(tags, tag);
    }
    
    public function hasTag(tag: String): Bool {
        return LayerTagsHelper.hasTag(tags, tag);
    }
    
    public function getTags(): Array<String> {
        return LayerTagsHelper.getTags(tags);
    }
    
    public function setTags(newTags: Array<String>): Void {
        LayerTagsHelper.setTags(tags, newTags);
    }
    
    
    public function setSelectedTiles(newSelection: Map<String, Bool>): Void {
        selectedTiles = newSelection;
    }
    
    public function getSelectedTiles(): Map<String, Bool> {
        return selectedTiles;
    }
} 