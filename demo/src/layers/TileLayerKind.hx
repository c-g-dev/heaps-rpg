package layers;

import heaps.rpg.rom.ROMData.RPGLayerKind;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.map.RPGTilemapLayer;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;
import heaps.rpg.rom.ROMData.RPGMapLayerData;

class TileLayerKind extends RPGLayerKind {
    public function new() {
        super("tile", false);
    }
    
    public function load(req: RPGLayerLoadRequest): {layer: RPGMapLayer, entities: Array<RPGEntityInstanceData>} {
        
        var layerData = req.layerData.data;
        var tiles = [];
        
        Log.trace('[TileLayerKind] Creating tile layer: ${req.layerData.name}');
        
        if (layerData.tiles != null) {
            var tilesArray: Array<Dynamic> = cast layerData.tiles;
            for (tileData in tilesArray) {
                tiles.push(new heaps.rpg.map.RPGTilemapLayer.TileData(
                    tileData.x, 
                    tileData.y, 
                    tileData.tileId
                ));
            }
        }
        
        
        var tilesetResource: h2d.Tile = layerData.tilesetResource;
        
        Log.trace('[TileLayerKind] Tile layer has ${tiles.length} tiles, tilesetResource: ${tilesetResource != null}');
        
        var tilemapData = new heaps.rpg.map.RPGTilemapLayer.RPGTilmapLayerData(tiles, tilesetResource);
        var layer = new RPGTilemapLayer(req.mapData, new heaps.rpg.rom.ROMData.RPGMapLayerData(
            req.layerData.name, 
            req.layerData.kind, 
            req.layerData.index, 
            tilemapData
        ));
        
        return {layer: layer, entities: []};
    }
} 