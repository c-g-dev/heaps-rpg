import heaps.rpg.util.RPGBuilder;
import heaps.rpg.rom.ROMData.RPGWorldROM;
import haxe.io.Bytes;


import MapExportDTO.TileLayerData;
import MapExportDTO.ImageLayerData;
import MapExportDTO.IntGridLayerData;
import MapExportDTO.ObjectLayerData;
import MapExportDTO.ObjectInstance;
import MapExportDTO.ObjectDatabase;

import layers.TileLayerKind;
import layers.ImageLayerKind;
import layers.ObjectLayerKind;
import layers.MovePermissionsLayerKind;
import entities.PlayerEntityKind;
import entities.NPCEntityKind;
import entities.WarpEntityKind;

using StringTools;



class BuildDemoRPG {

    public static function build(): RPGWorldROM {
        var builder = new RPGBuilder();
        
        
        builder.addGlobalWarpRegistration();
        
        createTypes(builder);

        convertMap(hxd.Res.outdoors, builder);
        convertMap(hxd.Res.indoors, builder);

        return builder.build();
    }

    
    private static function convertMap(mapFile: hxd.res.Resource, builder: RPGBuilder): Void {
        var filename = mapFile.name;
        Log.trace('[BuildDemo] Converting map file: ${filename}');
        

            var mapZipBytes = mapFile.entry.getBytes();
            Log.trace('[BuildDemo] Loaded zip file bytes: ${mapZipBytes.length} bytes');
            
            var mapDTO = MapExportDTO.fromZipBytes(mapZipBytes);
            Log.trace('[BuildDemo] Parsed MapExportDTO - map layers: ${mapDTO.mapData.layers.length}');
            Log.trace('[BuildDemo] Available resources: ${[for (key in mapDTO.resources.keys()) key]}');
            
            
            var mapName = filename.endsWith(".zip") ? filename.substr(0, filename.length - 4) : filename;
            addMap(builder, mapName, mapDTO);
            

    }

    
    private static function loadZipFileBytes(filename: String): Bytes {
        return hxd.Res.load(filename).entry.getBytes();
    }

    private static function addMap(builder: RPGBuilder, mapName: String, res: MapExportDTO): Void {
        var mapData = res.mapData;
        
        
        var mapBuilder = builder.addMap(
            mapName, 
            mapData.gridMapWidth, 
            mapData.gridMapHeight, 
            mapData.gridTileSize
        );
        
        
        mapBuilder.setMetadata("timestamp", mapData.timestamp);
        mapBuilder.setMetadata("version", mapData.version);
        mapBuilder.setMetadata("viewX", mapData.viewX);
        mapBuilder.setMetadata("viewY", mapData.viewY);
        mapBuilder.setMetadata("zoom", mapData.zoom);
        
        
        for (i in 0...mapData.layers.length) {
            var layer = mapData.layers[i];
            var layerKind = mapLayerTypeToKind(layer.type);
            var layerData = convertLayerData(layer, res);
            
            mapBuilder.addLayer(layer.name, layerKind, i, layerData);
        }
        
        
        mapBuilder.endMap();
    }
    
    
    private static function mapLayerTypeToKind(layerType: String): String {
        return switch (layerType) {
            case "tile": "tile";        
            case "image": "image";       
            case "intgrid": "move_permissions"; 
            case "object": "object";      
            default: "stencil";           
        };
    }

