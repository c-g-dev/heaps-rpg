package editor.palette;

import js.Browser;
import js.html.Element;
import js.html.XMLHttpRequest;
import js.html.InputElement;
import js.html.FileReader;
import js.html.ImageElement;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.MouseEvent;
import editor.palette.Palette;
import editor.palette.Tile;
import editor.palette.Tileset;
import editor.MapEditor;
import util.Image;

using StringTools;

class TilePalette implements Palette {
    private var element: Element;
    private var contentArea: Element;
    private var previewArea: Element;
    private var bottomBar: Element;
    private var titleBar: Element;
    private var closeBtn: Element;
    
    private var tilesetCanvas: CanvasElement;
    private var tilesetCtx: CanvasRenderingContext2D;
    private var selectionOverlay: Element;
    
    private var currentTileset: Tileset;
    private var selectedTile: Tile;
    private var selectedTiles: Array<Tile>;
    private var tiles: Array<Tile>;
    
    private var tileDisplaySize: Int = 32; 
    private var tilesPerRow: Int = 0; 
    private var selectedTileX: Int = -1;
    private var selectedTileY: Int = -1;
    
    
    private var zoomPercentage: Int = 100; 
    private var zoomIncrement: Int = 25; 
    private var minZoom: Int = 25; 
    private var maxZoom: Int = 400; 
    private var zoomInBtn: Element;
    private var zoomOutBtn: Element;
    private var zoomLevelLabel: Element;
    private var baseCanvasWidth: Int = 0; 
    private var baseCanvasHeight: Int = 0; 
    
    
    private var editor: MapEditor;
    
    
    private var onVisibilityChanged: Bool -> Void;
    
    
    private var selectionStartX: Int = -1;
    private var selectionStartY: Int = -1;
    private var selectionEndX: Int = -1;
    private var selectionEndY: Int = -1;
    
    
    private var isDragging: Bool = false;
    private var dragStartX: Float = 0;
    private var dragStartY: Float = 0;
    private var dragStartLeft: Float = 0;
    private var dragStartTop: Float = 0;
    
    
    private var isDragSelecting: Bool = false;
    
    
    private var hoveredTile: Tile = null;
    
    public function new(?editor: MapEditor) {
        this.editor = editor;
        tiles = [];
        selectedTiles = [];
        loadTemplate();
        
        
        if (editor != null) {
            editor.addEventListener("gridSettingsChanged", onGridSettingsChanged);
        }
    }
    
    private function loadTemplate(): Void {
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "Palette.html", false);
        xhr.send();
        
        var container = Browser.document.createDivElement();
        container.innerHTML = xhr.responseText;
        element = container.firstElementChild;
        
