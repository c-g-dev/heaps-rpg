package heaps.rpg.runtime;

import haxe.ds.Option;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.map.RPGLocation;

class RPGEntitiesRuntime {
    var world: RPGWorld;
    var loadedEntities: Array<RPGEntity> = [];

    public function new(world: RPGWorld) {
        this.world = world;
    }

    public function place(entity: RPGEntity, loc: RPGLocation): Void {
        if(entity == null) return;
        
        var found = false;
        for (e in loadedEntities) {
            if(e.uuid == entity.uuid) {
                found = true;
                break;
            }
        }

        if(!found) {
            entity.addToWorld(loc);
            loadedEntities.push(entity);
            entity.onEvent(EntityAddedToMap);
        }
        else{
            entity.setLocation(loc);
        }

    }

    public function remove(entity: RPGEntity) {
        loadedEntities.remove(entity);
        entity.onEvent(EntityRemovedFromMap);
    }

    public function getEntitiesAt(x: Int, y: Int): Array<RPGEntity> {
        var entities: Array<RPGEntity> = [];
        for (entity in loadedEntities) {
            if(entity.loc.gridX == x && entity.loc.gridY == y) {
                entities.push(entity);
            }
        }
        return entities;
    }

    public function getFirstEntityAt(x: Int, y: Int): Option<RPGEntity> {
        for (entity in loadedEntities) {
            if(entity.loc.gridX == x && entity.loc.gridY == y) {
                return Some(entity);
            }
        }
        return None;
    }
}