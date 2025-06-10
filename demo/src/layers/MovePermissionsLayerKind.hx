package layers;

import heaps.rpg.rom.ROMData.RPGLayerKind;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.walk.Collision;

class MovePermissionsLayerKind extends RPGLayerKind {
    public function new() {
        super("move_permissions", false);
    }
    
    public function load(req: RPGLayerLoadRequest): {layer: RPGMapLayer, entities: Array<RPGEntityInstanceData>} {
        
        var layerData = req.layerData.data;
        
        
        if (layerData.collisionData != null && req.world != null) {
            var collision = req.world.seek(Collision);
            if (collision != null) {
                var collisionArray: Array<Dynamic> = cast layerData.collisionData;
                for (cellData in collisionArray) {
                    var collisionType = cellData.blocked ? 
                        heaps.rpg.walk.Collision.CollisionType.Block : 
                        heaps.rpg.walk.Collision.CollisionType.Free;
                    collision.set(cellData.x, cellData.y, collisionType);
                }
            }
        }
        
        
        return {layer: null, entities: []};
    }
} 