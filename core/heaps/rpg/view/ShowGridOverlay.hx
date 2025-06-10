package heaps.rpg.view;

import h2d.Graphics;

class ShowGridOverlay extends MapOverlay {
    var gridDisplay: Graphics;

    public function new(world: RPGWorld) {
        super();
        this.gridDisplay = new h2d.Graphics();
        var tilesize = world.map.tileSize;
        @:privateAccess var gWidth = world.map.mapData.gridWidth;
        @:privateAccess var gHeight = world.map.mapData.gridHeight;

        this.gridDisplay.lineStyle(1, 0xFF0000);
        for(y in 0...gHeight) {
            this.gridDisplay.moveTo(0, y * tilesize);
            this.gridDisplay.lineTo(gWidth * tilesize, y * tilesize);
        }
        for(x in 0...gWidth) {
            this.gridDisplay.moveTo(x * tilesize, 0);
            this.gridDisplay.lineTo(x * tilesize, gHeight * tilesize);
        }
        this.addChild(this.gridDisplay);
    }
}