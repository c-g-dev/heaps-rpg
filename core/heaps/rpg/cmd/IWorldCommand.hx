package heaps.rpg.cmd;

import heaps.coroutine.Promise;

interface IWorldCommand {
    var isAsync: Bool;
    function onExecute(world: RPGWorld): Void;
    function onExecuteAsync(world: RPGWorld): Promise;
} 