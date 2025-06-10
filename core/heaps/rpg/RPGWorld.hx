package heaps.rpg;

import heaps.rpg.cmd.WorldCommandExecutor;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.runtime.RPGMapRuntime;
import heaps.rpg.macro.WorldMacros;
import ludi.mind.comp.Events;
import heaps.rpg.runtime.RPGWorldRuntime;
import heaps.rpg.rom.ROMData.RPGWorldROM;
import heaps.rpg.runtime.RPGEntitiesRuntime;
import heaps.rpg.comp.RPGWorldComponent;
import heaps.rpg.runtime.RPGWorldRuntime.RPGWorldMaps;
import heaps.rpg.comp.RPGWorldRoutines;
import heaps.rpg.comp.RPGWorldFrameRoll;

@:using(heaps.rpg.macro.WorldMacros)
@:using(heaps.rpg.map.RPGWorld_SetMap.SetMapExtension)
class RPGWorld {
    private var rom: RPGWorldROM;
    private var runtime: RPGWorldRuntime;
    
    public var entities(default, null): RPGEntitiesRuntime;
    public var maps(default, null): RPGWorldMaps;
    public var map(get, null): RPGMapRuntime;  
    public inline function get_map(): RPGMapRuntime {
        return this.runtime.mapRuntimes.get(this.runtime.currentMap);
    }
    
    public var events(default, null): Events;
    public var viewport(default, null): RPGViewport;
    public var commands(default, null): WorldCommandExecutor;
    public var routines(default, null): RPGWorldRoutines;
    public var frameRoll(default, null): RPGWorldFrameRoll;

    var components: Map<String, Dynamic> = [];

    public function new(rom: RPGWorldROM) {
        this.rom = rom;
        this.runtime = new RPGWorldRuntime();
        this.runtime.loadROM(rom, this);
        this.entities = this.runtime.entities;
        this.maps = new RPGWorldMaps(this.runtime);
        this.events = new Events();
        this.viewport = new RPGViewport(this);
        this.commands = new WorldCommandExecutor(this);
        this.routines = new RPGWorldRoutines(this);
    }

    public function start(scene: h2d.Scene) {

    }

    @:noCompletion
    public function _exists(tag: String): Bool {
        return this.components.exists(tag);
    } 

    @:noCompletion
    public function _get(tag: String): Dynamic {
        if (this.components.exists(tag)) {
            return this.components[tag];
        }
        return null;
    }

    @:noCompletion
    public function _add(tag: String, value: Dynamic) {
        this.components[tag] = value;
        if(value is RPGWorldComponent){
            (cast value: RPGWorldComponent).attach(this);
        }
    }
}