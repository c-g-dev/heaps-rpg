package heaps.rpg.interact;

import heaps.rpg.ntt.RPGEntityBehavior;
import heaps.rpg.ntt.RPGEntity;

class OnInteractBehavior extends RPGEntityBehavior {
    private var onInteractCallback: (RPGEntity) -> Void;

    public function new(?onInteract: (RPGEntity) -> Void) {
        this.onInteractCallback = onInteract != null ? onInteract : (RPGEntity) -> {};
    }

    public override function onEvent(e: RPGBehaviorEvent): Void {
        switch e {
            case HostEntityAddedToMap: {
                entity.tags.push("interactable");
            }
            case HostEntityRemovedFromMap: {
            }
            default:
        }
    }

    public function onInteract(): Void {
        onInteractCallback(entity);
    }

    public function scope(): RPGEntityBehaviorScope {
        return Virtual;
    }
}