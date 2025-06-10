package heaps.rpg.warp;

import heaps.rpg.RPGWorld;
import heaps.rpg.ntt.RPGEntity.BasicVirtualEntity;
import heaps.rpg.walk.SteppedOnBehavior;
import heaps.rpg.warp.Warp.Warping;

class WarpTile extends BasicVirtualEntity {
    var warp: Warp;
    
    public function new(world: RPGWorld, warp: Warp) {
        super(world);
        this.warp = warp;
        
        Log.trace('[WarpTile] Created warp tile at ${warp.atLocation.map}:(${warp.atLocation.gridX},${warp.atLocation.gridY}) -> ${warp.toLocation.toString()}');
        
        this.behaviors.add(new SteppedOnBehavior((entity) -> {
            Log.trace('[WarpTile] Warp tile stepped on by ${entity.uuid} at ${warp.atLocation.map}:(${warp.atLocation.gridX},${warp.atLocation.gridY})');
            Log.trace('[WarpTile] Initiating warp to: ${warp.toLocation.toString()}');
            world.commands.run([new WarpCommand(warp.toLocation)]);
        }));
        
        
        
        
    }
}