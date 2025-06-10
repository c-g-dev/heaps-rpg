
import haxe.zip.Writer;
import haxe.zip.Reader;
import haxe.zip.Entry;
import haxe.io.Bytes;
import haxe.io.BytesOutput;
import haxe.io.BytesInput;

using StringTools;

#if js
import js.html.File as HtmlFile;
import js.Browser;
#end


class MapExportDTO {
    public var mapData: MapData;
    public var resources: Map<String, Bytes>;
    
    public function new(mapData: MapData = null, resources: Map<String, Bytes> = null) {
        this.mapData = mapData != null ? mapData : new MapData();
        this.resources = resources != null ? resources : new Map<String, Bytes>();
    }
    
    
    public function toZipBytes(): Bytes {
        
            
            var entries = new List<Entry>();
            
            
            var mapJsonString = haxe.Json.stringify(mapData, null, "  ");
            var mapJsonBytes = Bytes.ofString(mapJsonString);
            var mapJsonEntry: Entry = {
                fileName: "map.json",
                fileSize: mapJsonBytes.length,
                fileTime: Date.now(),
                compressed: false,
                dataSize: mapJsonBytes.length,
                data: mapJsonBytes,
                crc32: null
            };
            entries.add(mapJsonEntry);
            
            
            for (resourceFilename in resources.keys()) {
                var resourceBytes = resources.get(resourceFilename);
                
                var resourceEntry: Entry = {
                    fileName: "resources/" + resourceFilename,
                    fileSize: resourceBytes.length,
                    fileTime: Date.now(),
                    compressed: false,
                    dataSize: resourceBytes.length,
                    data: resourceBytes,
                    crc32: null
                };
                entries.add(resourceEntry);
            }
            
            
            var zipOutput = new BytesOutput();
            var writer = new Writer(zipOutput);
            writer.write(entries);
            return zipOutput.getBytes();

    }
    
    
    public function toZip(filename: String = "map.zip"): Void {
        var zipBytes = toZipBytes();
        
        #if js
        triggerBrowserDownload(zipBytes, filename);
        #else
        Log.trace("Download not supported on this platform. Use toZipBytes() instead.");
        #end
    }
    
    
    public static function fromZipBytes(zipBytes: Bytes): MapExportDTO {
        
            
            var zipInput = new BytesInput(zipBytes);
            var reader = new Reader(zipInput);
            var entries = reader.read();
            
            var mapData: MapData = null;
            var resources = new Map<String, Bytes>();
            
            
            for (entry in entries) {
                Log.trace("zip entry: " + entry.fileName);
                if (entry.fileName.endsWith("map.json")) {
                    
                    var mapJsonString = entry.data.toString();
                    var mapDataRaw = haxe.Json.parse(mapJsonString);
                    mapData = parseMapData(mapDataRaw);
                } else if (StringTools.startsWith(entry.fileName, "resources/")) {
                    
                    var resourceName = entry.fileName.substring("resources/".length);
                    resources.set(resourceName, entry.data);
                }
            }
            
            if (mapData == null) {
                throw "Invalid map file: map.json not found";
            }
            
            return new MapExportDTO(mapData, resources);

    }
    
    #if js
    
