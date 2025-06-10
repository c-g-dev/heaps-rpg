package entities;

import hxd.Timer;
import heaps.rpg.ntt.RPGEntity.BasicVirtualEntity;
import heaps.rpg.walk.Walking;
import heaps.rpg.walk.WalkingBehavior;
import heaps.rpg.walk.WalkingController;
import heaps.rpg.walk.WalkingController.WalkPath;
import heaps.rpg.walk.WalkingController.ProgrammaticWalk;
import heaps.rpg.walk.WalkingController.PlayerInputWalk;
import heaps.rpg.cmd.AsyncWorldCommand;
import heaps.rpg.cmd.WorldCommand;
import heaps.rpg.ctrl.RPGControls;
import heaps.rpg.player.Player;
import heaps.rpg.warp.Warp;
import heaps.rpg.warp.Warp.WarpLocation;
import heaps.rpg.warp.Warp.IWarpType;
import heaps.rpg.warp.Warp.Warping;
import heaps.rpg.warp.WarpCommand;
import heaps.rpg.map.RPGLocation;
import heaps.coroutine.Promise;
import h2d.Graphics;
import h2d.Object;
import heaps.rpg.map.RPGWorld_SetMap.SetMapOption;
import heaps.rpg.ntt.RPGEntity.TempSprite;

using heaps.rpg.warp.WarpExtensions;
using heaps.rpg.map.RPGWorld_SetMap.SetMapExtension;

class Door extends BasicVirtualEntity {
    
        
        
        
        
    
    public var warp(default, null): Warp;
    var stepRequestTicket: String;
    var blackSquare: Graphics;
    var isOpen: Bool = false;
    
    public function new(world: heaps.rpg.RPGWorld, id: String, toLocation: WarpLocation) {
        super(world);
        
        
        blackSquare = new Graphics();

        
        
        var doorWarpType = new DoorWarpType();
        
        
        this.warp = new Warp(id, null, toLocation, doorWarpType);
    }
    
    public override function addToWorld(loc: RPGLocation): Void {
        super.addToWorld(loc);

        blackSquare.clear();
        blackSquare.beginFill(0x000000);
        blackSquare.drawRect(0, 0, world.map.tileSize, world.map.tileSize);
        blackSquare.endFill();
        
        
        warp.atLocation = loc;
        
        
        var warping = world.seek(Warping);
        if (warping != null) {
            var existingWarp = warping.getWarpById(warp.id);
            if (existingWarp != null) {
                
                existingWarp.warpType = warp.warpType;
                Log.trace('[Door] Updated existing warp ${warp.id} with DoorWarpType');
            } else {
                
                warping.addWarpById(warp.id, warp);
                Log.trace('[Door] Registered new warp ${warp.id} with DoorWarpType');
            }
        }
        
        
        var walking = world.seek(Walking);
        stepRequestTicket = walking.addEventAtPosition(
            loc.gridX,
            loc.gridY,
            EntityRequestedStep,
            () -> {
                if (!isOpen) {
                    var player = Player.get();
                    if (player != null) {
                        
                        world.commands.run([
                            new OpenDoorCommand(this),
                            new WalkToDoorCommand(player, loc.gridX, loc.gridY),
                            new WarpCommand(warp.toLocation)
                        ]);
                    }
                }
            },
            [Interrupt]
        );
    }
    
    public override function removeFromWorld(loc: RPGLocation): Void {
        super.removeFromWorld(loc);
        
        
        if (stepRequestTicket != null) {
            var walking = world.seek(Walking);
            walking.remove(stepRequestTicket);
        }
        
        
        if (isOpen && blackSquare.parent != null) {
            blackSquare.remove();
        }
    }
    
    public function openDoor(): Void {
       
            Log.trace('[Door] opening door');
            isOpen = true;

            blackSquare.clear();
            blackSquare.beginFill(0x000000);
            blackSquare.drawRect(0, 0, world.map.tileSize, world.map.tileSize);
            blackSquare.endFill();

            
            blackSquare.x = loc.gridX * world.map.tileSize;
            blackSquare.y = loc.gridY * world.map.tileSize;
            blackSquare.alpha = 1;

            
            Log.trace('[Door] adding black square to ${world.map.id}');

            world.map.getDefaultEntityLayer().addEntity(new TempSprite(world, blackSquare));

           
              
              
              
            
            
          
       
    }            

    
    public function closeDoor(): Void {
   
            isOpen = false;
            blackSquare.alpha = 0;
      
    }
}




class OpenDoorCommand extends WorldCommand {
    var door: Door;
    
    public function new(door: Door) {
        this.door = door;
    }
    
    public function onExecute(world: heaps.rpg.RPGWorld): Void {
        Log.trace('[OpenDoorCommand] opening door');
        door.openDoor();
    }
    
}


