package heaps.rpg.walk;

import heaps.rpg.view.MapOverlay;
import heaps.rpg.walk.Collision.CollisionType;
import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGWorld_SetMap.SetMapEvents;
import h2d.Graphics;

class ShowCollisionOverlay extends MapOverlay {
    var display: Graphics;
    var world: RPGWorld;

    public function new(world: RPGWorld) {
        super();
        this.world = world;
        this.display = new h2d.Graphics();
        addChild(display);
        
        
        refreshDisplay();
        
        
        world.events.of(MapUnloaded).on((data) -> {
            Log.trace('[ShowCollisionOverlay] Map unloaded, clearing display');
            clearDisplay();
        });
        
        world.events.of(MapLoaded).on((data) -> {
            Log.trace('[ShowCollisionOverlay] Map loaded, refreshing collision display');
            refreshDisplay();
        });
    }
    
    private function clearDisplay(): Void {
        display.clear();
    }
    
    private function refreshDisplay(): Void {
        clearDisplay();
        
        var collision = world.seek(Collision);
        if (collision != null) {
            collision.xyIterate((x: Int, y: Int, val: CollisionType) -> {
                if(val == CollisionType.Block) {
                    Log.trace("draw: " + x + ", " + y);
                    display.beginFill(0xFF00FF);
                    display.drawRect(x * world.map.tileSize, y * world.map.tileSize, world.map.tileSize, world.map.tileSize);
                    display.endFill();
                }
            });
        }
    }
}