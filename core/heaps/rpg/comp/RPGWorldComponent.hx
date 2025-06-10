package heaps.rpg.comp;

abstract class RPGWorldComponent {
    public var world: RPGWorld;

    public function attach(world: RPGWorld): Void {
        this.world = world;
        this.onAttached();
    }

    public function detach(): Void {
        this.onDetached();
        this.world = null;
    }

    public abstract function onAttached(): Void;
    public abstract function onDetached(): Void;
}