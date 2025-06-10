package editor.ui;

import js.Browser;
import js.html.Element;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.XMLHttpRequest;
import js.html.MouseEvent;
import js.html.WheelEvent;
import js.html.KeyboardEvent;
import editor.MapEditor;
import editor.layers.TileLayer;
import editor.layers.IntGridLayer;
import editor.layers.ObjectLayer;

class MapCanvas {
    private var editor: MapEditor;
    private var element: Element;
    private var canvas: CanvasElement;
    private var overlayCanvas: CanvasElement;
    private var ctx: CanvasRenderingContext2D;
    private var overlayCtx: CanvasRenderingContext2D;
    
    private var isDragging: Bool = false;
    private var dragStartX: Float = 0;
    private var dragStartY: Float = 0;
    private var dragStartViewX: Float = 0;
    private var dragStartViewY: Float = 0;
    
    public function new(editor: MapEditor) {
        this.editor = editor;
        loadTemplate();
    }
    
    private function loadTemplate(): Void {
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "MapCanvas.html", false);
        xhr.send();
        
        var container = Browser.document.createDivElement();
        container.innerHTML = xhr.responseText;
        element = container.firstElementChild;
        
        canvas = cast element.querySelector("#map-canvas");
        overlayCanvas = cast element.querySelector("#overlay-canvas");
        ctx = canvas.getContext2d();
        overlayCtx = overlayCanvas.getContext2d();
        
