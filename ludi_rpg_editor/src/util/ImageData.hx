package util;

import js.html.CanvasElement;
import js.html.ImageElement;

class ImageData {
    var origin: {image: ImageElement, x: Int, y: Int, w: Int, h: Int};

    function new() {
        
    }

    public static function create(image: ImageElement, x: Int, y: Int, w: Int, h: Int): ImageData {
        var id = new ImageData();
        id.origin = {
            image: image,
            x: x,
            y: y,
            w: w,
            h: h
        };
        return id;
    }

    public function drawOnto( i : Image, x : Int, y : Int ) {
		@:privateAccess i.ctx.drawImage(origin.image, origin.x, origin.y, origin.w, origin.h, x, y, origin.w, origin.h);
		@:privateAccess i.invalidate();
    }

    public function drawOntoCanvas( c : CanvasElement, x : Int, y : Int ) {
        @:privateAccess c.getContext2d().drawImage(origin.image, origin.x, origin.y, origin.w, origin.h, x, y, origin.w, origin.h);
    }

    public function getImageSrc(): String {
        return origin.image.src;
    }

    

    var i: Image;
    public function createImage(): Image {
        if(i != null) return i;
        i = new Image(origin.w, origin.h);
		@:privateAccess i.ctx.drawImage(origin.image, origin.x, origin.y, origin.w, origin.h, 0,0, origin.w, origin.h);
        @:privateAccess i.invalidate();
		return i;
        
    }

    public function width(): Int {
        return origin.w;
    }

    public function height(): Int {
        return origin.h;
    }
} 