package heaps.rpg.ntt;

import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.ntt.EntityStorage.StoredEntity;


class RPGEntityExtensions {
    public static function store(entity: RPGEntity): StoredEntity {
        return entity.world.seek(EntityStorage).store(entity);
    }
}
