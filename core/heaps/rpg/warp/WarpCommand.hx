package heaps.rpg.warp;

import heaps.coroutine.Promise;
import heaps.rpg.RPGWorld;
import heaps.rpg.cmd.AsyncWorldCommand;
import heaps.rpg.map.RPGWorld_SetMap.SetMapOption;
import heaps.rpg.ntt.EntityStorage.StoredEntity;
import heaps.rpg.map.RPGLocation;
import heaps.rpg.player.Player;
import heaps.rpg.view.FadeOverlay;
import heaps.rpg.runtime.RPGWorldRuntime.MapId;
import heaps.rpg.warp.Warp.WarpLocation;
import heaps.rpg.warp.Warp.Warping;
import heaps.rpg.warp.Warp.IWarpType;
import heaps.rpg.warp.DefaultWarpType;
import heaps.rpg.ctrl.RPGControls;

using heaps.rpg.map.RPGWorld_SetMap.SetMapExtension;

class WarpCommand extends AsyncWorldCommand {
    var targetLocation: WarpLocation;
    var storedEntity: StoredEntity;

    public function new(targetLocation: WarpLocation) {        
        this.targetLocation = targetLocation;
        Log.trace('[WarpCommand] Created warp command for target: ${targetLocation.toString()}');
    }

    public function onExecuteAsync(world: RPGWorld): Promise {
        Log.trace('[WarpCommand] Starting warp execution');
        
        var promise = new Promise();
        var fadeOut = new FadeOverlay(world);
        var fadeIn = new FadeOverlay(world);
        fadeIn.alpha = 1;

        
        var resolvedLocation = targetLocation.resolveLocation(world);
        if (resolvedLocation == null) {
            Log.trace('[WarpCommand] ERROR: Could not resolve target location: ${targetLocation.toString()}');
            promise.fulfill(); 
            return promise;
        }

        var mapName: MapId = resolvedLocation.map;
        var position = {x: resolvedLocation.gridX, y: resolvedLocation.gridY};
        
        Log.trace('[WarpCommand] Target map: ${mapName}, position: (${position.x}, ${position.y})');
        
        
        var warping = world.seek(Warping);
        var player = Player.get();
        var sourceWarp: Warp = null;
        var sourceWarpType: IWarpType = new DefaultWarpType();
        
        if (warping != null && player != null) {
            var playerLoc = cast(player, heaps.rpg.ntt.RPGEntity.RPGSprite).loc;
            sourceWarp = warping.getWarpAt(playerLoc);
            if (sourceWarp != null) {
                sourceWarpType = sourceWarp.warpType;
                Log.trace('[WarpCommand] Found source warp at player location with type: ${Type.getClassName(Type.getClass(sourceWarpType))}');
            }
        }
        
        world.setMap(mapName, [
            BeforeExit((map) -> {
                Log.trace('[WarpCommand] BeforeExit: Calling source warp type beforeExit');
                return sourceWarpType.beforeExit(world, sourceWarp).then((_) -> {
                    Log.trace('[WarpCommand] BeforeExit: Storing player and starting fade out');
                    var e = Player.get();
                    storedEntity = e.store();
                    world.viewport.addOverlay(fadeOut);
                    RPGControls.lock();
                    return fadeOut.fadeOut(0.3).toPromise();
                });
            }),
            AfterExit((map) -> {
                Log.trace('[WarpCommand] AfterExit: Calling source warp type afterExit');
                return sourceWarpType.afterExit(world, sourceWarp);
            }),
            BeforeShow((map) -> {
                Log.trace('[WarpCommand] BeforeShow: Setting up fade in and placing player');
                world.viewport.addOverlay(fadeIn);
                world.viewport.removeOverlay(fadeOut);
                storedEntity.place(position.x, position.y);
                
                
                var destWarping = world.seek(Warping);
                var destWarp: Warp = null;
                var destWarpType: IWarpType = new DefaultWarpType();
                
                if (destWarping != null) {
                    destWarp = destWarping.getWarpAt(resolvedLocation);
                    if (destWarp != null) {
                        destWarpType = destWarp.warpType;
                        Log.trace('[WarpCommand] Found destination warp with type: ${Type.getClassName(Type.getClass(destWarpType))}');
                    }
                }
                
                Log.trace('[WarpCommand] BeforeShow: Calling destination warp type beforeShow');
                return destWarpType.beforeShow(world, destWarp);
            }),
            AfterShow((map) -> {
                Log.trace('[WarpCommand] AfterShow: Starting fade in transition');
                return fadeIn.fadeIn(0.3).toPromise().then(_ -> {
                    world.viewport.removeOverlay(fadeIn);
                    
                    
                    var destWarping = world.seek(Warping);
                    var destWarp: Warp = null;
                    var destWarpType: IWarpType = new DefaultWarpType();
                    
                    if (destWarping != null) {
                        destWarp = destWarping.getWarpAt(resolvedLocation);
                        if (destWarp != null) {
                            destWarpType = destWarp.warpType;
                        }
                    }
                    
                    Log.trace('[WarpCommand] AfterShow: Calling destination warp type afterShow');
                    return destWarpType.afterShow(world, destWarp).then((_) -> {
                        Log.trace('[WarpCommand] Warp execution completed successfully');
                        promise.fulfill();
                        RPGControls.release();
                        return new Promise((resolve) -> resolve(null));
                    });
                });
            })
        ]);
        
        return promise;
    }
}