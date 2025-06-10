
import heaps.rpg.ntt.RPGEntity;
import heaps.rpg.RPGWorld;
import heaps.rpg.ntt.RPGEntity.RPGSprite;
import heaps.rpg.walk.Walking;
import heaps.rpg.walk.WalkingBehavior;
import heaps.rpg.walk.WalkingController.ProgrammaticWalk;
import heaps.rpg.walk.WalkingController.WalkPath;
import hxd.Res;
import heaps.rpg.interact.OnInteractBehavior;

class NPCEntity extends RPGSprite {
    private var walkController: ProgrammaticWalk;
    private var onInteractCallback: RPGEntity -> Void;
    private var currentPath: WalkPath;
    private var pathIndex: Int = 0;

    public function new(world: RPGWorld, uuid: String, ?onInteract: RPGEntity -> Void) {
        super(world, uuid);
        this.onInteractCallback = onInteract != null ? onInteract : (e) -> {};
        
        
        var ws = new WalkingSpritesheet(Res.spritesheet.toTile(), (a) -> {
            switch(a) {
                case walk_up: {
                    return [{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 4, y: 0}];
                }
                case walk_down: {
                    return [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 1, y: 0}];
                }
                case walk_left: {
                    return [{x: 6, y: 0},{x: 7, y: 0},{x: 8, y: 0},{x: 7, y: 0}];
                }
                case walk_right: {
                    return [{x: 9, y: 0},{x: 10, y: 0},{x: 11, y: 0},{x: 10, y: 0}];
                }
                case idle_up: {
                    return [{x: 4, y: 0}];
                }
                case idle_down: {
                    return [{x: 1, y: 0}];
                }
                case idle_left: {
                    return [{x: 7, y: 0}];
                }
                case idle_right: {
                    return [{x: 10, y: 0}];
                }
            }
        });
        ws.cols = 12;
        ws.rows = 1;
        ws.offsetX = 1;
        ws.offsetY = 0;
        ws.paddingX = 0;
        ws.paddingY = 0;
        
        
        Walking.inject(this, ws);
        
        
        walkController = new ProgrammaticWalk();
        var walking = this.behaviors.get(WalkingBehavior);
        walking.setController(walkController);
        this.tags.push("solid");
        this.behaviors.add(new OnInteractBehavior(onInteractCallback));

        
        startCircleWalk();
    }
    
    var isReversing: Bool = false;
    private function startCircleWalk(): Void {
        

        if(isReversing){
            currentPath = new WalkPath()
            .up(2)
            .left(2)
            .down(2)
            .right(2);
        } else {
            currentPath = new WalkPath()
            .right(2)
            .down(2)
            .left(2)
            .up(2);
        }

            
        walkController.walk(currentPath, () -> {
            
            startCircleWalk();
        });
    }

    public function reverseWalk(): Void {
        isReversing = !isReversing;
        walkController.forceComplete();
        startCircleWalk();
    }
}
