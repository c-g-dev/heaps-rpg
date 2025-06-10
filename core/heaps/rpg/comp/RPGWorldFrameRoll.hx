package heaps.rpg.comp;

import heaps.coroutine.Coroutine;
import heaps.rpg.comp.RPGWorldComponent;

typedef CoroutineWithUUID = {
    coroutine: Coroutine,
    uuid: String
}

class RPGWorldFrameRoll extends RPGWorldComponent {
    public static var FRAME_ROLL_INTERVAL: Int = 8;
    
    var coroutines: Array<CoroutineWithUUID> = [];

    public function new() {
        
    }

    public function add(coroutine: Coroutine): Void {
        var uuid = ludi.commons.UUID.generate();
        coroutines.push({
            coroutine: coroutine,
            uuid: uuid
        });
    }

    public function update(dt: Float): Void {
        if (isFrameRoll()) {
            for (coroutine in coroutines) {
                coroutine.coroutine(dt);
            }
        }
    }
    
    public function getFrameCount(): Int {
        return hxd.Timer.frameCount;
    }
    
    public function isFrameRoll(): Bool {
        return hxd.Timer.frameCount % FRAME_ROLL_INTERVAL == 0;
    }
    
    public function onAttached(): Void {}
    public function onDetached(): Void {}
}