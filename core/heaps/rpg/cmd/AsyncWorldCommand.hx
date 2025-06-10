package heaps.rpg.cmd;

import heaps.coroutine.Promise;

abstract class AsyncWorldCommand implements IWorldCommand {
    public var isAsync:Bool = true;
    abstract public function onExecuteAsync(world: RPGWorld): Promise;
    public function onExecute(world: RPGWorld): Void {
        
    }
} 