
--------------------------------------------------------------------
1. Big-picture life-cycle
--------------------------------------------------------------------
1. Compile a `RPGWorldROM` object (the “cartridge” that contains every map, entity kind, layer kind, global metadata, and optional post-load jobs).
2. Construct `RPGWorld`, passing the ROM in its constructor.
   • `RPGWorldRuntime` immediately converts the static ROM into fast runtime structures (`RPGMapRuntime`, `RPGEntitiesRuntime`, etc.) and executes any ROM-defined post-load jobs.
3. Put the world into an `h2d.Scene` by doing  
   `s2d.addChild(world.viewport)`  
   and show a map with `world.setMap("mapName")`.
4. While the program runs
   • Input, coroutines, routines, and component systems mutate the world.
   • The active map’s `RPGMapRuntimeRender` streams layers and entities into the `RPGViewport`, which owns a classic Heaps camera plus an overlay stack.

--------------------------------------------------------------------
2. Data layer – the ROM
--------------------------------------------------------------------
RPGWorldROM
 ├─ maps : Array<RPGMapData>
 │    • One element per playable map.
 │    • Holds size, tile size, arbitrary metadata, and an ordered
 │      list of RPGMapLayerData objects.
 ├─ entityKinds : Map<String,RPGEntityKind>
 │    • Each “entity kind” knows how to build an `RPGEntity`
 │      given an `RPGEntityLoadRequest`.
 ├─ layerKinds : Map<String,RPGLayerKind>
 │    • Each “layer kind” turns its raw data into a
 │      `RPGMapLayer` (plus optional embedded entity instances)
 │      when given an `RPGLayerLoadRequest`.
 ├─ metadata : Map<String,Dynamic> (global game metadata)
 └─ postLoadJobs : Array<PostLoadJob>
      • Executed once, immediately after the ROM is loaded.
        (Example: `GlobalWarpRegistrationJob` scans all maps and
        registers warp points.)

The entire framework is format-agnostic: *nothing in core code assumes any particular map editor or file type.*  
All that matters is that you end up with a fully-populated `RPGWorldROM`.

--------------------------------------------------------------------
3. Runtime layer – what happens after load
--------------------------------------------------------------------
• `RPGWorldRuntime`
  – Owns `mapRuntimes` (one per map) and `entities`.  
  – Knows the id of the current map.

• `RPGMapRuntime`
  – Contains precalculated geometry helpers (`tileSize`, `mapWidth()` …).  
  – Holds the list of concrete `RPGMapLayer` objects and an index of which one owns entities.  
  – Delegates I/O to its inner `RPGMapRuntimeRender`.

• `RPGMapRuntimeRender`
  – Has three verbs: `loadFromROM()`, `render()`, `unload()`.  
  – Creates Heaps display objects for each layer, instantiates every entity instance by calling its `RPGEntityKind.load`, and pushes those visual objects into the viewport when asked to render.

• `RPGEntitiesRuntime`
  – Keeps the living `RPGEntity` objects, performs placement/removal, and gives fast spatial look-ups.

• `RPGViewport`
  – A layered `h2d.Layers` container plus a second container for camera-fixed overlays.  
  – Maintains its own list of overlays (`RPGOverlay`) and refreshes whenever layers/overlays change.  
  – Any routine can call `world.viewport.addOverlay(...)` to place debug or UI elements over the map.

--------------------------------------------------------------------
4. Behaviour & interaction
--------------------------------------------------------------------
• Coroutines / Routines  
  – `world.routines.add(...)` accepts any `Coroutine` (see `InteractRoutine`, `OverlayToggleRoutine`).  
  – Runs every frame inside a dedicated `CoroutineSystem`.

• Component systems  
  – Any class derived from `RPGWorldComponent` can be attached through `world._add(tag, component)`.  
  – Example: `Collision` grid, `WalkingController`, `Warping`, etc.

• Events  
  – `world.events` provides a typed pub/sub bus.  
  – `SetMapExtension` fires `MapLoaded` and `MapUnloaded`, which overlays and components listen to.

