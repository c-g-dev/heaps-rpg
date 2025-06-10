package editor;

import haxe.Timer;
import js.Browser;
import js.html.Element;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import editor.layers.Layer;
import editor.layers.TileLayer;
import editor.layers.ObjectLayer;
import editor.ui.TopToolbar;
import editor.ui.LayerTabNavigator;
import editor.ui.EditorToolbar;
import editor.ui.MapCanvas;
import editor.ui.PropertiesPanel;
import editor.palette.Palette;
import editor.palette.TilePalette;
import editor.commands.UndoRedoManager;
import editor.TagManager;

class MapEditor {
    private var layers: Array<Layer>;
    private var currentLayerIndex: Int;
    private var currentTool: String;
    
    private var topToolbar: TopToolbar;
    private var layerTabNavigator: LayerTabNavigator;
    private var editorToolbar: EditorToolbar;
    private var mapCanvas: MapCanvas;
    private var propertiesPanel: PropertiesPanel;
    private var currentPalette: Palette;
    private var defaultTilePalette: TilePalette;
    
    private var viewX: Float = 0;
    private var viewY: Float = 0;
    private var zoom: Float = 1.0;
    
    
    private var gridTileSize: Int = 32;
    private var gridMapWidth: Int = 50;
    private var gridMapHeight: Int = 50;
    
    
    private var globalObjectDatabase: editor.objects.ObjectDatabase;
    
    
    private var undoRedoManager: UndoRedoManager;
    
    
    private var tagManager: TagManager;
    
    
    private var eventListeners: Map<String, Array<Void -> Void>>;
    
    public function new() {
        layers = [];
        currentLayerIndex = -1;
        currentTool = "select";
        
        
        eventListeners = new Map();
        
        
        defaultTilePalette = new TilePalette(this);
        currentPalette = defaultTilePalette;
        Browser.document.body.appendChild(currentPalette.getElement());
        
        
        globalObjectDatabase = new editor.objects.ObjectDatabase();
        
        
        undoRedoManager = new UndoRedoManager();
        
        
        tagManager = new TagManager();
    }
    
    public function initialize(): Void {
        
        loadUIComponents();
        
        
        setupEventListeners();
        
        
        
        createDefaultLayer();

        render();
    }
    
    private function loadUIComponents(): Void {
        var container = Browser.document.getElementById("app");
        if (container == null) {
            container = Browser.document.createDivElement();
            container.id = "app";
            Browser.document.body.appendChild(container);
        }
        
        
        topToolbar = new TopToolbar(this);
        layerTabNavigator = new LayerTabNavigator(this);
        editorToolbar = new EditorToolbar(this);
        mapCanvas = new MapCanvas(this);
        propertiesPanel = new PropertiesPanel(this);
        
        
        container.innerHTML = "";
        container.appendChild(topToolbar.getElement());
        container.appendChild(layerTabNavigator.getElement());
        container.appendChild(editorToolbar.getElement());
        
        
        var mainContent = Browser.document.createDivElement();
        mainContent.className = "main-content";
        
        
        var leftContent = Browser.document.createDivElement();
        leftContent.className = "left-content";
        leftContent.appendChild(mapCanvas.getElement());
        
        mainContent.appendChild(leftContent);
        mainContent.appendChild(propertiesPanel.getElement());
        
        container.appendChild(mainContent);
        
        
        updatePalette();
    }
    
    private function setupEventListeners(): Void {
        
        
        
        
        
        Browser.document.addEventListener("keydown", onKeyDown);
    }
    
    private function onKeyDown(event: js.html.KeyboardEvent): Void {
        
        if (event.ctrlKey || event.metaKey) { 
            switch (event.key) {
                case "z", "Z":
                    if (event.shiftKey) {
                        
                        if (canRedo()) {
                            redo();
                            event.preventDefault();
                        }
                    } else {
                        
                        if (canUndo()) {
                            undo();
                            event.preventDefault();
                        }
                    }
                    
                case "y", "Y":
                    
                    if (canRedo()) {
                        redo();
                        event.preventDefault();
                    }
            }
        }
    }
    
    private function createDefaultLayer(): Void {
        
        var defaultLayer = new TileLayer(this);
        defaultLayer.name = "Background";
        addLayer(defaultLayer);
    }
    
