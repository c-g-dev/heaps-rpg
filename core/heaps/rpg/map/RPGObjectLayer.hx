package heaps.rpg.map;

import heaps.rpg.view.IsometricContainer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.ntt.RPGEntity.RPGPhysicalEntity;
import heaps.rpg.rom.ROMData.RPGMapData;
import heaps.rpg.rom.ROMData.RPGMapLayerData;

class RPGObjectLayerData {
    public var entities: Array<RPGEntityInstanceData>;
    
    public function new(entities: Array<RPGEntityInstanceData> = null) {
        this.entities = entities != null ? entities : [];
    }
}

typedef EntityLayer<T: (RPGMapLayer & {
    function addEntity(entity: RPGPhysicalEntity): Void;
}) = RPGObjectLayer> = T;

class RPGObjectLayer extends RPGMapLayer<RPGObjectLayerData> {
    var container: IsometricContainer;
    var loadedEntities: Map<String, RPGPhysicalEntity>;

    public function new(map: RPGMapData, data: RPGMapLayerData<RPGObjectLayerData>) {
        super(map, data);
        
        container = new IsometricContainer(this);
        loadedEntities = new Map();
        
    }

    public function addEntity(entity: RPGPhysicalEntity): Void {
        container.addChild(entity);
        if (entity.uuid != null) {
            loadedEntities.set(entity.uuid, entity);
        }
    }

    public function removeEntity(entity: RPGPhysicalEntity): Void {
        container.removeChild(entity);
        if (entity.uuid != null) {
            loadedEntities.remove(entity.uuid);
        }
    }
    
    public function getEntity(uuid: String): RPGPhysicalEntity {
        return loadedEntities.get(uuid);
    }
    
    public function getAllEntities(): Array<RPGPhysicalEntity> {
        return [for (entity in loadedEntities) entity];
    }
    
    public function clearEntities(): Void {
        for (entity in loadedEntities) {
            container.removeChild(entity);
        }
        loadedEntities.clear();
    }
}