package heaps.rpg.walk;

import heaps.rpg.walk.Facing.FacingDirection;
import heaps.rpg.ntt.RPGEntityBehavior;


class FacingBehavior extends RPGEntityBehavior {
    
    public var dir: FacingDirection = FacingDirection.Down;

    public function new() {
        
    }

    public function scope():RPGEntityBehaviorScope {
        return Virtual;
    }
}