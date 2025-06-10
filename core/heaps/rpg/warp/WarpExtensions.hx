package heaps.rpg.warp;

import heaps.rpg.warp.Warp.WarpLocation;
import heaps.rpg.warp.Warp.Warping;
import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGLocation;

class WarpExtensions {

    public static function toString(location: WarpLocation): String {
        switch (location) {
            case Warp(warpId):
                return 'Warp(${warpId})';
            case Location(loc):
                return 'Location(${loc.toString()})';
        }
    }

    public static function resolveLocation(location: WarpLocation, world: RPGWorld): RPGLocation {
        switch (location) {
            case Warp(warpId):
                Log.trace('[WarpExtensions] Resolving warp ID: ${warpId}');
                var warping = world.seek(Warping);
                if (warping != null) {
                    var warp = warping.getWarpById(warpId);
                    if (warp != null) {
                        Log.trace('[WarpExtensions] Resolved warp ID ${warpId} to location: ${warp.atLocation.toString()}');
                        return warp.atLocation;
                    } else {
                        Log.trace('[WarpExtensions] WARNING: Could not find warp with ID: ${warpId}');
                        return null;
                    }
                } else {
                    Log.trace('[WarpExtensions] WARNING: No Warping component found to resolve warp ID: ${warpId}');
                    return null;
                }
            case Location(loc):
                Log.trace('[WarpExtensions] Using direct location: ${loc.toString()}');
                return loc;
        }
    }

    public static function getMapName(location: WarpLocation, world: RPGWorld): String {
        var resolvedLocation = resolveLocation(location, world);
        return resolvedLocation != null ? resolvedLocation.map : null;
    }

    public static function getPosition(location: WarpLocation, world: RPGWorld): {x: Int, y: Int} {
        var resolvedLocation = resolveLocation(location, world);
        return resolvedLocation != null ? {x: resolvedLocation.gridX, y: resolvedLocation.gridY} : null;
    }
}