    public static function fromZip(file: HtmlFile, callback: MapExportDTO -> Void): Void {
        
        var reader = new js.html.FileReader();
        
        reader.onload = function(e) {
            
                var arrayBuffer = reader.result;
                var bytes = arrayBufferToBytes(arrayBuffer);
                var dto = fromZipBytes(bytes);
                callback(dto);
        };
        
        reader.onerror = function() {
            throw 'Failed to read file';
        };
        
        reader.readAsArrayBuffer(file);
    }
    
    
    private static function arrayBufferToBytes(arrayBuffer: js.lib.ArrayBuffer): Bytes {
        var uint8Array = new js.lib.Uint8Array(arrayBuffer);
        var bytes = Bytes.alloc(uint8Array.length);
        for (i in 0...uint8Array.length) {
            bytes.set(i, uint8Array[i]);
        }
        return bytes;
    }
    
    
    private function triggerBrowserDownload(data: Bytes, filename: String): Void {
        
        var uint8Array = new js.lib.Uint8Array(data.length);
        for (i in 0...data.length) {
            uint8Array[i] = data.get(i);
        }
        
        
        var blob = new js.html.Blob([uint8Array], {type: 'application/zip'});
        var url = js.html.URL.createObjectURL(blob);
        
        var a = Browser.document.createAnchorElement();
        a.href = url;
        a.download = filename;
        a.style.display = "none";
        Browser.document.body.appendChild(a);
        a.click();
        Browser.document.body.removeChild(a);
        js.html.URL.revokeObjectURL(url);
    }
    #end
    
    
    private static function parseMapData(raw: Dynamic): MapData {
        var mapData = new MapData();
        
        mapData.version = raw.version != null ? raw.version : "1.0";
        mapData.viewX = raw.viewX != null ? raw.viewX : 0;
        mapData.viewY = raw.viewY != null ? raw.viewY : 0;
        mapData.zoom = raw.zoom != null ? raw.zoom : 1.0;
        mapData.gridTileSize = raw.gridTileSize != null ? raw.gridTileSize : 32;
        mapData.gridMapWidth = raw.gridMapWidth != null ? raw.gridMapWidth : 50;
        mapData.gridMapHeight = raw.gridMapHeight != null ? raw.gridMapHeight : 50;
        mapData.timestamp = raw.timestamp != null ? raw.timestamp : 0;
        
        
        if (raw.layers != null) {
            var layersArray: Array<Dynamic> = raw.layers;
            for (layerRaw in layersArray) {
                var layer = parseLayerData(layerRaw);
                if (layer != null) {
                    mapData.layers.push(layer);
                }
            }
        }
        
        
        if (raw.globalObjectDatabase != null) {
            mapData.globalObjectDatabase = parseObjectDatabase(raw.globalObjectDatabase);
        }
        
        
        if (raw.tagManager != null) {
            mapData.tagManager = parseTagManager(raw.tagManager);
        }
        
        return mapData;
    }
    
    
    private static function parseLayerData(raw: Dynamic): LayerData {
        var type: String = raw.type != null ? raw.type : "unknown";
        
        switch (type) {
            case "tile":
                return parseTileLayerData(raw);
            case "image":
                return parseImageLayerData(raw);
            case "intgrid":
                return parseIntGridLayerData(raw);
            case "object":
                return parseObjectLayerData(raw);
            default:
                Log.trace("Unknown layer type: " + type);
                return null;
        }
    }
    
    private static function parseTileLayerData(raw: Dynamic): TileLayerData {
        var layer = new TileLayerData();
        parseBaseLayerData(layer, raw);
        
        layer.tilesetImagePath = raw.tilesetImagePath != null ? raw.tilesetImagePath : "";
        layer.tilesetResource = raw.tilesetResource;
        
        if (raw.tiles != null) {
            var tilesArray: Array<Dynamic> = raw.tiles;
            for (tileRaw in tilesArray) {
                if (tileRaw.x != null && tileRaw.y != null && tileRaw.tileId != null) {
                    layer.tiles.push(new TileData(tileRaw.x, tileRaw.y, tileRaw.tileId));
                }
            }
        }
        
        return layer;
    }
    
    private static function parseImageLayerData(raw: Dynamic): ImageLayerData {
        var layer = new ImageLayerData();
        parseBaseLayerData(layer, raw);
        
        layer.x = raw.x != null ? raw.x : 0;
        layer.y = raw.y != null ? raw.y : 0;
        layer.width = raw.width != null ? raw.width : 0;
        layer.height = raw.height != null ? raw.height : 0;
        layer.scaleX = raw.scaleX != null ? raw.scaleX : 1.0;
        layer.scaleY = raw.scaleY != null ? raw.scaleY : 1.0;
        layer.imageResource = raw.imageResource;
        
        return layer;
    }
    
