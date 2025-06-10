package entities;

import heaps.rpg.rom.ROMData.RPGEntityKind;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.warp.Warp;
import heaps.rpg.warp.Warp.Warping;
import heaps.rpg.warp.Warp.WarpLocation;
import heaps.rpg.warp.Warp.IWarpType;
import heaps.rpg.warp.WarpTile;
import heaps.rpg.warp.DefaultWarpType;
import heaps.rpg.map.RPGLocation;
import heaps.coroutine.Promise;
import heaps.rpg.RPGWorld;

class WarpEntityKind extends RPGEntityKind {
    public function new() {
        super("warp");
    }
    
    public function load(req: RPGEntityLoadRequest): RPGEntity {
        
        var fieldValues: Map<String, Dynamic> = req.instanceData.data.fieldValues;
        
        
        var warpId: String = fieldValues.exists("id") ? Std.string(fieldValues.get("id")) : "";
        var toWarpId: String = fieldValues.exists("to_warp") ? Std.string(fieldValues.get("to_warp")) : "";
        var warpTypeStr: String = fieldValues.exists("warp_type") ? Std.string(fieldValues.get("warp_type")) : "default";
        
        Log.trace('[WarpEntityKind] Processing warp entity: id=${warpId}, to_warp=${toWarpId}, type=${warpTypeStr}');

        
        var atLocation = new RPGLocation(req.world);
        atLocation.gridX = req.instanceData.x;
        atLocation.gridY = req.instanceData.y;
        atLocation.map = req.world.map.id;
        atLocation.layer = 0; 

        Log.trace('atLocation: ${atLocation}');
        
        
        var toLocation: WarpLocation = null;
        
        Log.trace('toWarpId: ${toWarpId}');
        if (toWarpId != "") {
            
            toLocation = WarpLocation.Warp(toWarpId);
            Log.trace('[WarpEntityKind] Warp entity ${warpId} will target warp ID: ${toWarpId}');
        } else {
            
            toLocation = WarpLocation.Location(atLocation);
            Log.trace('[WarpEntityKind] Warp entity ${warpId} has no destination, using self-location');
        }
        
        
        var warpType: IWarpType = createWarpType(warpTypeStr);
        
        
        var warp = new Warp(warpId, atLocation, toLocation, warpType);
        
        
        
        
        
        Log.trace('warpTypeStr: ${warpTypeStr}');
        return switch (warpTypeStr.toLowerCase()) {
            case "door":
                
                var door = new entities.Door(req.world, warpId, toLocation);
                door;
            case "default" | "":
                
                var warpTile = new heaps.rpg.warp.WarpTile(req.world, warp);
                warpTile;
            default:
                
                Log.trace('[WarpEntityKind] Warp type ${warpTypeStr} not yet implemented, creating WarpTile as fallback');
                var warpTile = new heaps.rpg.warp.WarpTile(req.world, warp);
                warpTile;
        };
    }
    
    
    private function createWarpType(warpTypeStr: String): IWarpType {
        return switch (warpTypeStr.toLowerCase()) {
            case "instant" | "default" | "": 
                new heaps.rpg.warp.DefaultWarpType();
            default:
                Log.trace('[WarpEntityKind] Unknown warp type: ${warpTypeStr}, using DefaultWarpType');
                new heaps.rpg.warp.DefaultWarpType();
        };
    }
}

 