package heaps.rpg.warp;

import heaps.coroutine.Promise;
import heaps.rpg.RPGWorld;
import heaps.rpg.ctrl.RPGControls;
import heaps.rpg.warp.Warp.IWarpType;


class DefaultWarpType implements IWarpType {
    public function new() {}
    
    public function beforeExit(world: RPGWorld, warp: Warp): Promise {
        
        return new Promise((resolve) -> {
            Log.trace('[DefaultWarpType] beforeExit - Locking controls');
            RPGControls.lock();
            resolve(null);
        });
    }
    
    public function afterExit(world: RPGWorld, warp: Warp): Promise {
        
        return Promise.resolve();
    }
    
    public function beforeShow(world: RPGWorld, warp: Warp): Promise {
        
        return Promise.resolve();
    }
    
    public function afterShow(world: RPGWorld, warp: Warp): Promise {
        
        return new Promise((resolve) -> {
            Log.trace('[DefaultWarpType] afterShow - Releasing controls');
            RPGControls.release();
            resolve(null);
        });
    }
} 