package heaps.rpg.runtime;

import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.RPGWorld;
import heaps.rpg.runtime.RPGMapRuntime.RPGMapRuntimeRender;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGMapData;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.runtime.RPGWorldRuntime.MapId;
import heaps.rpg.map.RPGObjectLayer.EntityLayer;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.map.RPGLocation;
import heaps.rpg.ntt.EntityStorage;

class RPGMapRuntime  {
    public var id (default, null): MapId;
    public var tileSize: Int;
    public var mapData: RPGMapData;
    public var render: RPGMapRuntimeRender;

    var world: RPGWorld;
    var layers: Array<RPGMapLayer>;
    var entityLayer: Int;


    public function new(mapData: RPGMapData, world: RPGWorld) {
        this.mapData = mapData; 
        this.world = world;
        this.id = new MapId(mapData.name);
        this.tileSize = mapData.tilesize;
        this.render = new RPGMapRuntimeRender(this);
        this.layers = [];
        
        for (layer in mapData.layers) {
            @:privateAccess var kind = world.rom.getLayerKind(layer.kind);
            if(kind.acceptsEntities) {
                entityLayer = layer.index;
                break;
            }
        }
    }

    public function getLayerByIndex(index: Int): RPGMapLayer {
        for(layer in layers) {
            if(layer.index == index) {
                return layer;
            }
        }
        return null;
    }

    public function getDefaultEntityLayer(): EntityLayer {
        Log.trace('getDefaultEntityLayer: ' + entityLayer);
        for(layer in layers) {
           if(layer.index == entityLayer) {
            return cast layer;
           }
        }
        return null;
    }

    public function isCurrentMap(): Bool {
        return this.mapData.name == this.world.maps.current();
    }

    public function isEntityInMap(entity: RPGEntity): Bool {
        throw new haxe.exceptions.NotImplementedException();
    }

    public function tileToPosition(x: Int, y: Int): {x: Float, y: Float} {
        return {x: x * tileSize, y: y * tileSize};
    }

    public function mapWidth(): Int {
        return mapData.tilesize * mapData.gridWidth;
    }

    public function mapHeight(): Int {
        return mapData.tilesize * mapData.gridHeight;
    }

}

@:access(heaps.rpg.runtime.RPGMapRuntime)
class RPGMapRuntimeRender {

    public var isLoaded: Bool = false;
    public var isShown: Bool = false;
    var map: RPGMapRuntime;

    public function new(map: RPGMapRuntime) {
        this.map = map;
    }

    public function unload() {
        Log.trace('[MapRender] Unloading map: ${map.mapData.name} (isCurrentMap: ${map.isCurrentMap()})');
        if(!map.isCurrentMap()) {
            Log.trace('[MapRender] Skipping unload - not current map');
            return;
        }
        Log.trace('[MapRender] Clearing viewport layers');
        map.world.viewport.clearLayers();
        isLoaded = false;
        isShown = false;
        Log.trace('[MapRender] Map unloaded successfully: ${map.mapData.name}');
    }