    public function addLayer(layer: Layer): Void {
        layers.push(layer);
        if (currentLayerIndex == -1) {
            currentLayerIndex = 0;
        }
        layerTabNavigator.refresh();
        propertiesPanel.updateContent();
        updatePalette();
    }
    
    public function removeLayer(index: Int): Void {
        if (index >= 0 && index < layers.length) {
            layers.splice(index, 1);
            if (currentLayerIndex >= layers.length) {
                currentLayerIndex = layers.length - 1;
            }
            layerTabNavigator.refresh();
            propertiesPanel.updateContent();
            updatePalette();
        }
    }
    
    public function selectLayer(index: Int): Void {
        if (index >= 0 && index < layers.length) {
            currentLayerIndex = index;
            layerTabNavigator.refresh();
            propertiesPanel.updateContent();
            updatePalette();
            render();
        }
    }
    
    public function moveLayer(fromIndex: Int, toIndex: Int): Void {
        if (fromIndex >= 0 && fromIndex < layers.length && 
            toIndex >= 0 && toIndex < layers.length && 
            fromIndex != toIndex) {
            
            
            var layer = layers[fromIndex];
            layers.splice(fromIndex, 1);
            
            
            layers.insert(toIndex, layer);
            
            
            if (currentLayerIndex == fromIndex) {
                currentLayerIndex = toIndex;
            } else if (fromIndex < currentLayerIndex && toIndex >= currentLayerIndex) {
                currentLayerIndex--;
            } else if (fromIndex > currentLayerIndex && toIndex <= currentLayerIndex) {
                currentLayerIndex++;
            }
            
            
            layerTabNavigator.refresh();
            propertiesPanel.updateContent();
            render();
        }
    }
    
    private function updatePalette(): Void {
        var currentLayer = getCurrentLayer();
        Log.trace('updatePalette layer: ${currentLayer}');
        if (currentLayer != null) {
            var layerPalette = currentLayer.getPalette();
            Log.trace('updatePalette palette: ${layerPalette}');
            
            
            if (layerPalette != null && layerPalette != currentPalette) {
                
                if (currentPalette != null) {
                    currentPalette.hide();
                    currentPalette.onDeactivate();
                }
                
                
                currentPalette = layerPalette;
                
                
                if (currentPalette.getElement().parentNode != Browser.document.body) {
                    Log.trace('updatePalette adding palette to DOM');
                    Browser.document.body.appendChild(currentPalette.getElement());
                }
                
                currentPalette.onActivate();
            } else if (layerPalette == null) {
                
                if (currentPalette != defaultTilePalette) {
                    
                    if (currentPalette != null) {
                        currentPalette.hide();
                        currentPalette.onDeactivate();
                    }
                    
                    currentPalette = defaultTilePalette;
                    currentPalette.onActivate();
                }
            }
        }
    }
    
    public function togglePalette(): Void {
        Log.trace('togglePalette');
        if (currentPalette != null) {
            Log.trace('togglePalette: ${currentPalette.isVisible()}');
            if (currentPalette.isVisible()) {
                currentPalette.hide();
            } else {
                currentPalette.show();
            }
        }
    }
    
    public function isPaletteVisible(): Bool {
        return currentPalette != null && currentPalette.isVisible();
    }
    
    public function setTool(toolId: String): Void {
        currentTool = toolId;
        
        if (currentLayerIndex >= 0 && currentLayerIndex < layers.length) {
            layers[currentLayerIndex].onToolChanged(toolId);
        }
    }
    
    public function render(): Void {
        mapCanvas.refresh();
    }
    
    
    public function getLayers(): Array<Layer> {
        return layers;
    }
    
    public function getCurrentLayerIndex(): Int {
        return currentLayerIndex;
    }
    
    public function getCurrentLayer(): Layer {
        if (currentLayerIndex >= 0 && currentLayerIndex < layers.length) {
            return layers[currentLayerIndex];
        }
        return null;
    }
    
    public function getCurrentTool(): String {
        return currentTool;
    }
    
    public function getViewX(): Float {
        return viewX;
    }
    
    public function getViewY(): Float {
        return viewY;
    }
    
    public function getZoom(): Float {
        return zoom;
    }
    
