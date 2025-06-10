package editor.layers;

import js.html.CanvasRenderingContext2D;
import editor.palette.Palette;


interface Layer {
    
    var id: String;
    
    
    var name: String;
    
    
    var visible: Bool;
    
    
    var opacity: Float;
    
    
    var type: String;
    
    
    var tags: Array<String>;
    
    
    function render(ctx: CanvasRenderingContext2D, viewX: Float, viewY: Float, zoom: Float): Void;
    
    
    function onMouseDown(worldX: Float, worldY: Float, button: Int): Bool;
    
    
    function onMouseMove(worldX: Float, worldY: Float): Bool;
    
    
    function onMouseUp(worldX: Float, worldY: Float, button: Int): Bool;
    
    
    function serialize(): Dynamic;
    
    
    function deserialize(data: Dynamic, deserializeCallback: Void -> Void): Void;
    
    
    function createPropertyPanel(): js.html.Element;
    
    
    function onToolChanged(toolId: String): Void;
    
    
    function getPreviewCanvas(width: Int, height: Int): js.html.CanvasElement;
    
    
    function getPalette(): Palette;
    
    
    function setPalette(palette: Palette): Void;
    
    
    function addTag(tag: String): Bool;
    
    
    function removeTag(tag: String): Bool;
    
    
    function hasTag(tag: String): Bool;
    
    
    function getTags(): Array<String>;
    
    
    function setTags(tags: Array<String>): Void;
} 