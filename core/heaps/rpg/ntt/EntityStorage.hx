package heaps.rpg.ntt;

import heaps.rpg.comp.RPGWorldComponent;
import heaps.rpg.map.RPGLocation;

class EntityStorage extends RPGWorldComponent {
    var storage: Array<StoredEntity> = [];
    
    public function store(entity: RPGEntity): StoredEntity {
        if(storage == null) storage = [];
        var newStorage = new StoredEntity(entity, this);

        storage.push(newStorage);
        return newStorage;
    }

    public function unstore(entity: StoredEntity): Void {
        storage.remove(entity);
    }

    public function get(entity: RPGEntity): StoredEntity {
        for (stored in storage) {
            if(stored.entity.uuid == entity.uuid) return stored;
        }
        return null;
    }

    public function hasStoredEntityWithUUID(uuid: String): Bool {
        if(storage == null) storage = [];
        for (stored in storage) {
            if(stored.entity.uuid == uuid) return true;
        }
        return false;
    }

    public function onAttached() {}

    public function onDetached() {}
}

class StoredEntity {
    public var entity: RPGEntity;
    public var storage: EntityStorage;
    public var cameraFollow: Bool = false;

    public function new(entity: RPGEntity, storage: EntityStorage) {
        this.entity = entity;
        this.storage = storage;
        if(entity is h2d.Object) {
            var scene = entity.world.viewport.getScene();
            if(scene != null && scene.camera != null && scene.camera.follow == (cast entity: h2d.Object)) {
                cameraFollow = true;
                Log.trace('[StoredEntity] Entity was being followed by camera, will restore after placement');
            }
        }
    }

    public function place(x: Int, y: Int) {
        
        var entityLayerIndex = entity.world.map.getDefaultEntityLayer().index;
        var location = RPGLocation.onTile(entity.world, x, y, entity.world.map.id, entityLayerIndex);
        
        Log.trace('[StoredEntity] Placing entity at (${x}, ${y}) on layer ${entityLayerIndex} of map ${entity.world.map.id}');
        
        
        entity.addToWorld(location);
        
        if(cameraFollow) {
            Log.trace('[StoredEntity] Restoring camera follow to entity');
            entity.world.viewport.getScene().camera.follow = (cast entity: h2d.Object);
        }
        storage.unstore(this);
    }
}