    private static function parseIntGridLayerData(raw: Dynamic): IntGridLayerData {
        var layer = new IntGridLayerData();
        parseBaseLayerData(layer, raw);
        
        layer.maxValue = raw.maxValue != null ? raw.maxValue : 1;
        
        if (raw.grid != null) {
            var gridArray: Array<Dynamic> = raw.grid;
            for (cellRaw in gridArray) {
                if (cellRaw.x != null && cellRaw.y != null && cellRaw.value != null) {
                    layer.grid.push(new GridCell(cellRaw.x, cellRaw.y, cellRaw.value));
                }
            }
        }
        
        return layer;
    }
    
    private static function parseObjectLayerData(raw: Dynamic): ObjectLayerData {
        var layer = new ObjectLayerData();
        parseBaseLayerData(layer, raw);
        
        if (raw.objects != null) {
            var objectsArray: Array<Dynamic> = raw.objects;
            for (objRaw in objectsArray) {
                var obj = parseObjectInstance(objRaw);
                if (obj != null) {
                    layer.objects.push(obj);
                }
            }
        }
        
        return layer;
    }
    
    private static function parseBaseLayerData(layer: LayerData, raw: Dynamic): Void {
        layer.id = raw.id != null ? raw.id : "";
        layer.name = raw.name != null ? raw.name : "";
        layer.visible = raw.visible != null ? raw.visible : true;
        layer.opacity = raw.opacity != null ? raw.opacity : 1.0;
        layer.type = raw.type != null ? raw.type : "";
        
        if (raw.tags != null && Std.isOfType(raw.tags, Array)) {
            layer.tags = (cast raw.tags: Array<String>).copy();
        }
    }
    
    private static function parseObjectDatabase(raw: Dynamic): ObjectDatabase {
        var db = new ObjectDatabase();
        db.version = raw.version != null ? raw.version : "1.0";
        
        if (raw.definitions != null) {
            var definitionsArray: Array<Dynamic> = raw.definitions;
            for (defRaw in definitionsArray) {
                var definition = parseObjectDefinition(defRaw);
                if (definition != null) {
                    db.definitions.push(definition);
                }
            }
        }
        
        return db;
    }
    
    private static function parseObjectDefinition(raw: Dynamic): ObjectDefinition {
        var def = new ObjectDefinition();
        def.id = raw.id != null ? raw.id : "";
        def.name = raw.name != null ? raw.name : "";
        def.width = raw.width != null ? raw.width : 32;
        def.height = raw.height != null ? raw.height : 32;
        def.hasImage = raw.hasImage != null ? raw.hasImage : false;
        def.imageData = raw.imageData;
        
        if (raw.fields != null) {
            var fieldsArray: Array<Dynamic> = raw.fields;
            for (fieldRaw in fieldsArray) {
                var field = new ObjectField();
                field.name = fieldRaw.name != null ? fieldRaw.name : "";
                field.type = fieldRaw.type != null ? fieldRaw.type : "string";
                field.defaultValue = fieldRaw.defaultValue;
                field.description = fieldRaw.description;
                def.fields.push(field);
            }
        }
        
        return def;
    }
    
    private static function parseObjectInstance(raw: Dynamic): ObjectInstance {
        var obj = new ObjectInstance();
        obj.uuid = raw.uuid != null ? raw.uuid : "";
        obj.definitionId = raw.definitionId != null ? raw.definitionId : "";
        obj.x = raw.x != null ? raw.x : 0;
        obj.y = raw.y != null ? raw.y : 0;
        obj.rotation = raw.rotation != null ? raw.rotation : 0;
        obj.scaleX = raw.scaleX != null ? raw.scaleX : 1.0;
        obj.scaleY = raw.scaleY != null ? raw.scaleY : 1.0;
        
        if (raw.fieldValues != null) {
            var fieldsRaw = raw.fieldValues;
            for (fieldName in Reflect.fields(fieldsRaw)) {
                obj.fieldValues.set(fieldName, Reflect.field(fieldsRaw, fieldName));
            }
        }
        
        return obj;
    }
    
    private static function parseTagManager(raw: Dynamic): TagManager {
        var tm = new TagManager();
        
        if (raw.tags != null && Std.isOfType(raw.tags, Array)) {
            tm.tags = (cast raw.tags: Array<String>).copy();
        }
        
        return tm;
    }
}


