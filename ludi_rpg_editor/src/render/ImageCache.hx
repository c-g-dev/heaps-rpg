package util;

abstract ImageCacheKey(String){
    function new(str: String) {
        this = str;
    }

    public static function fromFilepath(path : String): ImageCacheKey{
        return new ImageCacheKey("FILEPATH::" + path);
    }

    public inline function asString() : String {
        return cast this;
    }
}

class ImageCache {
    static var cache = new Map<String,js.html.ImageElement>();

    public static function set(key : ImageCacheKey, img : js.html.ImageElement) {
        cache.set(key.asString(), img);
    }

    public static function get(key : ImageCacheKey) : js.html.ImageElement {
        return cache.get(key.asString());
    }

    public static function clear() {
        cache = [];
    }
}