        setupEventListeners();
        resizeCanvas();
    }
    
    private function setupEventListeners(): Void {
        
        Log.trace('setupEventListeners');
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", onMouseLeave);
        canvas.addEventListener("wheel", onWheel);
        canvas.addEventListener("contextmenu", function(e) { e.preventDefault(); });
        
        
        canvas.setAttribute("tabindex", "0");
        canvas.addEventListener("keydown", onKeyDown);
        canvas.addEventListener("focus", function(e) {
            canvas.style.outline = "2px solid #007ACC";
        });
        canvas.addEventListener("blur", function(e) {
            canvas.style.outline = "none";
        });
        
        
        Browser.document.addEventListener("keydown", onDocumentKeyDown);
        
        
        var zoomInBtn = element.querySelector("#zoom-in-btn");
        var zoomOutBtn = element.querySelector("#zoom-out-btn");
        
        if (zoomInBtn != null) {
            zoomInBtn.addEventListener("click", function(e) {
                var zoom = editor.getZoom();
                editor.setView(editor.getViewX(), editor.getViewY(), zoom * 1.25);
                updateZoomDisplay();
            });
        }
        
        if (zoomOutBtn != null) {
            zoomOutBtn.addEventListener("click", function(e) {
                var zoom = editor.getZoom();
                editor.setView(editor.getViewX(), editor.getViewY(), zoom / 1.25);
                updateZoomDisplay();
            });
        }
        
        
        Browser.window.addEventListener("resize", resizeCanvas);
    }

    public function refresh(): Void {
        resizeCanvas();
    }
    
    private function resizeCanvas(): Void {
        var viewport = element.querySelector(".canvas-viewport");
        if (viewport != null) {
            var rect = viewport.getBoundingClientRect();
            canvas.width = Math.floor(rect.width);
            canvas.height = Math.floor(rect.height);
            overlayCanvas.width = canvas.width;
            overlayCanvas.height = canvas.height;
            render();
        }
    }
    
    private function onMouseDown(e: MouseEvent): Void {
        var worldPos = screenToWorld(e.offsetX, e.offsetY);
        
        
        if (e.button == 1 || (e.button == 2 && editor.getCurrentTool() != "select")) {
            isDragging = true;
            dragStartX = e.offsetX;
            dragStartY = e.offsetY;
            dragStartViewX = editor.getViewX();
            dragStartViewY = editor.getViewY();
            canvas.style.cursor = "move";
            e.preventDefault();
            return;
        }
        
        
        var layer = editor.getCurrentLayer();
        if (layer != null) {
            if (layer.onMouseDown(worldPos.x, worldPos.y, e.button)) {
                render();
            }
        }
    }
    
    private function onMouseMove(e: MouseEvent): Void {
        var worldPos = screenToWorld(e.offsetX, e.offsetY);
        
        
        var posDisplay = element.querySelector("#mouse-position");
        if (posDisplay != null) {
            posDisplay.textContent = 'X: ${Math.floor(worldPos.x)}, Y: ${Math.floor(worldPos.y)}';
        }
        
        if (isDragging) {
            var dx = e.offsetX - dragStartX;
            var dy = e.offsetY - dragStartY;
            var zoom = editor.getZoom();
            editor.setView(
                dragStartViewX - dx / zoom,
                dragStartViewY - dy / zoom,
                zoom
            );
            return;
        }
        
        
        var layer = editor.getCurrentLayer();
        if (layer != null) {
            if (layer.onMouseMove(worldPos.x, worldPos.y)) {
                render();
            }
        }
    }
    
    private function onMouseUp(e: MouseEvent): Void {
        if (isDragging) {
            isDragging = false;
            canvas.style.cursor = "default";
            return;
        }
        
        var worldPos = screenToWorld(e.offsetX, e.offsetY);
        
        
        var layer = editor.getCurrentLayer();
        if (layer != null) {
            if (layer.onMouseUp(worldPos.x, worldPos.y, e.button)) {
                render();
            }
        }
    }
    
    private function onMouseLeave(e: MouseEvent): Void {
        
        var layer = editor.getCurrentLayer();
        if (layer != null) {
            
            if (Std.is(layer, TileLayer)) {
                var tileLayer = cast(layer, TileLayer);
                tileLayer.onMouseLeave();
                render(); 
            }
        }
    }
    
    private function onWheel(e: WheelEvent): Void {
        e.preventDefault();
        
        var zoom = editor.getZoom();
        var newZoom = e.deltaY > 0 ? zoom / 1.1 : zoom * 1.1;
        
        
        newZoom = Math.max(0.1, Math.min(10, newZoom));
        
        
        var mouseWorld = screenToWorld(e.offsetX, e.offsetY);
        var viewX = editor.getViewX();
        var viewY = editor.getViewY();
        
        
        var newViewX = mouseWorld.x - (e.offsetX / newZoom);
        var newViewY = mouseWorld.y - (e.offsetY / newZoom);
        
        editor.setView(newViewX, newViewY, newZoom);
        updateZoomDisplay();
    }
    
    private function onKeyDown(e: KeyboardEvent): Void {
        var scrollSpeed = 32; 
        var zoom = editor.getZoom();
        var viewX = editor.getViewX();
        var viewY = editor.getViewY();
        
        switch (e.code) {
            case "ArrowLeft":
                editor.setView(viewX - scrollSpeed / zoom, viewY, zoom);
                e.preventDefault();
                
            case "ArrowRight":
                editor.setView(viewX + scrollSpeed / zoom, viewY, zoom);
                e.preventDefault();
                
            case "ArrowUp":
                editor.setView(viewX, viewY - scrollSpeed / zoom, zoom);
                e.preventDefault();
                
            case "ArrowDown":
                editor.setView(viewX, viewY + scrollSpeed / zoom, zoom);
                e.preventDefault();
        }
    }
    
    private function onDocumentKeyDown(e: KeyboardEvent): Void {
        
        switch (e.code) {
            case "Home":
                
                editor.setView(0, 0, 1.0);
                updateZoomDisplay();
                e.preventDefault();
                
            case "Digit0":
                
                if (e.ctrlKey || e.metaKey) {
                    editor.setView(0, 0, 1.0);
                    updateZoomDisplay();
                    e.preventDefault();
                }
        }
    }
    
    private function screenToWorld(screenX: Float, screenY: Float): {x: Float, y: Float} {
        var zoom = editor.getZoom();
        return {
            x: editor.getViewX() + screenX / zoom,
            y: editor.getViewY() + screenY / zoom
        };
    }
    
    private function worldToScreen(worldX: Float, worldY: Float): {x: Float, y: Float} {
        var zoom = editor.getZoom();
        return {
            x: (worldX - editor.getViewX()) * zoom,
            y: (worldY - editor.getViewY()) * zoom
        };
    }
    
    public function render(): Void {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        
        
        ctx.save();
        overlayCtx.save();
        
        var zoom = editor.getZoom();
        var viewX = editor.getViewX();
        var viewY = editor.getViewY();
        
        
        ctx.scale(zoom, zoom);
        ctx.translate(-viewX, -viewY);
        
        
        overlayCtx.scale(zoom, zoom);
        overlayCtx.translate(-viewX, -viewY);
        
        
        renderGrid();
        
        
        var layers = editor.getLayers();
        for (layer in layers) {
            if (layer.visible) {
                ctx.globalAlpha = layer.opacity;
                layer.render(ctx, viewX, viewY, zoom);
            }
        }
        
        
        var currentLayer = editor.getCurrentLayer();
        if (currentLayer != null) {
            if (Std.is(currentLayer, TileLayer)) {
                var tileLayer = cast(currentLayer, TileLayer);
                tileLayer.renderSelectionOverlay(overlayCtx);
            } else if (Std.is(currentLayer, IntGridLayer)) {
                var intGridLayer = cast(currentLayer, IntGridLayer);
                intGridLayer.renderSelectionOverlay(overlayCtx);
            } else if (Std.is(currentLayer, ObjectLayer)) {
                var objectLayer = cast(currentLayer, ObjectLayer);
                objectLayer.renderSelectionOverlay(overlayCtx);
            }
        }
        
        ctx.restore();
        overlayCtx.restore();
    }
    
    private function renderGrid(): Void {
        
        var gridSize = editor.getGridTileSize();
        var zoom = editor.getZoom();
        var viewX = editor.getViewX();
        var viewY = editor.getViewY();
        
        
        var startX = Math.floor(viewX / gridSize) * gridSize;
        var startY = Math.floor(viewY / gridSize) * gridSize;
        var endX = Math.ceil((viewX + canvas.width / zoom) / gridSize) * gridSize;
        var endY = Math.ceil((viewY + canvas.height / zoom) / gridSize) * gridSize;
        
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1 / zoom;
        
        
        ctx.beginPath();
        for (x in startX...endX) {
            if (x % gridSize == 0 && x != 0) { 
                ctx.moveTo(x, startY);
                ctx.lineTo(x, endY);
            }
        }
        
        
        for (y in startY...endY) {
            if (y % gridSize == 0 && y != 0) { 
                ctx.moveTo(startX, y);
                ctx.lineTo(endX, y);
            }
        }
        
        ctx.stroke();
        
        
        var originVisible = (startX <= 0 && endX >= 0) || (startY <= 0 && endY >= 0);
        if (originVisible) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 2 / zoom;
            
            ctx.beginPath();
            
            
            if (startX <= 0 && endX >= 0) {
                ctx.moveTo(0, startY);
                ctx.lineTo(0, endY);
            }
            
            
            if (startY <= 0 && endY >= 0) {
                ctx.moveTo(startX, 0);
                ctx.lineTo(endX, 0);
            }
            
            ctx.stroke();
        }
    }
    
    private function updateZoomDisplay(): Void {
        var zoomLevel = element.querySelector("#zoom-level");
        if (zoomLevel != null) {
            var zoom = Math.round(editor.getZoom() * 100);
            zoomLevel.textContent = '$zoom%';
        }
    }
    
    public function getElement(): Element {
        return element;
    }
} 