package heaps.rpg.walk;

import heaps.rpg.ntt.RPGEntity;

abstract class CanWalkToPolicy {
    var wb: WalkingBehavior;

    public function new(wb: WalkingBehavior) {
        this.wb = wb;
    }

    public abstract function canWalkTo(ntt: RPGEntity, x: Int, y: Int): Bool;

}