        setupUI();
        setupEventListeners();
        
        
        element.style.left = "50px";
        element.style.top = "100px";
    }
    
    private function setupUI(): Void {
        element.className = "palette-window";
        
        titleBar = element.querySelector(".palette-title-bar");
        closeBtn = element.querySelector(".palette-close-btn");
        var windowContent = element.querySelector(".palette-window-content");
        
        
        windowContent.innerHTML = "";
        
        var tileContent = Browser.document.createDivElement();
        tileContent.className = "tile-palette";
        
        
        previewArea = Browser.document.createDivElement();
        previewArea.className = "palette-preview";
        tileContent.appendChild(previewArea);
        
        
        contentArea = Browser.document.createDivElement();
        contentArea.className = "palette-content";
        
        
        tilesetCanvas = Browser.document.createCanvasElement();
        tilesetCanvas.className = "tileset-canvas";
        contentArea.appendChild(tilesetCanvas);
        tilesetCtx = tilesetCanvas.getContext2d();
        
        
        selectionOverlay = Browser.document.createDivElement();
        selectionOverlay.className = "tile-selection-overlay";
        contentArea.appendChild(selectionOverlay);
        
        tileContent.appendChild(contentArea);
        
        
        bottomBar = Browser.document.createDivElement();
        bottomBar.className = "palette-bottom-bar";
        
        
        var zoomControlsContainer = Browser.document.createDivElement();
        zoomControlsContainer.className = "zoom-controls";
        
        
        zoomOutBtn = Browser.document.createButtonElement();
        zoomOutBtn.className = "zoom-btn zoom-out-btn";
        zoomOutBtn.textContent = "−";
        zoomOutBtn.title = "Zoom Out";
        zoomControlsContainer.appendChild(zoomOutBtn);
        
        
        zoomLevelLabel = Browser.document.createDivElement();
        zoomLevelLabel.className = "zoom-level-label";
        updateZoomLevelLabel();
        zoomControlsContainer.appendChild(zoomLevelLabel);
        
        
        zoomInBtn = Browser.document.createButtonElement();
        zoomInBtn.className = "zoom-btn zoom-in-btn";
        zoomInBtn.textContent = "+";
        zoomInBtn.title = "Zoom In";
        zoomControlsContainer.appendChild(zoomInBtn);
        
        bottomBar.appendChild(zoomControlsContainer);
        
        tileContent.appendChild(bottomBar);
        
        windowContent.appendChild(tileContent);
        
        updatePreview();
        updateZoomControls();
    }
    
    private function setupEventListeners(): Void {
        
        tilesetCanvas.addEventListener("mousedown", onCanvasMouseDown);
        tilesetCanvas.addEventListener("mousemove", onCanvasMouseMove);
        tilesetCanvas.addEventListener("mouseup", onCanvasMouseUp);
        tilesetCanvas.addEventListener("mouseleave", onCanvasMouseLeave);
        
        
        titleBar.addEventListener("mousedown", onTitleBarMouseDown);
        Browser.document.addEventListener("mousemove", onDocumentMouseMove);
        Browser.document.addEventListener("mouseup", onDocumentMouseUp);
        
        
        closeBtn.addEventListener("click", function(e) {
            hide();
        });
        
        
        zoomInBtn.addEventListener("click", function(e) {
            zoomIn();
            e.preventDefault();
        });
        
        zoomOutBtn.addEventListener("click", function(e) {
            zoomOut();
            e.preventDefault();
        });
    }
    
    private function onCanvasMouseDown(e: MouseEvent): Void {
        if (currentTileset == null) return;
        
        var rect = tilesetCanvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        
        var scale = zoomPercentage / 100.0;
        x = x / scale;
        y = y / scale;
        
        var tileX = Math.floor(x / getCurrentTileDisplaySize());
        var tileY = Math.floor(y / getCurrentTileDisplaySize());
        
        if (tileX >= 0 && tileX < tilesPerRow && tileY >= 0) {
            
            isDragSelecting = true;
            selectionStartX = tileX;
            selectionStartY = tileY;
            selectionEndX = tileX;
            selectionEndY = tileY;
            
            
            selectedTileX = tileX;
            selectedTileY = tileY;
            
            updateMultiSelection();
            updateSelection();
        }
        
        e.preventDefault();
    }
    
    private function onCanvasMouseMove(e: MouseEvent): Void {
        if (currentTileset == null) return;
        
        var rect = tilesetCanvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        
        var scale = zoomPercentage / 100.0;
        x = x / scale;
        y = y / scale;
        
        var tileX = Math.floor(x / getCurrentTileDisplaySize());
        var tileY = Math.floor(y / getCurrentTileDisplaySize());
        
        
        if (tileX >= 0 && tileX < tilesPerRow && tileY >= 0) {
            var tileIndex = tileY * tilesPerRow + tileX;
            if (tileIndex < tiles.length) {
                hoveredTile = tiles[tileIndex];
                updatePreview();
            }
        }
        
        
        if (isDragSelecting) {
            
            tileX = Std.int(Math.max(0, Math.min(tilesPerRow - 1, tileX)));
            tileY = Std.int(Math.max(0, Math.min(Math.ceil(tiles.length / tilesPerRow) - 1, tileY)));
            
            selectionEndX = tileX;
            selectionEndY = tileY;
            
            updateMultiSelection();
            updateSelection();
        }
    }
    
    private function onCanvasMouseUp(e: MouseEvent): Void {
        isDragSelecting = false;
        
        
        if (selectionStartX == selectionEndX && selectionStartY == selectionEndY) {
            var tileIndex = selectionStartY * tilesPerRow + selectionStartX;
            if (tileIndex < tiles.length) {
                selectedTile = tiles[tileIndex];
                selectedTiles = [selectedTile];
                updatePreview();
            }
        }
    }
    
    private function onCanvasMouseLeave(e: MouseEvent): Void {
        hoveredTile = null;
        updatePreview();
    }
    
    private function updateMultiSelection(): Void {
        selectedTiles = [];
        
        var minX = Std.int(Math.min(selectionStartX, selectionEndX));
        var maxX = Std.int(Math.max(selectionStartX, selectionEndX));
        var minY = Std.int(Math.min(selectionStartY, selectionEndY));
        var maxY = Std.int(Math.max(selectionStartY, selectionEndY));
        
        for (y in minY...(maxY + 1)) {
            for (x in minX...(maxX + 1)) {
                var tileIndex = y * tilesPerRow + x;
                if (tileIndex < tiles.length) {
                    selectedTiles.push(tiles[tileIndex]);
                }
            }
        }
        
        
        if (selectedTiles.length > 0) {
            selectedTile = selectedTiles[0];
            updatePreview();
        }
    }
    
    private function onTitleBarMouseDown(e: MouseEvent): Void {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        
        var style = Browser.window.getComputedStyle(element);
        dragStartLeft = Std.parseFloat(StringTools.replace(style.left, "px", ""));
        dragStartTop = Std.parseFloat(StringTools.replace(style.top, "px", ""));
        
        e.preventDefault();
    }
    
    private function onDocumentMouseMove(e: MouseEvent): Void {
        if (!isDragging) return;
        
        var deltaX = e.clientX - dragStartX;
        var deltaY = e.clientY - dragStartY;
        
        element.style.left = (dragStartLeft + deltaX) + "px";
        element.style.top = (dragStartTop + deltaY) + "px";
    }
    
    private function onDocumentMouseUp(e: MouseEvent): Void {
        isDragging = false;
    }
    
    public function loadTilesetFromFile(file: js.html.File): Void {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = Browser.document.createImageElement();
            img.onload = function() {
                var tileWidth = getTileWidth();
                var tileHeight = getTileHeight();
                currentTileset = Tileset.fromImageElement(img, tileWidth, tileHeight, file.name);
                loadTilesFromTileset();
            };
            img.src = cast(reader.result, String);
        };
        reader.readAsDataURL(file);
    }
    
    private function loadTilesFromTileset(): Void {
        if (currentTileset == null) return;
        
        clear();
        
        
        tilesPerRow = Math.floor(currentTileset.getWidth() / currentTileset.getTileWidth());
        
        for (tile in currentTileset.tiles) {
            addItem(tile);
        }
        
        
        baseCanvasWidth = 0;
        baseCanvasHeight = 0;
        
        
        updateCanvasDimensions();
        
        
        if (tiles.length > 0) {
            selectedTileX = 0;
            selectedTileY = 0;
            setSelectedItem(tiles[0]);
        }
        
        refresh();
    }
    
    private function updateCanvasDimensions(): Void {
        if (baseCanvasWidth == 0 || baseCanvasHeight == 0) {
            
            var totalTiles = tiles.length;
            var rows = Math.ceil(totalTiles / tilesPerRow);
            baseCanvasWidth = tilesPerRow * 32;
            baseCanvasHeight = rows * 32;
        }
        
        
        tilesetCanvas.width = baseCanvasWidth;
        tilesetCanvas.height = baseCanvasHeight;
        
        
        var scale = zoomPercentage / 100.0;
        tilesetCanvas.style.transform = 'scale(${scale})';
        tilesetCanvas.style.transformOrigin = "0 0";
    }
    
    private function getCurrentTileDisplaySize(): Int {
        return 32; 
    }
    
    private function zoomIn(): Void {
        if (zoomPercentage < maxZoom) {
            zoomPercentage += zoomIncrement;
            onZoomChanged();
        }
    }
    
    private function zoomOut(): Void {
        if (zoomPercentage > minZoom) {
            zoomPercentage -= zoomIncrement;
            onZoomChanged();
        }
    }
    
    private function onZoomChanged(): Void {
        updateCanvasDimensions();
        updateZoomControls();
        updateZoomLevelLabel();
        refresh();
    }
    
    private function updateZoomControls(): Void {
        
        if (zoomOutBtn != null) {
            if (zoomPercentage <= minZoom) {
                zoomOutBtn.classList.add("disabled");
            } else {
                zoomOutBtn.classList.remove("disabled");
            }
        }
        
        if (zoomInBtn != null) {
            if (zoomPercentage >= maxZoom) {
                zoomInBtn.classList.add("disabled");
            } else {
                zoomInBtn.classList.remove("disabled");
            }
        }
    }
    
    private function updateZoomLevelLabel(): Void {
        if (zoomLevelLabel != null) {
            zoomLevelLabel.textContent = '${zoomPercentage}%';
        }
    }
    
    private function drawTileset(): Void {
        if (tiles.length == 0) return;
        
        tilesetCtx.clearRect(0, 0, tilesetCanvas.width, tilesetCanvas.height);
        
        var currentDisplaySize = getCurrentTileDisplaySize();
        
        
        for (i in 0...tiles.length) {
            var tile = tiles[i];
            var x = (i % tilesPerRow) * currentDisplaySize;
            var y = Std.int(i / tilesPerRow) * currentDisplaySize;
            
            var tileCanvas = tile.getPreviewCanvas();
            tilesetCtx.drawImage(tileCanvas, x, y, currentDisplaySize, currentDisplaySize);
        }
        
        
        tilesetCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        tilesetCtx.lineWidth = 1;
        
        
        for (i in 0...(tilesPerRow + 1)) {
            var x = i * currentDisplaySize;
            tilesetCtx.beginPath();
            tilesetCtx.moveTo(x, 0);
            tilesetCtx.lineTo(x, tilesetCanvas.height);
            tilesetCtx.stroke();
        }
        
        
        var rows = Math.ceil(tiles.length / tilesPerRow);
        var numRows = Std.int(rows);
        for (i in 0...(numRows + 1)) {
            var y = i * currentDisplaySize;
            tilesetCtx.beginPath();
            tilesetCtx.moveTo(0, y);
            tilesetCtx.lineTo(tilesetCanvas.width, y);
            tilesetCtx.stroke();
        }
    }
    
    private function updateSelection(): Void {
        if (selectionStartX >= 0 && selectionStartY >= 0 && selectionEndX >= 0 && selectionEndY >= 0) {
            var minX = Std.int(Math.min(selectionStartX, selectionEndX));
            var maxX = Std.int(Math.max(selectionStartX, selectionEndX));
            var minY = Std.int(Math.min(selectionStartY, selectionEndY));
            var maxY = Std.int(Math.max(selectionStartY, selectionEndY));
            
            var currentDisplaySize = getCurrentTileDisplaySize();
            var scale = zoomPercentage / 100.0;
            
            selectionOverlay.style.display = "block";
            selectionOverlay.style.left = (minX * currentDisplaySize * scale) + "px";
            selectionOverlay.style.top = (minY * currentDisplaySize * scale) + "px";
            selectionOverlay.style.width = ((maxX - minX + 1) * currentDisplaySize * scale) + "px";
            selectionOverlay.style.height = ((maxY - minY + 1) * currentDisplaySize * scale) + "px";
        } else {
            selectionOverlay.style.display = "none";
        }
    }
    
    public function show(): Void {
        element.classList.add("visible");
        if (onVisibilityChanged != null) {
            onVisibilityChanged(true);
        }
    }
    
    public function hide(): Void {
        element.classList.remove("visible");
        if (onVisibilityChanged != null) {
            onVisibilityChanged(false);
        }
    }
    
    public function isVisible(): Bool {
        return element.classList.contains("visible");
    }
    
    public function getElement(): Element {
        return element;
    }
    
    public function getSelectedItem(): Dynamic {
        
        if (selectedTiles.length == 1) {
            return selectedTiles[0];
        } else if (selectedTiles.length > 1) {
            return selectedTiles;
        }
        return selectedTile;
    }
    
    public function getSelectedItems(): Array<Tile> {
        return selectedTiles.copy();
    }
    
    public function getSelectionDimensions(): {width: Int, height: Int} {
        if (selectionStartX < 0 || selectionStartY < 0 || selectionEndX < 0 || selectionEndY < 0) {
            return {width: 1, height: 1};
        }
        
        var minX = Std.int(Math.min(selectionStartX, selectionEndX));
        var maxX = Std.int(Math.max(selectionStartX, selectionEndX));
        var minY = Std.int(Math.min(selectionStartY, selectionEndY));
        var maxY = Std.int(Math.max(selectionStartY, selectionEndY));
        
        return {
            width: maxX - minX + 1,
            height: maxY - minY + 1
        };
    }
    
    public function getTileAtSelectionOffset(offsetX: Int, offsetY: Int): Tile {
        if (selectionStartX < 0 || selectionStartY < 0 || selectionEndX < 0 || selectionEndY < 0) {
            return selectedTile;
        }
        
        var minX = Std.int(Math.min(selectionStartX, selectionEndX));
        var minY = Std.int(Math.min(selectionStartY, selectionEndY));
        var dimensions = getSelectionDimensions();
        
        
        var wrappedX = offsetX % dimensions.width;
        var wrappedY = offsetY % dimensions.height;
        if (wrappedX < 0) wrappedX += dimensions.width;
        if (wrappedY < 0) wrappedY += dimensions.height;
        
        var tileX = minX + wrappedX;
        var tileY = minY + wrappedY;
        var tileIndex = tileY * tilesPerRow + tileX;
        
        if (tileIndex < tiles.length) {
            return tiles[tileIndex];
        }
        
        return selectedTile; 
    }
    
    public function setSelectedItem(item: Dynamic): Void {
        if (item is Tile) {
            selectedTile = cast(item, Tile);
            selectedTiles = [selectedTile];
            
            
            var tileIndex = tiles.indexOf(selectedTile);
            if (tileIndex >= 0) {
                selectedTileX = tileIndex % tilesPerRow;
                selectedTileY = Std.int(tileIndex / tilesPerRow);
                selectionStartX = selectedTileX;
                selectionStartY = selectedTileY;
                selectionEndX = selectedTileX;
                selectionEndY = selectedTileY;
                updateSelection();
            }
            
            updatePreview();
        }
    }
    
    public function clear(): Void {
        tiles = [];
        selectedTile = null;
        selectedTiles = [];
        selectedTileX = -1;
        selectedTileY = -1;
        selectionStartX = -1;
        selectionStartY = -1;
        selectionEndX = -1;
        selectionEndY = -1;
        updatePreview();
        updateSelection();
    }
    
    public function addItem(item: Dynamic): Void {
        if (item is Tile) {
            var tile = cast(item, Tile);
            tiles.push(tile);
        }
    }
    
    public function removeItem(item: Dynamic): Void {
        if (item is Tile) {
            var tile = cast(item, Tile);
            tiles.remove(tile);
            if (selectedTile == tile) {
                selectedTile = null;
                selectedTileX = -1;
                selectedTileY = -1;
                updatePreview();
                updateSelection();
            }
        }
    }
    
    public function refresh(): Void {
        drawTileset();
        updateSelection();
    }
    
    private function updatePreview(): Void {
        previewArea.innerHTML = "";
        
        
        var tileToPreview: Tile = null;
        var labelText = "No tile selected";
        
        if (hoveredTile != null) {
            
            tileToPreview = hoveredTile;
            labelText = 'Tile ${hoveredTile.id}' + (selectedTiles.length > 1 ? ' (hovering)' : '');
        } else if (selectedTile != null) {
            
            tileToPreview = selectedTile;
            labelText = 'Tile ${selectedTile.id}' + (selectedTiles.length > 1 ? ' (${selectedTiles.length} selected)' : '');
        }
        
        if (tileToPreview != null) {
            
            var previewCanvas = tileToPreview.getPreviewCanvas();
            previewCanvas.className = "selected-tile-preview";
            previewArea.appendChild(previewCanvas);
            
            var label = Browser.document.createDivElement();
            label.className = "preview-label";
            label.textContent = labelText;
            previewArea.appendChild(label);
        } else {
            var placeholder = Browser.document.createDivElement();
            placeholder.className = "preview-placeholder";
            placeholder.textContent = labelText;
            previewArea.appendChild(placeholder);
        }
    }
    
    public function onActivate(): Void {
        
    }
    
    public function onDeactivate(): Void {
        
    }
    
    
    public function getTileWidth(): Int {
        if (editor != null) {
            return editor.getGridTileSize();
        }
        return 32; 
    }
    
    public function getTileHeight(): Int {
        if (editor != null) {
            return editor.getGridTileSize();
        }
        return 32; 
    }
    
    public function setTileWidth(width: Int): Void {
        
        
    }
    
    public function setTileHeight(height: Int): Void {
        
        
    }
    
    public function getTilesetImageData(): String {
        
        if (currentTileset != null && currentTileset.sourceImage != null) {
            
            var canvas = currentTileset.sourceImage.getCanvas();
            return canvas.toDataURL("image/png");
        }
        return null;
    }
    
    public function loadTilesetFromDataUrl(dataUrl: String, onLoad: Void -> Void): Void {
        
        var img = Browser.document.createImageElement();
        img.onload = function() {
            var tileWidth = getTileWidth();
            var tileHeight = getTileHeight();
            currentTileset = Tileset.fromImageElement(img, tileWidth, tileHeight, "Loaded Tileset");
            loadTilesFromTileset();
            if (onLoad != null) onLoad();
        };
        img.src = dataUrl;
    }
    
    private function onGridSettingsChanged(): Void {
        
        if (currentTileset != null && currentTileset.sourceImage != null) {
            Log.trace('TilePalette: Grid settings changed, refreshing tileset...');
            
            
            var imageDataUrl = getTilesetImageData();
            if (imageDataUrl != null) {
                
                var newTileWidth = getTileWidth();
                var newTileHeight = getTileHeight();
                var tilesetName = currentTileset.name;
                
                
                var img = Browser.document.createImageElement();
                img.onload = function() {
                    currentTileset = Tileset.fromImageElement(img, newTileWidth, newTileHeight, tilesetName);
                    loadTilesFromTileset();
                    Log.trace('TilePalette: Tileset refreshed with new tile size: ${newTileWidth}x${newTileHeight}');
                };
                img.src = imageDataUrl;
            } else {
                Log.trace('TilePalette: Could not get tileset image data for refresh');
            }
        }
    }
    
    public function getTileById(id: Int): Tile {
        
        if (currentTileset != null) {
            return currentTileset.getTile(id);
        }
        return null;
    }
    
    public function cleanup(): Void {
        
        if (editor != null) {
            editor.removeEventListener("gridSettingsChanged", onGridSettingsChanged);
        }
    }
    
    public function setOnVisibilityChanged(callback: Bool -> Void): Void {
        onVisibilityChanged = callback;
    }
} 