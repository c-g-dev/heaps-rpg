package heaps.rpg.walk;

import heaps.rpg.map.RPGLocation;
import hxd.Timer;
import hxd.Key;
import heaps.rpg.RPGWorld;
import heaps.rpg.ntt.RPGEntityBehavior;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import heaps.rpg.ntt.Animations;
import heaps.rpg.comp.RPGWorldFrameRoll;
import heaps.rpg.walk.WalkingController;
import heaps.rpg.walk.WalkingController.WalkCommand;
import heaps.rpg.walk.Walking;
import heaps.rpg.walk.Walking.WalkingEventResult;
import heaps.rpg.walk.FacingBehavior;
import heaps.rpg.walk.Facing.FacingDirection;
import heaps.rpg.walk.CanWalkToPolicy;
import heaps.rpg.walk.BasicCanWalkPolicy;




enum WalkingEvent<T> {
    EntityStepped: WalkingEvent<{entity: RPGSprite, tileX: Int, tileY: Int}>;
    EntityRequestedStep: WalkingEvent<{entity: RPGSprite, tileX: Int, tileY: Int}>;
}

class WalkingBehavior extends RPGEntityBehavior {

    var sprite: RPGSprite;           
    var controller: WalkController;
    var canWalkToPolicy: CanWalkToPolicy;
    var isMoving: Bool = false;      
    var facingDirection: FacingDirection = FacingDirection.Down; 
    var targetTileX: Int;            
    var targetTileY: Int;            
    var speed: Float = 2;            
    var tileSize: Int = 16;          
    var world: RPGWorld;             
    var facing: FacingBehavior;
    var animations: Animations;
    var moved: Bool = false;
    var startX: Float;               
    var startY: Float;               
    var targetX: Float;              
    var targetY: Float;              
    
    
    var stepDuration: Int = 16;      
    var stepProgress: Float = 0;     
    
    var bufferedCommand: WalkCommand = None; 

    public function new(sprite: RPGSprite, world: RPGWorld) {
        this.sprite = sprite;
        this.world = world; 
        setController(new PlayerInputWalk());
        this.facing = sprite.behaviors.require(new FacingBehavior());
        this.animations = sprite.behaviors.require(new Animations(sprite));
        this.canWalkToPolicy = new BasicCanWalkPolicy(this);
        
        
        var rollInterval = RPGWorldFrameRoll.FRAME_ROLL_INTERVAL;
        stepDuration = Math.ceil(stepDuration / rollInterval) * rollInterval;
    }

    public override function onEvent(e:RPGBehaviorEvent) {
        switch e {
            case HostEntityAddedToMap: {
                tileSize = world.map.tileSize;
            }
            case HostEntityRemovedFromMap: {
                
                var walking = world.seek(Walking);
                if (walking != null) {
                    walking.releaseAllReservations(sprite);
                }
            }
            default:
        }
    }

    public function setController(controller: WalkController): Void {
        Log.trace('setting controller: ${controller}');
        this.controller = controller;
        this.controller.attach(this);
    }

