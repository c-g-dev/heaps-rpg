package heaps.rpg.runtime;

import heaps.rpg.runtime.RPGEntitiesRuntime;
import heaps.rpg.runtime.RPGMapRuntime;
import heaps.rpg.rom.ROMData.RPGWorldROM;

abstract MapId(String) to String from String {
    public inline function new(id: String) {
        this = id;
    }

    public static function none(): MapId {
        return new MapId("");
    }
}


typedef EntityKindId = String;

class RPGWorldRuntime {
    var hasLoadedROM: Bool = false;
    public var currentMap (default, null): MapId;

    public var mapRuntimes: Map<MapId, RPGMapRuntime> = [];
    public var entities: RPGEntitiesRuntime;

    public var viewport: RPGViewport;

    public function new() {

    }

    private function setCurrentMap(name: MapId): Void {
        currentMap = name;
    }

    public function loadROM(rom: RPGWorldROM, world: RPGWorld) {
        if(hasLoadedROM){
            return;
        }
        hasLoadedROM = true;
        
        Log.trace('[RPGWorldRuntime] Loading ROM with ${rom.maps.length} maps');
        for(eachMap in rom.maps){
            @:privateAccess mapRuntimes.set(eachMap.name, new RPGMapRuntime(eachMap, world));
        }
        this.entities = new RPGEntitiesRuntime(world);
        
        
            Log.trace('[RPGWorldRuntime] Executing ${rom.postLoadJobs.length} post-load jobs');
            for (job in rom.postLoadJobs) {
                Log.trace('[RPGWorldRuntime] Executing post-load job: ${job.getDescription()}');
                    job.execute(world);
                    Log.trace('[RPGWorldRuntime] Successfully completed post-load job: ${job.getDescription()}');
            }
            Log.trace('[RPGWorldRuntime] All post-load jobs completed');
        
        Log.trace('[RPGWorldRuntime] ROM loading completed');
    }
}


abstract RPGWorldMaps(RPGWorldRuntime) {
    public inline function new(runtime: RPGWorldRuntime) {
        this = runtime;
    }

    public inline function get(name: MapId): RPGMapRuntime {
        return this.mapRuntimes.get(name);
    }

    public inline function current(): MapId {
        return this.currentMap;
    }
}
