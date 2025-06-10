package heaps.rpg.interact;

import heaps.rpg.player.Player;
import heaps.rpg.walk.Facing;
import heaps.rpg.RPGWorld;
import haxe.ds.Option;
import heaps.rpg.interact.OnInteractBehavior;

class Interactions {
    public static function check(world: RPGWorld): Void {
        var player = Player.get();
        Log.trace("Facing.facingTile(player): " + Facing.facingTile(player));
        switch (Facing.facingTile(player)) {
            case Some(tile):
                switch(world.entities.getFirstEntityAt(tile.x, tile.y)) {
                    case Some(ntt): {
                        Log.trace("ntt: " + ntt);
                        if(ntt != null && ntt.tags.exists("interactable")) {
                            var interactable = ntt.behaviors.get(OnInteractBehavior);
                            Log.trace("interactable: " + interactable);
                            if(interactable != null) {
                                interactable.onInteract();
                            }
                        }
                    }
                    default:
                }
            case None: {
                Log.trace('No tile to interact with');
            }
        }
    }
}