class CloseDoorCommand extends WorldCommand {
    var door: Door;
    
    public function new(door: Door) {
        this.door = door;
    }
    
    public function onExecute(world: heaps.rpg.RPGWorld): Void {
        door.closeDoor();
    }
    
}


class WalkToDoorCommand extends AsyncWorldCommand {
    var player: heaps.rpg.ntt.RPGEntity;
    var doorX: Int;
    var doorY: Int;
    
    public function new(player: heaps.rpg.ntt.RPGEntity, doorX: Int, doorY: Int) {
        this.player = player;
        this.doorX = doorX;
        this.doorY = doorY;
    }
    
    public function onExecuteAsync(world: heaps.rpg.RPGWorld): Promise {
        return new Promise((resolve) -> {
            var sprite = cast(player, heaps.rpg.ntt.RPGEntity.RPGSprite);
            var walkingBehavior = sprite.behaviors.get(WalkingBehavior);
            
            if (walkingBehavior != null) {
                var programmaticWalk = new ProgrammaticWalk();
                walkingBehavior.setController(programmaticWalk);
                
                
                var path = new WalkPath().route(
                    sprite.loc.gridX,
                    sprite.loc.gridY,
                    doorX,
                    doorY
                );
                
                programmaticWalk.walk(path, () -> {
                    
                    walkingBehavior.setController(new PlayerInputWalk());
                    resolve(null);
                });
            } else {
                resolve(null);
            }
        });
    }
}


class WalkAwayFromDoorCommand extends AsyncWorldCommand {
    var direction: String; 
    
    public function new(direction: String = "down") {
        this.direction = direction;
    }
    
    public function onExecuteAsync(world: heaps.rpg.RPGWorld): Promise {
        return new Promise((resolve) -> {
            var player = Player.get();
            if (player != null) {
                var sprite = cast(player, heaps.rpg.ntt.RPGEntity.RPGSprite);
                var walkingBehavior = sprite.behaviors.get(WalkingBehavior);
                
                if (walkingBehavior != null) {
                    var programmaticWalk = new ProgrammaticWalk();
                    walkingBehavior.setController(programmaticWalk);
                    
                    
                    var path = new WalkPath();
                    switch (direction) {
                        case "up": path.up(1);
                        case "down": path.down(1);
                        case "left": path.left(1);
                        case "right": path.right(1);
                        default: path.down(1);
                    }
                    
                    programmaticWalk.walk(path, () -> {
                        
                        walkingBehavior.setController(new PlayerInputWalk());
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    }
}


class DoorWarpType implements IWarpType {
    
    public function new() {
    }
    
    private function findDoorAtLocation(world: heaps.rpg.RPGWorld, location: RPGLocation): Door {
        
        var entitiesAtLocation = world.entities.getEntitiesAt(location.gridX, location.gridY);
        for (entity in entitiesAtLocation) {
            if (Std.isOfType(entity, Door)) {
                return cast(entity, Door);
            }
        }
        return null;
    }
    
    public function beforeExit(world: heaps.rpg.RPGWorld, warp: Warp): Promise {
        
        
        return new Promise((resolve) -> {
            Log.trace('[DoorWarpType] beforeExit - Locking controls');
            RPGControls.lock();
            resolve(null);
        });
    }
    
    public function afterExit(world: heaps.rpg.RPGWorld, warp: Warp): Promise {
        
        return new Promise((resolve) -> {
            var door = findDoorAtLocation(world, warp.atLocation);
            if (door != null) {
                door.closeDoor();
            }
            resolve(null);
        });
    }
    
    public function beforeShow(world: heaps.rpg.RPGWorld, warp: Warp): Promise {
        
        return new Promise((resolve) -> {
            Log.trace('[DoorWarpType] beforeShow - Opening door we warped to');
            var door = findDoorAtLocation(world, warp.atLocation);
            if (door != null) {
                door.openDoor();
            }
            resolve(null);
        });
    }
    
    public function afterShow(world: heaps.rpg.RPGWorld, warp: Warp): Promise {
        
        return new Promise((resolve) -> {
            Log.trace('[DoorWarpType] afterShow - Starting door exit sequence');
            
            var door = findDoorAtLocation(world, warp.atLocation);
            if (door != null) {
                
                world.commands.run([
                    new OpenDoorCommand(door),
                    new WalkAwayFromDoorCommand("down"),
                    new CloseDoorCommand(door)
                ]).then((_) -> {
                    Log.trace('[DoorWarpType] Door exit sequence completed');
                    
                    RPGControls.release();
                    resolve(null);
                });
            } else {
                
                RPGControls.release();
                resolve(null);
            }
        });
    }
}