    private function premove() {
        this.moved = this.canWalkToPolicy.canWalkTo(this.sprite, targetTileX, targetTileY);
    }

    
    private function canWalkToForContinuousMovement(x: Int, y: Int): Bool {
        var walking = world.seek(Walking);
        
        
        if (walking.isTileReserved(x, y, sprite)) {
            return false;
        }
        
        var canMove = this.controller.walkThroughWalls || world.seek(Collision).canMoveTo(sprite, x, y);
        
        if (!this.controller.ignoreEvents) {
            var req = walking.notify(sprite, x, y, EntityRequestedStep);
            if (req == Interrupt) {
                return false;
            }
        }
        
        return canMove;
    }

    

    
    private function onFrameRoll(): Void {
        var cmd = bufferedCommand != None ? bufferedCommand : this.controller.onFrame();
        bufferedCommand = None;
     
        if (!isMoving) {
            
            this.world = this.sprite.world;
            this.moved = false;
            
            if (cmd == WalkCommand.WalkUp) {
                facingDirection = FacingDirection.Up;
                targetTileX = sprite.loc.gridX;
                targetTileY = sprite.loc.gridY - 1;
                animations.setAnimation("walk_" + facingDirection.getName().toLowerCase());
                facing.dir = facingDirection;
                premove();
            } else if (cmd == WalkCommand.WalkDown) {
                facingDirection = FacingDirection.Down;
                targetTileX = sprite.loc.gridX;
                targetTileY = sprite.loc.gridY + 1;
                animations.setAnimation("walk_" + facingDirection.getName().toLowerCase());
                facing.dir = facingDirection;
                premove();
            } else if (cmd == WalkCommand.WalkLeft) {
                facingDirection = FacingDirection.Left;
                targetTileX = sprite.loc.gridX - 1;
                targetTileY = sprite.loc.gridY;
                animations.setAnimation("walk_" + facingDirection.getName().toLowerCase());
                facing.dir = facingDirection;
                premove();
            } else if (cmd == WalkCommand.WalkRight) {
                facingDirection = FacingDirection.Right;
                targetTileX = sprite.loc.gridX + 1;
                targetTileY = sprite.loc.gridY;
                animations.setAnimation("walk_" + facingDirection.getName().toLowerCase());
                facing.dir = facingDirection;
                premove();
            }
            else {
                animations.setAnimation("idle_" + facingDirection.getName().toLowerCase());
            }
            
            if (moved) {
                
                isMoving = true;
                stepProgress = 0;
                startX = sprite.x;
                startY = sprite.y;
                targetX = targetTileX * tileSize;
                targetY = targetTileY * tileSize;
            } else {
                stepProgress = 0;
                isMoving = false;
                cmd = None;
                bufferedCommand = None;
                
               
            }
        } else if (stepProgress >= 1.0) {
            
            
            
            var walking = world.seek(Walking);
            walking.releaseTile(sprite, sprite.loc.gridX, sprite.loc.gridY);

            sprite.setLocation(RPGLocation.onTile(sprite.world, targetTileX, targetTileY));
            
            controller.onStep();
            var interrupted = walking.notify(sprite, sprite.loc.gridX, sprite.loc.gridY, EntityStepped) == Interrupt;
            
            if (!interrupted) {
                
                var continueMoving = false;
                var nextTargetX = sprite.loc.gridX;
                var nextTargetY = sprite.loc.gridY;
                var nextDirection = facingDirection;

                cmd = this.controller.onFrame();
                
                if (cmd == WalkCommand.WalkUp) {
                    nextDirection = FacingDirection.Up;
                    nextTargetX = sprite.loc.gridX;
                    nextTargetY = sprite.loc.gridY - 1;
                    continueMoving = canWalkToForContinuousMovement(nextTargetX, nextTargetY);
                } else if (cmd == WalkCommand.WalkDown) {
                    nextDirection = FacingDirection.Down;
                    nextTargetX = sprite.loc.gridX;
                    nextTargetY = sprite.loc.gridY + 1;
                    continueMoving = canWalkToForContinuousMovement(nextTargetX, nextTargetY);
                } else if (cmd == WalkCommand.WalkLeft) {
                    nextDirection = FacingDirection.Left;
                    nextTargetX = sprite.loc.gridX - 1;
                    nextTargetY = sprite.loc.gridY;
                    continueMoving = canWalkToForContinuousMovement(nextTargetX, nextTargetY);
                } else if (cmd == WalkCommand.WalkRight) {
                    nextDirection = FacingDirection.Right;
                    nextTargetX = sprite.loc.gridX + 1;
                    nextTargetY = sprite.loc.gridY;
                    continueMoving = canWalkToForContinuousMovement(nextTargetX, nextTargetY);
                }

                if (continueMoving) {
                    
                    if (walking.reserveTile(sprite, nextTargetX, nextTargetY)) {
                        
                        facingDirection = nextDirection;
                        targetTileX = nextTargetX;
                        targetTileY = nextTargetY;
                        startX = sprite.x;
                        startY = sprite.y;
                        targetX = targetTileX * tileSize;
                        targetY = targetTileY * tileSize;
                        stepProgress = 0;
                        
                        animations.setAnimation("walk_" + facingDirection.getName().toLowerCase());
                        facing.dir = facingDirection;
                    } else {
                        
                        isMoving = false;
                        animations.setAnimation("idle_" + facingDirection.getName().toLowerCase());
                    }
                } else {
                    
                    isMoving = false;
                    animations.setAnimation("idle_" + facingDirection.getName().toLowerCase());
                }
            } else {
                
                isMoving = false;
                animations.setAnimation("idle_" + facingDirection.getName().toLowerCase());
            }
        }
    }

    
    public override function onFrame(dt: Float): Void {
        
        var frameRoll = world.seek(RPGWorldFrameRoll);
        
        
        if (frameRoll != null && frameRoll.isFrameRoll()) {
            onFrameRoll();
        }
        
        
        var currentCmd = this.controller.onFrame();
        if (currentCmd != None) {
            bufferedCommand = currentCmd;
        }
        
        
        if (isMoving) {
            Log.trace('isMoving: ${stepProgress} direction: ${facingDirection}');
            
            stepProgress += 1.0 / stepDuration;
            
            if (stepProgress >= 1.0) {
                
                stepProgress = 1.0;
                sprite.x = targetX;
                sprite.y = targetY;
            } else {
                
                sprite.x = startX + (targetX - startX) * stepProgress;
                sprite.y = startY + (targetY - startY) * stepProgress;
            }
        }
    }

    public function scope():RPGEntityBehaviorScope {
        return OnFrame;
    }

    public function getController(): WalkController {
        return this.controller;
    }
}