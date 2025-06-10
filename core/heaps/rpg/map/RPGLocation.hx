package heaps.rpg.map;

import heaps.rpg.runtime.RPGWorldRuntime.MapId;

class RPGLocation {
    var world: RPGWorld;
    public var gridX (default, default): Int;
    public var gridY (default, default): Int;
    public var map (default, default): MapId;
    public var layer (default, default): Int;


    public function new(world: RPGWorld) {
        this.world = world;
        this.gridX = 0;
        this.gridY = 0;
        this.map = MapId.none();
        this.layer = -1;
    }

    public function toString(): String {
        return '${map}:(${gridX},${gridY})@${layer}';
    }

    public function equals(other: RPGLocation): Bool {
        return this.gridX == other.gridX && this.gridY == other.gridY && this.map == other.map && this.layer == other.layer;
    }

    public static function onTile(world: RPGWorld, gridX: Int, gridY: Int, ?map: MapId, ?layer: Int): RPGLocation {
        var location = new RPGLocation(world);
        if(map == null) {
            map = world.map.id;
        }
        if(layer == null) {
            layer = -1;
        }
        location.gridX = gridX;
        location.gridY = gridY;
        location.map = map;
        location.layer = layer;
        return location;
    }
}