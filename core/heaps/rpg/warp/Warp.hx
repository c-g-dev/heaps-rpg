package heaps.rpg.warp;

import heaps.coroutine.Promise;
import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGLocation;
import heaps.rpg.comp.RPGWorldComponent;


class Warp {
    public var id: String;
    public var atLocation: RPGLocation;
    public var toLocation: WarpLocation;
    public var warpType: IWarpType;

    public function new(id: String, atLocation: RPGLocation, toLocation: WarpLocation, warpType: IWarpType) {
        this.id = id;
        this.atLocation = atLocation;
        this.toLocation = toLocation;
        this.warpType = warpType;
        Log.trace('[Warp] Created warp from ${atLocation?.map}:(${atLocation?.gridX},${atLocation?.gridY}) to ${toLocation} with type ${Type.getClassName(Type.getClass(warpType))}');
    }
}

interface IWarpType {
    function beforeExit(world: RPGWorld, warp: Warp): Promise;
    function afterExit(world: RPGWorld, warp: Warp): Promise;
    function beforeShow(world: RPGWorld, warp: Warp): Promise;
    function afterShow(world: RPGWorld, warp: Warp): Promise;
}

@:using(heaps.rpg.warp.WarpExtensions)
enum WarpLocation {
    Warp(warpId: String);
    Location(loc: RPGLocation);
}

class Warping extends RPGWorldComponent {
    var warpLookup: Map<String, Warp>; 

    public function addWarp(warp: Warp) {
        warpLookup.set(warp.id, warp);
        Log.trace('[Warping] Added warp at location: ${warp.atLocation.map}:(${warp.atLocation.gridX},${warp.atLocation.gridY}) -> ${warp.toLocation}');
    }
    
    public function addWarpById(id: String, warp: Warp) {
        warp.id = id; 
        warpLookup.set(id, warp);
        Log.trace('[Warping] Added warp by ID "$id" at location: ${warp.atLocation.map}:(${warp.atLocation.gridX},${warp.atLocation.gridY}) -> ${warp.toLocation}');
    }
    
    public function getWarpById(id: String): Warp {
        var warp = warpLookup.get(id);
        if (warp != null) {
            Log.trace('[Warping] Retrieved warp by ID "$id": ${warp.atLocation.map}:(${warp.atLocation.gridX},${warp.atLocation.gridY})');
        } else {
            Log.trace('[Warping] WARNING: No warp found with ID "$id"');
        }
        return warp;
    }

    public function getWarpAt(loc: RPGLocation): Warp {
        Log.trace('[Warping] Looking for warp at location: ${loc.map}:(${loc.gridX},${loc.gridY})');
        for (warp in warpLookup) {
            if (warp.atLocation.equals(loc)) {
                Log.trace('[Warping] Found warp at location: ${loc.map}:(${loc.gridX},${loc.gridY}) -> ${warp.toLocation}');
                return warp;
            }
        }
        Log.trace('[Warping] No warp found at location: ${loc.map}:(${loc.gridX},${loc.gridY})');
        return null;
    }
    
    public function getAllWarps(): Array<Warp> {
        var warpsArray = [for (warp in warpLookup) warp];
        Log.trace('[Warping] Retrieved all warps (${warpsArray.length} total)');
        return warpsArray;
    }

    public function onAttached(): Void {
        warpLookup = new Map();
        Log.trace('[Warping] Warping component attached and initialized');
    }
    
    public function onDetached(): Void {
        Log.trace('[Warping] Warping component detached');
    }
}