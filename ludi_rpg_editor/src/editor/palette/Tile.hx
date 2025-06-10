package editor.palette;

import util.Image;


class Tile {
    public var id: Int;
    public var x: Int;
    public var y: Int;
    public var width: Int;
    public var height: Int;
    public var sourceImage: Image;
    public var preview: Image;
    
    public function new(id: Int, x: Int, y: Int, width: Int, height: Int, sourceImage: Image) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sourceImage = sourceImage;
        
        
        this.preview = sourceImage.sub(x, y, width, height);
    }
    
    
    public function drawTo(target: Image, destX: Int, destY: Int): Void {
        target.draw(preview, destX, destY);
    }
    
    
    public function getPreviewCanvas(): js.html.CanvasElement {
        return preview.getCanvas();
    }
} 