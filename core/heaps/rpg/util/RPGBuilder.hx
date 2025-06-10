package heaps.rpg.util;

import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.map.RPGMapLayer;
import haxe.ds.StringMap;
import heaps.rpg.rom.ROMData;
import heaps.rpg.rom.ROMData.PostLoadJob;
import heaps.rpg.rom.ROMData.GlobalWarpRegistrationJob;

class RPGBuilder {
    private var maps: Array<RPGMapData> = [];
    private var entityKinds: Map<String, RPGEntityKind> = new StringMap();
    private var layerKinds: Map<String, RPGLayerKind> = new StringMap();
    private var metadata: Map<String, Dynamic> = new StringMap();
    private var postLoadJobs: Array<PostLoadJob> = [];

    public function new() {}

    
    public function addMap(name: String, width: Int, height: Int, tilesize: Int): RPGMapDataBuilder {
        return new RPGMapDataBuilder(this, name, width, height, tilesize);
    }

    
    public function addMapData(mapData: RPGMapData): Void {
        maps.push(mapData);
    }

    
    public function addEntityKind(entityKind: RPGEntityKind): RPGBuilder {
        entityKinds.set(entityKind.kind, entityKind);
        return this;
    }

    
    public function addLayerKind(layerKind: RPGLayerKind): RPGBuilder {
        layerKinds.set(layerKind.kind, layerKind);
        return this;
    }

    
    public function setMetadata(key: String, value: Dynamic): RPGBuilder {
        metadata.set(key, value);
        return this;
    }

    
    public function addPostLoadJob(job: PostLoadJob): RPGBuilder {
        postLoadJobs.push(job);
        Log.trace('[RPGBuilder] Added post-load job: ${job.getDescription()}');
        return this;
    }

    
    public function addGlobalWarpRegistration(): RPGBuilder {
        return addPostLoadJob(new GlobalWarpRegistrationJob());
    }

    
    public function build(): RPGWorldROM {
        var rom = new RPGWorldROM();
        rom.maps = maps;
        rom.entityKinds = entityKinds;
        rom.layerKinds = layerKinds;
        rom.metadata = metadata;
        rom.postLoadJobs = postLoadJobs;
        
        Log.trace('[RPGBuilder] Built ROM with ${maps.length} maps, ${Lambda.count(entityKinds)} entity kinds, ${Lambda.count(layerKinds)} layer kinds, and ${postLoadJobs.length} post-load jobs');
        return rom;
    }
}


class RPGMapDataBuilder {
    private var parent: RPGBuilder;
    private var mapData: RPGMapData;

    public function new(parent: RPGBuilder, name: String, width: Int, height: Int, tilesize: Int) {
        this.parent = parent;
        mapData = new RPGMapData(name, tilesize, width, height);
    }

    
    public function addLayer(name: String, type: String, index: Int, data: Dynamic): RPGMapDataBuilder {
        var layer = new RPGMapLayerData(name, type, index, data);
        mapData.layers.push(layer);
        return this;
    }

    
    public function setMetadata(key: String, value: Dynamic): RPGMapDataBuilder {
        mapData.metadata.set(key, value);
        return this;
    }

    
    public function endMap(): RPGBuilder {
        parent.addMapData(mapData);
        return parent;
    }
}