class MapData {
    public var version: String;
    public var viewX: Float;
    public var viewY: Float;
    public var zoom: Float;
    public var gridTileSize: Int;
    public var gridMapWidth: Int;
    public var gridMapHeight: Int;
    public var layers: Array<LayerData>;
    public var globalObjectDatabase: ObjectDatabase;
    public var tagManager: TagManager;
    public var timestamp: Float;
    
    public function new() {
        version = "1.0";
        viewX = 0;
        viewY = 0;
        zoom = 1.0;
        gridTileSize = 32;
        gridMapWidth = 50;
        gridMapHeight = 50;
        layers = [];
        globalObjectDatabase = new ObjectDatabase();
        tagManager = new TagManager();
        timestamp = 0;
    }
}


class LayerData {
    public var id: String;
    public var name: String;
    public var visible: Bool;
    public var opacity: Float;
    public var type: String;
    public var tags: Array<String>;
    
    public function new() {
        id = "";
        name = "";
        visible = true;
        opacity = 1.0;
        type = "";
        tags = [];
    }
}


class TileLayerData extends LayerData {
    public var tiles: Array<TileData>;
    public var tilesetImagePath: String;
    public var tilesetResource: String;
    
    public function new() {
        super();
        type = "tile";
        tiles = [];
        tilesetImagePath = "";
        tilesetResource = null;
    }
}

class TileData {
    public var x: Int;
    public var y: Int;
    public var tileId: Int;
    
    public function new(x: Int = 0, y: Int = 0, tileId: Int = 0) {
        this.x = x;
        this.y = y;
        this.tileId = tileId;
    }
}


class ImageLayerData extends LayerData {
    public var x: Float;
    public var y: Float;
    public var width: Float;
    public var height: Float;
    public var scaleX: Float;
    public var scaleY: Float;
    public var imageResource: String;
    
    public function new() {
        super();
        type = "image";
        x = 0;
        y = 0;
        width = 0;
        height = 0;
        scaleX = 1.0;
        scaleY = 1.0;
        imageResource = null;
    }
}


class IntGridLayerData extends LayerData {
    public var maxValue: Int;
    public var grid: Array<GridCell>;
    
    public function new() {
        super();
        type = "intgrid";
        maxValue = 1;
        grid = [];
    }
}

class GridCell {
    public var x: Int;
    public var y: Int;
    public var value: Int;
    
    public function new(x: Int = 0, y: Int = 0, value: Int = 0) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
}


class ObjectLayerData extends LayerData {
    public var objects: Array<ObjectInstance>;
    
    public function new() {
        super();
        type = "object";
        objects = [];
    }
}


class ObjectDatabase {
    public var version: String;
    public var definitions: Array<ObjectDefinition>;
    
    public function new() {
        version = "1.0";
        definitions = [];
    }
}


class ObjectDefinition {
    public var id: String;
    public var name: String;
    public var width: Int;
    public var height: Int;
    public var fields: Array<ObjectField>;
    public var hasImage: Bool;
    public var imageData: String;
    
    public function new() {
        id = "";
        name = "";
        width = 32;
        height = 32;
        fields = [];
        hasImage = false;
        imageData = null;
    }
}

class ObjectField {
    public var name: String;
    public var type: String;
    public var defaultValue: Dynamic;
    public var description: String;
    
    public function new() {
        name = "";
        type = "string";
        defaultValue = null;
        description = null;
    }
}


class ObjectInstance {
    public var uuid: String;
    public var definitionId: String;
    public var x: Float;
    public var y: Float;
    public var rotation: Float;
    public var scaleX: Float;
    public var scaleY: Float;
    public var fieldValues: Map<String, Dynamic>;
    
    public function new() {
        uuid = "";
        definitionId = "";
        x = 0;
        y = 0;
        rotation = 0;
        scaleX = 1.0;
        scaleY = 1.0;
        fieldValues = new Map<String, Dynamic>();
    }
}


class TagManager {
    public var tags: Array<String>;
    
    public function new() {
        tags = [];
    }
} 