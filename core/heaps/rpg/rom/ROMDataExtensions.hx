package heaps.rpg.rom;

import heaps.rpg.rom.ROMData;

class ROMDataExtensions {
    public static function getLayerKind(rom: RPGWorldROM, layerKind: String): RPGLayerKind {
        return rom.layerKinds.get(layerKind);
    }

    public static function getEntityKind(rom: RPGWorldROM, entityKind: String): RPGEntityKind {
        return rom.entityKinds.get(entityKind);
    }

    public static function getMapData(rom: RPGWorldROM, map: String): RPGMapData {
        for(eachMap in rom.maps) {
            if(eachMap.name == map) {
                return eachMap;
            }
        }
        return null;
    }

}
