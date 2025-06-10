package heaps.rpg.interact;

import heaps.rpg.RPGWorld;
import heaps.rpg.ctrl.RPGControls;
import heaps.coroutine.Coroutine;

class InteractRoutine {
    
    public static function create(world: RPGWorld): Coroutine {
        var interactController = RPGControls.get();
        return (dt) -> {
            if (interactController.isPressed(Action)) {
                Interactions.check(world);
            }
            return WaitNextFrame;
        }
    }

}
