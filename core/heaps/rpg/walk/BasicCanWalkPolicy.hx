package heaps.rpg.walk;

import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import heaps.rpg.walk.Walking.WalkingEventResult;
import heaps.rpg.walk.WalkingController;

class BasicCanWalkPolicy extends CanWalkToPolicy {
    public function new(wb: WalkingBehavior) {
        super(wb);
    }

    public function canWalkTo(ntt: RPGEntity, x: Int, y: Int): Bool {
        var sprite = cast(ntt, RPGSprite);
        var walking = ntt.world.seek(Walking);
        var controller = this.wb.getController();
        
        
        if (walking.isTileReserved(x, y, sprite)) {
            return false;
        }
        
        var canMove = controller.walkThroughWalls || ntt.world.seek(Collision).canMoveTo(sprite, x, y);
        
        if (!controller.ignoreEvents) {
            var req = walking.notify(sprite, x, y, EntityRequestedStep);
            Log.trace('[BasicCanWalkPolicy] requested step: ${req}');
            if (req == Interrupt) {
                return false;
            }
        }

        if (canMove) {
            
            if (walking.reserveTile(sprite, x, y)) {
                return true;
            }
        }
        
        return false;
    }
}
