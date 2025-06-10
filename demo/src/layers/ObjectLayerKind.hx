package layers;

import heaps.rpg.rom.ROMData.RPGLayerKind;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.map.RPGObjectLayer;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.rom.ROMData.RPGMapLayerData;

class ObjectLayerKind extends RPGLayerKind {
    public function new() {
        super("object", true);
    }
    
    public function load(req: RPGLayerLoadRequest): {layer: RPGMapLayer, entities: Array<RPGEntityInstanceData>} {
        
        var layerData = req.layerData.data;
        var entities = [];

        Log.trace("layerData: " + haxe.Json.stringify(layerData));
        
        if (layerData.entities != null) {
            var entitiesArray: Array<Dynamic> = cast layerData.entities;
            for (entityData in entitiesArray) {
                var entityInstance = new RPGEntityInstanceData(
                    entityData.instanceUUID,
                    entityData.kind,
                    entityData.x,
                    entityData.y,
                    entityData.data
                );
               entities.push(entityInstance);
            }
        }
        
        var objectLayerData = new heaps.rpg.map.RPGObjectLayer.RPGObjectLayerData(entities);
        var layer = new RPGObjectLayer(req.mapData, new heaps.rpg.rom.ROMData.RPGMapLayerData(
            req.layerData.name,
            req.layerData.kind,
            req.layerData.index,
            objectLayerData
        ));
        
        return {layer: layer, entities: entities};
    }
} 