package heaps.rpg.cmd;

import heaps.coroutine.Promise;
import heaps.rpg.comp.RPGWorldComponent;


private class WorldCommandProcedure {
    private var commands: Array<IWorldCommand>;
    private var currentIndex: Int;
    private var world: RPGWorld;
    private var onComplete: Void->Void;
    private var promise: Promise;
    private var isFulfilled: Bool;
    private var id: Int;

    public function new(world: RPGWorld, commands: Array<IWorldCommand>, onComplete: Void->Void, id: Int) {
        this.world = world;
        this.commands = commands;
        this.currentIndex = 0;
        this.onComplete = onComplete;
        this.promise = new Promise();
        this.isFulfilled = false;
        this.id = id;
    }

    public function executeNext(executor: WorldCommandExecutor): Promise {
        if (currentIndex >= commands.length) {
            if (onComplete != null) onComplete();
            promise.fulfill();
            isFulfilled = true;
            return promise;
        }

        
        if (!executor.isHighestPriority(this)) {
            return promise; 
        }

        var command = commands[currentIndex++];
        Log.trace('executing command ${command}');
        
        if (command.isAsync) {
            return command.onExecuteAsync(world).then(function(_) {
                
                if (executor.isHighestPriority(this)) {
                    return executeNext(executor);
                } else {
                    return promise; 
                }
            });
        } else {
            command.onExecute(world);
            
            if (executor.isHighestPriority(this)) {
                return executeNext(executor);
            } else {
                return promise; 
            }
        }
    }

    public function getPromise(): Promise {
        return promise;
    }

    public function isComplete(): Bool {
        return isFulfilled;
    }

    public function getId(): Int {
        return id;
    }
} 

class WorldCommandExecutor {
    private var procedureStack: Array<WorldCommandProcedure>;
    private var isExecuting: Bool;
    private var world: RPGWorld;
    private var nextProcedureId: Int;

    public function new(world: RPGWorld) {        
        this.world = world;
        procedureStack = [];
        isExecuting = false;
        nextProcedureId = 0;
    }

    public function run(commands: Array<IWorldCommand>, ?onComplete: Void->Void): Promise {
        Log.trace('[WorldCommandExecutor] running commands: ${commands}');
        var procedure = new WorldCommandProcedure(world, commands, onComplete, nextProcedureId++);
        procedureStack.push(procedure);
        
        if (!isExecuting) {
            isExecuting = true;
            executeNextProcedure();
        } else {
            
            
            executeNextProcedure();
        }
        
        return procedure.getPromise();
    }

    public function isHighestPriority(procedure: WorldCommandProcedure): Bool {
        if (procedureStack.length == 0) return false;
        var topProcedure = procedureStack[procedureStack.length - 1];
        return topProcedure.getId() == procedure.getId();
    }

    private function executeNextProcedure(): Void {
        Log.trace('[WorldCommandExecutor] executing next procedure: ${procedureStack}');
        if (procedureStack.length == 0) {
            isExecuting = false;
            return;
        }

        var currentProcedure = procedureStack[procedureStack.length - 1];
       
        currentProcedure.executeNext(this).then(function(_) {
            Log.trace('[WorldCommandExecutor] executing next procedure: ${currentProcedure}');
            if (currentProcedure.isComplete()) {
                procedureStack.pop();
            }
            executeNextProcedure();
        });
    }
} 