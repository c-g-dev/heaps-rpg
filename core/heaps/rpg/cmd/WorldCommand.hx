package heaps.rpg.cmd;

import heaps.rpg.RPGWorld;
import heaps.coroutine.Promise;

abstract class WorldCommand implements IWorldCommand {
    public var isAsync:Bool = false;
    abstract public function onExecute(world: RPGWorld): Void;
    public function onExecuteAsync(world: RPGWorld): Promise {
        return Promise.resolve();
    }
}