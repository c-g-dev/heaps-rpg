package heaps.rpg.interact;

import heaps.rpg.RPGWorld;
import heaps.coroutine.Coroutine;
import heaps.rpg.walk.ShowCollisionOverlay;
import heaps.rpg.view.ShowGridOverlay;
import heaps.rpg.view.ShowGridPositionOverlay;

class OverlayToggleRoutine {
    
    public static function create(world: RPGWorld): Coroutine {
        
        var collisionOverlay: ShowCollisionOverlay = null;
        var gridOverlay: ShowGridOverlay = null;
        var positionOverlay: ShowGridPositionOverlay = null;
        
        return (dt) -> {
            
            if (hxd.Key.isPressed(hxd.Key.F1)) {
                if (collisionOverlay == null) {
                    collisionOverlay = new ShowCollisionOverlay(world);
                    world.viewport.addOverlay(collisionOverlay);
                    Log.trace('Collision overlay enabled');
                } else {
                    world.viewport.removeOverlay(collisionOverlay);
                    collisionOverlay = null;
                    Log.trace('Collision overlay disabled');
                }
            }
            
            
            if (hxd.Key.isPressed(hxd.Key.F2)) {
                if (gridOverlay == null) {
                    gridOverlay = new ShowGridOverlay(world);
                    world.viewport.addOverlay(gridOverlay);
                    Log.trace('Grid overlay enabled');
                } else {
                    world.viewport.removeOverlay(gridOverlay);
                    gridOverlay = null;
                    Log.trace('Grid overlay disabled');
                }
            }
            
            
            if (hxd.Key.isPressed(hxd.Key.F3)) {
                if (positionOverlay == null) {
                    positionOverlay = new ShowGridPositionOverlay(world);
                    world.viewport.addOverlay(positionOverlay);
                    Log.trace('Position overlay enabled');
                } else {
                    world.viewport.removeOverlay(positionOverlay);
                    positionOverlay = null;
                    Log.trace('Position overlay disabled');
                }
            }
            
            return WaitNextFrame;
        }
    }

} 