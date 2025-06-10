import js.Browser;
import js.html.Element;
import editor.MapEditor;

class Main {
    static function main() {
        
        Browser.window.addEventListener("DOMContentLoaded", function() {
            var editor = new MapEditor();
            editor.initialize();
        });
    }
} 