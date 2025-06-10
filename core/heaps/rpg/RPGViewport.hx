package heaps.rpg;

import h2d.col.Point;
import hxd.Window;
import h2d.RenderContext;
import h2d.Object;
import h2d.Graphics;
import h2d.Layers;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.view.RPGOverlay;

class RPGViewport extends h2d.Object {
    public static var UI_LAYER = 100;
    public static var MAP_LAYER = 0;

    var world: RPGWorld;
    var container: h2d.Layers;
    var cameraContainer: h2d.Layers;
    var uicamera: h2d.Camera;

    public var layers: Array<RPGMapLayer>;
    public var overlays: Array<RPGOverlay>;
    public var width (default, null): Int; 
    public var height (default, null): Int;

    public function new(world: RPGWorld) {
        super();
        Log.trace('[Viewport] Creating new viewport');
        this.world = world;
        this.container = new h2d.Layers();
        this.cameraContainer = new h2d.Layers();
        this.width = Window.getInstance().width;
        this.height = Window.getInstance().height;
        Log.trace('[Viewport] Viewport dimensions: ${this.width}x${this.height}');
        this.addChild(this.container);
        this.uicamera = new h2d.Camera();
        this.uicamera.layerVisible = (layer) -> {
            if(layer == UI_LAYER) {
                return true;
            }
            return false;
        }
        
        this.layers = [];
        this.overlays = [];
        Log.trace('[Viewport] Viewport created with containers and camera setup');
    }

    public override function onAdd() {
        super.onAdd();
        Log.trace('[Viewport] Adding viewport to scene');
        
        var scene = this.getScene();
        scene.add(this, MAP_LAYER);
        Log.trace('[Viewport] Added viewport to scene at MAP_LAYER: $MAP_LAYER');
        
        scene.add(this.cameraContainer, UI_LAYER);
        Log.trace('[Viewport] Added camera container to scene at UI_LAYER: $UI_LAYER');
        
        scene.camera.layerVisible = (layer) -> {
            if(layer == MAP_LAYER) {
                return true;
            }
            return false;
        }
        scene.addCamera(this.uicamera);
        Log.trace('[Viewport] Scene camera configured and UI camera added');

        scene.camera.anchorX = 0.5;
        scene.camera.anchorY = 0.5;
        scene.camera.scaleX = 4;
        scene.camera.scaleY = 4;
    }

    public function addLayer(layer: RPGMapLayer) {
        Log.trace('[Viewport] Adding layer: ${layer.toString()} at index ${layer.index}');
        this.layers.push(layer);
        refresh();
        Log.trace('[Viewport] Layer added, total layers: ${this.layers.length}');
    }

    public function removeLayer(layer: RPGMapLayer) {
        Log.trace('[Viewport] Removing layer: ${layer.toString()}');
        var removed = this.layers.remove(layer);
        if(removed) {
            layer.remove();
            refresh();
            Log.trace('[Viewport] Layer removed successfully, remaining layers: ${this.layers.length}');
        } else {
            Log.trace('[Viewport] WARNING: Layer not found in viewport layers array');
        }
    }

    public function clearLayers() {
        Log.trace('[Viewport] Clearing ${this.layers.length} layers from viewport');
        for (i in 0...this.layers.length) {
            var layer = this.layers[i];
            Log.trace('[Viewport] Removing layer $i: ${layer.toString()}');
            layer.remove();
        }
        this.layers = [];
        refresh();
        Log.trace('[Viewport] All layers cleared from viewport');
    }

    public function addOverlay(overlay: RPGOverlay) {
        Log.trace('[Viewport] Adding overlay: ${overlay.toString()} type: ${overlay.overlayType}');
        this.overlays.push(overlay);
        refresh();
        Log.trace('[Viewport] Overlay added, total overlays: ${this.overlays.length}');
    }

    public function removeOverlay(overlay: RPGOverlay) {
        Log.trace('[Viewport] Removing overlay: ${overlay.toString()}');
        var removed = this.overlays.remove(overlay);
        if(removed) {
            overlay.remove();
            refresh();
            Log.trace('[Viewport] Overlay removed successfully, remaining overlays: ${this.overlays.length}');
        } else {
            Log.trace('[Viewport] WARNING: Overlay not found in viewport overlays array');
        }
    }

    public function clearOverlays() {
        Log.trace('[Viewport] Clearing ${this.overlays.length} overlays from viewport');
        for (i in 0...this.overlays.length) {
            var overlay = this.overlays[i];
            Log.trace('[Viewport] Removing overlay $i: ${overlay.toString()} type: ${overlay.overlayType}');
            overlay.remove();
        }
        this.overlays = [];
        refresh();
        Log.trace('[Viewport] All overlays cleared from viewport');
    }

    public function setLayers(layers: Array<RPGMapLayer>) {    
        Log.trace('[Viewport] Setting ${layers.length} layers to viewport');
        clearLayers();
        for (i in 0...layers.length) {
            var layer = layers[i];
            Log.trace('[Viewport] Adding layer $i: ${layer.toString()} at index ${layer.index}');
            addLayer(layer);
        }
        Log.trace('[Viewport] All layers set to viewport');
    }

    public function setViewportSize(w: Int, h: Int) {
        Log.trace('[Viewport] Changing viewport size from ${this.width}x${this.height} to ${w}x${h}');
        this.width = w;
        this.height = h;
        this.container.getScene().camera.setViewport(0, 0, w, h);
        Log.trace('[Viewport] Viewport size updated and camera viewport set');
    }

    public function follow(o: h2d.Object) {
        Log.trace('[Viewport] Setting camera to follow object: ${o.toString()}');
        this.container.getScene().camera.follow = o;
        Log.trace('[Viewport] Camera follow configured with anchor (0.5, 0.5) and scale (4, 4)');
    }

    public function refresh() {
        Log.trace('[Viewport] Starting viewport refresh cycle');
        Log.trace('[Viewport] Removing all children from camera container');
        this.cameraContainer.removeChildren();

        Log.trace('[Viewport] Adding ${layers.length} layers to main container');
        for (i in 0...layers.length) {
            var layer = layers[i];
            Log.trace('[Viewport] Adding layer $i to container: ${layer.toString()} at z-index ${layer.index}');
            this.container.add(layer, layer.index);
        }
        
        var nextMapZ = layers.length;
        var nextCameraZ = 0;
        Log.trace('[Viewport] Processing ${overlays.length} overlays - nextMapZ: $nextMapZ, nextCameraZ: $nextCameraZ');

        for (i in 0...overlays.length) {
            var overlay = overlays[i];
            switch (overlay.overlayType) {
                case Camera:
                    Log.trace('[Viewport] Adding Camera overlay $i: ${overlay.toString()} at z-index $nextCameraZ');
                    this.cameraContainer.add(overlay, nextCameraZ++);
                case Map:
                    Log.trace('[Viewport] Adding Map overlay $i: ${overlay.toString()} at z-index $nextMapZ');
                    this.container.add(overlay, nextMapZ++);
            }
            overlay.onRender();
        }
        this.addChild(this.container);
        Log.trace('[Viewport] Viewport refresh completed - layers: ${layers.length}, overlays: ${overlays.length}');
    }

}