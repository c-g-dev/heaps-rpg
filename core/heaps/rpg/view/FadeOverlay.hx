package heaps.rpg.view;

import h2d.Graphics;
import heaps.coroutine.Coroutine;
import hxd.Window;

class FadeOverlay extends CameraOverlay {
    var world: RPGWorld;
    var graphics: Graphics;

    public function new(world: RPGWorld) {
        super();
        this.world = world;
        
        this.graphics = new Graphics(this);
        this.graphics.alpha = 0.0;
        onRender();
    }

    public function fadeOut(duration: Float): Coroutine {
        var startTime = 0.0;
        var elapsed = 0.0;
        
        return (dt: Float) -> {
            Log.trace('fadeOut: ${this.graphics.alpha}');
            if (startTime == 0.0) startTime = haxe.Timer.stamp();
            elapsed = haxe.Timer.stamp() - startTime;
            
            if (elapsed >= duration) {
                this.graphics.alpha = 1.0;
                return Stop;
            }
            
            this.graphics.alpha = Math.min(1.0, elapsed / duration);
            return WaitNextFrame;
        }
    }

    public function fadeIn(duration: Float): Coroutine {
        var startTime = 0.0;
        var elapsed = 0.0;

        return (dt: Float) -> {
            Log.trace('fadeIn: ${this.graphics.alpha}');
            if (startTime == 0.0) startTime = haxe.Timer.stamp();
            elapsed = haxe.Timer.stamp() - startTime;
            
            if (elapsed >= duration) {
                this.graphics.alpha = 0.0;
                return Stop;
            }
            
            this.graphics.alpha = Math.max(0.0, 1.0 - (elapsed / duration));
            return WaitNextFrame;
        }
    }

    public override function onRender() {

        this.graphics.clear();
        this.graphics.beginFill(0x000000);
        
        
        var window = Window.getInstance();
        this.graphics.drawRect(0, 0, window.width, window.height);
        this.graphics.endFill();
        
    }
} 