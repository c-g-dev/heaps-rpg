package heaps.rpg.map;

import heaps.rpg.rom.ROMData.RPGMapData;
import heaps.rpg.rom.ROMData.RPGMapLayerData;
import heaps.rpg.ntt.RPGEntity.RPGPhysicalEntity;

class RPGMapLayer<T = Dynamic> extends h2d.Object {
    public var index: Int;
    var map: RPGMapData;
    public var data: RPGMapLayerData<T>;
    
    public function new(map: RPGMapData, data: RPGMapLayerData<T>) {
        super();
        this.map = map;
        this.data = data;
        this.index = data.index;
    }
}

