package heaps.rpg.cmd;

import heaps.coroutine.Promise;

class InlineWorldCommand extends AsyncWorldCommand {
    private var callback: RPGWorld->Promise;

    public function new(callback: RPGWorld->Promise) {
        this.callback = callback;
    }

    public function onExecuteAsync(world: RPGWorld): Promise {
        return callback(world);
    }
} 