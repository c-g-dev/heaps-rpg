package editor.palette;

import js.html.Element;


interface Palette {
    
    function getElement(): Element;
    
    
    function getSelectedItem(): Dynamic;
    
    
    function setSelectedItem(item: Dynamic): Void;
    
    
    function clear(): Void;
    
    
    function addItem(item: Dynamic): Void;
    
    
    function removeItem(item: Dynamic): Void;
    
    
    function refresh(): Void;
    
    
    function onActivate(): Void;
    
    
    function onDeactivate(): Void;
    
    
    function show(): Void;
    
    
    function hide(): Void;
    
    
    function isVisible(): Bool;
} 