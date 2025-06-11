# Heaps-RPG

A top-down 2D RPG framework for Heaps.io. Main features include:

- Layer-based RPG maps
- Map switching/warping
- Overworld entity management
- Grid walking
- Controls
- Collisions
- Interacting
- Events

Check the demo here: https://c-g-dev.github.io/heaps-rpg/

# Concept

The engine is split between ROM and Runtime. The RPGROMData is the immutable "cartridge" containing all maps, objects, and game-specific logic. The Runtime classes are the internal state. Ideally, you just need to convert your game resources (JSON, .tmx, etc) into a RPGROMData instance, and then the engine will automatically handle the Runtime processing. 

I am still trying to perfect the various system designs and RPG API's for this framework. Personally, I think it is a bit too complex and would benefit from some simplification, but the specifics of how it should be simplified are not immediately clear. If you have any opinions or suggestions, I would be thrilled to hear them.

## High level example

```haxe
//convert resources into a ROM data object
var rom = new RPGBuilder()
    //add layer and entity types
    .addEntityKind(new ChestKind())
    .addLayerKind(new SimpleTileLayerKind())
    //add maps
    .addMap("overworld", 20, 15, 16)
        .addLayer("ground", "tile", 0,  {/* layer data pulled from some file */})
    .endMap()
    .build();

//pass rom object into world
var world = new RPGWorld(rom);

s2d.addChild(world.viewport);

//set map and start
world.setMap("overworld");
```

No granular docs yet, but you can check the demo code for detailed examples.

