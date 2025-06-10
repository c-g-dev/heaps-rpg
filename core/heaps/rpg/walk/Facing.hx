package heaps.rpg.walk;

import haxe.ds.Option;
import heaps.rpg.ntt.RPGEntity;

enum FacingDirection {
    Up;
    Down;
    Left;
    Right;
}


class Facing {

    public static function dir(ntt: RPGEntity): Option<FacingDirection> {
        var wb = ntt.behaviors.get(FacingBehavior);
        if(wb == null) {
            return None;
        }
        return Some(wb.dir);
    }

    public static function facingTile(ntt: RPGEntity): Option<{x: Int, y: Int}> {
        switch(dir(ntt)){
            case Some(FacingDirection.Up):
                return Some({x: ntt.loc.gridX, y: ntt.loc.gridY - 1});
            case Some(FacingDirection.Down):
                return Some({x: ntt.loc.gridX, y: ntt.loc.gridY + 1});
            case Some(FacingDirection.Left):
                return Some({x: ntt.loc.gridX - 1, y: ntt.loc.gridY});
            case Some(FacingDirection.Right):
                return Some({x: ntt.loc.gridX + 1, y: ntt.loc.gridY});
            default:
                return None;
        }
    }
}