package heaps.rpg.ntt;

import heaps.rpg.ntt.RPGEntityBehavior.RPGEntityBehaviors;
import heaps.rpg.ntt.RPGEntityBehavior.RPGBehaviorEvent;
import h2d.RenderContext;
import h2d.Anim;
import ludi.commons.UUID;
import ludi.commons.collections.Set;
import heaps.rpg.map.RPGLocation;
import heaps.rpg.util.Manifest;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;

enum RPGEntityEvent<T = Dynamic> {
    EntityAddedToMap: RPGEntityEvent<{entity: RPGEntity}>;
    EntityRemovedFromMap: RPGEntityEvent<{entity: RPGEntity}>;
}

@:using(heaps.rpg.ntt.RPGEntityExtensions)
interface RPGEntity {
    public var uuid (default, null):String;
	public var loc (default, null): RPGLocation;
    public var tags (default, null): Set<String>;
    public var world (default, null): RPGWorld;
    public var behaviors (default, null): RPGEntityBehaviors;
    public function manifest(): Manifest<h2d.Object, Dynamic>;
    public function addToWorld(loc: RPGLocation): Void;
    public function removeFromWorld(loc: RPGLocation): Void;
    public function setLocation(loc: RPGLocation): Void;
    public function onEvent(e:RPGEntityEvent): Void;
}

class BasicVirtualEntity implements RPGEntity {
    public var uuid(default, null):String;
    public var loc(default, null): RPGLocation;
    public var tags(default, null): Set<String>;
    public var world(default, null): RPGWorld;
    public var behaviors(default, null): RPGEntityBehaviors;

    public function new(world: RPGWorld) {
        this.world = world;
        this.uuid = UUID.generate();
        this.tags = new Set<String>();
        this.behaviors = new RPGEntityBehaviors(this);
        this.loc = null;
    }

    public function manifest(): Manifest<h2d.Object, Dynamic> {
        return Virtual(this);
    }

    public function addToWorld(loc: RPGLocation): Void {
        this.loc = loc;
        behaviors.onEvent(RPGBehaviorEvent.HostEntityAddedToMap);
    }

    public function removeFromWorld(loc: RPGLocation): Void {
        this.loc = null;
        behaviors.onEvent(RPGBehaviorEvent.HostEntityRemovedFromMap);
    }

    public function setLocation(loc: RPGLocation): Void {
        this.loc = loc;
    }
    
    public function onEvent(e:RPGEntityEvent): Void {
        switch e {
            case EntityAddedToMap: behaviors.onEvent(HostEntityAddedToMap);
            case EntityRemovedFromMap: behaviors.onEvent(HostEntityRemovedFromMap);
        }
    }
}

typedef RPGPhysicalEntity<T: (RPGEntity & h2d.Object) = RPGSprite> = T;

class RPGSprite extends Anim implements RPGEntity {
    public var uuid(default, null):String;
    public var loc(default, null): RPGLocation;
    public var tags(default, null): Set<String>;
    public var world(default, null): RPGWorld;
    public var behaviors(default, null): RPGEntityBehaviors;

    public function new(world: RPGWorld, uuid: String) {
        super();
        this.world = world;
        this.uuid = uuid;
        this.tags = new Set<String>();
        this.behaviors = new RPGEntityBehaviors(this);
        this.loc = null;
    }

    public override function sync(ctx: RenderContext): Void {
        super.sync(ctx);
        behaviors.update(hxd.Timer.dt);
    }

    public function addToWorld(loc: RPGLocation): Void {
        setLocation(loc);
        world.map.getDefaultEntityLayer().addEntity(this);
        behaviors.onEvent(RPGBehaviorEvent.HostEntityAddedToMap);
    }

    public function removeFromWorld(loc: RPGLocation): Void {
        this.loc = null;
        behaviors.onEvent(RPGBehaviorEvent.HostEntityRemovedFromMap);
    }

    public function setLocation(loc: RPGLocation): Void {
        this.loc = loc;
        this.x = loc.gridX * world.map.tileSize;
        this.y = loc.gridY * world.map.tileSize;
    }

    public function onEvent(e:RPGEntityEvent): Void {
        switch e {
            case EntityAddedToMap: behaviors.onEvent(HostEntityAddedToMap);
            case EntityRemovedFromMap: behaviors.onEvent(HostEntityRemovedFromMap);
        }
    }

    public function manifest(): Manifest<h2d.Object, Dynamic> {
        return Sprite(this);
    } 
}


class TempSprite extends RPGSprite {
    public function new(world: RPGWorld, obj: h2d.Object) {
        super(world, UUID.generate());
        this.addChild(obj);
    }
}
