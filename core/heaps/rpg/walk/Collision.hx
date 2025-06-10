package heaps.rpg.walk;

import ludi.commons.collections.GridMap;
import heaps.rpg.comp.RPGWorldComponent;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGWorld_SetMap.SetMapEvents;

enum CollisionType {
    Block;
    Free;
}

class Collision extends RPGWorldComponent {
    var grid: GridMap<CollisionType> = new GridMap<CollisionType>();

    public function new() {
        
    }

    public function clear(){
        if(grid != null) {
            grid = new GridMap<CollisionType>();
        }
    }
    
    public function set(x: Int, y: Int, type: CollisionType){
        Log.trace("[Collision] set: " + x + ", " + y + ", " + type);
        if(grid == null){
            grid = new GridMap<CollisionType>();
        }
        grid.add(x, y, type);
    }

    public function xyIterate(cb: (x: Int, y: Int, val: CollisionType) -> Void){
        if(grid == null){
            grid = new GridMap<CollisionType>();
        }
        grid.forEach(cb);
    }

    public function canMoveTo(entity: RPGEntity, x: Int, y: Int): Bool{
    
        if(grid == null){
            grid = new GridMap<CollisionType>();
        }
        switch world.entities.getFirstEntityAt(x, y) {
            case Some(otherntt): {
                Log.trace('x: ${x} y: ${y} entity: ${entity.tags.exists("solid")} otherntt: ${otherntt != null ? otherntt.tags.exists("solid") : null }');
                Log.trace("otherntt != null: " + (otherntt != null));
                if(otherntt != null && otherntt.tags.exists("solid") && entity.tags.exists("solid")) return false;
            }
            default: {
                
            }
        }
        
        if(grid.get(x, y) == CollisionType.Block) return false;
        return true;
    }

    public function onAttached() {
        
        world.events.of(MapUnloaded).on((data) -> {
            Log.trace('[Collision] Map unloaded, clearing collision grid');
            clear();
        });
    }

    public function onDetached() {}
}
