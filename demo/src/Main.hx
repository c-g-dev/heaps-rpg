import h2d.Scene;

import heaps.rpg.RPGWorld;
import heaps.rpg.walk.ShowCollisionOverlay;
import heaps.rpg.map.RPGLocation;
import heaps.rpg.view.ShowGridPositionOverlay;
import heaps.rpg.interact.InteractRoutine;
import heaps.rpg.interact.OverlayToggleRoutine;
import heaps.rpg.util.Log;

class Main extends hxd.App {
    override function init() {
        Log.trace("Initializing resources...");
        hxd.Res.initEmbed();
        
        Log.trace("Building ROM...");
        var rom = BuildDemoRPG.build();
        Log.trace("ROM built with " + rom.maps.length + " maps");
        
        Log.trace("Creating RPG World...");
        var world = new RPGWorld(rom);
        
        Log.trace("Adding viewport to scene...");
        s2d.addChild(world.viewport);
        
        Log.trace("Setting map to 'main'...");
        world.setMap("outdoors");
        
        Log.trace("Initialization complete!");

        world.entities.place(new NPCEntity(world, "npc1", (e) -> {
            (cast e: NPCEntity).reverseWalk();
        }), RPGLocation.onTile(world, 9, 21));

        world.routines.add(InteractRoutine.create(world));
        world.routines.add(OverlayToggleRoutine.create(world));
    }

    public static function main() {
        Log.trace("Starting application...");
        new Main();
    }
}