package heaps.rpg.map;

import heaps.rpg.rom.ROMData.RPGMapData;
import heaps.rpg.rom.ROMData.RPGMapLayerData;

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

class RPGTilmapLayerData {
    public var tiles: Array<TileData>;
    public var tilesetResource: h2d.Tile;
    public function new(tiles: Array<TileData>, tilesetResource: h2d.Tile) {
        this.tiles = tiles;
        this.tilesetResource = tilesetResource;
    }
}

class RPGTilemapLayer extends RPGMapLayer<RPGTilmapLayerData> {
    var tileGroup: h2d.TileGroup;
    
    public function new(map: RPGMapData, data: RPGMapLayerData<RPGTilmapLayerData>) {
        super(map, data);
        
        Log.trace('[TilemapLayer] Creating tilemap layer: ${data.name}');
        Log.trace('[TilemapLayer] Has tileset resource: ${data.data.tilesetResource != null}');
        Log.trace('[TilemapLayer] Has tiles: ${data.data.tiles != null ? data.data.tiles.length : 0}');
        
        if (data.data.tilesetResource != null) {
            tileGroup = new h2d.TileGroup(data.data.tilesetResource, this);
            renderTiles();
        } else {
            Log.trace('[TilemapLayer] WARNING: No tileset resource, cannot create TileGroup');
        }
    }
    
    function renderTiles() {
        if (tileGroup == null || data.data.tiles == null) {
            Log.trace('[TilemapLayer] Cannot render tiles - tileGroup: ${tileGroup != null}, tiles: ${data.data.tiles != null}');
            return;
        }
        
        Log.trace('[TilemapLayer] Rendering ${data.data.tiles.length} tiles');
        
        tileGroup.clear();
        
        
        var tilesetWidth = Math.floor(data.data.tilesetResource.width);
        var tilesetHeight = Math.floor(data.data.tilesetResource.height);
        var tilesPerRow = Math.floor(tilesetWidth / map.tilesize);
        var totalRows = Math.floor(tilesetHeight / map.tilesize);
        
        Log.trace('[TilemapLayer] Tileset dimensions: ${tilesetWidth}x${tilesetHeight}, tiles per row: ${tilesPerRow}, total rows: ${totalRows}');
        
        var renderedCount = 0;
        for (tileData in data.data.tiles) {
            if (tileData.tileId >= 0) {
                
                var pixelX = tileData.x * map.tilesize;
                var pixelY = tileData.y * map.tilesize;
                
                
                var tileCol = tileData.tileId % tilesPerRow;
                var tileRow = Math.floor(tileData.tileId / tilesPerRow);
                var tilesetX = tileCol * map.tilesize;
                var tilesetY = tileRow * map.tilesize;
                
                
                tileGroup.add(pixelX, pixelY, data.data.tilesetResource.sub(tilesetX, tilesetY, map.tilesize, map.tilesize));
                renderedCount++;
            }
        }
        
        Log.trace('[TilemapLayer] Rendered ${renderedCount} tiles to TileGroup');
    }
    
    public function refresh() {
        renderTiles();
    }
}