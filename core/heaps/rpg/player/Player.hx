package heaps.rpg.player;

import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.comp.RPGWorldComponent;

class Player extends RPGWorldComponent {
    public static var instance: Player;
    var player: RPGEntity;

    public static function set(ntt: RPGEntity): Void {
        instance = ntt.world.seek(Player);
        if(instance.player != null) {
            instance.player.tags.remove("player");
        }
        instance.player = ntt;
        instance.player.tags.push("player");
    }

    public static function get(): RPGEntity {
        return instance.player;
    }

    public function onAttached(): Void {}
    public function onDetached(): Void {}
}