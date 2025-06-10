package heaps.rpg.rom;

import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.rom.ROMData.RPGEntityKind;
import heaps.rpg.rom.ROMData.RPGMapLayerData;
import heaps.rpg.rom.ROMData.RPGLayerKind;
import heaps.rpg.rom.ROMData.RPGMapData;

class RPGEntityLoadRequest {
    public var instanceData: RPGEntityInstanceData;
    public var kindData: RPGEntityKind;
    public var world: RPGWorld;
    public var layer: RPGMapLayer;

    public function new(instanceData: RPGEntityInstanceData, kindData: RPGEntityKind, world: RPGWorld) {
        this.instanceData = instanceData;
        this.kindData = kindData;
        this.world = world;
        this.layer = cast this.world.map.getDefaultEntityLayer();
    }

}

class RPGLayerLoadRequest {
    public var layerData: RPGMapLayerData;
    public var layerKindData: RPGLayerKind;
    public var mapData: RPGMapData;
    public var world: RPGWorld;
    var entities: Array<RPGEntityInstanceData>;

    public function new(layerData: RPGMapLayerData, layerKindData: RPGLayerKind, mapData: RPGMapData, world: RPGWorld) {
        this.layerData = layerData;
        this.layerKindData = layerKindData;
        this.mapData = mapData;
        this.world = world;
    }

}