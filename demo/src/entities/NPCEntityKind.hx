package entities;

import heaps.rpg.rom.ROMData.RPGEntityKind;
import heaps.rpg.rom.LoadRequests.RPGEntityLoadRequest;
import heaps.rpg.ntt.RPGEntity;

class NPCEntityKind extends RPGEntityKind {
    public function new() {
        super("npc");
    }
    
    public function load(req: RPGEntityLoadRequest): RPGEntity {
        
        Log.trace('[NPCEntityKind] NPC creation not yet implemented');
        return null;
    }
} 