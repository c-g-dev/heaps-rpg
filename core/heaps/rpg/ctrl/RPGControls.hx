package heaps.rpg.ctrl;

import dn.heaps.input.Controller;
import dn.heaps.input.ControllerAccess;

enum abstract RPGControlActions(Int) to Int {
    var MoveUp;
    var MoveDown;
    var MoveLeft;
    var MoveRight;
    var Action;
}

@:forward
abstract RPGControls(ControllerAccess<RPGControlActions>) to ControllerAccess<RPGControlActions> from ControllerAccess<RPGControlActions> {
    public static function get(): RPGControls {
        return RPGControlsManager.get();
    }

    public static function lock() {
        RPGControlsManager.lock();
    }

    public static function release() {
        RPGControlsManager.release();
    }
}

class RPGControlsManager {
    static var ctrl: Controller<RPGControlActions>;
    static var prime: RPGControls;
    static var didInit: Bool = false;

    public static function init() {
        if (didInit) return;
        ctrl = Controller.createFromAbstractEnum(RPGControlActions);
        ctrl.bindKeyboard(MoveUp, hxd.Key.UP);
        ctrl.bindKeyboard(MoveDown, hxd.Key.DOWN);
        ctrl.bindKeyboard(MoveLeft, hxd.Key.LEFT);
        ctrl.bindKeyboard(MoveRight, hxd.Key.RIGHT);
        ctrl.bindKeyboard(Action, hxd.Key.SPACE);
        prime = ctrl.createAccess();
        didInit = true;
    }

    public static function get(): RPGControls {
        if (!didInit) init();
        return ctrl.createAccess();
    }

    public static function lock() {
        prime.takeExclusivity();
    }

    public static function release() {
        prime.releaseExclusivity();
    }
}

