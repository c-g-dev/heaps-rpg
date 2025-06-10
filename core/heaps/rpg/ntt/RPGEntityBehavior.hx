package heaps.rpg.ntt;

import ludi.commons.TypeCode;

class RPGEntityBehaviors {
    var allBehaviors: Map<String, RPGEntityBehavior> = [];
    var frameBehaviors: Array<RPGEntityBehavior> = [];
    var entity: RPGEntity;
    
    public function new(entity: RPGEntity) {
        this.entity = entity;
    }

    public function add(behavior: RPGEntityBehavior): Void {
        if(!allBehaviors.exists(behavior.typecode)){
            allBehaviors.set(behavior.typecode, behavior);
            if(behavior.scope() == RPGEntityBehaviorScope.OnFrame){
                frameBehaviors.push(behavior);
            }
            behavior.attach(entity);
        }
    }

    public function update(dt: Float): Void {
        for(behavior in frameBehaviors){
            behavior.onFrame(dt);
        }
    }

    public function get<T>(tc: Class<T>): T {
        return cast allBehaviors.get(new TypeCode(tc));
    }

    public function require<T: RPGEntityBehavior>(behavior: T): T {
        if(!allBehaviors.exists(behavior.typecode)){
            allBehaviors.set(behavior.typecode, behavior);
        }
        return cast allBehaviors.get(behavior.typecode);
    }

    public function onEvent(e: RPGBehaviorEvent): Void {
        for (behavior in allBehaviors) {
            @:privateAccess behavior.onEvent(e);
        }
    };
}

abstract class RPGEntityBehavior implements InjectTypeCode {
    public var entity: RPGEntity;
    
    public function attach(entity: RPGEntity): Void {
        this.entity = entity;
        this.onEvent(RPGBehaviorEvent.Attached);
    }

    public abstract function scope(): RPGEntityBehaviorScope;

    public function detach(): Void {
        this.onEvent(RPGBehaviorEvent.Detached);
    }

    public function onFrame(dt: Float): Void {};
    function onEvent(e: RPGBehaviorEvent): Void {};
}

enum RPGBehaviorEvent {
    Attached;
    Detached;
    HostEntityAddedToMap;
    HostEntityRemovedFromMap;
}

enum RPGEntityBehaviorScope {
    Virtual;
    OnFrame;
}