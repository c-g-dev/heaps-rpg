package heaps.rpg.rom;

import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.map.RPGMapLayer;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.rom.LoadRequests.RPGLayerLoadRequest;
import heaps.rpg.RPGWorld;
import heaps.rpg.map.RPGLocation;
import heaps.coroutine.Promise;
import heaps.rpg.warp.Warp.Warping;

@:using(heaps.rpg.rom.ROMDataExtensions)
class RPGWorldROM {
    public var maps: Array<RPGMapData>;
    public var entityKinds: Map<String, RPGEntityKind>;
    public var layerKinds: Map<String, RPGLayerKind>;
    public var metadata: Map<String, Dynamic>;
    public var postLoadJobs: Array<PostLoadJob>;

    public function new() {
        this.maps = [];
        this.entityKinds = new Map();
        this.layerKinds = new Map();
        this.metadata = new Map();
        this.postLoadJobs = [];
    }
}

class RPGEntityInstanceData {
    public var instanceUUID: String;
    public var kind: String;
    public var x: Int;
    public var y: Int;
    public var data: Dynamic;

    public function new(instanceUUID: String, kind: String, x: Int, y: Int, data: Dynamic) {
        this.instanceUUID = instanceUUID;
        this.kind = kind;
        this.x = x;
        this.y = y;
        this.data = data;
    }
}


abstract class RPGEntityKind {
    public var kind: String;
    public var data: Dynamic;

    public function new(kind: String, ?data: Dynamic) {
        this.kind = kind;
        this.data = data != null ? data : {};
    }

    
    public abstract function load(req: RPGEntityLoadRequest): RPGEntity;
}

class RPGMapData {
    public var name: String;
    public var tilesize: Int;
    public var gridWidth: Int;
    public var gridHeight: Int;
    public var layers: Array<RPGMapLayerData>;
    public var metadata: Map<String, Dynamic>;

    public function new(name: String, tilesize: Int, gridWidth: Int, gridHeight: Int) {
        this.name = name;
        this.tilesize = tilesize;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.layers = [];
        this.metadata = new Map();
    }
}


abstract class RPGLayerKind {
    public var kind: String;
    public var data: Dynamic;
    public var acceptsEntities: Bool;

    public function new(kind: String, acceptsEntities: Bool, ?data: Dynamic) {
        this.kind = kind;
        this.acceptsEntities = acceptsEntities;
        this.data = data != null ? data : {};
    }

    
    public abstract function load(req: RPGLayerLoadRequest): {layer: RPGMapLayer, entities: Array<RPGEntityInstanceData>};
}

class RPGMapLayerData<T = Dynamic> {
    public var name: String;
    public var kind: String;
    public var index: Int;
    public var data: T;

    public function new(name: String, kind: String, index: Int, data: T) {
        this.name = name;
        this.kind = kind;
        this.index = index;
        this.data = data;
    }
}


interface PostLoadJob {
    function execute(world: RPGWorld): Void;
    function getDescription(): String;
}


class GlobalWarpRegistrationJob implements PostLoadJob {
    public function new() {}
    
