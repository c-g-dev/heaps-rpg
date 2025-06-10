package heaps.rpg.comp;

import heaps.coroutine.Coroutine;
import heaps.coroutine.CoroutineSystem;
import heaps.rpg.comp.RPGWorldComponent;

class RPGWorldRoutines {
    var routines: CoroutineSystem;
    var world: RPGWorld;

    public function new(world: RPGWorld) {
        routines = new CoroutineSystem();
        this.world = world;
        onAttached();
    }

    public function onAttached(): Void {
        if(routines == null) {
            routines = new CoroutineSystem();
        }
        StartCoroutine((dt) -> {
            routines.update(dt);
            return WaitNextFrame;
        });
    }
    public function onDetached(): Void {}

    public function add(routine: Coroutine): Void {
        routines.add(routine);
    }

    public function update(dt: Float): Void {
        routines.update(dt);
    }
}