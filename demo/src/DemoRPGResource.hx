
import haxe.io.Bytes;
import hxd.res.Resource;
import hxd.res.Loader;

abstract DemoRPGResource(Resource) {
    public function new(res:Resource) {
        this = res;
    }

    public function getMapInfo():TileMap {
        var jsonString = this.entry.getText();
        return haxe.Json.parse(jsonString);
    }

    public function forEachLayer(callback:(LayerKind, Int)->Void) {
        var mapInfo = getMapInfo();
        if (mapInfo == null) return;

        for (layer in mapInfo.layers) {
            switch (layer.type) {
                case "tile":
                    var tileLayer:Layer<TileLayerData> = cast layer;
                    callback(Tiles(tileLayer), mapInfo.layers.indexOf(layer));
                case "stencil":
                    var stencilLayer:Layer<StencilLayerData> = cast layer;
                    callback(Stencil(stencilLayer), mapInfo.layers.indexOf(layer));
                case "intGrid":
                    var intGridLayer:Layer<IntGridElement> = cast layer;
                    callback(IntGrid(intGridLayer), mapInfo.layers.indexOf(layer));
                default:
                    
            }
        }
    }

    public function tileResource(name:String):h2d.Tile {
        
        var baseDir = haxe.io.Path.directory(this.entry.path);
        var resourcePath = haxe.io.Path.join([baseDir, name]);
        
        
        var res = hxd.Res.loader.load(resourcePath + ".png");
        if (res == null) {
            Log.trace('Resource not found: $resourcePath');
            return null;
        }

        return res.toTile();
    }
}

enum LayerKind {
    Tiles(l:Layer<TileLayerData>);
    Stencil(l:Layer<StencilLayerData>);
    IntGrid(l:Layer<IntGridElement>);
    Object(l:Layer<LayerObject<ObjectElement>>);
}

typedef TileMap = {
    name:String,
    gridWidth:Int,
    gridHeight:Int,
    tileSize:Int,
    layers:Array<Layer<Dynamic>>
}

typedef Layer<T> = {
    name:String,
    type:String,
    locked:Bool,
    visible:Bool,
    alpha:Float,
    data:T,
    serializationToken:String
}

typedef TileLayerData = {
    tileInfo:TileInfo,
    tileData:Array<Int>
}

typedef TileInfo = {
    file:Null<String>,
    stride:Int
}

typedef StencilLayerData = {
    stencilImagePath:Array<String>
}

typedef LayerObject<T> = {
    uuid:String,
    kind:String,
    gridX:Int,
    gridY:Int,
    gridWidth:Int,
    gridHeight:Int,
    metadata:MapFix<T>
}

typedef IntGridElement = LayerObject<{color: Int, intValue: Int}>;
typedef ObjectElement = LayerObject<{data: Dynamic}>;

typedef MapFix<T> = {h: T};