    public function loadFromROM() {
        Log.trace('[MapRender] Loading map from ROM: ${map.mapData.name} (isLoaded: $isLoaded)');
        if(!isLoaded){
            Log.trace('[MapRender] Creating layer objects and entities from ROM data');
            
            
            Log.trace('[MapRender] ROM contains ${map.mapData.layers.length} layers for map: ${map.mapData.name}');
            for (i in 0...map.mapData.layers.length) {
                var layer = map.mapData.layers[i];
                @:privateAccess var kind = map.world.rom.getLayerKind(layer.kind);
                if(kind == null) {
                    Log.trace('[MapRender] WARNING: No layer kind handler registered for kind "${layer.kind}" on layer "${layer.name}" – skipping this layer');
                    continue;
                }
                Log.trace('[MapRender] Layer ${i}: name="${layer.name}" kind="${layer.kind}" acceptsEntities=${kind.acceptsEntities}');
                @:privateAccess var payload = kind.load(new RPGLayerLoadRequest(layer, kind, map.mapData, map.world));
                if(payload.layer != null) {
                    this.map.layers.push(payload.layer);
                    Log.trace('[MapRender] Added layer "${layer.name}" to map layers');
                }
                if(payload.entities != null) {
                    Log.trace('[MapRender] Processing ${payload.entities.length} entities from layer "${layer.name}"');
                    var entityCount = 0;
                    for(entity in payload.entities) {
                        entityCount++;
                        Log.trace('[MapRender] Entity ${entityCount}/${payload.entities.length}: kind="${entity.kind}" at position (${entity.x}, ${entity.y})');
                        
                        @:privateAccess var nttKind = map.world.rom.getEntityKind(entity.kind);
                        Log.trace('[MapRender] Retrieved entity kind for "${entity.kind}": ${nttKind != null ? "success" : "null"}');
                        
                        if(nttKind == null) {
                            Log.trace('[MapRender] WARNING: No entity kind handler registered for kind "${entity.kind}" – skipping entity');
                            continue;
                        }

                        
                        var entityStorage = map.world.seek(EntityStorage);
                        if(entityStorage != null && entityStorage.hasStoredEntityWithUUID(entity.instanceUUID)) {
                            Log.trace('[MapRender] Skipping entity creation for UUID ${entity.instanceUUID} - entity is stored and will be placed by EntityStorage');
                            continue;
                        }

                        var nttEntity: Null<RPGEntity> = null;
      
                            nttEntity = nttKind.load(new RPGEntityLoadRequest(entity, nttKind, map.world));
         
                        Log.trace('[MapRender] Loaded entity instance: ${nttEntity != null ? "success" : "null"}');
                        
                        if(nttEntity == null) continue;

                        var location = RPGLocation.onTile(map.world, entity.x, entity.y, map.id, layer.index);
                        Log.trace('[MapRender] Created location for entity: layer=${layer.index}, tile=(${entity.x}, ${entity.y})');
                        
                        map.world.entities.place(nttEntity, location);
                     
                    }
                    Log.trace('[MapRender] Completed processing ${entityCount} entities from layer "${layer.name}"');
                } else {
                    Log.trace('[MapRender] No entities found in layer "${layer.name}"');
                }

            }
            
            
            isLoaded = true;
            Log.trace('[MapRender] Map loaded from ROM: ${map.mapData.name}');
        } else {
            Log.trace('[MapRender] Map already loaded from ROM: ${map.mapData.name}');
        }
    }

    
    public function render() {
        Log.trace('[MapRender] Rendering map: ${map.mapData.name} (isShown: $isShown, isLoaded: $isLoaded)');
        if(!isShown){
            if(!isLoaded) {
                Log.trace('[MapRender] Map not loaded, loading from ROM first');
                loadFromROM();
            }
            Log.trace('[MapRender] Setting ${map.layers.length} layers to viewport');
            map.world.viewport.setLayers(map.layers);
            isShown = true;
            Log.trace('[MapRender] Map rendered successfully: ${map.mapData.name}');
        } else {
            Log.trace('[MapRender] Map already shown: ${map.mapData.name}');
        }
        
        
        var scene = map.world.viewport.getScene();
        if(scene != null && scene.camera != null) {
            var camera = scene.camera;
            var followedObject = camera.follow;
            
            if(followedObject != null) {
                Log.trace('[MapRender] Camera is following object: ${followedObject} at position (${followedObject.x}, ${followedObject.y})');
                var followedObjectScene = followedObject.getScene();
                if(followedObjectScene != null) {
                    Log.trace('[MapRender] Followed object is in scene DOM: ${followedObjectScene == scene ? "same as viewport scene" : "different scene"}');
                } else {
                    Log.trace('[MapRender] Followed object is NOT in scene DOM (detached from scene graph)');
                }
            } else {
                Log.trace('[MapRender] Camera is not following any object');
            }
            
            Log.trace('[MapRender] Camera position: (${camera.x}, ${camera.y})');
        } else {
            Log.trace('[MapRender] No scene or camera available for position logging');
        }
    }

}