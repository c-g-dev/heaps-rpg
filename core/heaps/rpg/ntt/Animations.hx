package heaps.rpg.ntt;

import heaps.rpg.ntt.RPGEntityBehavior.RPGEntityBehaviorScope;

typedef AnimConfig = {
    var name: String;
    var frames: Array<h2d.Tile>;
    var speed: Float;
    var loop: Bool;
    var onComplete: () -> Bool; 
}

class Animations extends RPGEntityBehavior {
    var allAnimations: Map<String, AnimConfig> = [];
    var currentAnimation: String;
    var anim: h2d.Anim;

    public function setAnimation(animation: String, ?configArg: {?speed: Float, ?loop: Bool, ?onComplete: () -> Bool}): Void {
      
        if(currentAnimation == animation){
            return;
        }
        currentAnimation = animation;
        var config = allAnimations.get(currentAnimation);
        if(configArg != null){
            if(configArg.speed == null){
                configArg.speed = 7;
            }
            if(configArg.loop == null){
                configArg.loop = true;
            }
            anim.speed = configArg.speed;
            anim.loop = configArg.loop;
            if(configArg.onComplete != null) {
                config.onComplete = configArg.onComplete;
            }
        }
        else{
            anim.speed = config.speed;
            anim.loop = config.loop;
        }
        
        
        
        if (config.onComplete != null) {
            Log.trace('setting onComplete for ${currentAnimation}');
            anim.onAnimEnd = () -> {
                Log.trace('animation ${currentAnimation} complete ${config.onComplete}');
                var shouldKeepCallback = configArg.onComplete();
                if (!shouldKeepCallback) {
                    config.onComplete = null;
                }
            };
        } else {
            anim.onAnimEnd = () -> {};
        }
        anim.play(config.frames);
    }

    public function new(anim: h2d.Anim) {
        this.anim = anim;
    }

    public function add(animation: String, configArg: {?frames: Array<h2d.Tile>, ?speed: Float, ?loop: Bool, ?onComplete: () -> Bool}): Void {
        var config: AnimConfig = {
            name: animation,
            frames: [],
            speed: 7.,
            loop: true,
            onComplete: null
        };
        if(configArg.frames != null){
            if(configArg.frames.length == 1){
                config.frames = [configArg.frames[0], configArg.frames[0]];
            }
            else{
                config.frames = configArg.frames;
            }
        }
        if(configArg.speed != null){
            config.speed = configArg.speed;
        }
        if(configArg.loop != null){
            config.loop = configArg.loop;
        }
        if(configArg.onComplete != null){
            config.onComplete = configArg.onComplete;
        }
        allAnimations.set(animation, config);
    }

    public function scope(): RPGEntityBehaviorScope {
        return Virtual;
    }
}
