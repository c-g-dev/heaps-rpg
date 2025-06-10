package heaps.rpg.map;

import heaps.rpg.runtime.RPGMapRuntime;
import heaps.rpg.util.EnumKeys;
import heaps.coroutine.Promise;

using heaps.rpg.util.EnumKeysTools;

enum SetMapEvents<T> {
    MapUnloaded: SetMapEvents<{map: RPGMapRuntime}>;
    MapLoaded: SetMapEvents<{map: RPGMapRuntime}>;
}

enum SetMapOption {
    BeforeExit(cb: (map: RPGMapRuntime) -> Promise);
    AfterExit(cb: (map: RPGMapRuntime) -> Promise);
    BeforeShow(cb: (map: RPGMapRuntime) -> Promise);
    AfterShow(cb: (map: RPGMapRuntime) -> Promise);
}

class SetMapExtension {
    public static function setMap(world: RPGWorld, mapName: String, ?options: Array<SetMapOption>): Promise {
        return new Promise((resolve) -> {
                Log.trace('[SetMap] Starting setMap workflow - target map: $mapName');
                
                if(options == null) {
                    options = [];
                    Log.trace('[SetMap] No options provided, using empty array');
                } else {
                    Log.trace('[SetMap] Using ${options.length} options');
                }
                
                if(world.map != null) {
                    var currentMapName = world.map.mapData.name;
                    Log.trace('[SetMap] Switching from current map: $currentMapName to: $mapName');
                    
                    Log.trace('[SetMap] Step 1: Running BeforeExit callbacks');
                    runAllOptions(options, BeforeExit, world.map)
                    .then(_ -> {
                        Log.trace('[SetMap] Step 2: Unloading current map render');
                        world.map.render.unload();
                        
                        Log.trace('[SetMap] Step 3: Dispatching MapUnloaded event');
                        world.events.of(MapUnloaded).dispatch({map: world.map});
                        
                        Log.trace('[SetMap] Step 4: Running AfterExit callbacks'); 
                        return runAllOptions(options, AfterExit, world.map);
                    })
                    .then(_ -> {
                        Log.trace('[SetMap] Step 5: Setting new current map: $mapName');
                        @:privateAccess world.runtime.setCurrentMap(mapName);
                        
                        Log.trace('[SetMap] Step 6: Loading new map from ROM');
                        world.map.render.loadFromROM();
                        
                        Log.trace('[SetMap] Step 7: Dispatching MapLoaded event');
                        world.events.of(MapLoaded).dispatch({map: world.map});
                        
                        Log.trace('[SetMap] Step 8: Running BeforeShow callbacks');
                        return runAllOptions(options, BeforeShow, world.map);
                    })
                    .then(_ -> {
                        Log.trace('[SetMap] Step 9: Rendering new map');
                        world.map.render.render();
                        
                        Log.trace('[SetMap] Step 10: Running AfterShow callbacks');
                        return runAllOptions(options, AfterShow, world.map);
                    })
                    .then(_ -> {
                        Log.trace('[SetMap] Map switch completed successfully: $mapName');
                        resolve(null);
                    });
                } else {
                    Log.trace('[SetMap] No current map, performing initial map load: $mapName');
                    
                    Log.trace('[SetMap] Step 1: Setting initial current map');
                    @:privateAccess world.runtime.currentMap = mapName;
                    
                    Log.trace('[SetMap] Step 2: Loading map from ROM');
                    world.map.render.loadFromROM();
                    
                    Log.trace('[SetMap] Step 3: Dispatching MapLoaded event');
                    world.events.of(MapLoaded).dispatch({map: world.map});
                    
                    Log.trace('[SetMap] Step 4: Running BeforeShow callbacks');
                    runAllOptions(options, BeforeShow, world.map)
                    .then(_ -> {
                        Log.trace('[SetMap] Step 5: Rendering map');
                        world.map.render.render();
                        
                        Log.trace('[SetMap] Step 6: Running AfterShow callbacks');
                        return runAllOptions(options, AfterShow, world.map);
                    })
                    .then(_ -> {
                        Log.trace('[SetMap] Initial map load completed successfully: $mapName');
                        resolve(null);
                    });
                }
        });
    }

    static function runAllOptions(options: Array<SetMapOption>, enumKey: EnumKeys<SetMapOption>, runtime: RPGMapRuntime): Promise {
        return new Promise((resolve) -> {
                Log.trace('[SetMap] Running options for phase: $enumKey');
                var promises = [];
                var callbackCount = 0;
                
                for (option in options) {
                    switch option {
                        case BeforeExit(cb): if(enumKey == BeforeExit) {
                            callbackCount++;
                            promises.push(cb(runtime));
                        }
                        case AfterExit(cb): if(enumKey == AfterExit) {
                            callbackCount++;
                            promises.push(cb(runtime));
                        }
                        case BeforeShow(cb): if(enumKey == BeforeShow) {
                            callbackCount++;
                            promises.push(cb(runtime));
                        }
                        case AfterShow(cb): if(enumKey == AfterShow) {
                            callbackCount++;
                            promises.push(cb(runtime));
                        }
                    }
                }
                
                Log.trace('[SetMap] Found $callbackCount callbacks for phase: $enumKey');
                
                if(callbackCount == 0) {
                    Log.trace('[SetMap] No callbacks to execute for phase: $enumKey');
                    resolve();
                    return;
                }
                
                var sequence = Promise.resolve();
                for (i in 0...promises.length) {
                    var promise = promises[i];
                    sequence = sequence.then(_ -> {
                        Log.trace('[SetMap] Executing callback ${i + 1}/$callbackCount for phase: $enumKey');
                        return promise;
                    });
                }
                
                sequence.then(_ -> {
                    Log.trace('[SetMap] All callbacks completed for phase: $enumKey');
                    resolve();
                });
        });
    }
}
