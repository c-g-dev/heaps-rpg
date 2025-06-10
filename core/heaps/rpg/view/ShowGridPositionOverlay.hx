package heaps.rpg.view;

import heaps.rpg.RPGWorld;
import h2d.Text;
import h2d.Font;
import h2d.RenderContext;
import heaps.rpg.player.Player;


typedef ShowGridPositionOverlayCache = {
    var lastX: Int;
    var lastY: Int;
    var didInit: Bool;
}

class ShowGridPositionOverlay extends CameraOverlay {
    var world: RPGWorld;
    var text: Text;
    var cache: ShowGridPositionOverlayCache;

    public function new(world: RPGWorld) {
        super();
        this.world = world;
        
        
        var font = hxd.res.DefaultFont.get();
        text = new Text(font, this);
        text.scaleX = 4;
        text.scaleY = 4;
        text.textColor = 0xFFFFFF; 
        text.filter = new h2d.filter.Glow(0x000000, 1, 1, 1);
        
        text.x = 10; 
        text.y = world.viewport.height - 70; 
        this.cache = {
            lastX: 0,
            lastY: 0,
            didInit: false
        }
    }

    override function sync(ctx: RenderContext) {
        super.sync(ctx);

        
        
        var player = Player.get();
        if (player != null) {
            if (!this.cache.didInit) {
                this.cache.didInit = true;
                this.cache.lastX = player.loc.gridX;
                this.cache.lastY = player.loc.gridY;
                text.y = world.viewport.height - 70; 
            }
            if (this.cache.lastX != player.loc.gridX || this.cache.lastY != player.loc.gridY) {
                text.text = '(${player.loc.gridX}, ${player.loc.gridY})';
                this.cache.lastX = player.loc.gridX;
                this.cache.lastY = player.loc.gridY;
            }
            
        }
            
    }
}