    public function setView(x: Float, y: Float, z: Float): Void {
        viewX = x;
        viewY = y;
        zoom = z;
        render();
    }
    
    public function getPalette(): Palette {
        return currentPalette;
    }
    
    public function getGlobalObjectDatabase(): editor.objects.ObjectDatabase {
        return globalObjectDatabase;
    }
    
    public function getPropertiesPanel(): PropertiesPanel {
        return propertiesPanel;
    }
    
    
    public function executeCommand(command: editor.commands.Command): Void {
        Log.trace('executeCommand: ${Type.getClassName(Type.getClass(command))}');
        undoRedoManager.executeCommand(command);
    }
    
    public function undo(): Bool {
        return undoRedoManager.undo();
    }
    
    public function redo(): Bool {
        return undoRedoManager.redo();
    }
    
    public function canUndo(): Bool {
        return undoRedoManager.canUndo();
    }
    
    public function canRedo(): Bool {
        return undoRedoManager.canRedo();
    }
    
    public function getUndoDescription(): String {
        return undoRedoManager.getUndoDescription();
    }
    
    public function getRedoDescription(): String {
        return undoRedoManager.getRedoDescription();
    }
    
    public function clearUndoHistory(): Void {
        undoRedoManager.clear();
    }
    
    
    public function serializeMap(): Dynamic {
        var layers = [];
        for (layer in this.layers) {
            var layerData = layer.serialize();
            
            
            if (layer.type == "image" && layerData.imageData != null) {
                var filename = "image_" + layer.id + ".png";
                layerData.imageResource = "resources/" + filename;
                Reflect.deleteField(layerData, "imageData");
            } else if (layer.type == "tile") {
                
                var tileLayer = cast(layer, editor.layers.TileLayer);
                var tilesetData = tileLayer.getTilesetData();
                if (tilesetData != null) {
                    var filename = "tileset_" + layer.id + ".png";
                    layerData.tilesetResource = "resources/" + filename;
                }
            }
            
            layers.push(layerData);
        }
        
        return {
            version: "1.0",
            viewX: viewX,
            viewY: viewY,
            zoom: zoom,
            gridTileSize: gridTileSize,
            gridMapWidth: gridMapWidth,
            gridMapHeight: gridMapHeight,
            layers: layers,
            globalObjectDatabase: globalObjectDatabase.serialize(), 
            tagManager: tagManager.serialize(), 
            timestamp: Date.now().getTime()
        };
    }
    
    public function collectResources(): Map<String, String> {
        var resources = new Map<String, String>();
        
        
        for (layer in layers) {
            if (layer.type == "image") {
                var imageLayer = cast(layer, editor.layers.ImageLayer);
                var serializedData = imageLayer.serialize();
                if (serializedData.imageData != null) {
                    var filename = "image_" + layer.id + ".png";
                    resources.set(filename, serializedData.imageData);
                }
            } else if (layer.type == "tile") {
                
                var tileLayer = cast(layer, editor.layers.TileLayer);
                var tilesetData = tileLayer.getTilesetData();
                if (tilesetData != null) {
                    var filename = "tileset_" + layer.id + ".png";
                    resources.set(filename, tilesetData);
                }
            }
        }
        
        return resources;
    }
    
    
    public function loadMap(mapData: Dynamic, resources: Map<String, String>): Void {
        try {
            
            clearMap();
            
            
            clearUndoHistory();
            
            
            viewX = mapData.viewX != null ? mapData.viewX : 0;
            viewY = mapData.viewY != null ? mapData.viewY : 0;
            zoom = mapData.zoom != null ? mapData.zoom : 1.0;
            
            
            gridTileSize = mapData.gridTileSize != null ? mapData.gridTileSize : 32;
            gridMapWidth = mapData.gridMapWidth != null ? mapData.gridMapWidth : 50;
            gridMapHeight = mapData.gridMapHeight != null ? mapData.gridMapHeight : 50;
            
            
            if (mapData.globalObjectDatabase != null) {
                globalObjectDatabase.deserialize(mapData.globalObjectDatabase);
            }
            
            
            if (mapData.tagManager != null) {
                tagManager.deserialize(mapData.tagManager);
            }
            
            
            var layersData: Array<Dynamic> = mapData.layers != null ? mapData.layers : [];
            
            if (layersData.length == 0) {
                
                finishMapLoading();
                return;
            }
            
            
            var layersToLoad = layersData.length;
            var layersLoaded = 0;
            
            var onLayerLoaded = function() {
                layersLoaded++;
                if (layersLoaded >= layersToLoad) {
                    finishMapLoading();
                }
            };
            
            for (layerData in layersData) {
                var layer = createLayerFromData(layerData, resources);
                if (layer != null) {
                    layers.push(layer);
                    
                    layer.deserialize(layerData, onLayerLoaded);
                } else {
                    
                    onLayerLoaded();
                }
            }
            
        } catch (error: Dynamic) {
            Log.trace("Error loading map: " + error);
            Browser.window.alert("Error loading map: " + error);
        }
    }
    
