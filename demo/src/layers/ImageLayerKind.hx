package layers;

import heaps.rpg.rom.ROMData.RPGLayerKind;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.ROMData.RPGEntityInstanceData;

class ImageLayerKind extends RPGLayerKind {
    public function new() {
        super("image", false);
    }
    
    public function load(req: RPGLayerLoadRequest): {layer: RPGMapLayer, entities: Array<RPGEntityInstanceData>} {
        
        var layerData = req.layerData.data;
        var layer = new RPGMapLayer(req.mapData, req.layerData);
        
        Log.trace('[ImageLayerKind] Creating image layer: ${req.layerData.name}');
        
        if (layerData.imageResource != null) {
            Log.trace('[ImageLayerKind] Adding bitmap to image layer');
            
            var bitmap = new h2d.Bitmap(layerData.imageResource, layer);
            bitmap.x = layerData.x;
            bitmap.y = layerData.y;
            bitmap.scaleX = layerData.scaleX;
            bitmap.scaleY = layerData.scaleY;
            Log.trace('[ImageLayerKind] Bitmap added at position (${bitmap.x}, ${bitmap.y}) scale (${bitmap.scaleX}, ${bitmap.scaleY})');
        } else {
            Log.trace('[ImageLayerKind] WARNING: No image resource for image layer');
        }
        
        return {layer: layer, entities: []};
    }
} 