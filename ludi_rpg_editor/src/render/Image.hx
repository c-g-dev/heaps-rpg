package util;

import js.html.ImageElement;
import haxe.extern.EitherType;
import haxe.ds.Either;
import haxe.Timer;
import haxe.crypto.Base64;

using StringTools;


class Image {
	public var width(default, null) : Int;
	public var height(default, null) : Int;
	public var alpha(get, set) : Float;
	public var smooth(get, set) : Bool;

	var ctx : js.html.CanvasRenderingContext2D;
	var canvas : js.html.CanvasElement;
	
	
	var origin : Dynamic;
	var originX : Int = 0;
	var originY : Int = 0;

	public function new(w, h) {
		this.width = w;
		this.height = h;
		canvas = js.Browser.document.createCanvasElement();
		origin = canvas;
		canvas.width = w;
		canvas.height = h;
		init();
	}

	function get_smooth() {
		return ctx.imageSmoothingEnabled;
	}

	function set_smooth(v) {
		return ctx.imageSmoothingEnabled = v;
	}

	function get_alpha() {
		return ctx.globalAlpha;
	}

	function set_alpha(v) {
		return ctx.globalAlpha = v;
	}

	function init() {
		ctx = canvas.getContext2d();
		ctx.imageSmoothingEnabled = false;
	}

	function getColor( color : Int ) {
		 return color >>> 24 == 0xFF ? "#" + StringTools.hex(color&0xFFFFFF, 6) : "rgba(" + ((color >> 16) & 0xFF) + "," + ((color >> 8) & 0xFF) + "," + (color & 0xFF) + "," + ((color >>> 24) / 255) + ")";
	}

	public function getCanvas() {
		return canvas;
	}

	public function clear() {
		ctx.clearRect(0, 0, width, height);
		invalidate();
	}

	function invalidate() {
		if( origin == canvas ) return;
		origin = canvas;
		originX = originY = 0;
		origin.texture = null;
	}

	public function fill( color : Int ) {
		ctx.fillStyle = getColor(color);
		ctx.fillRect(0, 0, width, height);
		invalidate();
	}

	public function fillRect( x : Int, y : Int, w : Int, h : Int, color : Int ) {
		ctx.fillStyle = getColor(color);
		ctx.fillRect(x, y, w, h);
		invalidate();
	}

	public function drawCircle( x : Float, y : Float, r : Float, color : Int ) {
		ctx.strokeStyle = getColor(color);
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.stroke();
		invalidate();
	}


	public function sub( x : Int, y : Int, w : Int, h : Int ) {
		var i = new Image(w, h);
		i.ctx.drawImage(origin, x, y, w, h, 0, 0, w, h);
		i.origin = origin;
		i.originX = originX + x;
		i.originY = originY + y;
		return i;
	}

	public function text( text : String, x : Int, y : Int, color : Int = 0xFFFFFFFF ) {
		ctx.fillStyle =  getColor(color);
		ctx.font = "bold 16px Arial";
		ctx.textAlign = 'center';
		ctx.fillText(text, x, y + 8);
		invalidate();
	}

	public function draw( img: EitherType<Image, ImageData>, x : Int, y : Int ): Void {
		if(img is Image){
			var i: Image = img;
			ctx.drawImage(i.origin, i.originX, i.originY, i.width, i.height, x, y, i.width, i.height);
			invalidate();
		}
		else if(img is ImageData) {
			var i: ImageData = img;
			i.drawOnto(this, x, y);
		}
	}

	public function drawMat( i : Image, m : { a : Float, b : Float, c : Float, d : Float, x : Float, y : Float } ) {
		ctx.setTransform(m.a, m.b, m.c, m.d, m.x, m.y);
		draw(i, 0, 0);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	public function drawScaled( i : Image, x : Int, y : Int, width : Int, height : Int ) {
		ctx.drawImage(i.origin, i.originX, i.originY, i.width, i.height, x, y, width, height);
		invalidate();
	}

	public function drawSub( i : Image, srcX : Int, srcY : Int, srcW : Int, srcH : Int, x : Int, y : Int, dstW : Int = -1, dstH : Int = -1 ) {
		if( dstW < 0 ) dstW = srcW;
		if( dstH < 0 ) dstH = srcH;
		ctx.drawImage(i.origin, srcX + i.originX, srcY + i.originY, srcW, srcH, x, y, dstW, dstH);
		invalidate();
	}

	public function copyFrom( i : Image ) {
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(0, 0, width, height);
		ctx.drawImage(i.origin, i.originX, i.originY, i.width, i.height, 0, 0, width, height);
		invalidate();
	}

	public function isBlank() {
		var i = ctx.getImageData(0, 0, width, height);
		for( k in 0...width * height * 4 )
			if( i.data[k] != 0 ) return false;
		return true;
	}

	public function getPixel(x, y) {
		var i = ctx.getImageData(x, y, 1, 1);
		return (i.data[3]<<24) | (i.data[0] << 16) | (i.data[1] << 8) | i.data[2];
	}

	public function setSize( width, height ) {
		if( width == this.width && height == this.height )
			return;
		canvas.width = width;
		canvas.height = height;
		canvas.setAttribute("width", width + "px");
		canvas.setAttribute("height", height + "px");
		this.width = width;
		this.height = height;
		init();
		invalidate();
	}

	public function resize( width : Int, height : Int ) {
		if( width == this.width && height == this.height )
			return;
		var c = js.Browser.document.createCanvasElement();
		c.width = width;
		c.height = height;
		var ctx2 = c.getContext2d();
		ctx2.imageSmoothingEnabled = ctx.imageSmoothingEnabled;
		ctx2.drawImage(canvas, 0, 0, this.width, this.height, 0, 0, width, height);
		ctx = ctx2;
		canvas = c;
		this.width = width;
		this.height = height;
		invalidate();
	}

	

	public static function fromImageElement(i: ImageElement): Image {
		var img = new Image(i.width, i.height);
		img.ctx.drawImage(i, 0, 0);
		img.origin = i;
		return img;
	}


	public static function fromCanvas( c : js.html.CanvasElement ) {
		var i = new Image(0, 0);
		i.width = c.width;
		i.height = c.height;
		i.canvas = i.origin = c;
		i.init();
		return i;
	}
}

