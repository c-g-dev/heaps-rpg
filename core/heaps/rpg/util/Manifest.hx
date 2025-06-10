package heaps.rpg.util;

enum Manifest<S = h2d.Object, V = Dynamic> {
    Sprite(obj: S);
    Virtual(data: V);
}

