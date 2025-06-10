package editor.palette;

import util.Image;
import editor.palette.Tile;


class Tileset {
    public var name: String;
    public var sourceImage: Image;
    public var tileWidth: Int;
    public var tileHeight: Int;
    public var tiles: Array<Tile>;
    
    public function new(name: String, sourceImage: Image, tileWidth: Int, tileHeight: Int) {
        this.name = name;
        this.sourceImage = sourceImage;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tiles = [];
        
        generateTiles();
    }
    
    
    private function generateTiles(): Void {
        var tilesPerRow = Math.floor(sourceImage.width / tileWidth);
        var tilesPerCol = Math.floor(sourceImage.height / tileHeight);
        
        var tileId = 0;
        for (row in 0...tilesPerCol) {
            for (col in 0...tilesPerRow) {
                var x = col * tileWidth;
                var y = row * tileHeight;
                var tile = new Tile(tileId, x, y, tileWidth, tileHeight, sourceImage);
                tiles.push(tile);
                tileId++;
            }
        }
    }
    
    
    public function getTile(id: Int): Tile {
        if (id >= 0 && id < tiles.length) {
            return tiles[id];
        }
        return null;
    }
    
    
    public function getTileCount(): Int {
        return tiles.length;
    }
    
    
    public function getWidth(): Int {
        return sourceImage.width;
    }
    
    
    public function getTileWidth(): Int {
        return tileWidth;
    }
    
    
    public static function fromImageElement(imageElement: js.html.ImageElement, tileWidth: Int, tileHeight: Int, ?name: String = "Tileset"): Tileset {
        var sourceImage = Image.fromImageElement(imageElement);
        return new Tileset(name, sourceImage, tileWidth, tileHeight);
    }
} 