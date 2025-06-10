package heaps.rpg.walk;

import heaps.rpg.ctrl.RPGControls;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import hxd.Key;

enum WalkCommand {
    WalkLeft;
    WalkRight;
    WalkUp;
    WalkDown;
    FaceLeft;
    FaceRight;
    FaceUp;
    FaceDown;
    None;
}

@:forward
abstract WalkPath(Array<WalkCommand>) {
    public function new() {
        this = [];
    }

    public function route(startX: Int, startY: Int, endX: Int, endY: Int): WalkPath {
        var diffX = endX - startX;
        var diffY = endY - startY;
        if(diffX > 0){
            right(diffX);
        } else if(diffX < 0){
            left(Std.int(Math.abs(diffX)));
        }
        if(diffY > 0){
            down(diffY);
        } else if(diffY < 0){
            up(Std.int(Math.abs(diffY)));
        }
        return abstract;
    }

    public function get(idx: Int): WalkCommand {
        return this[idx];
    }

    public function down(?amt: Int): WalkPath {
        if(amt == null || amt < 1)
        {
            this.push(FaceDown);
            return abstract;
        }
        for (_ in 0...amt) {
            this.push(WalkDown);
        }
        return abstract;
    }

    public function up(?amt: Int): WalkPath {
        if(amt == null || amt < 1)
        {
            this.push(FaceUp);
            return abstract;
        }
        for (_ in 0...amt) {
            this.push(WalkUp);
        }
        return abstract;
    }

    public function left(?amt: Int): WalkPath {
        if(amt == null || amt < 1)
        {
            this.push(FaceLeft);
            return abstract;
        }
        for (_ in 0...amt) {
            this.push(WalkLeft);
        }
        return abstract;
    }

    public function right(?amt: Int): WalkPath {
        if(amt == null || amt < 1)
        {
            this.push(FaceRight);
            return abstract;
        }
        for (_ in 0...amt) {
            this.push(WalkRight);
        }
        return abstract;
    }
}

@:forward
abstract IterableWalkPath({pathStepIdx: Int, path: WalkPath}) {
    public function new(path: WalkPath) {
        this = {pathStepIdx: 0, path: path};
    }

    public function getCurrent(): WalkCommand {
        if (this.pathStepIdx >= this.path.length) {
            return None;
        }
        return this.path.get(this.pathStepIdx);
    }

    public function isComplete(): Bool {
        return this.pathStepIdx >= this.path.length;
    }

    public function complete(): Void {
        this.pathStepIdx = this.path.length;
    }

    public function previous(): WalkCommand {
        if(this.pathStepIdx == 0){
            return None;
        }
        return this.path.get(this.pathStepIdx - 1);
    }

    public function advance(): Bool {
        Log.trace('advance: ${this.pathStepIdx} <= ${this.path.length}');
        if (this.pathStepIdx < this.path.length) {
            this.pathStepIdx++;
            return true;
        }
        return false;
    }

    public function reset(): Void {
        this.pathStepIdx = 0;
    }
}

abstract class WalkController {
    var walkBehavior: WalkingBehavior;
    public var walkThroughWalls: Bool = false;
    public var ignoreEvents: Bool = false;

    public function attach(behavior: WalkingBehavior): Void {
        this.walkBehavior = behavior;
    }
    public abstract function onFrame(): WalkCommand;
    public function onStep(): Void {}
}

class DoNotWalk extends WalkController {

    public function new() {}
    
    public function onFrame(): WalkCommand {
        return WalkCommand.None;
    }
}

class PlayerInputWalk extends WalkController {
    var ctrl: RPGControls;

    public function new() {
        ctrl = RPGControls.get();
    }


    public function onFrame(): WalkCommand {
        if (ctrl.isDown(MoveUp)) {
            return WalkCommand.WalkUp;
        } else if (ctrl.isDown(MoveDown)) {
            return WalkCommand.WalkDown;
        } else if (ctrl.isDown(MoveLeft)) {
            return WalkCommand.WalkLeft;
        } else if (ctrl.isDown(MoveRight)) {
            return WalkCommand.WalkRight;
        }
        return WalkCommand.None;
    }
}


class ProgrammaticWalk extends WalkController {
    var currentPath: IterableWalkPath;
    var onComplete: () -> Void;
    public var paused: Bool = false;

    public function new() {
        walkThroughWalls = false;
        ignoreEvents = true;
    }

    public function walk(path: WalkPath, ?onComplete: () -> Void): Void {
        Log.trace('walking: ${path}');
        this.currentPath = new IterableWalkPath(path);
        this.onComplete = onComplete;
    }

    public function forceComplete(): Void {
        currentPath.complete();
        if(onComplete != null){
            onComplete();
        }
    }

    public function onFrame(): WalkCommand {
        if(paused){
            return WalkCommand.None;
        }
        var cur = currentPath.getCurrent();
        if(cur == None || cur == FaceDown || cur == FaceUp || cur == FaceLeft || cur == FaceRight){
            currentPath.advance();
        }
        return cur;
    }

    public override function onStep(): Void {
        currentPath.advance();
        if(currentPath.isComplete()){
            if(onComplete != null){
                onComplete();
            }
        }
    }

}