--------------------------------------------------------------------
5. Extending the game: custom entities, layers, and maps
--------------------------------------------------------------------
A. New entity kind
```
class ChestEntityKind extends RPGEntityKind {
    public function new() { super("chest"); }
    public function load(req:RPGEntityLoadRequest):RPGEntity { ... }
}
builder.addEntityKind(new ChestEntityKind());
```

B. New layer kind
```
class LightmapLayerKind extends RPGLayerKind {
    public function new() { super("lightmap", false); }
    public function load(req:RPGLayerLoadRequest)
         return {layer:new LightmapLayer(req), entities:[]};
}
builder.addLayerKind(new LightmapLayerKind());
```

C. Building a ROM from *any* file
1. Parse your file format (JSON, TMX, LDtk, CSV, binary—doesn’t matter).  
2. For each map:
   • Create an `RPGMapData` via `builder.addMap(...)`.  
   • For every layer encountered, decide which `kind` string you want to map it to, transform the raw layer payload into the `data` object you need, and call `mapBuilder.addLayer(...)`.  
   • Put any layer-embedded entities into the layer’s `data.entities` array following the `RPGEntityInstanceData` structure.  
   • `mapBuilder.endMap()` when done.
3. Add every custom `RPGEntityKind` / `RPGLayerKind` you referenced in step 2.
4. Optionally register global jobs (warps, post-processing) with `builder.addPostLoadJob(...)`.
5. Call `builder.build()` and you have a `RPGWorldROM`.

The demo’s `BuildDemoRPG.hx` is a concrete reference implementation: it unzips an exported LDtk-style bundle, converts each LDtk layer/object into the appropriate kind/data, registers entity & layer kinds, and finally returns a perfectly legal ROM.

--------------------------------------------------------------------
6. What happens on `world.setMap("foo")`
--------------------------------------------------------------------
1. `SetMapExtension.setMap` orchestrates:
   a. Optional “BeforeExit” callbacks  
   b. `world.map.render.unload()`  
   c. Emit `MapUnloaded`  
   d. Optional “AfterExit” callbacks  
   e. Update `world.runtime.currentMap`  
   f. `world.map.render.loadFromROM()`  
   g. Emit `MapLoaded`  
   h. Optional “BeforeShow” callbacks  
   i. `world.map.render.render()` (pushes display objects)  
   j. Optional “AfterShow” callbacks  
2. Overlays and components listen to the events and refresh themselves.
3. Camera stays centred on whatever object your gameplay code sets via `world.viewport.follow(entity.display)`.

--------------------------------------------------------------------
7. Parsing checklist for “any form of file input”
--------------------------------------------------------------------
✓ Can you iterate over maps?  
✓ Do you know grid width/height and tile size?  
✓ For each layer, do you know:
   – Display type (tile, image, object, etc.) → choose a `kind` string.  
   – Positioning data (tile matrix, image blob, …) → place in `data`.  
✓ For entities:
   – Unique id (`instanceUUID`)  
   – Kind string (`kind`) that matches a registered `RPGEntityKind`  
   – Grid coordinates (`x`,`y`)  
   – Free-form payload (`data`)  
✓ Any post-load global processing you need? Add a job.  
If every bullet is answered, you can generate a valid ROM and the engine will handle the rest.

--------------------------------------------------------------------
8. Summary
--------------------------------------------------------------------
• Core engine is editor-agnostic; *your* importer merely feeds it a `RPGWorldROM`.  
• Layer- and entity-kind abstractions enable total control over rendering and behaviour.  
• Runtime objects separate immutable game data (ROM) from mutable game state.  
• Overlays, coroutines, controls, and component systems provide gameplay glue without touching the rendering core.  

Armed with these concepts and the demo as a template, you can plug in virtually any file format—JSON, TMX, LDtk, proprietary—to drive the same runtime without altering engine code.
Check the demo here: https://c-g-dev.github.io/heaps-rpg/
