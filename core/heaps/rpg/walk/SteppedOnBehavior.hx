package heaps.rpg.walk;

import heaps.rpg.ntt.RPGEntityBehavior;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.walk.Walking;


class SteppedOnBehavior extends RPGEntityBehavior {

    var ticket: String;
    var cb: RPGEntity -> Void;

    public function new(cb: (stepper: RPGEntity) -> Void) {
        this.cb = cb;
    }

    public function scope():RPGEntityBehaviorScope {
        return Virtual;
    }

    public override function onEvent(e:RPGBehaviorEvent):Void {
        switch e {
            case HostEntityAddedToMap: {
                Log.trace('Stepped on behavior added: ${entity.loc.gridX}, ${entity.loc.gridY}');
                ticket = entity.world.seek(Walking).addEventAtPosition(entity.loc.gridX, entity.loc.gridY, EntityStepped, () -> {
                    Log.trace('Stepped on behavior: ${entity.loc.gridX}, ${entity.loc.gridY}');
                    cb(entity);
                }, [Interrupt]);
            }
            case HostEntityRemovedFromMap: {
                entity.world.seek(Walking).remove(ticket);
            }
            default:
        }
    }
}