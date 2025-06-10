package heaps.rpg.walk;

import heaps.rpg.map.RPGWorld_SetMap.SetMapEvents;
import heaps.rpg.walk.WalkingBehavior.WalkingEvent;
import ludi.commons.UUID;
import heaps.rpg.ntt.RPGEntity;
import ludi.commons.collections.GridMap;
import heaps.rpg.ntt.Animations;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import haxe.EnumTools;
import heaps.rpg.comp.RPGWorldComponent;

@:forward
abstract Spritesheet({
    baseTile: h2d.Tile,
    cols: Int,
    rows: Int,
    offsetX: Int,
    offsetY: Int,
    paddingX: Int,
    paddingY: Int,
    cuts: Map<String, Array<{x: Int, y: Int}>>
}) {
    public function new(baseTile: h2d.Tile) {
        this = {
            baseTile: baseTile,
            cols: 1,
            rows: 1,
            offsetX: 0,
            offsetY: 0,
            paddingX: 0,
            paddingY: 0,
            cuts: new Map<String, Array<{x: Int, y: Int}>>()
        }
    }

    public function push(name: String, x: Int, y: Int): Void {
        if (!this.cuts.exists(name)) {
            this.cuts.set(name, []);
        }
        this.cuts.get(name).push({ x: x, y: y });
    }

    public function toAnims(): Map<String, Array<h2d.Tile>> {
        var anims = new Map<String, Array<h2d.Tile>>();
        
        var tileWidth = this.baseTile.width / this.cols;
        var tileHeight = this.baseTile.height / this.rows;
        
        for (name => positions in this.cuts) {
            var tiles: Array<h2d.Tile> = [];
            for (pos in positions) {
                var px = this.offsetX + pos.x * (tileWidth + this.paddingX);
                var py = this.offsetY + pos.y * (tileHeight + this.paddingY);
                
                var tile = this.baseTile.sub(
                    px, 
                    py, 
                    tileWidth, 
                    tileHeight
                );
                tiles.push(tile);
            }
            anims.set(name, tiles);
        }
        
        return anims;
    }
}

enum WalkingAnimations {
    walk_up;
    walk_down;
    walk_left;
    walk_right;
    idle_up;
    idle_down;
    idle_left;
    idle_right;
}

@:forward
abstract WalkingSpritesheet(Spritesheet) {
    public function new(baseTile: h2d.Tile, cb: WalkingAnimations -> Array<{x: Int, y: Int}>) {
        this = new Spritesheet(baseTile);
        for (animationType in EnumTools.createAll(WalkingAnimations)) {
            var poscol = cb(animationType);
            for(pos in poscol){
                this.push(animationType.getName(), pos.x, pos.y);
            }
        }
    }
}


enum WalkingEventOption {
    Interrupt;
    OnlyPlayer;
}

enum WalkingEventResult {
    Continue;
    Interrupt;
}

typedef WalkingEventRegistration = {uuid: String, e: WalkingEvent<Dynamic>, cb: () -> Void, options: Array<WalkingEventOption>};

class Walking extends RPGWorldComponent {
    var events: GridMap<Array<WalkingEventRegistration>> = new GridMap();
    var reservedTiles: GridMap<RPGSprite> = new GridMap(); 
	

	public static function inject(sprite: RPGSprite, spritesheet: WalkingSpritesheet): Void {
        sprite.behaviors.add(new WalkingBehavior(sprite, sprite.world));
        for(k => v in spritesheet.toAnims()){
            for (tile in v) {
                tile.dy = -8;
            }
            sprite.behaviors.require(new Animations(sprite)).add(k, {frames: v});
        }
    }

    public function onAttached(): Void {
        if(events == null){
            events = new GridMap();
        }
        if(reservedTiles == null){
            reservedTiles = new GridMap();
        }
        this.world.events.of(SetMapEvents.MapUnloaded).on((_) -> {
            events.clear();
            reservedTiles.clear();
        });
    }

    public function onDetached(): Void {
        
    }

    
    public function reserveTile(entity: RPGSprite, tileX: Int, tileY: Int): Bool {
        var currentReservation = reservedTiles.get(tileX, tileY);
        
        
        if (currentReservation != null && currentReservation != entity) {
            return false;
        }
        
        
        reservedTiles.add(tileX, tileY, entity);
        return true;
    }
    
    
    public function releaseTile(entity: RPGSprite, tileX: Int, tileY: Int): Void {
        var currentReservation = reservedTiles.get(tileX, tileY);
        
        
        if (currentReservation == entity) {
            reservedTiles.remove(tileX, tileY);
        }
    }
    
    
    public function isTileReserved(tileX: Int, tileY: Int, ?excludeEntity: RPGSprite): Bool {
        var reservation = reservedTiles.get(tileX, tileY);
        return reservation != null && reservation != excludeEntity;
    }

    
    public function releaseAllReservations(entity: RPGSprite): Void {
        var tilesToRelease: Array<{x: Int, y: Int}> = [];
        
        
        reservedTiles.forEach((x, y, reservedEntity) -> {
            if (reservedEntity == entity) {
                tilesToRelease.push({x: x, y: y});
            }
        });
        
        
        for (tile in tilesToRelease) {
            reservedTiles.remove(tile.x, tile.y);
        }
    }

    
    public function addEventAtPosition(atX: Int, atY: Int, e: WalkingEvent<Dynamic>, cb: () -> Void, options: Array<WalkingEventOption>): String {
        Log.trace('addEventAtPosition: ${atX}, ${atY}, ${e}');
        var uuid = UUID.generate();
        var registration: WalkingEventRegistration = {
            uuid: uuid,
            e: e,
            cb: cb,
            options: options
        };

        
        var eventList = events.get(atX, atY);
        if (eventList == null) {
            eventList = [];
            events.add(atX, atY, eventList);
        }
        eventList.push(registration);

        return uuid;
    }

    public function remove(uuid: String): Void {
        events.forEach((x, y, v) -> {
            for (registration in v) {
                if (registration.uuid == uuid) {
                    
                    v.remove(registration);
                    break;
                }
            }
        });
    }

    
    public function notify(ntt: RPGEntity, atX: Int, atY: Int, e: WalkingEvent<Dynamic>): WalkingEventResult {
        Log.trace('notify: ${atX}, ${atY}, ${e}');
        if(events == null){
            events = new GridMap();
        }
        
        var eventList = events.get(atX, atY);
     
        if (eventList == null) {
            Log.trace('no events registered at ${atX}, ${atY}');
            return Continue; 
        }

        var result = Continue;
        for (registration in eventList) {
            if (registration.e == e) {
                
                
               
               

                
                registration.cb();

                
                if (registration.options.contains(Interrupt)) {
                    result = Interrupt; 
                }
            }
        }

        return result;
    }
}