    private function finishMapLoading(): Void {
        
        if (layers.length > 0) {
            currentLayerIndex = 0;
        }
        
        
        layerTabNavigator.refresh();
        propertiesPanel.updateContent();
        updatePalette();
        render();
        
        Log.trace("Map loaded successfully with " + layers.length + " layers");
    }
    
    private function clearMap(): Void {
        
        layers = [];
        currentLayerIndex = -1;
        
        
        viewX = 0;
        viewY = 0;
        zoom = 1.0;
    }
    
    private function createLayerFromData(layerData: Dynamic, resources: Map<String, String>): Layer {
        var layer: Layer = null;
        
        switch (layerData.type) {
            case "tile":
                layer = new editor.layers.TileLayer(this);
                
                if (layerData.tilesetResource != null) {
                    var resourcePath = layerData.tilesetResource;
                    var filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
                    var tilesetData = resources.get(filename);
                    if (tilesetData != null) {
                        
                        layerData.tilesetData = tilesetData;
                    }
                }
                
            case "image":
                layer = new editor.layers.ImageLayer(this);
                
                if (layerData.imageResource != null) {
                    var resourcePath = layerData.imageResource;
                    var filename = resourcePath.substring(resourcePath.lastIndexOf("/") + 1);
                    var imageData = resources.get(filename);
                    if (imageData != null) {
                        
                        layerData.imageData = imageData;
                    }
                }
                
            case "intgrid":
                layer = new editor.layers.IntGridLayer(this);
                
            case "object":
                layer = new editor.layers.ObjectLayer(this);
                
            default:
                Log.trace("Unknown layer type: " + layerData.type);
                return null;
        }
        
        
        return layer;
    }
    
    public function createNewMap(): Void {
        
        clearMap();
        
        
        clearUndoHistory();
        
        
        createDefaultLayer();
        
        Log.trace("New map created");
    }
    
    public function getTagManager(): TagManager {
        return tagManager;
    }
    
    
    public function getGridTileSize(): Int {
        return gridTileSize;
    }
    
    public function getGridMapWidth(): Int {
        return gridMapWidth;
    }
    
    public function getGridMapHeight(): Int {
        return gridMapHeight;
    }
    
    public function setGridSettings(tileSize: Int, mapWidth: Int, mapHeight: Int): Void {
        gridTileSize = tileSize;
        gridMapWidth = mapWidth;
        gridMapHeight = mapHeight;
        
        
        fireEvent("gridSettingsChanged");
        
        
        render();
        
        Log.trace('Global grid settings updated: tileSize=$tileSize, mapWidth=$mapWidth, mapHeight=$mapHeight');
    }
    
    
    public function addEventListener(eventType: String, listener: Void -> Void): Void {
        if (!eventListeners.exists(eventType)) {
            eventListeners.set(eventType, []);
        }
        var listeners = eventListeners.get(eventType);
        if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
        }
    }
    
    public function removeEventListener(eventType: String, listener: Void -> Void): Void {
        if (eventListeners.exists(eventType)) {
            var listeners = eventListeners.get(eventType);
            listeners.remove(listener);
        }
    }
    
    private function fireEvent(eventType: String): Void {
        if (eventListeners.exists(eventType)) {
            var listeners = eventListeners.get(eventType);
            for (listener in listeners) {
                try {
                    listener();
                } catch (error: Dynamic) {
                    Log.trace('Error in event listener for $eventType: $error');
                }
            }
        }
    }
} 