    private static function createTypes(builder: RPGBuilder): Void {
        
        builder.addLayerKind(new TileLayerKind());
        builder.addLayerKind(new ImageLayerKind());
        builder.addLayerKind(new ObjectLayerKind());
        builder.addLayerKind(new MovePermissionsLayerKind());

        
        builder.addEntityKind(new PlayerEntityKind());
        builder.addEntityKind(new NPCEntityKind());
        builder.addEntityKind(new WarpEntityKind());
    }

    
    private static function convertLayerData(layer: Dynamic, res: MapExportDTO): Dynamic {
        return switch (layer.type) {
            case "tile":
                convertTileLayerData(cast layer, res.resources);
            case "image":
                convertImageLayerData(cast layer, res.resources);
            case "intgrid":
                convertIntGridLayerData(cast layer);
            case "object":
                convertObjectLayerData(cast layer, res);
            default:
                {}; 
        };
    }
    
    
    private static function convertTileLayerData(tileLayer: TileLayerData, resources: Map<String, Bytes>): Dynamic {
        
        var tiles = [];
        for (tile in tileLayer.tiles) {
            tiles.push({
                x: tile.x,
                y: tile.y,
                tileId: tile.tileId
            });
        }
        
        Log.trace('[BuildDemo] Converting tile layer - tiles: ${tiles.length}, tilesetResource: ${tileLayer.tilesetResource}');
        
        
        var tilesetResource: h2d.Tile = null;
        if (tileLayer.tilesetResource != null) {
            
            var resourceKey = tileLayer.tilesetResource.indexOf("resources/") == 0 ? 
                tileLayer.tilesetResource.substring("resources/".length) : 
                tileLayer.tilesetResource;
                
            if (resources.exists(resourceKey)) {
                Log.trace('[BuildDemo] Loading tileset resource: ${resourceKey}');
                tilesetResource = loadTileFromBytes(resources.get(resourceKey));
                Log.trace('[BuildDemo] Tileset resource loaded: ${tilesetResource != null}');
            } else {
                Log.trace('[BuildDemo] WARNING: Tileset resource not found - looking for: ${resourceKey}, available resources: ${[for (key in resources.keys()) key]}');
            }
        }
        
        return {
            tiles: tiles,
            tilesetResource: tilesetResource,
            tilesetImagePath: tileLayer.tilesetImagePath
        };
    }
    
    
    private static function convertImageLayerData(imageLayer: ImageLayerData, resources: Map<String, Bytes>): Dynamic {
        Log.trace('[BuildDemo] Converting image layer - imageResource: ${imageLayer.imageResource}');
        
        var imageResource: h2d.Tile = null;
        if (imageLayer.imageResource != null) {
            
            var resourceKey = imageLayer.imageResource.indexOf("resources/") == 0 ? 
                imageLayer.imageResource.substring("resources/".length) : 
                imageLayer.imageResource;
                
            if (resources.exists(resourceKey)) {
                Log.trace('[BuildDemo] Loading image resource: ${resourceKey}');
                imageResource = loadTileFromBytes(resources.get(resourceKey));
                Log.trace('[BuildDemo] Image resource loaded: ${imageResource != null}');
            } else {
                Log.trace('[BuildDemo] WARNING: Image resource not found - looking for: ${resourceKey}, available resources: ${[for (key in resources.keys()) key]}');
            }
        }
        
        return {
            x: imageLayer.x,
            y: imageLayer.y,
            width: imageLayer.width,
            height: imageLayer.height,
            scaleX: imageLayer.scaleX,
            scaleY: imageLayer.scaleY,
            imageResource: imageResource
        };
    }
    
    
    private static function convertIntGridLayerData(intGridLayer: IntGridLayerData): Dynamic {
        var collisionData = [];
        
        for (cell in intGridLayer.grid) {
            collisionData.push({
                x: cell.x,
                y: cell.y,
                value: cell.value,
                blocked: cell.value > 0 
            });
        }
        
        return {
            maxValue: intGridLayer.maxValue,
            collisionData: collisionData
        };
    }
    
    
    private static function convertObjectLayerData(objectLayer: ObjectLayerData, res: MapExportDTO): Dynamic {
        var entities = [];
        
        for (obj in objectLayer.objects) {
            
            var entityKind = determineEntityKind(obj, res.mapData.globalObjectDatabase);
            
            
            var entityInstance = {
                instanceUUID: obj.uuid,
                kind: entityKind,
                x: Math.floor(obj.x / res.mapData.gridTileSize),
                y: Math.floor(obj.y / res.mapData.gridTileSize),
                data: {
                    definitionId: obj.definitionId,
                    rotation: obj.rotation,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY,
                    fieldValues: obj.fieldValues
                }
            };
            
            entities.push(entityInstance);
        }
        
        return {
            entities: entities
        };
    }
    
    
    private static function loadTileFromBytes(imageBytes: Bytes): h2d.Tile {
        if (imageBytes == null) return null;
        
        
        var texture = hxd.res.Any.fromBytes("", imageBytes).to(hxd.res.Image).toTexture();
        
        
        return h2d.Tile.fromTexture(texture);

    }

    
    private static function determineEntityKind(obj: ObjectInstance, globalObjectDatabase: ObjectDatabase): String {
        
        if (obj.fieldValues.exists("entityKind")) {
            return obj.fieldValues.get("entityKind");
        }
        
        
        if (obj.fieldValues.exists("type")) {
            return obj.fieldValues.get("type");
        }
        
        
        if (obj.definitionId != null && obj.definitionId != "") {
            for (definition in globalObjectDatabase.definitions) {
                if (definition.id == obj.definitionId) {
                    return definition.name;
                }
            }
        }
        
        
        return "npc";
    }




}