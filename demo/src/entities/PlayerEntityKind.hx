package entities;

import heaps.rpg.rom.ROMData.RPGEntityKind;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import heaps.rpg.walk.Walking;
import heaps.rpg.walk.Walking.WalkingSpritesheet;
import hxd.res.Loader;

class PlayerEntityKind extends RPGEntityKind {
    public function new() {
        super("player");
    }
    
    public function load(req: RPGEntityLoadRequest): RPGEntity {
        return createPlayerSprite(req.world, req.instanceData);
    }
    
    private function createPlayerSprite(world: heaps.rpg.RPGWorld, data: heaps.rpg.rom.ROMData.RPGEntityInstanceData): RPGSprite {
        var ws = new WalkingSpritesheet(hxd.Res.spritesheet.toTile(), (a) -> {
            switch(a) {
                case walk_up: {
                    return [{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 4, y: 0} ];
                }
                case walk_down: {
                    
                    return [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 1, y: 0} ];
                }
                case walk_left: {
                    
                    return [{x: 6, y: 0},{x: 7, y: 0},{x: 8, y: 0},{x: 7, y: 0} ];
                }
                case walk_right: {
                    
                    return [{x: 9, y: 0},{x: 10, y: 0},{x: 11, y: 0},{x: 10, y: 0} ];
                }
                case idle_up: {
                    
                    return [{x: 4, y: 0}];
                }
                case idle_down: {
                    
                    return [{x: 1, y: 0}];
                }
                case idle_left: {
                    
                    return [{x: 7, y: 0}];
                }
                case idle_right: {
                    
                    return [{x: 10, y: 0}];
                }
            }
        });
        ws.cols = 12;
        ws.rows = 1;
        ws.offsetX = 0;
        ws.offsetY = 0;
        ws.paddingX = 0;
        ws.paddingY = 0;
        var sprite = new RPGSprite(world, data.instanceUUID);
        
        Walking.inject(sprite, ws);
        sprite.tags.push("solid");
        sprite.tags.push("player");

        world.viewport.follow(sprite);
        heaps.rpg.player.Player.set(sprite);

        return sprite;
    }
} 