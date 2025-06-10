package editor.ui;

import js.Browser;
import js.html.Element;
import js.html.XMLHttpRequest;
import editor.MapEditor;
import editor.layers.TileLayer;
import editor.layers.ImageLayer;
import editor.layers.IntGridLayer;
import editor.layers.ObjectLayer;
import editor.ui.ObjectDatabaseEditor;
import editor.ui.TagEditor;
import editor.ui.GridOptionsEdit;
import editor.commands.LayerCommands.AddLayerCommand;
import editor.commands.LayerCommands.RemoveLayerCommand;

class TopToolbar {
    private var editor: MapEditor;
    private var element: Element;
    private var objectDatabaseEditor: ObjectDatabaseEditor;
    private var tagEditor: TagEditor;
    private var gridOptionsEdit: GridOptionsEdit;
    
    public function new(editor: MapEditor) {
        this.editor = editor;
        this.objectDatabaseEditor = null;
        this.tagEditor = null;
        this.gridOptionsEdit = null;
        loadTemplate();
    }
    
    private function loadTemplate(): Void {
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "TopToolbar.html", false); 
        xhr.send();
        
        var container = Browser.document.createDivElement();
        container.innerHTML = xhr.responseText;
        element = container.firstElementChild;
        
        setupEventListeners();
    }
    
    private function setupEventListeners(): Void {
        
        addClickListener("new-map", onNewMap);
        addClickListener("open-map", onOpenMap);
        addClickListener("save-map", onSaveMap);
        addClickListener("save-map-as", onSaveMapAs);
        addClickListener("export-template", onExportTemplate);
        addClickListener("load-template", onLoadTemplate);
        addClickListener("export-map", onExportMap);
        
        
        addClickListener("undo", onUndo);
        addClickListener("redo", onRedo);
        addClickListener("cut", onCut);
        addClickListener("copy", onCopy);
        addClickListener("paste", onPaste);
        
        
        addClickListener("zoom-in", onZoomIn);
        addClickListener("zoom-out", onZoomOut);
        addClickListener("zoom-fit", onZoomFit);
        addClickListener("zoom-100", onZoom100);
        addClickListener("toggle-grid", onToggleGrid);
        
        
        addClickListener("add-tile-layer", onAddTileLayer);
        addClickListener("add-object-layer", onAddObjectLayer);
        addClickListener("add-image-layer", onAddImageLayer);
        addClickListener("add-intgrid-layer", onAddIntGridLayer);
        addClickListener("duplicate-layer", onDuplicateLayer);
        addClickListener("delete-layer", onDeleteLayer);
        
        
        addClickListener("manage-tags", onManageTags);
        
        
        addClickListener("grid-settings", onGridSettings);
        
        
        addClickListener("edit-objects", onEditObjects);
        
        
        addClickListener("run-unit-test", onRunUnitTest);
    }
    
    private function addClickListener(id: String, handler: Void -> Void): Void {
        var elem = element.querySelector("#" + id);
        if (elem != null) {
            elem.addEventListener("click", function(e) {
                e.preventDefault();
                handler();
            });
        }
    }
    
    public function getElement(): Element {
        return element;
    }
    
    
    private function onNewMap(): Void {
        
        var confirmed = Browser.window.confirm("Create a new map? This will clear the current map. Make sure to save first if needed.");
        
        if (confirmed) {
            editor.createNewMap();
        }
    }
    
    private function onOpenMap(): Void {
        
        var fileInput = Browser.document.createInputElement();
        fileInput.type = "file";
        fileInput.accept = ".zip";
        fileInput.style.display = "none";
        
        fileInput.addEventListener("change", function(e) {
            var files = fileInput.files;
            if (files.length > 0) {
                loadMapFromZip(files[0]);
            }
            Browser.document.body.removeChild(fileInput);
        });
        
        
        Browser.document.body.appendChild(fileInput);
        fileInput.click();
    }
    
    private function loadMapFromZip(file: js.html.File): Void {
        
        var jsZip = js.Syntax.code("new JSZip()");
        var promise = js.Syntax.code("{0}.loadAsync({1})", jsZip, file);
        var self = this;
        
        js.Syntax.code("{0}.then(function(zip) {
            
            var mapJsonFile = zip.file('map.json');
            if (!mapJsonFile) {
                alert('Invalid map file: map.json not found');
                return;
            }
            
            
            mapJsonFile.async('string').then(function(mapJsonContent) {
                try {
                    var mapData = JSON.parse(mapJsonContent);
                    {1}.loadMapFromData(mapData, zip);
                } catch (error) {
                    alert('Invalid map file: Could not parse map.json - ' + error.message);
                }
            });
        }).catch(function(error) {
            alert('Could not open zip file: ' + error.message);
        })", promise, self);
    }
    
    public function loadMapFromData(mapData: Dynamic, zip: Dynamic): Void {
        var resources = new Map<String, String>();
        var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
        
        if (resourcesFolder != null) {
            loadResourcesFromZip(resourcesFolder, resources, function() {
                editor.loadMap(mapData, resources);
            });
        } else {
            
            editor.loadMap(mapData, resources);
        }
    }
    
    private function loadResourcesFromZip(resourcesFolder: Dynamic, resources: Map<String, String>, callback: Void -> Void): Void {
        var pendingResources = 0;
        var loadedResources = 0;
        var self = this;
        
        
        js.Syntax.code("{0}.forEach(function(relativePath, file) {
            if (!file.dir) {
                {1}++;
            }
        })", resourcesFolder, pendingResources);
        
        if (pendingResources == 0) {
            callback();
            return;
        }
        
        
        js.Syntax.code("{0}.forEach(function(relativePath, file) {
            if (!file.dir) {
                file.async('base64').then(function(data) {
                    var dataUrl = 'data:image/png;base64,' + data;
                    {1}.addResourceToMap(relativePath, dataUrl, {2});
                    {3}++;
                    
                    if ({3} >= {4}) {
                        {5}();
                    }
                }).catch(function(error) {
                    console.error('Error loading resource:', relativePath, error);
                    {3}++;
                    if ({3} >= {4}) {
                        {5}();
                    }
                });
            }
        })", resourcesFolder, self, resources, loadedResources, pendingResources, callback);
    }
    
    public function addResourceToMap(filename: String, dataUrl: String, resources: Map<String, String>): Void {
        resources.set(filename, dataUrl);
    }
    
    public function checkAndLoadMap(mapData: Dynamic, resources: Map<String, String>): Void {
        
        editor.loadMap(mapData, resources);
    }
    
    private function onSaveMap(): Void {
        
        Log.trace("onSaveMap");
        var mapData = editor.serializeMap();
        var resources = editor.collectResources();
        Log.trace("resources: " + resources);
        
        
        createAndDownloadZip(mapData, resources, "map.zip");
    }
    
    private function onSaveMapAs(): Void {
        
        var filename = Browser.window.prompt("Enter filename for the map (without extension):", "my_map");
        
        if (filename != null && filename != "") {
            
            filename = ~/[^a-zA-Z0-9_-]/g.replace(filename, "_");
            
            
            var mapData = editor.serializeMap();
            var resources = editor.collectResources();
            
            
            createAndDownloadZip(mapData, resources, filename + ".zip");
        }
    }
    
    private function createAndDownloadZip(mapData: Dynamic, resources: Map<String, String>, zipFilename: String = "map.zip"): Void {
        
        var zip = js.Syntax.code("new JSZip()");
        
        
        var mapJsonString = haxe.Json.stringify(mapData, null, "  ");
        js.Syntax.code("{0}.file('map.json', {1})", zip, mapJsonString);
        
        
        if (resources.keys().hasNext()) {
            var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
            
            for (filename in resources.keys()) {
                var dataUrl = resources.get(filename);
                
                
                var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
                
                
                js.Syntax.code("{0}.file({1}, {2}, {base64: true})", resourcesFolder, filename, base64Data);
            }
        }
        
        
        var promise = js.Syntax.code("{0}.generateAsync({type: 'blob'})", zip);
        js.Syntax.code("{0}.then(function(content) {
            
            var url = URL.createObjectURL(content);
            var a = document.createElement('a');
            a.href = url;
            a.download = {0};
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })", promise, zipFilename);
    }
    
    private function onExportMap(): Void {
        
        Log.trace("Export Map");
    }
    
    
    private function onExportTemplate(): Void {
        
        var filename = Browser.window.prompt("Enter filename for the template (without extension):", "my_template");
        
        if (filename != null && filename != "") {
            
            filename = ~/[^a-zA-Z0-9_-]/g.replace(filename, "_");
            
            
            var templateData = {
                version: "1.0",
                objectDatabase: editor.getGlobalObjectDatabase().serialize(),
                tagManager: editor.getTagManager().serialize(),
                timestamp: Date.now().getTime()
            };
            
            
            var resources = collectObjectResources();
            
            
            createAndDownloadTemplateZip(templateData, resources, filename + ".template.zip");
        }
    }
    
    private function onLoadTemplate(): Void {
        
        var fileInput = Browser.document.createInputElement();
        fileInput.type = "file";
        fileInput.accept = ".zip";
        fileInput.style.display = "none";
        
        fileInput.addEventListener("change", function(e) {
            var files = fileInput.files;
            if (files.length > 0) {
                loadTemplateFromZip(files[0]);
            }
            Browser.document.body.removeChild(fileInput);
        });
        
        
        Browser.document.body.appendChild(fileInput);
        fileInput.click();
    }
    
    
    private function onUndo(): Void {
        if (editor.canUndo()) {
            var description = editor.getUndoDescription();
            Log.trace("Undoing: " + description);
            editor.undo();
        } else {
            Log.trace("Nothing to undo");
        }
    }
    
    private function onRedo(): Void {
        if (editor.canRedo()) {
            var description = editor.getRedoDescription();
            Log.trace("Redoing: " + description);
            editor.redo();
        } else {
            Log.trace("Nothing to redo");
        }
    }
    
    private function onCut(): Void {
        
        Log.trace("Cut");
    }
    
    private function onCopy(): Void {
        
        Log.trace("Copy");
    }
    
    private function onPaste(): Void {
        
        Log.trace("Paste");
    }
    
    
    private function onZoomIn(): Void {
        var currentZoom = editor.getZoom();
        editor.setView(editor.getViewX(), editor.getViewY(), currentZoom * 1.25);
    }
    
    private function onZoomOut(): Void {
        var currentZoom = editor.getZoom();
        editor.setView(editor.getViewX(), editor.getViewY(), currentZoom / 1.25);
    }
    
    private function onZoomFit(): Void {
        
        Log.trace("Zoom Fit");
    }
    
    private function onZoom100(): Void {
        editor.setView(editor.getViewX(), editor.getViewY(), 1.0);
    }
    
    private function onToggleGrid(): Void {
        
        Log.trace("Toggle Grid");
    }
    
    
    private function onAddTileLayer(): Void {
        var layer = new TileLayer(editor);
        var command = new AddLayerCommand(editor, layer);
        editor.executeCommand(command);
    }
    
    private function onAddObjectLayer(): Void {
        var layer = new ObjectLayer(editor);
        var command = new AddLayerCommand(editor, layer);
        editor.executeCommand(command);
    }
    
    private function onAddImageLayer(): Void {
        var layer = new ImageLayer(editor);
        var command = new AddLayerCommand(editor, layer);
        editor.executeCommand(command);
    }
    
    private function onAddIntGridLayer(): Void {
        var layer = new IntGridLayer(editor);
        var command = new AddLayerCommand(editor, layer);
        editor.executeCommand(command);
    }
    
    private function onDuplicateLayer(): Void {
        
        Log.trace("Duplicate Layer");
    }
    
    private function onDeleteLayer(): Void {
        var currentIndex = editor.getCurrentLayerIndex();
        if (currentIndex >= 0) {
            var command = new RemoveLayerCommand(editor, currentIndex);
            editor.executeCommand(command);
        }
    }
    
    
    private function onManageTags(): Void {
        if (tagEditor == null) {
            tagEditor = new TagEditor(editor);
        }
        tagEditor.show();
    }
    
    
    private function onGridSettings(): Void {
        if (gridOptionsEdit == null) {
            gridOptionsEdit = new GridOptionsEdit(editor);
        }
        gridOptionsEdit.show();
    }
    
    
    private function onEditObjects(): Void {
        if (objectDatabaseEditor == null) {
            objectDatabaseEditor = new ObjectDatabaseEditor(editor);
        }
        objectDatabaseEditor.show();
    }
    
    
    private function onRunUnitTest(): Void {
        Log.trace("Starting unit test...");
        runSaveLoadTest();
    }
    
    private function runSaveLoadTest(): Void {
        try {
            
            Log.trace("Step 1: Creating first zip file...");
            var mapData1 = editor.serializeMap();
            var resources1 = editor.collectResources();
            
            createZipBlob(mapData1, resources1, function(firstZipBlob) {
                Log.trace("Step 2: Loading from first zip...");
                
                
                loadMapFromZipBlob(firstZipBlob, function() {
                    Log.trace("Step 3: Creating second zip file...");
                    
                    
                    var mapData2 = editor.serializeMap();
                    var resources2 = editor.collectResources();
                    
                    createZipBlob(mapData2, resources2, function(secondZipBlob) {
                        Log.trace("Step 4: Comparing zip files...");
                        
                        
                        compareZipBlobs(firstZipBlob, secondZipBlob, function(areEqual) {
                            if (areEqual) {
                                Log.trace("✓ Unit test PASSED: Save/Load round-trip successful!");
                                Browser.window.alert("✓ Unit test PASSED: Save/Load round-trip successful!");
                            } else {
                                Log.trace("✗ Unit test FAILED: Zip files are different after round-trip!");
                                Browser.window.alert("✗ Unit test FAILED: Zip files are different after round-trip!");
                            }
                        });
                    });
                });
            });
            
        } catch (error: Dynamic) {
            Log.trace("Unit test ERROR: " + error);
            Browser.window.alert("Unit test ERROR: " + error);
        }
    }
    
    private function createZipBlob(mapData: Dynamic, resources: Map<String, String>, callback: js.html.Blob -> Void): Void {
        
        var zip = js.Syntax.code("new JSZip()");
        
        
        var mapJsonString = haxe.Json.stringify(mapData, null, "  ");
        js.Syntax.code("{0}.file('map.json', {1})", zip, mapJsonString);
        
        
        if (resources.keys().hasNext()) {
            var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
            
            for (filename in resources.keys()) {
                var dataUrl = resources.get(filename);
                
                
                var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
                
                
                js.Syntax.code("{0}.file({1}, {2}, {base64: true})", resourcesFolder, filename, base64Data);
            }
        }
        
        
        var promise = js.Syntax.code("{0}.generateAsync({type: 'blob'})", zip);
        js.Syntax.code("{0}.then(function(content) {
            {1}(content);
        })", promise, callback);
    }
    
    private function loadMapFromZipBlob(zipBlob: js.html.Blob, callback: Void -> Void): Void {
        
        var jsZip = js.Syntax.code("new JSZip()");
        var promise = js.Syntax.code("{0}.loadAsync({1})", jsZip, zipBlob);
        var self = this;
        
        js.Syntax.code("{0}.then(function(zip) {
            
            var mapJsonFile = zip.file('map.json');
            if (!mapJsonFile) {
                throw 'Invalid map file: map.json not found';
            }
            
            
            mapJsonFile.async('string').then(function(mapJsonContent) {
                try {
                    var mapData = JSON.parse(mapJsonContent);
                    {1}.loadMapFromZipData(mapData, zip, {2});
                } catch (error) {
                    throw 'Invalid map file: Could not parse map.json - ' + error.message;
                }
            });
        }).catch(function(error) {
            throw 'Could not open zip blob: ' + error.message;
        })", promise, self, callback);
    }
    
    public function loadMapFromZipData(mapData: Dynamic, zip: Dynamic, callback: Void -> Void): Void {
        var resources = new Map<String, String>();
        var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
        
        if (resourcesFolder != null) {
            loadResourcesFromZip(resourcesFolder, resources, function() {
                editor.loadMap(mapData, resources);
                callback();
            });
        } else {
            
            editor.loadMap(mapData, resources);
            callback();
        }
    }
    
    private function compareZipBlobs(blob1: js.html.Blob, blob2: js.html.Blob, callback: Bool -> Void): Void {
        
        var reader1 = js.Syntax.code("new FileReader()");
        var reader2 = js.Syntax.code("new FileReader()");
        
        var buffer1: js.lib.ArrayBuffer = null;
        var buffer2: js.lib.ArrayBuffer = null;
        
        var checkComparison = function() {
            if (buffer1 != null && buffer2 != null) {
                
                if (buffer1.byteLength != buffer2.byteLength) {
                    Log.trace("Different sizes: " + buffer1.byteLength + " vs " + buffer2.byteLength);
                    callback(false);
                    return;
                }
                
                
                var view1 = js.Syntax.code("new Uint8Array({0})", buffer1);
                var view2 = js.Syntax.code("new Uint8Array({0})", buffer2);
                
                for (i in 0...buffer1.byteLength) {
                    var byte1 = js.Syntax.code("{0}[{1}]", view1, i);
                    var byte2 = js.Syntax.code("{0}[{1}]", view2, i);
                    if (byte1 != byte2) {
                        Log.trace("Different bytes at position " + i + ": " + byte1 + " vs " + byte2);
                        callback(false);
                        return;
                    }
                }
                
                Log.trace("Zip files are identical!");
                callback(true);
            }
        };
        
        js.Syntax.code("{0}.onload = function(e) {
            {1} = e.target.result;
            {2}();
        }", reader1, buffer1, checkComparison);
        
        js.Syntax.code("{0}.onload = function(e) {
            {1} = e.target.result;
            {2}();
        }", reader2, buffer2, checkComparison);
        
        js.Syntax.code("{0}.readAsArrayBuffer({1})", reader1, blob1);
        js.Syntax.code("{0}.readAsArrayBuffer({1})", reader2, blob2);
    }
    
    
    private function collectObjectResources(): Map<String, String> {
        var resources = new Map<String, String>();
        var objectDatabase = editor.getGlobalObjectDatabase();
        var definitions = objectDatabase.getAllDefinitions();
        
        for (definition in definitions) {
            if (definition.imageLoaded && definition.image != null) {
                var filename = "object_" + definition.id + ".png";
                resources.set(filename, definition.image.src);
            }
        }
        
        return resources;
    }
    
    private function loadTemplateFromZip(file: js.html.File): Void {
        
        var jsZip = js.Syntax.code("new JSZip()");
        var promise = js.Syntax.code("{0}.loadAsync({1})", jsZip, file);
        var self = this;
        
        js.Syntax.code("{0}.then(function(zip) {
            
            var templateJsonFile = zip.file('template.json');
            if (!templateJsonFile) {
                alert('Invalid template file: template.json not found');
                return;
            }
            
            
            templateJsonFile.async('string').then(function(templateJsonContent) {
                try {
                    var templateData = JSON.parse(templateJsonContent);
                    {1}.loadTemplateFromData(templateData, zip);
                } catch (error) {
                    alert('Invalid template file: Could not parse template.json - ' + error.message);
                }
            });
        }).catch(function(error) {
            alert('Could not open template file: ' + error.message);
        })", promise, self);
    }
    
    public function loadTemplateFromData(templateData: Dynamic, zip: Dynamic): Void {
        var resources = new Map<String, String>();
        var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
        
        if (resourcesFolder != null) {
            loadResourcesFromZip(resourcesFolder, resources, function() {
                applyTemplate(templateData, resources);
            });
        } else {
            
            applyTemplate(templateData, resources);
        }
    }
    
    private function applyTemplate(templateData: Dynamic, resources: Map<String, String>): Void {
        try {
            
            if (templateData.tagManager != null) {
                editor.getTagManager().deserialize(templateData.tagManager);
            }
            
            
            if (templateData.objectDatabase != null) {
                var objectDatabase = editor.getGlobalObjectDatabase();
                objectDatabase.deserialize(templateData.objectDatabase);
                
                
                var definitions = objectDatabase.getAllDefinitions();
                for (definition in definitions) {
                    if (definition.imageLoaded) {
                        var filename = "object_" + definition.id + ".png";
                        var imageData = resources.get(filename);
                        if (imageData != null) {
                            definition.setImage(imageData);
                        }
                    }
                }
            }
            
            Log.trace("Template loaded successfully");
            Browser.window.alert("Template loaded successfully!");
            
        } catch (error: Dynamic) {
            Log.trace("Error applying template: " + error);
            Browser.window.alert("Error applying template: " + error);
        }
    }
    
    private function createAndDownloadTemplateZip(templateData: Dynamic, resources: Map<String, String>, zipFilename: String = "template.zip"): Void {
        
        var zip = js.Syntax.code("new JSZip()");
        
        
        var templateJsonString = haxe.Json.stringify(templateData, null, "  ");
        js.Syntax.code("{0}.file('template.json', {1})", zip, templateJsonString);
        
        
        if (resources.keys().hasNext()) {
            var resourcesFolder = js.Syntax.code("{0}.folder('resources')", zip);
            
            for (filename in resources.keys()) {
                var dataUrl = resources.get(filename);
                
                
                var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
                
                
                js.Syntax.code("{0}.file({1}, {2}, {base64: true})", resourcesFolder, filename, base64Data);
            }
        }
        
        
        var promise = js.Syntax.code("{0}.generateAsync({type: 'blob'})", zip);
        js.Syntax.code("{0}.then(function(content) {
            
            var url = URL.createObjectURL(content);
            var a = document.createElement('a');
            a.href = url;
            a.download = {0};
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })", promise, zipFilename);
    }
} 