    public function execute(world: RPGWorld): Void {
        Log.trace('[GlobalWarpRegistration] Starting global warp registration across all maps');
        
        var warping = world.seek(Warping);
        if (warping == null) {
            Log.trace('[GlobalWarpRegistration] WARNING: No Warping component found, cannot register warps');
            return;
        }
        
        var totalWarpsFound = 0;
        var totalWarpsRegistered = 0;
        
        
        @:privateAccess for (mapData in world.rom.maps) {
            Log.trace('[GlobalWarpRegistration] Scanning map: ${mapData.name}');
            
            
            for (layerData in mapData.layers) {
                @:privateAccess var layerKind = world.rom.getLayerKind(layerData.kind);
                if (layerKind != null && layerKind.acceptsEntities) {
                    
                    
                    var rawLayerData = layerData.data;
                    
                    
                    if (Reflect.hasField(rawLayerData, "entities")) {
                        var entitiesArray: Array<Dynamic> = Reflect.field(rawLayerData, "entities");
                        if (entitiesArray != null) {
                            for (entityData in entitiesArray) {
                                
                                var entityKind: String = Reflect.field(entityData, "kind");
                                
                                
                                if (entityKind == "warp") {
                                    Log.trace('[GlobalWarpRegistration] DEBUG: Found warp entity structure: ${haxe.Json.stringify(entityData)}');
                                }
                                
                                if (entityKind == "warp") {
                                    totalWarpsFound++;
                                    
                                    
                                    var entityDataFields = Reflect.field(entityData, "data");
                                    if (entityDataFields != null) {
                                        Log.trace('[GlobalWarpRegistration] DEBUG: Entity data fields: ${haxe.Json.stringify(entityDataFields)}');
                                        var fieldValues = Reflect.field(entityDataFields, "fieldValues");
                                        
                                        if (fieldValues != null) {
                                            Log.trace('[GlobalWarpRegistration] DEBUG: Field values: ${haxe.Json.stringify(fieldValues)}');
                                            
                                            
                                            var fieldValuesMap: Map<String, Dynamic> = cast fieldValues;
                                            var warpId: String = fieldValuesMap.exists("id") ? Std.string(fieldValuesMap.get("id")) : "";
                                            
                                            if (warpId != "") {
                                                
                                                var entityX: Int = Reflect.field(entityData, "x");
                                                var entityY: Int = Reflect.field(entityData, "y");
                                                
                                                
                                                var atLocation = heaps.rpg.map.RPGLocation.onTile(
                                                    world,
                                                    entityX,
                                                    entityY,
                                                    mapData.name,
                                                    layerData.index
                                                );
                                                
                                                
                                                var toWarpId: String = fieldValuesMap.exists("to_warp") ? Std.string(fieldValuesMap.get("to_warp")) : "";
                                                var toLocation: heaps.rpg.warp.Warp.WarpLocation;
                                                
                                                if (toWarpId != "") {
                                                    toLocation = heaps.rpg.warp.Warp.WarpLocation.Warp(toWarpId);
                                                } else {
                                                    toLocation = heaps.rpg.warp.Warp.WarpLocation.Location(atLocation);
                                                }
                                                
                                                
                                                var warpTypeStr: String = fieldValuesMap.exists("warp_type") ? Std.string(fieldValuesMap.get("warp_type")) : "default";
                                                var warpType = createGlobalWarpType(warpTypeStr);
                                                
                                                
                                                var warp = new heaps.rpg.warp.Warp.Warp(warpId, atLocation, toLocation, warpType);
                                                warping.addWarpById(warpId, warp);
                                                totalWarpsRegistered++;
                                                
                                                Log.trace('[GlobalWarpRegistration] Registered warp "${warpId}" from ${mapData.name}:(${entityX},${entityY}) -> ${toLocation.toString()}');
                                            } else {
                                                var entityX: Int = Reflect.field(entityData, "x");
                                                var entityY: Int = Reflect.field(entityData, "y");
                                                Log.trace('[GlobalWarpRegistration] WARNING: Found warp without ID in ${mapData.name} at (${entityX},${entityY})');
                                                Log.trace('[GlobalWarpRegistration] DEBUG: fieldValuesMap was: ${[for (k in fieldValuesMap.keys()) k + "=" + fieldValuesMap.get(k)]}');
                                            }
                                        } else {
                                            var entityX: Int = Reflect.field(entityData, "x");
                                            var entityY: Int = Reflect.field(entityData, "y");
                                            Log.trace('[GlobalWarpRegistration] WARNING: Warp entity missing fieldValues in ${mapData.name} at (${entityX},${entityY})');
                                            Log.trace('[GlobalWarpRegistration] DEBUG: entityDataFields was: ${haxe.Json.stringify(entityDataFields)}');
                                        }
                                    } else {
                                        var entityX: Int = Reflect.field(entityData, "x");
                                        var entityY: Int = Reflect.field(entityData, "y");
                                        Log.trace('[GlobalWarpRegistration] WARNING: Warp entity missing data field in ${mapData.name} at (${entityX},${entityY})');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        Log.trace('[GlobalWarpRegistration] Completed: Found ${totalWarpsFound} warps, registered ${totalWarpsRegistered} with IDs');
    }
    
    public function getDescription(): String {
        return "Global Warp Registration";
    }
    
    private function createGlobalWarpType(warpTypeStr: String): heaps.rpg.warp.Warp.IWarpType {
        
        
        return switch (warpTypeStr.toLowerCase()) {
            case "door":
                
                new GlobalDoorPlaceholderType();
            case "instant" | "default" | "": 
                new GlobalDoorPlaceholderType(); 
            default:
                Log.trace('[GlobalWarpRegistration] Unknown warp type: ${warpTypeStr}, using placeholder');
                new GlobalDoorPlaceholderType();
        };
    }
}




class GlobalDoorPlaceholderType implements heaps.rpg.warp.Warp.IWarpType {
    public function new() {
        Log.trace('[GlobalDoorPlaceholderType] Created placeholder for door warp');
    }
    
    public function beforeExit(world: RPGWorld, warp: heaps.rpg.warp.Warp.Warp): heaps.coroutine.Promise {
        return heaps.coroutine.Promise.resolve();
    }
    
    public function afterExit(world: RPGWorld, warp: heaps.rpg.warp.Warp.Warp): heaps.coroutine.Promise {
        return heaps.coroutine.Promise.resolve();
    }
    
    public function beforeShow(world: RPGWorld, warp: heaps.rpg.warp.Warp.Warp): heaps.coroutine.Promise {
        return heaps.coroutine.Promise.resolve();
    }
    
    public function afterShow(world: RPGWorld, warp: heaps.rpg.warp.Warp.Warp): heaps.coroutine.Promise {
        return heaps.coroutine.Promise.resolve();
    }
}