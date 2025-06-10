package heaps.rpg.view;

enum RPGOverlayType {
    Camera; 
    Map;    
}

class RPGOverlay extends h2d.Object {
    public var overlayType(default, null): RPGOverlayType;
    
    public function new(type: RPGOverlayType) {
        super();
        this.overlayType = type;
    }

    public function onRender() {}

}