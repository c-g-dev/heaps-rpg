
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = "EReg";
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = "HxOverrides";
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new haxe_ds_List();
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		l.add(i1);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(x1));
	}
	return l;
};
Lambda.mapi = function(it,f) {
	var l = new haxe_ds_List();
	var i = 0;
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(i++,x1));
	}
	return l;
};
Lambda.flatten = function(it) {
	var l = new haxe_ds_List();
	var e = $getIterator(it);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			l.add(x1);
		}
	}
	return l;
};
Lambda.flatMap = function(it,f) {
	return Lambda.flatten(Lambda.map(it,f));
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(!f(x1)) {
			return false;
		}
	}
	return true;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		f(x1);
	}
};
Lambda.filter = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			l.add(x1);
		}
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = $getIterator(it);
		while(_.hasNext()) {
			var _1 = _.next();
			++n;
		}
	} else {
		var x = $getIterator(it);
		while(x.hasNext()) {
			var x1 = x.next();
			if(pred(x1)) {
				++n;
			}
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$getIterator(it).hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Lambda.concat = function(a,b) {
	var l = new haxe_ds_List();
	var x = $getIterator(a);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(x1);
	}
	var x = $getIterator(b);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(x1);
	}
	return l;
};
var Main = function() { };
Main.__name__ = "Main";
Main.main = function() {
	window.addEventListener("DOMContentLoaded",function() {
		var editor = new editor_MapEditor();
		editor.initialize();
	});
};
Math.__name__ = "Math";
var Reflect = function() { };
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
var Std = function() { };
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(isNaN(v)) {
		return null;
	}
	return v;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringTools = function() { };
StringTools.__name__ = "StringTools";
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var editor_MapEditor = function() {
	this.gridMapHeight = 50;
	this.gridMapWidth = 50;
	this.gridTileSize = 32;
	this.zoom = 1.0;
	this.viewY = 0;
	this.viewX = 0;
	this.layers = [];
	this.currentLayerIndex = -1;
	this.currentTool = "select";
	this.eventListeners = new haxe_ds_StringMap();
	this.defaultTilePalette = new editor_palette_TilePalette(this);
	this.currentPalette = this.defaultTilePalette;
	window.document.body.appendChild(this.currentPalette.getElement());
	this.globalObjectDatabase = new editor_objects_ObjectDatabase();
	this.undoRedoManager = new editor_commands_UndoRedoManager();
	this.tagManager = new editor_TagManager();
};
editor_MapEditor.__name__ = "editor.MapEditor";
editor_MapEditor.prototype = {
	initialize: function() {
		this.loadUIComponents();
		this.setupEventListeners();
		this.createDefaultLayer();
		this.render();
	}
	,loadUIComponents: function() {
		var container = window.document.getElementById("app");
		if(container == null) {
			container = window.document.createElement("div");
			container.id = "app";
			window.document.body.appendChild(container);
		}
		this.topToolbar = new editor_ui_TopToolbar(this);
		this.layerTabNavigator = new editor_ui_LayerTabNavigator(this);
		this.editorToolbar = new editor_ui_EditorToolbar(this);
		this.mapCanvas = new editor_ui_MapCanvas(this);
		this.propertiesPanel = new editor_ui_PropertiesPanel(this);
		container.innerHTML = "";
		container.appendChild(this.topToolbar.getElement());
		container.appendChild(this.layerTabNavigator.getElement());
		container.appendChild(this.editorToolbar.getElement());
		var mainContent = window.document.createElement("div");
		mainContent.className = "main-content";
		var leftContent = window.document.createElement("div");
		leftContent.className = "left-content";
		leftContent.appendChild(this.mapCanvas.getElement());
		mainContent.appendChild(leftContent);
		mainContent.appendChild(this.propertiesPanel.getElement());
		container.appendChild(mainContent);
		this.updatePalette();
	}
	,setupEventListeners: function() {
		window.document.addEventListener("keydown",$bind(this,this.onKeyDown));
	}
	,onKeyDown: function(event) {
		if(event.ctrlKey || event.metaKey) {
			switch(event.key) {
			case "Y":case "y":
				if(this.canRedo()) {
					this.redo();
					event.preventDefault();
				}
				break;
			case "Z":case "z":
				if(event.shiftKey) {
					if(this.canRedo()) {
						this.redo();
						event.preventDefault();
					}
				} else if(this.canUndo()) {
					this.undo();
					event.preventDefault();
				}
				break;
			}
		}
	}
	,createDefaultLayer: function() {
		var defaultLayer = new editor_layers_TileLayer(this);
		defaultLayer.name = "Background";
		this.addLayer(defaultLayer);
	}
	,addLayer: function(layer) {
		this.layers.push(layer);
		if(this.currentLayerIndex == -1) {
			this.currentLayerIndex = 0;
		}
		this.layerTabNavigator.refresh();
		this.propertiesPanel.updateContent();
		this.updatePalette();
	}
	,removeLayer: function(index) {
		if(index >= 0 && index < this.layers.length) {
			this.layers.splice(index,1);
			if(this.currentLayerIndex >= this.layers.length) {
				this.currentLayerIndex = this.layers.length - 1;
			}
			this.layerTabNavigator.refresh();
			this.propertiesPanel.updateContent();
			this.updatePalette();
		}
	}
	,selectLayer: function(index) {
		if(index >= 0 && index < this.layers.length) {
			this.currentLayerIndex = index;
			this.layerTabNavigator.refresh();
			this.propertiesPanel.updateContent();
			this.updatePalette();
			this.render();
		}
	}
	,moveLayer: function(fromIndex,toIndex) {
		if(fromIndex >= 0 && fromIndex < this.layers.length && toIndex >= 0 && toIndex < this.layers.length && fromIndex != toIndex) {
			var layer = this.layers[fromIndex];
			this.layers.splice(fromIndex,1);
			this.layers.splice(toIndex,0,layer);
			if(this.currentLayerIndex == fromIndex) {
				this.currentLayerIndex = toIndex;
			} else if(fromIndex < this.currentLayerIndex && toIndex >= this.currentLayerIndex) {
				this.currentLayerIndex--;
			} else if(fromIndex > this.currentLayerIndex && toIndex <= this.currentLayerIndex) {
				this.currentLayerIndex++;
			}
			this.layerTabNavigator.refresh();
			this.propertiesPanel.updateContent();
			this.render();
		}
	}
	,updatePalette: function() {
		var currentLayer = this.getCurrentLayer();
		console.log("src/editor/MapEditor.hx:238:","updatePalette layer: " + Std.string(currentLayer));
		if(currentLayer != null) {
			var layerPalette = currentLayer.getPalette();
			console.log("src/editor/MapEditor.hx:241:","updatePalette palette: " + Std.string(layerPalette));
			if(layerPalette != null && layerPalette != this.currentPalette) {
				if(this.currentPalette != null) {
					this.currentPalette.hide();
					this.currentPalette.onDeactivate();
				}
				this.currentPalette = layerPalette;
				if(this.currentPalette.getElement().parentNode != window.document.body) {
					console.log("src/editor/MapEditor.hx:256:","updatePalette adding palette to DOM");
					window.document.body.appendChild(this.currentPalette.getElement());
				}
				this.currentPalette.onActivate();
			} else if(layerPalette == null) {
				if(this.currentPalette != this.defaultTilePalette) {
					if(this.currentPalette != null) {
						this.currentPalette.hide();
						this.currentPalette.onDeactivate();
					}
					this.currentPalette = this.defaultTilePalette;
					this.currentPalette.onActivate();
				}
			}
		}
	}
	,togglePalette: function() {
		console.log("src/editor/MapEditor.hx:278:","togglePalette");
		if(this.currentPalette != null) {
			console.log("src/editor/MapEditor.hx:280:","togglePalette: " + Std.string(this.currentPalette.isVisible()));
			if(this.currentPalette.isVisible()) {
				this.currentPalette.hide();
			} else {
				this.currentPalette.show();
			}
		}
	}
	,isPaletteVisible: function() {
		if(this.currentPalette != null) {
			return this.currentPalette.isVisible();
		} else {
			return false;
		}
	}
	,setTool: function(toolId) {
		this.currentTool = toolId;
		if(this.currentLayerIndex >= 0 && this.currentLayerIndex < this.layers.length) {
			this.layers[this.currentLayerIndex].onToolChanged(toolId);
		}
	}
	,render: function() {
		this.mapCanvas.refresh();
	}
	,getLayers: function() {
		return this.layers;
	}
	,getCurrentLayerIndex: function() {
		return this.currentLayerIndex;
	}
	,getCurrentLayer: function() {
		if(this.currentLayerIndex >= 0 && this.currentLayerIndex < this.layers.length) {
			return this.layers[this.currentLayerIndex];
		}
		return null;
	}
	,getCurrentTool: function() {
		return this.currentTool;
	}
	,getViewX: function() {
		return this.viewX;
	}
	,getViewY: function() {
		return this.viewY;
	}
	,getZoom: function() {
		return this.zoom;
	}
	,setView: function(x,y,z) {
		this.viewX = x;
		this.viewY = y;
		this.zoom = z;
		this.render();
	}
	,getPalette: function() {
		return this.currentPalette;
	}
	,getGlobalObjectDatabase: function() {
		return this.globalObjectDatabase;
	}
	,getPropertiesPanel: function() {
		return this.propertiesPanel;
	}
	,executeCommand: function(command) {
		var c = js_Boot.getClass(command);
		console.log("src/editor/MapEditor.hx:358:","executeCommand: " + c.__name__);
		this.undoRedoManager.executeCommand(command);
	}
	,undo: function() {
		return this.undoRedoManager.undo();
	}
	,redo: function() {
		return this.undoRedoManager.redo();
	}
	,canUndo: function() {
		return this.undoRedoManager.canUndo();
	}
	,canRedo: function() {
		return this.undoRedoManager.canRedo();
	}
	,getUndoDescription: function() {
		return this.undoRedoManager.getUndoDescription();
	}
	,getRedoDescription: function() {
		return this.undoRedoManager.getRedoDescription();
	}
	,clearUndoHistory: function() {
		this.undoRedoManager.clear();
	}
	,serializeMap: function() {
		var layers = [];
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var layerData = layer.serialize();
			if(layer.type == "image" && layerData.imageData != null) {
				var filename = "image_" + layer.id + ".png";
				layerData.imageResource = "resources/" + filename;
				Reflect.deleteField(layerData,"imageData");
			} else if(layer.type == "tile") {
				var tileLayer = js_Boot.__cast(layer , editor_layers_TileLayer);
				var tilesetData = tileLayer.getTilesetData();
				if(tilesetData != null) {
					var filename1 = "tileset_" + layer.id + ".png";
					layerData.tilesetResource = "resources/" + filename1;
				}
			}
			layers.push(layerData);
		}
		return { version : "1.0", viewX : this.viewX, viewY : this.viewY, zoom : this.zoom, gridTileSize : this.gridTileSize, gridMapWidth : this.gridMapWidth, gridMapHeight : this.gridMapHeight, layers : layers, globalObjectDatabase : this.globalObjectDatabase.serialize(), tagManager : this.tagManager.serialize(), timestamp : new Date().getTime()};
	}
	,collectResources: function() {
		var resources = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(layer.type == "image") {
				var imageLayer = js_Boot.__cast(layer , editor_layers_ImageLayer);
				var serializedData = imageLayer.serialize();
				if(serializedData.imageData != null) {
					var filename = "image_" + layer.id + ".png";
					resources.h[filename] = serializedData.imageData;
				}
			} else if(layer.type == "tile") {
				var tileLayer = js_Boot.__cast(layer , editor_layers_TileLayer);
				var tilesetData = tileLayer.getTilesetData();
				if(tilesetData != null) {
					var filename1 = "tileset_" + layer.id + ".png";
					resources.h[filename1] = tilesetData;
				}
			}
		}
		return resources;
	}
	,loadMap: function(mapData,resources) {
		var _gthis = this;
		try {
			this.clearMap();
			this.clearUndoHistory();
			this.viewX = mapData.viewX != null ? mapData.viewX : 0;
			this.viewY = mapData.viewY != null ? mapData.viewY : 0;
			this.zoom = mapData.zoom != null ? mapData.zoom : 1.0;
			this.gridTileSize = mapData.gridTileSize != null ? mapData.gridTileSize : 32;
			this.gridMapWidth = mapData.gridMapWidth != null ? mapData.gridMapWidth : 50;
			this.gridMapHeight = mapData.gridMapHeight != null ? mapData.gridMapHeight : 50;
			if(mapData.globalObjectDatabase != null) {
				this.globalObjectDatabase.deserialize(mapData.globalObjectDatabase);
			}
			if(mapData.tagManager != null) {
				this.tagManager.deserialize(mapData.tagManager);
			}
			var layersData = mapData.layers != null ? mapData.layers : [];
			if(layersData.length == 0) {
				this.finishMapLoading();
				return;
			}
			var layersToLoad = layersData.length;
			var layersLoaded = 0;
			var onLayerLoaded = function() {
				layersLoaded += 1;
				if(layersLoaded >= layersToLoad) {
					_gthis.finishMapLoading();
				}
			};
			var _g = 0;
			while(_g < layersData.length) {
				var layerData = layersData[_g];
				++_g;
				var layer = this.createLayerFromData(layerData,resources);
				if(layer != null) {
					this.layers.push(layer);
					layer.deserialize(layerData,onLayerLoaded);
				} else {
					onLayerLoaded();
				}
			}
		} catch( _g ) {
			var error = haxe_Exception.caught(_g).unwrap();
			console.log("src/editor/MapEditor.hx:517:","Error loading map: " + Std.string(error));
			window.alert("Error loading map: " + Std.string(error));
		}
	}
	,finishMapLoading: function() {
		if(this.layers.length > 0) {
			this.currentLayerIndex = 0;
		}
		this.layerTabNavigator.refresh();
		this.propertiesPanel.updateContent();
		this.updatePalette();
		this.render();
		console.log("src/editor/MapEditor.hx:534:","Map loaded successfully with " + this.layers.length + " layers");
	}
	,clearMap: function() {
		this.layers = [];
		this.currentLayerIndex = -1;
		this.viewX = 0;
		this.viewY = 0;
		this.zoom = 1.0;
	}
	,createLayerFromData: function(layerData,resources) {
		var layer = null;
		switch(layerData.type) {
		case "image":
			layer = new editor_layers_ImageLayer(this);
			if(layerData.imageResource != null) {
				var resourcePath = layerData.imageResource;
				var filename = resourcePath.lastIndexOf("/") + 1;
				var filename1 = resourcePath.substring(filename);
				var imageData = resources.h[filename1];
				if(imageData != null) {
					layerData.imageData = imageData;
				}
			}
			break;
		case "intgrid":
			layer = new editor_layers_IntGridLayer(this);
			break;
		case "object":
			layer = new editor_layers_ObjectLayer(this);
			break;
		case "tile":
			layer = new editor_layers_TileLayer(this);
			if(layerData.tilesetResource != null) {
				var resourcePath = layerData.tilesetResource;
				var filename = resourcePath.lastIndexOf("/") + 1;
				var filename1 = resourcePath.substring(filename);
				var tilesetData = resources.h[filename1];
				if(tilesetData != null) {
					layerData.tilesetData = tilesetData;
				}
			}
			break;
		default:
			console.log("src/editor/MapEditor.hx:585:","Unknown layer type: " + Std.string(layerData.type));
			return null;
		}
		return layer;
	}
	,createNewMap: function() {
		this.clearMap();
		this.clearUndoHistory();
		this.createDefaultLayer();
		console.log("src/editor/MapEditor.hx:603:","New map created");
	}
	,getTagManager: function() {
		return this.tagManager;
	}
	,getGridTileSize: function() {
		return this.gridTileSize;
	}
	,getGridMapWidth: function() {
		return this.gridMapWidth;
	}
	,getGridMapHeight: function() {
		return this.gridMapHeight;
	}
	,setGridSettings: function(tileSize,mapWidth,mapHeight) {
		this.gridTileSize = tileSize;
		this.gridMapWidth = mapWidth;
		this.gridMapHeight = mapHeight;
		this.fireEvent("gridSettingsChanged");
		this.render();
		console.log("src/editor/MapEditor.hx:634:","Global grid settings updated: tileSize=" + tileSize + ", mapWidth=" + mapWidth + ", mapHeight=" + mapHeight);
	}
	,addEventListener: function(eventType,listener) {
		if(!Object.prototype.hasOwnProperty.call(this.eventListeners.h,eventType)) {
			this.eventListeners.h[eventType] = [];
		}
		var listeners = this.eventListeners.h[eventType];
		if(listeners.indexOf(listener) == -1) {
			listeners.push(listener);
		}
	}
	,removeEventListener: function(eventType,listener) {
		if(Object.prototype.hasOwnProperty.call(this.eventListeners.h,eventType)) {
			var listeners = this.eventListeners.h[eventType];
			HxOverrides.remove(listeners,listener);
		}
	}
	,fireEvent: function(eventType) {
		if(Object.prototype.hasOwnProperty.call(this.eventListeners.h,eventType)) {
			var listeners = this.eventListeners.h[eventType];
			var _g = 0;
			while(_g < listeners.length) {
				var listener = listeners[_g];
				++_g;
				try {
					listener();
				} catch( _g1 ) {
					var error = haxe_Exception.caught(_g1).unwrap();
					console.log("src/editor/MapEditor.hx:662:","Error in event listener for " + eventType + ": " + Std.string(error));
				}
			}
		}
	}
	,__class__: editor_MapEditor
};
var editor_TagManager = function() {
	this.tags = [];
	this.changeCallbacks = [];
	this.tags.push("Background");
	this.tags.push("Foreground");
	this.tags.push("Interactive");
	this.tags.push("Collision");
	this.tags.push("Decoration");
};
editor_TagManager.__name__ = "editor.TagManager";
editor_TagManager.prototype = {
	getAllTags: function() {
		return this.tags.slice();
	}
	,addTag: function(tag) {
		if(tag == null || tag == "" || this.hasTag(tag)) {
			return false;
		}
		tag = StringTools.trim(tag);
		if(tag == "") {
			return false;
		}
		this.tags.push(tag);
		this.tags.sort(function(a,b) {
			if(a.toLowerCase() < b.toLowerCase()) {
				return -1;
			} else {
				return 1;
			}
		});
		this.notifyChanged();
		return true;
	}
	,removeTag: function(tag) {
		var index = this.tags.indexOf(tag);
		if(index >= 0) {
			this.tags.splice(index,1);
			this.notifyChanged();
			return true;
		}
		return false;
	}
	,hasTag: function(tag) {
		return this.tags.indexOf(tag) >= 0;
	}
	,renameTag: function(oldTag,newTag) {
		if(!this.hasTag(oldTag) || this.hasTag(newTag) || newTag == null || StringTools.trim(newTag) == "") {
			return false;
		}
		var index = this.tags.indexOf(oldTag);
		if(index >= 0) {
			this.tags[index] = StringTools.trim(newTag);
			this.tags.sort(function(a,b) {
				if(a.toLowerCase() < b.toLowerCase()) {
					return -1;
				} else {
					return 1;
				}
			});
			this.notifyChanged();
			return true;
		}
		return false;
	}
	,onTagsChanged: function(callback) {
		this.changeCallbacks.push(callback);
	}
	,removeTagsChangedCallback: function(callback) {
		HxOverrides.remove(this.changeCallbacks,callback);
	}
	,notifyChanged: function() {
		var _g = 0;
		var _g1 = this.changeCallbacks;
		while(_g < _g1.length) {
			var callback = _g1[_g];
			++_g;
			callback();
		}
	}
	,serialize: function() {
		return { tags : this.tags};
	}
	,deserialize: function(data) {
		if(data != null && data.tags != null) {
			this.tags = data.tags;
			this.tags.sort(function(a,b) {
				if(a.toLowerCase() < b.toLowerCase()) {
					return -1;
				} else {
					return 1;
				}
			});
			this.notifyChanged();
		}
	}
	,__class__: editor_TagManager
};
var editor_commands_Command = function() { };
editor_commands_Command.__name__ = "editor.commands.Command";
editor_commands_Command.__isInterface__ = true;
editor_commands_Command.prototype = {
	__class__: editor_commands_Command
};
var editor_commands_AddLayerCommand = function(editor,layer) {
	this.editor = editor;
	this.layer = layer;
	this.index = -1;
};
editor_commands_AddLayerCommand.__name__ = "editor.commands.AddLayerCommand";
editor_commands_AddLayerCommand.__interfaces__ = [editor_commands_Command];
editor_commands_AddLayerCommand.prototype = {
	execute: function() {
		this.editor.addLayer(this.layer);
		var layers = this.editor.getLayers();
		this.index = layers.indexOf(this.layer);
	}
	,undo: function() {
		if(this.index >= 0) {
			this.editor.removeLayer(this.index);
		}
	}
	,getDescription: function() {
		return "Add Layer: " + this.layer.name;
	}
	,__class__: editor_commands_AddLayerCommand
};
var editor_commands_RemoveLayerCommand = function(editor,index) {
	this.editor = editor;
	this.index = index;
	var layers = editor.getLayers();
	if(index >= 0 && index < layers.length) {
		this.layer = layers[index];
	}
};
editor_commands_RemoveLayerCommand.__name__ = "editor.commands.RemoveLayerCommand";
editor_commands_RemoveLayerCommand.__interfaces__ = [editor_commands_Command];
editor_commands_RemoveLayerCommand.prototype = {
	execute: function() {
		this.editor.removeLayer(this.index);
	}
	,undo: function() {
		if(this.layer != null) {
			var layers = this.editor.getLayers();
			layers.splice(this.index,0,this.layer);
			if(this.editor.getCurrentLayerIndex() >= this.index) {
				this.editor.selectLayer(this.editor.getCurrentLayerIndex() + 1);
			} else {
				this.editor.selectLayer(this.index);
			}
			this.editor.render();
		}
	}
	,getDescription: function() {
		if(this.layer != null) {
			return "Remove Layer: " + this.layer.name;
		} else {
			return "Remove Layer";
		}
	}
	,__class__: editor_commands_RemoveLayerCommand
};
var editor_commands_MoveLayerCommand = function(editor,fromIndex,toIndex) {
	this.editor = editor;
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
};
editor_commands_MoveLayerCommand.__name__ = "editor.commands.MoveLayerCommand";
editor_commands_MoveLayerCommand.__interfaces__ = [editor_commands_Command];
editor_commands_MoveLayerCommand.prototype = {
	execute: function() {
		this.editor.moveLayer(this.fromIndex,this.toIndex);
	}
	,undo: function() {
		this.editor.moveLayer(this.toIndex,this.fromIndex);
	}
	,getDescription: function() {
		return "Move Layer";
	}
	,__class__: editor_commands_MoveLayerCommand
};
var editor_commands_ChangeLayerPropertyCommand = function(editor,layer,propertyName,oldValue,newValue) {
	this.editor = editor;
	this.layer = layer;
	this.propertyName = propertyName;
	this.oldValue = oldValue;
	this.newValue = newValue;
};
editor_commands_ChangeLayerPropertyCommand.__name__ = "editor.commands.ChangeLayerPropertyCommand";
editor_commands_ChangeLayerPropertyCommand.__interfaces__ = [editor_commands_Command];
editor_commands_ChangeLayerPropertyCommand.prototype = {
	execute: function() {
		this.setLayerProperty(this.layer,this.propertyName,this.newValue);
		this.editor.render();
	}
	,undo: function() {
		this.setLayerProperty(this.layer,this.propertyName,this.oldValue);
		this.editor.render();
	}
	,setLayerProperty: function(layer,propertyName,value) {
		switch(propertyName) {
		case "name":
			layer.name = value;
			break;
		case "opacity":
			layer.opacity = value;
			break;
		case "visible":
			layer.visible = value;
			break;
		}
	}
	,getDescription: function() {
		return "Change Layer " + this.propertyName + ": " + this.layer.name;
	}
	,__class__: editor_commands_ChangeLayerPropertyCommand
};
var editor_commands_MoveObjectsCommand = function(layer,objects,deltaX,deltaY,editor) {
	this.layer = layer;
	this.objects = objects.slice();
	this.editor = editor;
	var gridSize = editor.getGridTileSize();
	this.deltaX = Math.round(deltaX / gridSize) * gridSize;
	this.deltaY = Math.round(deltaY / gridSize) * gridSize;
};
editor_commands_MoveObjectsCommand.__name__ = "editor.commands.MoveObjectsCommand";
editor_commands_MoveObjectsCommand.__interfaces__ = [editor_commands_Command];
editor_commands_MoveObjectsCommand.prototype = {
	execute: function() {
		var gridSize = this.editor.getGridTileSize();
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.x += this.deltaX;
			obj.y += this.deltaY;
			obj.x = Math.round(obj.x / gridSize) * gridSize;
			obj.y = Math.round(obj.y / gridSize) * gridSize;
		}
		this.editor.render();
	}
	,undo: function() {
		var gridSize = this.editor.getGridTileSize();
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			obj.x -= this.deltaX;
			obj.y -= this.deltaY;
			obj.x = Math.round(obj.x / gridSize) * gridSize;
			obj.y = Math.round(obj.y / gridSize) * gridSize;
		}
		this.editor.render();
	}
	,getDescription: function() {
		return "Move Objects (" + this.objects.length + " object" + (this.objects.length == 1 ? "" : "s") + ")";
	}
	,__class__: editor_commands_MoveObjectsCommand
};
var editor_commands_AddObjectCommand = function(layer,object,editor) {
	this.layer = layer;
	this.object = object;
	this.editor = editor;
};
editor_commands_AddObjectCommand.__name__ = "editor.commands.AddObjectCommand";
editor_commands_AddObjectCommand.__interfaces__ = [editor_commands_Command];
editor_commands_AddObjectCommand.prototype = {
	execute: function() {
		this.layer.addObject(this.object);
		this.editor.render();
	}
	,undo: function() {
		this.layer.removeObject(this.object);
		this.editor.render();
	}
	,getDescription: function() {
		return "Add Object: " + this.object.definition.name;
	}
	,__class__: editor_commands_AddObjectCommand
};
var editor_commands_RemoveObjectCommand = function(layer,object,editor) {
	this.layer = layer;
	this.object = object;
	this.editor = editor;
};
editor_commands_RemoveObjectCommand.__name__ = "editor.commands.RemoveObjectCommand";
editor_commands_RemoveObjectCommand.__interfaces__ = [editor_commands_Command];
editor_commands_RemoveObjectCommand.prototype = {
	execute: function() {
		this.layer.removeObject(this.object);
		this.editor.render();
	}
	,undo: function() {
		this.layer.addObject(this.object);
		this.editor.render();
	}
	,getDescription: function() {
		return "Remove Object: " + this.object.definition.name;
	}
	,__class__: editor_commands_RemoveObjectCommand
};
var editor_commands_RemoveMultipleObjectsCommand = function(layer,objects,editor) {
	this.layer = layer;
	this.objects = objects.slice();
	this.editor = editor;
};
editor_commands_RemoveMultipleObjectsCommand.__name__ = "editor.commands.RemoveMultipleObjectsCommand";
editor_commands_RemoveMultipleObjectsCommand.__interfaces__ = [editor_commands_Command];
editor_commands_RemoveMultipleObjectsCommand.prototype = {
	execute: function() {
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			this.layer.removeObject(obj);
		}
		this.editor.render();
	}
	,undo: function() {
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			this.layer.addObject(obj);
		}
		this.editor.render();
	}
	,getDescription: function() {
		return "Remove Objects (" + this.objects.length + " object" + (this.objects.length == 1 ? "" : "s") + ")";
	}
	,__class__: editor_commands_RemoveMultipleObjectsCommand
};
var editor_commands_PaintTileCommand = function(layer,tileX,tileY,newTileId,editor) {
	this.layer = layer;
	this.tileX = tileX;
	this.tileY = tileY;
	this.newTileId = newTileId;
	this.editor = editor;
	var key = "" + tileX + "," + tileY;
	this.oldTileId = layer.getTile(tileX,tileY);
};
editor_commands_PaintTileCommand.__name__ = "editor.commands.PaintTileCommand";
editor_commands_PaintTileCommand.__interfaces__ = [editor_commands_Command];
editor_commands_PaintTileCommand.prototype = {
	execute: function() {
		this.layer.setTile(this.tileX,this.tileY,this.newTileId);
		this.editor.render();
	}
	,undo: function() {
		console.log("src/editor/commands/TileCommands.hx:35:","tile paint undo: " + this.oldTileId);
		if(this.oldTileId == null) {
			this.layer.removeTile(this.tileX,this.tileY);
		} else {
			this.layer.setTile(this.tileX,this.tileY,this.oldTileId);
		}
		this.editor.render();
	}
	,getDescription: function() {
		return "Paint Tile";
	}
	,__class__: editor_commands_PaintTileCommand
};
var editor_commands_EraseTileCommand = function(layer,tileX,tileY,editor) {
	this.layer = layer;
	this.tileX = tileX;
	this.tileY = tileY;
	this.editor = editor;
	this.oldTileId = layer.getTile(tileX,tileY);
};
editor_commands_EraseTileCommand.__name__ = "editor.commands.EraseTileCommand";
editor_commands_EraseTileCommand.__interfaces__ = [editor_commands_Command];
editor_commands_EraseTileCommand.prototype = {
	execute: function() {
		this.layer.removeTile(this.tileX,this.tileY);
		this.editor.render();
	}
	,undo: function() {
		if(this.oldTileId != null) {
			this.layer.setTile(this.tileX,this.tileY,this.oldTileId);
		}
		this.editor.render();
	}
	,getDescription: function() {
		return "Erase Tile";
	}
	,__class__: editor_commands_EraseTileCommand
};
var editor_commands_PaintMultipleTilesCommand = function(layer,tileData,editor) {
	this.layer = layer;
	this.tileData = tileData;
	this.editor = editor;
	this.oldTileData = new haxe_ds_StringMap();
	var h = tileData.h;
	var key_h = h;
	var key_keys = Object.keys(h);
	var key_length = key_keys.length;
	var key_current = 0;
	while(key_current < key_length) {
		var key = key_keys[key_current++];
		var parts = key.split(",");
		var x = Std.parseInt(parts[0]);
		var y = Std.parseInt(parts[1]);
		var this1 = this.oldTileData;
		var value = layer.getTile(x,y);
		this1.h[key] = value;
	}
};
editor_commands_PaintMultipleTilesCommand.__name__ = "editor.commands.PaintMultipleTilesCommand";
editor_commands_PaintMultipleTilesCommand.__interfaces__ = [editor_commands_Command];
editor_commands_PaintMultipleTilesCommand.prototype = {
	execute: function() {
		var h = this.tileData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var tileId = this.tileData.h[key];
			this.layer.setTile(x,y,tileId);
		}
		this.editor.render();
	}
	,undo: function() {
		var h = this.oldTileData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var oldTileId = this.oldTileData.h[key];
			if(oldTileId == null) {
				this.layer.removeTile(x,y);
			} else {
				this.layer.setTile(x,y,oldTileId);
			}
		}
		this.editor.render();
	}
	,getDescription: function() {
		return "Paint Multiple Tiles";
	}
	,__class__: editor_commands_PaintMultipleTilesCommand
};
var editor_commands_MoveTilesCommand = function(layer,originalPositions,newPositions,editor) {
	this.layer = layer;
	this.originalPositions = originalPositions;
	this.newPositions = newPositions;
	this.editor = editor;
	this.originalSelection = new haxe_ds_StringMap();
	var h = originalPositions.h;
	var key_h = h;
	var key_keys = Object.keys(h);
	var key_length = key_keys.length;
	var key_current = 0;
	while(key_current < key_length) {
		var key = key_keys[key_current++];
		this.originalSelection.h[key] = true;
	}
	this.newSelection = new haxe_ds_StringMap();
	var h = newPositions.h;
	var key_h = h;
	var key_keys = Object.keys(h);
	var key_length = key_keys.length;
	var key_current = 0;
	while(key_current < key_length) {
		var key = key_keys[key_current++];
		this.newSelection.h[key] = true;
	}
};
editor_commands_MoveTilesCommand.__name__ = "editor.commands.MoveTilesCommand";
editor_commands_MoveTilesCommand.__interfaces__ = [editor_commands_Command];
editor_commands_MoveTilesCommand.prototype = {
	execute: function() {
		var h = this.originalPositions.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			this.layer.removeTile(x,y);
		}
		var h = this.newPositions.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var tileId = this.newPositions.h[key];
			this.layer.setTile(x,y,tileId);
		}
		this.layer.setSelectedTiles(this.newSelection);
		this.editor.render();
	}
	,undo: function() {
		var h = this.newPositions.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			this.layer.removeTile(x,y);
		}
		var h = this.originalPositions.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var tileId = this.originalPositions.h[key];
			this.layer.setTile(x,y,tileId);
		}
		this.layer.setSelectedTiles(this.originalSelection);
		this.editor.render();
	}
	,getDescription: function() {
		return "Move Tiles";
	}
	,__class__: editor_commands_MoveTilesCommand
};
var editor_commands_StrokeCommand = function(layer,strokeData,originalData,editor) {
	this.layer = layer;
	this.strokeData = strokeData;
	this.originalData = originalData;
	this.editor = editor;
};
editor_commands_StrokeCommand.__name__ = "editor.commands.StrokeCommand";
editor_commands_StrokeCommand.__interfaces__ = [editor_commands_Command];
editor_commands_StrokeCommand.prototype = {
	execute: function() {
		var h = this.originalData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			if(Object.prototype.hasOwnProperty.call(this.strokeData.h,key)) {
				var tileId = this.strokeData.h[key];
				this.layer.setTile(x,y,tileId);
			} else {
				this.layer.removeTile(x,y);
			}
		}
		this.editor.render();
	}
	,undo: function() {
		var h = this.originalData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var originalTileId = this.originalData.h[key];
			if(originalTileId == null) {
				this.layer.removeTile(x,y);
			} else {
				this.layer.setTile(x,y,originalTileId);
			}
		}
		this.editor.render();
	}
	,getDescription: function() {
		var paintedCount = Lambda.count(this.strokeData);
		var erasedCount = Lambda.count(this.originalData) - paintedCount;
		if(paintedCount > 0 && erasedCount > 0) {
			return "Paint/Erase Stroke";
		} else if(paintedCount > 0) {
			return "Paint Stroke";
		} else {
			return "Erase Stroke";
		}
	}
	,__class__: editor_commands_StrokeCommand
};
var editor_commands_UndoRedoManager = function(maxUndoLevels) {
	if(maxUndoLevels == null) {
		maxUndoLevels = 50;
	}
	this.maxUndoLevels = maxUndoLevels;
	this.undoStack = [];
	this.redoStack = [];
};
editor_commands_UndoRedoManager.__name__ = "editor.commands.UndoRedoManager";
editor_commands_UndoRedoManager.prototype = {
	executeCommand: function(command) {
		command.execute();
		this.undoStack.push(command);
		if(this.undoStack.length > this.maxUndoLevels) {
			this.undoStack.shift();
		}
		this.redoStack = [];
	}
	,undo: function() {
		if(this.undoStack.length == 0) {
			return false;
		}
		var command = this.undoStack.pop();
		command.undo();
		this.redoStack.push(command);
		return true;
	}
	,redo: function() {
		if(this.redoStack.length == 0) {
			return false;
		}
		var command = this.redoStack.pop();
		command.execute();
		this.undoStack.push(command);
		return true;
	}
	,canUndo: function() {
		return this.undoStack.length > 0;
	}
	,canRedo: function() {
		return this.redoStack.length > 0;
	}
	,clear: function() {
		this.undoStack = [];
		this.redoStack = [];
	}
	,getUndoDescription: function() {
		if(this.undoStack.length == 0) {
			return null;
		}
		return this.undoStack[this.undoStack.length - 1].getDescription();
	}
	,getRedoDescription: function() {
		if(this.redoStack.length == 0) {
			return null;
		}
		return this.redoStack[this.redoStack.length - 1].getDescription();
	}
	,__class__: editor_commands_UndoRedoManager
};
var editor_layers_Layer = function() { };
editor_layers_Layer.__name__ = "editor.layers.Layer";
editor_layers_Layer.__isInterface__ = true;
editor_layers_Layer.prototype = {
	__class__: editor_layers_Layer
};
var editor_layers_ImageLayer = function(editor) {
	this.isSelected = false;
	this.selectionEndY = 0;
	this.selectionEndX = 0;
	this.selectionStartY = 0;
	this.selectionStartX = 0;
	this.isSelecting = false;
	this.editor = editor;
	this.id = uuid_Uuid.v4();
	this.name = "Image Layer " + HxOverrides.substr(this.id,0,8);
	this.visible = true;
	this.opacity = 1.0;
	this.type = "image";
	this.tags = [];
	this.image = null;
	this.imageLoaded = false;
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.scaleX = 1.0;
	this.scaleY = 1.0;
	this.currentTool = "select";
	this.isDragging = false;
	this.dragStartX = 0;
	this.dragStartY = 0;
};
editor_layers_ImageLayer.__name__ = "editor.layers.ImageLayer";
editor_layers_ImageLayer.__interfaces__ = [editor_layers_Layer];
editor_layers_ImageLayer.prototype = {
	render: function(ctx,viewX,viewY,zoom) {
		if(!this.imageLoaded || this.image == null) {
			ctx.save();
			ctx.strokeStyle = "#666666";
			ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
			ctx.setLineDash([10,10]);
			ctx.strokeRect(this.x,this.y,200,150);
			ctx.fillRect(this.x,this.y,200,150);
			ctx.fillStyle = "#cccccc";
			ctx.font = "14px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("No Image",this.x + 100,this.y + 75);
			ctx.restore();
			return;
		}
		ctx.save();
		ctx.globalAlpha = this.opacity;
		ctx.drawImage(this.image,this.x,this.y,this.width * this.scaleX,this.height * this.scaleY);
		ctx.restore();
	}
	,onMouseDown: function(worldX,worldY,button) {
		if(button == 0 && this.currentTool == "select") {
			if(this.imageLoaded && this.isPointInBounds(worldX,worldY)) {
				this.isDragging = true;
				this.dragStartX = worldX - this.x;
				this.dragStartY = worldY - this.y;
				return true;
			}
		}
		return false;
	}
	,onMouseMove: function(worldX,worldY) {
		if(this.isDragging) {
			this.x = worldX - this.dragStartX;
			this.y = worldY - this.dragStartY;
			this.editor.render();
			return true;
		}
		return false;
	}
	,onMouseUp: function(worldX,worldY,button) {
		this.isDragging = false;
		return false;
	}
	,isPointInBounds: function(worldX,worldY) {
		if(!this.imageLoaded) {
			return false;
		}
		if(worldX >= this.x && worldX <= this.x + this.width * this.scaleX && worldY >= this.y) {
			return worldY <= this.y + this.height * this.scaleY;
		} else {
			return false;
		}
	}
	,onToolChanged: function(toolId) {
		this.currentTool = toolId;
		this.isDragging = false;
	}
	,getPreviewCanvas: function(width,height) {
		var canvas = window.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d",null);
		ctx.fillStyle = "#2d2d2d";
		ctx.fillRect(0,0,width,height);
		if(this.imageLoaded && this.image != null) {
			var scale = Math.min(width / this.width,height / this.height);
			var scaledWidth = this.width * scale;
			var scaledHeight = this.height * scale;
			var offsetX = (width - scaledWidth) / 2;
			var offsetY = (height - scaledHeight) / 2;
			ctx.drawImage(this.image,offsetX,offsetY,scaledWidth,scaledHeight);
		} else {
			ctx.strokeStyle = "#666666";
			ctx.setLineDash([5,5]);
			ctx.strokeRect(5,5,width - 10,height - 10);
			ctx.fillStyle = "#cccccc";
			ctx.font = "10px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Image",width / 2,height / 2);
		}
		return canvas;
	}
	,getPalette: function() {
		return null;
	}
	,setPalette: function(palette) {
	}
	,serialize: function() {
		return { id : this.id, name : this.name, visible : this.visible, opacity : this.opacity, type : this.type, tags : editor_layers_LayerTagsHelper.serializeTags(this.tags), x : this.x, y : this.y, width : this.width, height : this.height, scaleX : this.scaleX, scaleY : this.scaleY, imageData : this.imageLoaded ? this.image.src : null};
	}
	,deserialize: function(data,deserializeCallback) {
		if(data != null) {
			if(data.id != null) {
				this.id = data.id;
			}
			if(data.name != null) {
				this.name = data.name;
			}
			if(data.visible != null) {
				this.visible = data.visible;
			}
			if(data.opacity != null) {
				this.opacity = data.opacity;
			}
			if(data.type != null) {
				this.type = data.type;
			}
			editor_layers_LayerTagsHelper.deserializeTags(this.tags,data);
			if(data.x != null) {
				this.x = data.x;
			}
			if(data.y != null) {
				this.y = data.y;
			}
			if(data.width != null) {
				this.width = data.width;
			}
			if(data.height != null) {
				this.height = data.height;
			}
			if(data.scaleX != null) {
				this.scaleX = data.scaleX;
			}
			if(data.scaleY != null) {
				this.scaleY = data.scaleY;
			}
			if(data.imageData != null) {
				this.loadImageFromDataUrl(data.imageData,deserializeCallback);
			} else {
				deserializeCallback();
			}
		} else {
			deserializeCallback();
		}
	}
	,loadImageFromDataUrl: function(dataUrl,onLoad) {
		var _gthis = this;
		this.image = window.document.createElement("img");
		this.image.onload = function() {
			_gthis.imageLoaded = true;
			_gthis.editor.render();
			if(onLoad != null) {
				onLoad();
			}
		};
		this.image.src = dataUrl;
	}
	,loadImageFromFile: function(file) {
		var _gthis = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var dataUrl = reader.result;
			var tmp = window.document.createElement("img");
			_gthis.image = tmp;
			_gthis.image.onload = function() {
				_gthis.width = _gthis.image.naturalWidth;
				_gthis.height = _gthis.image.naturalHeight;
				_gthis.imageLoaded = true;
				_gthis.editor.render();
			};
			_gthis.image.src = dataUrl;
		};
		reader.readAsDataURL(file);
	}
	,createPropertyPanel: function() {
		var _gthis = this;
		var panel = window.document.createElement("div");
		panel.className = "layer-properties-content";
		var nameLabel = window.document.createElement("label");
		nameLabel.textContent = "Layer Name: ";
		panel.appendChild(nameLabel);
		var nameInput = window.document.createElement("input");
		nameInput.type = "text";
		nameInput.value = this.name;
		nameInput.addEventListener("input",function(e) {
			_gthis.name = nameInput.value;
		});
		panel.appendChild(nameInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var imageLabel = window.document.createElement("label");
		imageLabel.textContent = "Image File: ";
		panel.appendChild(imageLabel);
		var fileInput = window.document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.addEventListener("change",function(e) {
			var files = fileInput.files;
			if(files.length > 0) {
				_gthis.loadImageFromFile(files[0]);
			}
		});
		panel.appendChild(fileInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var posLabel = window.document.createElement("label");
		posLabel.textContent = "Position: ";
		panel.appendChild(posLabel);
		panel.appendChild(window.document.createElement("br"));
		var xLabel = window.document.createElement("label");
		xLabel.textContent = "X: ";
		panel.appendChild(xLabel);
		var xInput = window.document.createElement("input");
		xInput.type = "number";
		xInput.value = Std.string(Math.round(this.x));
		xInput.addEventListener("input",function(e) {
			var tmp = parseFloat(xInput.value);
			_gthis.x = tmp;
			_gthis.editor.render();
		});
		panel.appendChild(xInput);
		var yLabel = window.document.createElement("label");
		yLabel.textContent = " Y: ";
		panel.appendChild(yLabel);
		var yInput = window.document.createElement("input");
		yInput.type = "number";
		yInput.value = Std.string(Math.round(this.y));
		yInput.addEventListener("input",function(e) {
			var tmp = parseFloat(yInput.value);
			_gthis.y = tmp;
			_gthis.editor.render();
		});
		panel.appendChild(yInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var scaleLabel = window.document.createElement("label");
		scaleLabel.textContent = "Scale: ";
		panel.appendChild(scaleLabel);
		panel.appendChild(window.document.createElement("br"));
		var scaleXLabel = window.document.createElement("label");
		scaleXLabel.textContent = "X: ";
		panel.appendChild(scaleXLabel);
		var scaleXInput = window.document.createElement("input");
		scaleXInput.type = "number";
		scaleXInput.step = "0.1";
		scaleXInput.min = "0.1";
		scaleXInput.value = Std.string(this.scaleX);
		scaleXInput.addEventListener("input",function(e) {
			var tmp = parseFloat(scaleXInput.value);
			_gthis.scaleX = tmp;
			_gthis.editor.render();
		});
		panel.appendChild(scaleXInput);
		var scaleYLabel = window.document.createElement("label");
		scaleYLabel.textContent = " Y: ";
		panel.appendChild(scaleYLabel);
		var scaleYInput = window.document.createElement("input");
		scaleYInput.type = "number";
		scaleYInput.step = "0.1";
		scaleYInput.min = "0.1";
		scaleYInput.value = Std.string(this.scaleY);
		scaleYInput.addEventListener("input",function(e) {
			var tmp = parseFloat(scaleYInput.value);
			_gthis.scaleY = tmp;
			_gthis.editor.render();
		});
		panel.appendChild(scaleYInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var opacityLabel = window.document.createElement("label");
		opacityLabel.textContent = "Opacity: ";
		panel.appendChild(opacityLabel);
		var opacityInput = window.document.createElement("input");
		opacityInput.type = "range";
		opacityInput.min = "0";
		opacityInput.max = "100";
		opacityInput.value = Std.string(Math.round(this.opacity * 100));
		opacityInput.addEventListener("input",function(e) {
			var tmp = parseFloat(opacityInput.value);
			_gthis.opacity = tmp / 100;
			_gthis.editor.render();
		});
		panel.appendChild(opacityInput);
		var opacityValue = window.document.createElement("span");
		opacityValue.textContent = " " + opacityInput.value + "%";
		opacityInput.addEventListener("input",function(e) {
			opacityValue.textContent = " " + opacityInput.value + "%";
		});
		panel.appendChild(opacityValue);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var tagControl = new editor_ui_LayerTagControl(this.editor,this);
		panel.appendChild(tagControl.getElement());
		return panel;
	}
	,addTag: function(tag) {
		return editor_layers_LayerTagsHelper.addTag(this.tags,tag);
	}
	,removeTag: function(tag) {
		return editor_layers_LayerTagsHelper.removeTag(this.tags,tag);
	}
	,hasTag: function(tag) {
		return editor_layers_LayerTagsHelper.hasTag(this.tags,tag);
	}
	,getTags: function() {
		return editor_layers_LayerTagsHelper.getTags(this.tags);
	}
	,setTags: function(newTags) {
		editor_layers_LayerTagsHelper.setTags(this.tags,newTags);
	}
	,__class__: editor_layers_ImageLayer
};
var editor_layers_IntGridLayer = function(editor,maxValue) {
	if(maxValue == null) {
		maxValue = 15;
	}
	this.isInStroke = false;
	this.strokeOriginalData = new haxe_ds_StringMap();
	this.currentStroke = new haxe_ds_StringMap();
	this.originalCellData = new haxe_ds_StringMap();
	this.moveOffsetY = 0;
	this.moveOffsetX = 0;
	this.moveStartY = 0;
	this.moveStartX = 0;
	this.isMoving = false;
	this.selectedCells = new haxe_ds_StringMap();
	this.selectionEndY = 0;
	this.selectionEndX = 0;
	this.selectionStartY = 0;
	this.selectionStartX = 0;
	this.isSelecting = false;
	this.editor = editor;
	this.maxValue = maxValue;
	this.id = uuid_Uuid.v4();
	this.name = "IntGrid Layer " + HxOverrides.substr(this.id,0,8);
	this.visible = true;
	this.opacity = 1.0;
	this.type = "intgrid";
	this.tags = [];
	this.grid = new haxe_ds_StringMap();
	this.currentTool = "select";
	this.isDrawing = false;
	this.isSelecting = false;
	this.selectedCells = new haxe_ds_StringMap();
	this.isMoving = false;
	this.originalCellData = new haxe_ds_StringMap();
	this.currentStroke = new haxe_ds_StringMap();
	this.strokeOriginalData = new haxe_ds_StringMap();
	this.isInStroke = false;
	this.palette = new editor_palette_IntGridPalette(editor,maxValue);
};
editor_layers_IntGridLayer.__name__ = "editor.layers.IntGridLayer";
editor_layers_IntGridLayer.__interfaces__ = [editor_layers_Layer];
editor_layers_IntGridLayer.prototype = {
	render: function(ctx,viewX,viewY,zoom) {
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var startX = Math.floor(viewX / tileSize);
		var startY = Math.floor(viewY / tileSize);
		var endX = Math.ceil((viewX + ctx.canvas.width / zoom) / tileSize);
		var endY = Math.ceil((viewY + ctx.canvas.height / zoom) / tileSize);
		startX = Math.max(0,startX) | 0;
		startY = Math.max(0,startY) | 0;
		endX = Math.min(mapWidth,endX) | 0;
		endY = Math.min(mapHeight,endY) | 0;
		ctx.save();
		ctx.globalAlpha = this.opacity;
		var _g = startY;
		var _g1 = endY;
		while(_g < _g1) {
			var y = _g++;
			var _g2 = startX;
			var _g3 = endX;
			while(_g2 < _g3) {
				var x = _g2++;
				var key = "" + x + "," + y;
				if(Object.prototype.hasOwnProperty.call(this.grid.h,key)) {
					var value = this.grid.h[key];
					if(value > 0) {
						this.renderGridCell(ctx,x,y,value);
					}
				}
			}
		}
		ctx.restore();
	}
	,renderGridCell: function(ctx,x,y,value) {
		var tileSize = this.editor.getGridTileSize();
		var tiles = this.palette.tiles;
		var tile = null;
		var _g = 0;
		while(_g < tiles.length) {
			var t = tiles[_g];
			++_g;
			if(t.value == value) {
				tile = t;
				break;
			}
		}
		if(tile != null) {
			tile.renderAt(ctx,x * tileSize,y * tileSize,tileSize);
		} else {
			var colors = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#DDA0DD","#98D8C8","#F7DC6F"];
			ctx.fillStyle = colors[value % colors.length];
			ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
			ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
			ctx.strokeRect(x * tileSize,y * tileSize,tileSize,tileSize);
			ctx.fillStyle = "#000000";
			ctx.font = "bold " + Math.round(tileSize * 0.3) + "px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(value == null ? "null" : "" + value,x * tileSize + tileSize / 2,y * tileSize + tileSize / 2);
		}
	}
	,onMouseDown: function(worldX,worldY,button) {
		if(button == 0) {
			var tileSize = this.editor.getGridTileSize();
			var mapWidth = this.editor.getGridMapWidth();
			var mapHeight = this.editor.getGridMapHeight();
			var tileX = Math.floor(worldX / tileSize);
			var tileY = Math.floor(worldY / tileSize);
			if(tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
				switch(this.currentTool) {
				case "erase":
					this.isDrawing = true;
					this.eraseGridCell(tileX,tileY);
					return true;
				case "move":
					var key = "" + tileX + "," + tileY;
					if(Object.prototype.hasOwnProperty.call(this.selectedCells.h,key) && Lambda.count(this.selectedCells) > 0) {
						this.startMove(worldX,worldY);
						return true;
					}
					return false;
				case "paint":
					this.isDrawing = true;
					this.paintGridCell(tileX,tileY);
					return true;
				case "select":
					this.isSelecting = true;
					this.selectionStartX = worldX;
					this.selectionStartY = worldY;
					this.selectionEndX = worldX;
					this.selectionEndY = worldY;
					this.selectedCells.h = Object.create(null);
					return true;
				}
			}
		}
		return false;
	}
	,onMouseMove: function(worldX,worldY) {
		if(this.isSelecting) {
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.updateSelection();
			return true;
		} else if(this.isMoving) {
			this.moveOffsetX = worldX - this.moveStartX;
			this.moveOffsetY = worldY - this.moveStartY;
			return true;
		} else if(this.isDrawing) {
			var tileSize = this.editor.getGridTileSize();
			var mapWidth = this.editor.getGridMapWidth();
			var mapHeight = this.editor.getGridMapHeight();
			var tileX = Math.floor(worldX / tileSize);
			var tileY = Math.floor(worldY / tileSize);
			if(tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
				switch(this.currentTool) {
				case "erase":
					this.eraseGridCell(tileX,tileY);
					return true;
				case "paint":
					this.paintGridCell(tileX,tileY);
					return true;
				}
			}
		}
		return false;
	}
	,onMouseUp: function(worldX,worldY,button) {
		if(this.isSelecting) {
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.updateSelection();
			this.isSelecting = false;
			console.log("src/editor/layers/IntGridLayer.hx:243:","Selection completed: " + Std.string(new haxe_ds__$StringMap_StringMapKeyIterator(this.selectedCells.h)));
			return true;
		} else if(this.isMoving) {
			this.finishMove();
			return true;
		} else {
			this.isDrawing = false;
		}
		return false;
	}
	,updateSelection: function() {
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		this.selectedCells.h = Object.create(null);
		var minX = Math.floor(Math.min(this.selectionStartX,this.selectionEndX) / tileSize);
		var maxX = Math.floor(Math.max(this.selectionStartX,this.selectionEndX) / tileSize);
		var minY = Math.floor(Math.min(this.selectionStartY,this.selectionEndY) / tileSize);
		var maxY = Math.floor(Math.max(this.selectionStartY,this.selectionEndY) / tileSize);
		minX = Math.max(0,minX) | 0;
		maxX = Math.min(mapWidth - 1,maxX) | 0;
		minY = Math.max(0,minY) | 0;
		maxY = Math.min(mapHeight - 1,maxY) | 0;
		var _g = minY;
		var _g1 = maxY + 1;
		while(_g < _g1) {
			var y = _g++;
			var _g2 = minX;
			var _g3 = maxX + 1;
			while(_g2 < _g3) {
				var x = _g2++;
				var key = "" + x + "," + y;
				if(Object.prototype.hasOwnProperty.call(this.grid.h,key)) {
					this.selectedCells.h[key] = true;
				}
			}
		}
		console.log("src/editor/layers/IntGridLayer.hx:285:","Selected cells: " + Lambda.count(this.selectedCells) + " cells");
	}
	,startMove: function(worldX,worldY) {
		this.isMoving = true;
		this.moveStartX = worldX;
		this.moveStartY = worldY;
		this.moveOffsetX = 0;
		this.moveOffsetY = 0;
		this.originalCellData.h = Object.create(null);
		var h = this.selectedCells.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			if(Object.prototype.hasOwnProperty.call(this.grid.h,key)) {
				this.originalCellData.h[key] = this.grid.h[key];
			}
		}
		console.log("src/editor/layers/IntGridLayer.hx:303:","Started moving " + Lambda.count(this.selectedCells) + " cells");
	}
	,finishMove: function() {
		if(!this.isMoving) {
			return;
		}
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var tileOffsetX = Math.round(this.moveOffsetX / tileSize);
		var tileOffsetY = Math.round(this.moveOffsetY / tileSize);
		if(tileOffsetX == 0 && tileOffsetY == 0) {
			this.isMoving = false;
			return;
		}
		var h = this.selectedCells.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var _this = this.grid;
			if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
				delete(_this.h[key]);
			}
		}
		var newSelectedCells = new haxe_ds_StringMap();
		var h = this.selectedCells.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var oldX = Std.parseInt(parts[0]);
			var oldY = Std.parseInt(parts[1]);
			var newX = oldX + tileOffsetX;
			var newY = oldY + tileOffsetY;
			if(newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
				var newKey = "" + newX + "," + newY;
				var cellValue = this.originalCellData.h[key];
				if(cellValue != null) {
					this.grid.h[newKey] = cellValue;
					newSelectedCells.h[newKey] = true;
				}
			}
		}
		this.selectedCells = newSelectedCells;
		this.isMoving = false;
		this.originalCellData.h = Object.create(null);
		this.editor.render();
		console.log("src/editor/layers/IntGridLayer.hx:355:","Moved cells by offset: " + tileOffsetX + ", " + tileOffsetY);
	}
	,renderSelectionOverlay: function(ctx) {
		var tileSize = this.editor.getGridTileSize();
		if(this.isSelecting) {
			var minX = Math.min(this.selectionStartX,this.selectionEndX);
			var maxX = Math.max(this.selectionStartX,this.selectionEndX);
			var minY = Math.min(this.selectionStartY,this.selectionEndY);
			var maxY = Math.max(this.selectionStartY,this.selectionEndY);
			ctx.strokeStyle = "#00AAFF";
			ctx.lineWidth = 2;
			ctx.setLineDash([5,5]);
			ctx.strokeRect(minX,minY,maxX - minX,maxY - minY);
			ctx.setLineDash([]);
		}
		var h = this.selectedCells.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var renderX = x * tileSize;
			var renderY = y * tileSize;
			if(this.isMoving) {
				renderX += this.moveOffsetX | 0;
				renderY += this.moveOffsetY | 0;
				ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
				ctx.fillRect(renderX,renderY,tileSize,tileSize);
				ctx.strokeStyle = "#FFFF00";
				ctx.lineWidth = 2;
				ctx.setLineDash([3,3]);
				ctx.strokeRect(renderX,renderY,tileSize,tileSize);
				ctx.setLineDash([]);
			} else {
				ctx.fillStyle = "rgba(0, 170, 255, 0.3)";
				ctx.fillRect(renderX,renderY,tileSize,tileSize);
				ctx.strokeStyle = "#00AAFF";
				ctx.lineWidth = 2;
				ctx.strokeRect(renderX,renderY,tileSize,tileSize);
			}
		}
	}
	,paintGridCell: function(tileX,tileY) {
		var selectedTile = js_Boot.__cast(this.palette.getSelectedItem() , editor_palette_IntGridTile);
		if(selectedTile != null) {
			var key = "" + tileX + "," + tileY;
			if(selectedTile.value == 0) {
				var _this = this.grid;
				if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
					delete(_this.h[key]);
				}
			} else {
				this.grid.h[key] = selectedTile.value;
			}
			this.editor.render();
		}
	}
	,eraseGridCell: function(tileX,tileY) {
		var key = "" + tileX + "," + tileY;
		var _this = this.grid;
		if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
			delete(_this.h[key]);
		}
		this.editor.render();
	}
	,onToolChanged: function(toolId) {
		this.currentTool = toolId;
		this.isDrawing = false;
		if(toolId != "select") {
			this.isSelecting = false;
			this.selectedCells.h = Object.create(null);
		}
		if(toolId != "move") {
			this.isMoving = false;
			this.originalCellData.h = Object.create(null);
		}
	}
	,getPreviewCanvas: function(width,height) {
		var canvas = window.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d",null);
		ctx.fillStyle = "#2d2d2d";
		ctx.fillRect(0,0,width,height);
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var scale = Math.min(width / (mapWidth * tileSize),height / (mapHeight * tileSize));
		ctx.scale(scale,scale);
		var h = this.grid.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var value = this.grid.h[key];
			var colors = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#DDA0DD","#98D8C8","#F7DC6F"];
			ctx.fillStyle = colors[value % colors.length];
			ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
		}
		return canvas;
	}
	,getPalette: function() {
		return this.palette;
	}
	,setPalette: function(palette) {
		if(((palette) instanceof editor_palette_IntGridPalette)) {
			this.palette = js_Boot.__cast(palette , editor_palette_IntGridPalette);
		}
	}
	,serialize: function() {
		var gridArray = [];
		var h = this.grid.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			gridArray.push({ x : Std.parseInt(parts[0]), y : Std.parseInt(parts[1]), value : this.grid.h[key]});
		}
		return { id : this.id, name : this.name, visible : this.visible, opacity : this.opacity, type : this.type, tags : editor_layers_LayerTagsHelper.serializeTags(this.tags), maxValue : this.maxValue, grid : gridArray};
	}
	,deserialize: function(data,deserializeCallback) {
		if(data != null) {
			if(data.id != null) {
				this.id = data.id;
			}
			if(data.name != null) {
				this.name = data.name;
			}
			if(data.visible != null) {
				this.visible = data.visible;
			}
			if(data.opacity != null) {
				this.opacity = data.opacity;
			}
			if(data.type != null) {
				this.type = data.type;
			}
			editor_layers_LayerTagsHelper.deserializeTags(this.tags,data);
			if(data.maxValue != null) {
				this.maxValue = data.maxValue;
			}
			this.grid.h = Object.create(null);
			if(data.grid != null) {
				var gridArray = data.grid;
				var _g = 0;
				while(_g < gridArray.length) {
					var cell = gridArray[_g];
					++_g;
					if(cell.x != null && cell.y != null && cell.value != null) {
						var key = "" + Std.string(cell.x) + "," + Std.string(cell.y);
						this.grid.h[key] = cell.value;
					}
				}
			}
			this.palette.setMaxValue(this.maxValue);
		}
		deserializeCallback();
	}
	,setMaxValue: function(newMaxValue) {
		if(newMaxValue != this.maxValue) {
			this.maxValue = newMaxValue;
			this.palette.setMaxValue(this.maxValue);
			var keysToRemove = [];
			var h = this.grid.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				var value = this.grid.h[key];
				if(value > this.maxValue) {
					keysToRemove.push(key);
				}
			}
			var _g = 0;
			while(_g < keysToRemove.length) {
				var key = keysToRemove[_g];
				++_g;
				var _this = this.grid;
				if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
					delete(_this.h[key]);
				}
			}
			this.editor.render();
		}
	}
	,createPropertyPanel: function() {
		var _gthis = this;
		var panel = window.document.createElement("div");
		panel.className = "layer-properties-content";
		var nameLabel = window.document.createElement("label");
		nameLabel.textContent = "Layer Name: ";
		panel.appendChild(nameLabel);
		var nameInput = window.document.createElement("input");
		nameInput.type = "text";
		nameInput.value = this.name;
		nameInput.addEventListener("input",function(e) {
			_gthis.name = nameInput.value;
		});
		panel.appendChild(nameInput);
		panel.appendChild(window.document.createElement("br"));
		var maxValueLabel = window.document.createElement("label");
		maxValueLabel.textContent = "Max Value: ";
		panel.appendChild(maxValueLabel);
		var maxValueInput = window.document.createElement("input");
		maxValueInput.type = "number";
		maxValueInput.min = "1";
		maxValueInput.max = "50";
		maxValueInput.value = Std.string(this.maxValue);
		maxValueInput.addEventListener("change",function(e) {
			var newValue = Std.parseInt(maxValueInput.value);
			if(newValue != null && newValue > 0 && newValue <= 50) {
				_gthis.setMaxValue(newValue);
			}
		});
		panel.appendChild(maxValueInput);
		panel.appendChild(window.document.createElement("br"));
		var opacityLabel = window.document.createElement("label");
		opacityLabel.textContent = "Opacity: ";
		panel.appendChild(opacityLabel);
		var opacityInput = window.document.createElement("input");
		opacityInput.type = "range";
		opacityInput.min = "0";
		opacityInput.max = "100";
		opacityInput.value = Std.string(Math.round(this.opacity * 100));
		opacityInput.addEventListener("input",function(e) {
			var tmp = parseFloat(opacityInput.value);
			_gthis.opacity = tmp / 100;
			_gthis.editor.render();
		});
		panel.appendChild(opacityInput);
		var opacityValue = window.document.createElement("span");
		opacityValue.textContent = " " + opacityInput.value + "%";
		opacityInput.addEventListener("input",function(e) {
			opacityValue.textContent = " " + opacityInput.value + "%";
		});
		panel.appendChild(opacityValue);
		panel.appendChild(window.document.createElement("br"));
		var paletteLabel = window.document.createElement("label");
		paletteLabel.textContent = "Palette: ";
		panel.appendChild(paletteLabel);
		var showPaletteBtn = window.document.createElement("button");
		var tmp = this.palette.isVisible() ? "Hide Palette" : "Show Palette";
		showPaletteBtn.textContent = tmp;
		showPaletteBtn.className = "show-palette-btn";
		if(this.palette.isVisible()) {
			showPaletteBtn.classList.add("active");
		}
		showPaletteBtn.addEventListener("click",function(e) {
			if(_gthis.palette.isVisible()) {
				_gthis.palette.hide();
				showPaletteBtn.textContent = "Show Palette";
				showPaletteBtn.classList.remove("active");
			} else {
				_gthis.palette.show();
				showPaletteBtn.textContent = "Hide Palette";
				showPaletteBtn.classList.add("active");
			}
		});
		panel.appendChild(showPaletteBtn);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var tagControl = new editor_ui_LayerTagControl(this.editor,this);
		panel.appendChild(tagControl.getElement());
		return panel;
	}
	,addTag: function(tag) {
		return editor_layers_LayerTagsHelper.addTag(this.tags,tag);
	}
	,removeTag: function(tag) {
		return editor_layers_LayerTagsHelper.removeTag(this.tags,tag);
	}
	,hasTag: function(tag) {
		return editor_layers_LayerTagsHelper.hasTag(this.tags,tag);
	}
	,getTags: function() {
		return editor_layers_LayerTagsHelper.getTags(this.tags);
	}
	,setTags: function(newTags) {
		editor_layers_LayerTagsHelper.setTags(this.tags,newTags);
	}
	,__class__: editor_layers_IntGridLayer
};
var editor_layers_LayerTagsHelper = function() { };
editor_layers_LayerTagsHelper.__name__ = "editor.layers.LayerTagsHelper";
editor_layers_LayerTagsHelper.addTag = function(tags,tag) {
	if(tag == null || StringTools.trim(tag) == "" || editor_layers_LayerTagsHelper.hasTag(tags,tag)) {
		return false;
	}
	var cleanTag = StringTools.trim(tag);
	tags.push(cleanTag);
	tags.sort(function(a,b) {
		if(a.toLowerCase() < b.toLowerCase()) {
			return -1;
		} else {
			return 1;
		}
	});
	return true;
};
editor_layers_LayerTagsHelper.removeTag = function(tags,tag) {
	var index = tags.indexOf(tag);
	if(index >= 0) {
		tags.splice(index,1);
		return true;
	}
	return false;
};
editor_layers_LayerTagsHelper.hasTag = function(tags,tag) {
	return tags.indexOf(tag) >= 0;
};
editor_layers_LayerTagsHelper.getTags = function(tags) {
	return tags.slice();
};
editor_layers_LayerTagsHelper.setTags = function(tags,newTags) {
	tags.splice(0,tags.length);
	var _g = 0;
	while(_g < newTags.length) {
		var tag = newTags[_g];
		++_g;
		if(tag != null && StringTools.trim(tag) != "" && tags.indexOf(tag) == -1) {
			tags.push(StringTools.trim(tag));
		}
	}
	tags.sort(function(a,b) {
		if(a.toLowerCase() < b.toLowerCase()) {
			return -1;
		} else {
			return 1;
		}
	});
};
editor_layers_LayerTagsHelper.serializeTags = function(tags) {
	return tags.slice();
};
editor_layers_LayerTagsHelper.deserializeTags = function(tags,data) {
	if(data != null && data.tags != null && ((data.tags) instanceof Array)) {
		editor_layers_LayerTagsHelper.setTags(tags,data.tags);
	}
};
var editor_layers_ObjectLayer = function(editor) {
	this.selectedObjectTypeId = null;
	this.totalDragY = 0;
	this.totalDragX = 0;
	this.dragObject = null;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.selectionEndY = 0;
	this.selectionEndX = 0;
	this.selectionStartY = 0;
	this.selectionStartX = 0;
	this.isSelecting = false;
	this.editor = editor;
	this.objectDatabase = editor.getGlobalObjectDatabase();
	this.id = uuid_Uuid.v4();
	this.name = "Object Layer " + HxOverrides.substr(this.id,0,8);
	this.visible = true;
	this.opacity = 1.0;
	this.type = "object";
	this.tags = [];
	this.objects = [];
	this.currentTool = "select";
	this.selectedObjects = [];
	var definitions = this.objectDatabase.getAllDefinitions();
	if(definitions.length > 0) {
		this.selectedObjectTypeId = definitions[0].id;
	}
};
editor_layers_ObjectLayer.__name__ = "editor.layers.ObjectLayer";
editor_layers_ObjectLayer.__interfaces__ = [editor_layers_Layer];
editor_layers_ObjectLayer.prototype = {
	render: function(ctx,viewX,viewY,zoom) {
		ctx.save();
		ctx.globalAlpha = this.opacity;
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			if(obj.definition != null) {
				this.renderObjectInstance(ctx,obj);
			}
		}
		ctx.restore();
	}
	,renderObjectInstance: function(ctx,obj) {
		var bounds = obj.getBounds();
		ctx.save();
		ctx.translate(obj.x + bounds.width / 2,obj.y + bounds.height / 2);
		ctx.rotate(obj.rotation * Math.PI / 180);
		ctx.scale(obj.scaleX,obj.scaleY);
		ctx.translate(-bounds.width / 2,-bounds.height / 2);
		if(obj.definition.imageLoaded && obj.definition.image != null) {
			ctx.drawImage(obj.definition.image,0,0,bounds.width,bounds.height);
		} else {
			var fillColor = "#4ECDC4";
			var strokeColor = "#2C3E50";
			this.drawRoundedRect(ctx,0,0,bounds.width,bounds.height,4);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = 2;
			ctx.stroke();
			var centerX = bounds.width / 2;
			var centerY = bounds.height / 2;
			var iconSize = Math.min(bounds.width,bounds.height) * 0.3;
			ctx.fillStyle = "#FFFFFF";
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(centerX,centerY,iconSize,0,Math.PI * 2);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(centerX,centerY,iconSize * 0.3,0,Math.PI * 2);
			ctx.fill();
			var fontSize = Math.min(Math.min(10,bounds.height * 0.15),bounds.width * 0.08);
			if(fontSize >= 6) {
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "bold " + fontSize + "px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "bottom";
				ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
				ctx.shadowBlur = 2;
				ctx.fillText(obj.definition.name,bounds.width / 2,bounds.height - 2);
				ctx.shadowBlur = 0;
			}
		}
		if(this.selectedObjects.indexOf(obj) >= 0) {
			ctx.strokeStyle = "#FFD700";
			ctx.lineWidth = 3;
			ctx.setLineDash([5,5]);
			this.drawRoundedRect(ctx,-2,-2,bounds.width + 4,bounds.height + 4,6);
			ctx.stroke();
			ctx.setLineDash([]);
		}
		ctx.restore();
	}
	,drawRoundedRect: function(ctx,x,y,width,height,radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius,y);
		ctx.lineTo(x + width - radius,y);
		ctx.quadraticCurveTo(x + width,y,x + width,y + radius);
		ctx.lineTo(x + width,y + height - radius);
		ctx.quadraticCurveTo(x + width,y + height,x + width - radius,y + height);
		ctx.lineTo(x + radius,y + height);
		ctx.quadraticCurveTo(x,y + height,x,y + height - radius);
		ctx.lineTo(x,y + radius);
		ctx.quadraticCurveTo(x,y,x + radius,y);
		ctx.closePath();
	}
	,onMouseDown: function(worldX,worldY,button) {
		if(button == 0) {
			switch(this.currentTool) {
			case "erase":
				return this.handleEraseMouseDown(worldX,worldY);
			case "move":
				var clickedObject = this.getObjectAt(worldX,worldY);
				if(clickedObject != null && this.selectedObjects.indexOf(clickedObject) >= 0) {
					this.isDragging = true;
					this.dragStartX = worldX;
					this.dragStartY = worldY;
					this.totalDragX = 0;
					this.totalDragY = 0;
					return true;
				}
				return false;
			case "paint":
				return this.handlePlaceMouseDown(worldX,worldY);
			case "select":
				return this.handleSelectMouseDown(worldX,worldY);
			}
		}
		return false;
	}
	,handleSelectMouseDown: function(worldX,worldY) {
		var clickedObject = this.getObjectAt(worldX,worldY);
		if(clickedObject != null) {
			if(this.selectedObjects.indexOf(clickedObject) >= 0) {
				this.isDragging = true;
				this.dragStartX = worldX;
				this.dragStartY = worldY;
			} else {
				this.selectedObjects = [clickedObject];
			}
			this.editor.render();
			this.updatePropertyPanel();
			return true;
		} else {
			this.selectedObjects = [];
			this.isSelecting = true;
			this.selectionStartX = worldX;
			this.selectionStartY = worldY;
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.editor.render();
			this.updatePropertyPanel();
			return true;
		}
	}
	,handlePlaceMouseDown: function(worldX,worldY) {
		var clickedObject = this.getObjectAt(worldX,worldY);
		if(clickedObject != null) {
			this.selectedObjects = [clickedObject];
			this.editor.render();
			this.updatePropertyPanel();
			return true;
		}
		if(this.selectedObjectTypeId != null) {
			var definition = this.objectDatabase.getDefinition(this.selectedObjectTypeId);
			if(definition != null) {
				var gridSize = this.editor.getGridTileSize();
				var snappedX = Math.round(worldX / gridSize) * gridSize;
				var snappedY = Math.round(worldY / gridSize) * gridSize;
				var instance = new editor_objects_ObjectInstance(definition,snappedX,snappedY);
				var command = new editor_commands_AddObjectCommand(this,instance,this.editor);
				this.editor.executeCommand(command);
				return true;
			}
		}
		return false;
	}
	,handleEraseMouseDown: function(worldX,worldY) {
		var objectToRemove = this.getObjectAt(worldX,worldY);
		if(objectToRemove != null) {
			var command = new editor_commands_RemoveObjectCommand(this,objectToRemove,this.editor);
			this.editor.executeCommand(command);
			HxOverrides.remove(this.selectedObjects,objectToRemove);
			this.updatePropertyPanel();
			return true;
		}
		return false;
	}
	,onMouseMove: function(worldX,worldY) {
		if(this.isDragging && this.selectedObjects.length > 0) {
			var deltaX = worldX - this.dragStartX;
			var deltaY = worldY - this.dragStartY;
			var gridSize = this.editor.getGridTileSize();
			var snappedDeltaX = Math.round(deltaX / gridSize) * gridSize;
			var snappedDeltaY = Math.round(deltaY / gridSize) * gridSize;
			var realDeltaX = snappedDeltaX - this.totalDragX;
			var realDeltaY = snappedDeltaY - this.totalDragY;
			if(realDeltaX != 0 || realDeltaY != 0) {
				var _g = 0;
				var _g1 = this.selectedObjects;
				while(_g < _g1.length) {
					var obj = _g1[_g];
					++_g;
					obj.x += realDeltaX;
					obj.y += realDeltaY;
				}
				this.totalDragX = snappedDeltaX;
				this.totalDragY = snappedDeltaY;
				this.editor.render();
			}
			return true;
		} else if(this.isSelecting) {
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.updateSelectionFromRectangle();
			this.editor.render();
			this.updatePropertyPanel();
			return true;
		}
		return false;
	}
	,onMouseUp: function(worldX,worldY,button) {
		if(this.isDragging) {
			this.isDragging = false;
			if(Math.abs(this.totalDragX) > 0.1 || Math.abs(this.totalDragY) > 0.1) {
				var _g = 0;
				var _g1 = this.selectedObjects;
				while(_g < _g1.length) {
					var obj = _g1[_g];
					++_g;
					obj.x -= this.totalDragX;
					obj.y -= this.totalDragY;
				}
				var command = new editor_commands_MoveObjectsCommand(this,this.selectedObjects,this.totalDragX,this.totalDragY,this.editor);
				this.editor.executeCommand(command);
			}
			this.totalDragX = 0;
			this.totalDragY = 0;
			return true;
		} else if(this.isSelecting) {
			this.isSelecting = false;
			return true;
		}
		return false;
	}
	,getObjectAt: function(worldX,worldY) {
		var _g = 0;
		var _g1 = this.objects.length;
		while(_g < _g1) {
			var i = _g++;
			var obj = this.objects[this.objects.length - 1 - i];
			if(obj.containsPoint(worldX,worldY)) {
				return obj;
			}
		}
		return null;
	}
	,updateSelectionFromRectangle: function() {
		var minX = Math.min(this.selectionStartX,this.selectionEndX);
		var maxX = Math.max(this.selectionStartX,this.selectionEndX);
		var minY = Math.min(this.selectionStartY,this.selectionEndY);
		var maxY = Math.max(this.selectionStartY,this.selectionEndY);
		this.selectedObjects = [];
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			var bounds = obj.getBounds();
			if(bounds.x < maxX && bounds.x + bounds.width > minX && bounds.y < maxY && bounds.y + bounds.height > minY) {
				this.selectedObjects.push(obj);
			}
		}
	}
	,onToolChanged: function(toolId) {
		this.currentTool = toolId;
		this.isDragging = false;
		this.isSelecting = false;
	}
	,serialize: function() {
		var objectsArray = [];
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			objectsArray.push(obj.serialize());
		}
		return { id : this.id, name : this.name, visible : this.visible, opacity : this.opacity, type : this.type, tags : editor_layers_LayerTagsHelper.serializeTags(this.tags), objects : objectsArray};
	}
	,deserialize: function(data,deserializeCallback) {
		if(data != null) {
			if(data.id != null) {
				this.id = data.id;
			}
			if(data.name != null) {
				this.name = data.name;
			}
			if(data.visible != null) {
				this.visible = data.visible;
			}
			if(data.opacity != null) {
				this.opacity = data.opacity;
			}
			if(data.type != null) {
				this.type = data.type;
			}
			editor_layers_LayerTagsHelper.deserializeTags(this.tags,data);
			this.objects = [];
			if(data.objects != null) {
				var objectsArray = data.objects;
				var _g = 0;
				while(_g < objectsArray.length) {
					var objData = objectsArray[_g];
					++_g;
					var tmp = this.objectDatabase.getDefinition("temp");
					var tempDef = tmp != null ? tmp : this.createTempDefinition();
					var obj = new editor_objects_ObjectInstance(tempDef,0,0);
					obj.deserialize(objData);
					this.objects.push(obj);
				}
			}
		}
		deserializeCallback();
	}
	,createTempDefinition: function() {
		var tempDef = new editor_objects_ObjectDefinition("temp","Temporary");
		return tempDef;
	}
	,createPropertyPanel: function() {
		var _gthis = this;
		var panel = window.document.createElement("div");
		panel.className = "layer-properties-content";
		var nameLabel = window.document.createElement("label");
		nameLabel.textContent = "Layer Name: ";
		panel.appendChild(nameLabel);
		var nameInput = window.document.createElement("input");
		nameInput.type = "text";
		nameInput.value = this.name;
		nameInput.addEventListener("input",function(e) {
			_gthis.name = nameInput.value;
		});
		panel.appendChild(nameInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var objectTypeLabel = window.document.createElement("label");
		objectTypeLabel.textContent = "Object Type to Place: ";
		panel.appendChild(objectTypeLabel);
		var objectTypeSelect = window.document.createElement("select");
		objectTypeSelect.className = "tag-select";
		var definitions = this.objectDatabase.getAllDefinitions();
		var _g = 0;
		while(_g < definitions.length) {
			var definition = definitions[_g];
			++_g;
			var option = window.document.createElement("option");
			option.value = definition.id;
			option.textContent = definition.name;
			if(definition.id == this.selectedObjectTypeId) {
				option.selected = true;
			}
			objectTypeSelect.appendChild(option);
		}
		objectTypeSelect.addEventListener("change",function(e) {
			_gthis.selectedObjectTypeId = objectTypeSelect.value;
		});
		panel.appendChild(objectTypeSelect);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var countLabel = window.document.createElement("label");
		countLabel.textContent = "Objects: " + this.objects.length;
		panel.appendChild(countLabel);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		if(this.selectedObjects.length > 0) {
			var selectionLabel = window.document.createElement("label");
			selectionLabel.textContent = "Selected: " + this.selectedObjects.length;
			panel.appendChild(selectionLabel);
			panel.appendChild(window.document.createElement("br"));
			if(this.selectedObjects.length == 1) {
				var selectedObj = this.selectedObjects[0];
				var objPropsLabel = window.document.createElement("label");
				objPropsLabel.textContent = "Object Properties:";
				panel.appendChild(objPropsLabel);
				panel.appendChild(window.document.createElement("br"));
				var typeLabel = window.document.createElement("label");
				typeLabel.textContent = "Type: " + selectedObj.definition.name;
				typeLabel.style.color = "#a0a0a0";
				typeLabel.style.fontSize = "12px";
				panel.appendChild(typeLabel);
				panel.appendChild(window.document.createElement("br"));
				panel.appendChild(window.document.createElement("br"));
				var _g = 0;
				var _g1 = selectedObj.definition.fields;
				while(_g < _g1.length) {
					var field = [_g1[_g]];
					++_g;
					var fieldRow = window.document.createElement("div");
					fieldRow.style.display = "flex";
					fieldRow.style.gap = "8px";
					fieldRow.style.alignItems = "center";
					fieldRow.style.marginBottom = "6px";
					var fieldLabel = window.document.createElement("label");
					fieldLabel.textContent = field[0].name + ":";
					fieldLabel.style.minWidth = "80px";
					fieldLabel.style.color = "#e0e0e0";
					fieldLabel.style.fontSize = "12px";
					fieldRow.appendChild(fieldLabel);
					var currentValue = selectedObj.getFieldValue(field[0].name);
					switch(field[0].type) {
					case "bool":
						var checkboxInput = [window.document.createElement("input")];
						checkboxInput[0].type = "checkbox";
						checkboxInput[0].checked = currentValue == true;
						checkboxInput[0].addEventListener("change",(function(checkboxInput,field) {
							return function(e) {
								selectedObj.setFieldValue(field[0].name,checkboxInput[0].checked);
							};
						})(checkboxInput,field));
						fieldRow.appendChild(checkboxInput[0]);
						break;
					case "float":
						var floatInput = [window.document.createElement("input")];
						floatInput[0].type = "number";
						floatInput[0].step = "0.1";
						floatInput[0].value = currentValue == null ? "null" : "" + currentValue;
						floatInput[0].style.flex = "1";
						floatInput[0].style.padding = "4px";
						floatInput[0].style.backgroundColor = "#3e3e3e";
						floatInput[0].style.border = "1px solid #5e5e5e";
						floatInput[0].style.borderRadius = "4px";
						floatInput[0].style.color = "#e0e0e0";
						floatInput[0].addEventListener("input",(function(floatInput,field) {
							return function(e) {
								var value = parseFloat(floatInput[0].value);
								if(!isNaN(value)) {
									selectedObj.setFieldValue(field[0].name,value);
								}
							};
						})(floatInput,field));
						fieldRow.appendChild(floatInput[0]);
						break;
					case "int":
						var numberInput = [window.document.createElement("input")];
						numberInput[0].type = "number";
						numberInput[0].step = "1";
						numberInput[0].value = currentValue == null ? "null" : "" + currentValue;
						numberInput[0].style.flex = "1";
						numberInput[0].style.padding = "4px";
						numberInput[0].style.backgroundColor = "#3e3e3e";
						numberInput[0].style.border = "1px solid #5e5e5e";
						numberInput[0].style.borderRadius = "4px";
						numberInput[0].style.color = "#e0e0e0";
						numberInput[0].addEventListener("input",(function(numberInput,field) {
							return function(e) {
								var value = Std.parseInt(numberInput[0].value);
								if(value != null) {
									selectedObj.setFieldValue(field[0].name,value);
								}
							};
						})(numberInput,field));
						fieldRow.appendChild(numberInput[0]);
						break;
					default:
						var textInput = [window.document.createElement("input")];
						textInput[0].type = "text";
						textInput[0].value = currentValue == null ? "null" : "" + currentValue;
						textInput[0].style.flex = "1";
						textInput[0].style.padding = "4px";
						textInput[0].style.backgroundColor = "#3e3e3e";
						textInput[0].style.border = "1px solid #5e5e5e";
						textInput[0].style.borderRadius = "4px";
						textInput[0].style.color = "#e0e0e0";
						textInput[0].addEventListener("input",(function(textInput,field) {
							return function(e) {
								selectedObj.setFieldValue(field[0].name,textInput[0].value);
							};
						})(textInput,field));
						fieldRow.appendChild(textInput[0]);
					}
					panel.appendChild(fieldRow);
				}
				panel.appendChild(window.document.createElement("br"));
			}
		}
		var opacityLabel = window.document.createElement("label");
		opacityLabel.textContent = "Opacity: ";
		panel.appendChild(opacityLabel);
		var opacityInput = window.document.createElement("input");
		opacityInput.type = "range";
		opacityInput.min = "0";
		opacityInput.max = "100";
		opacityInput.value = Std.string(Math.round(this.opacity * 100));
		opacityInput.addEventListener("input",function(e) {
			var tmp = parseFloat(opacityInput.value);
			_gthis.opacity = tmp / 100;
		});
		panel.appendChild(opacityInput);
		var opacityValue = window.document.createElement("span");
		opacityValue.textContent = " " + opacityInput.value + "%";
		opacityInput.addEventListener("input",function(e) {
			opacityValue.textContent = " " + opacityInput.value + "%";
		});
		panel.appendChild(opacityValue);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var tagControl = new editor_ui_LayerTagControl(this.editor,this);
		panel.appendChild(tagControl.getElement());
		return panel;
	}
	,getPreviewCanvas: function(width,height) {
		var canvas = window.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d",null);
		ctx.fillStyle = "#2d2d2d";
		ctx.fillRect(0,0,width,height);
		var scale = Math.min(width / 400,height / 400);
		ctx.scale(scale,scale);
		ctx.fillStyle = "#4ECDC4";
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			var bounds = obj.getBounds();
			ctx.fillRect(bounds.x,bounds.y,Math.max(4,bounds.width),Math.max(4,bounds.height));
		}
		return canvas;
	}
	,getPalette: function() {
		return null;
	}
	,setPalette: function(palette) {
	}
	,getObjectDatabase: function() {
		return this.objectDatabase;
	}
	,getSelectedInstances: function() {
		return this.selectedObjects.slice();
	}
	,selectInstance: function(instance) {
		if(this.objects.indexOf(instance) >= 0) {
			this.selectedObjects = [instance];
			this.editor.render();
		}
	}
	,deleteSelectedObjects: function() {
		if(this.selectedObjects.length > 0) {
			var command = new editor_commands_RemoveMultipleObjectsCommand(this,this.selectedObjects,this.editor);
			this.editor.executeCommand(command);
			this.selectedObjects = [];
			this.editor.getPropertiesPanel().updateContent();
		}
	}
	,renderSelectionOverlay: function(ctx) {
		if(this.isSelecting) {
			ctx.save();
			ctx.strokeStyle = "#FFD700";
			ctx.lineWidth = 2;
			ctx.setLineDash([5,5]);
			var x = Math.min(this.selectionStartX,this.selectionEndX);
			var y = Math.min(this.selectionStartY,this.selectionEndY);
			var width = Math.abs(this.selectionEndX - this.selectionStartX);
			var height = Math.abs(this.selectionEndY - this.selectionStartY);
			ctx.strokeRect(x,y,width,height);
			ctx.setLineDash([]);
			ctx.restore();
		}
	}
	,updatePropertyPanel: function() {
		this.editor.getPropertiesPanel().updateContent();
	}
	,addTag: function(tag) {
		return editor_layers_LayerTagsHelper.addTag(this.tags,tag);
	}
	,removeTag: function(tag) {
		return editor_layers_LayerTagsHelper.removeTag(this.tags,tag);
	}
	,hasTag: function(tag) {
		return editor_layers_LayerTagsHelper.hasTag(this.tags,tag);
	}
	,getTags: function() {
		return editor_layers_LayerTagsHelper.getTags(this.tags);
	}
	,setTags: function(newTags) {
		editor_layers_LayerTagsHelper.setTags(this.tags,newTags);
	}
	,addObject: function(object) {
		this.objects.push(object);
	}
	,removeObject: function(object) {
		HxOverrides.remove(this.objects,object);
	}
	,__class__: editor_layers_ObjectLayer
};
var editor_layers_TileLayer = function(editor) {
	this.isInStroke = false;
	this.strokeOriginalData = new haxe_ds_StringMap();
	this.currentStroke = new haxe_ds_StringMap();
	this.showHoverPreview = false;
	this.hoverPreviewY = -1;
	this.hoverPreviewX = -1;
	this.originalTileData = new haxe_ds_StringMap();
	this.moveOffsetY = 0;
	this.moveOffsetX = 0;
	this.moveStartY = 0;
	this.moveStartX = 0;
	this.isMoving = false;
	this.selectedTiles = new haxe_ds_StringMap();
	this.selectionEndY = 0;
	this.selectionEndX = 0;
	this.selectionStartY = 0;
	this.selectionStartX = 0;
	this.isSelecting = false;
	this.editor = editor;
	this.id = uuid_Uuid.v4();
	this.name = "Tile Layer " + HxOverrides.substr(this.id,0,8);
	this.visible = true;
	this.opacity = 1.0;
	this.type = "tile";
	this.tags = [];
	this.tiles = new haxe_ds_StringMap();
	this.currentTool = "select";
	this.isDrawing = false;
	this.isSelecting = false;
	this.selectedTiles = new haxe_ds_StringMap();
	this.isMoving = false;
	this.originalTileData = new haxe_ds_StringMap();
	this.currentStroke = new haxe_ds_StringMap();
	this.strokeOriginalData = new haxe_ds_StringMap();
	this.isInStroke = false;
	this.palette = new editor_palette_TilePalette(editor);
	this.tilesetImagePath = "";
	if(this.palette.getElement().parentNode != window.document.body) {
		window.document.body.appendChild(this.palette.getElement());
	}
	this.palette.hide();
};
editor_layers_TileLayer.__name__ = "editor.layers.TileLayer";
editor_layers_TileLayer.__interfaces__ = [editor_layers_Layer];
editor_layers_TileLayer.prototype = {
	render: function(ctx,viewX,viewY,zoom) {
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var startX = Math.floor(viewX / tileSize);
		var startY = Math.floor(viewY / tileSize);
		var endX = Math.ceil((viewX + ctx.canvas.width / zoom) / tileSize);
		var endY = Math.ceil((viewY + ctx.canvas.height / zoom) / tileSize);
		startX = Math.max(0,startX) | 0;
		startY = Math.max(0,startY) | 0;
		endX = Math.min(mapWidth,endX) | 0;
		endY = Math.min(mapHeight,endY) | 0;
		var _g = startY;
		var _g1 = endY;
		while(_g < _g1) {
			var y = _g++;
			var _g2 = startX;
			var _g3 = endX;
			while(_g2 < _g3) {
				var x = _g2++;
				var key = "" + x + "," + y;
				if(Object.prototype.hasOwnProperty.call(this.tiles.h,key)) {
					var tileId = this.tiles.h[key];
					this.renderTile(ctx,x,y,tileId);
				}
			}
		}
	}
	,renderTile: function(ctx,x,y,tileId) {
		var tileSize = this.editor.getGridTileSize();
		var tile = null;
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			tile = tilePalette.getTileById(tileId);
		}
		if(tile != null) {
			var canvas = tile.getPreviewCanvas();
			ctx.drawImage(canvas,x * tileSize,y * tileSize,tileSize,tileSize);
		} else {
			var colors = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#DDA0DD","#98D8C8","#F7DC6F"];
			ctx.fillStyle = colors[tileId % colors.length];
			ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
			ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
			ctx.strokeRect(x * tileSize,y * tileSize,tileSize,tileSize);
		}
	}
	,onMouseDown: function(worldX,worldY,button) {
		console.log("src/editor/layers/TileLayer.hx:156:","onMouseDown: " + worldX + ", " + worldY + ", " + button + " " + this.currentTool);
		this.clearHoverPreview();
		if(button == 0) {
			var tileSize = this.editor.getGridTileSize();
			var mapWidth = this.editor.getGridMapWidth();
			var mapHeight = this.editor.getGridMapHeight();
			var tileX = Math.floor(worldX / tileSize);
			var tileY = Math.floor(worldY / tileSize);
			console.log("src/editor/layers/TileLayer.hx:168:","tileX: " + tileX + ", tileY: " + tileY);
			console.log("src/editor/layers/TileLayer.hx:169:","mapWidth: " + mapWidth + ", mapHeight: " + mapHeight);
			if(tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
				switch(this.currentTool) {
				case "erase":
					this.isDrawing = true;
					this.startStroke();
					this.eraseTileInStroke(tileX,tileY);
					return true;
				case "move":
					var key = "" + tileX + "," + tileY;
					console.log("src/editor/layers/TileLayer.hx:187:","selectedTiles: " + (this.selectedTiles == null ? "null" : haxe_ds_StringMap.stringify(this.selectedTiles.h)));
					console.log("src/editor/layers/TileLayer.hx:188:","key: " + key);
					if(Object.prototype.hasOwnProperty.call(this.selectedTiles.h,key) && Lambda.count(this.selectedTiles) > 0) {
						console.log("src/editor/layers/TileLayer.hx:190:","startMove");
						this.startMove(worldX,worldY);
						return true;
					}
					return false;
				case "paint":
					this.isDrawing = true;
					this.startStroke();
					this.paintTileInStroke(tileX,tileY);
					return true;
				case "select":
					this.isSelecting = true;
					this.selectionStartX = worldX;
					this.selectionStartY = worldY;
					this.selectionEndX = worldX;
					this.selectionEndY = worldY;
					this.selectedTiles.h = Object.create(null);
					return true;
				}
			}
		}
		return false;
	}
	,onMouseMove: function(worldX,worldY) {
		if(this.isSelecting) {
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.updateSelection();
			return true;
		} else if(this.isMoving) {
			this.moveOffsetX = worldX - this.moveStartX;
			this.moveOffsetY = worldY - this.moveStartY;
			return true;
		} else if(this.isDrawing) {
			var tileSize = this.editor.getGridTileSize();
			var mapWidth = this.editor.getGridMapWidth();
			var mapHeight = this.editor.getGridMapHeight();
			var tileX = Math.floor(worldX / tileSize);
			var tileY = Math.floor(worldY / tileSize);
			if(tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
				switch(this.currentTool) {
				case "erase":
					this.eraseTileInStroke(tileX,tileY);
					return true;
				case "paint":
					this.paintTileInStroke(tileX,tileY);
					return true;
				}
			}
		} else {
			var tileSize = this.editor.getGridTileSize();
			var mapWidth = this.editor.getGridMapWidth();
			var mapHeight = this.editor.getGridMapHeight();
			var tileX = Math.floor(worldX / tileSize);
			var tileY = Math.floor(worldY / tileSize);
			if(tileX >= 0 && tileX < mapWidth && tileY >= 0 && tileY < mapHeight) {
				if(this.currentTool == "paint" && ((this.palette) instanceof editor_palette_TilePalette)) {
					var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
					var selectedItem = tilePalette.getSelectedItem();
					if(selectedItem != null) {
						this.hoverPreviewX = tileX;
						this.hoverPreviewY = tileY;
						this.showHoverPreview = true;
						return true;
					}
				}
			}
			this.showHoverPreview = false;
		}
		return false;
	}
	,onMouseUp: function(worldX,worldY,button) {
		if(this.isSelecting) {
			this.selectionEndX = worldX;
			this.selectionEndY = worldY;
			this.updateSelection();
			this.isSelecting = false;
			console.log("src/editor/layers/TileLayer.hx:280:","Selection completed: " + Std.string(new haxe_ds__$StringMap_StringMapKeyIterator(this.selectedTiles.h)));
			return true;
		} else if(this.isMoving) {
			this.finishMove();
			return true;
		} else if(this.isDrawing) {
			this.isDrawing = false;
			this.finishStroke();
			return true;
		}
		return false;
	}
	,onMouseLeave: function() {
		this.clearHoverPreview();
	}
	,clearHoverPreview: function() {
		if(this.showHoverPreview) {
			this.showHoverPreview = false;
			this.hoverPreviewX = -1;
			this.hoverPreviewY = -1;
		}
	}
	,updateSelection: function() {
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		this.selectedTiles.h = Object.create(null);
		var minX = Math.floor(Math.min(this.selectionStartX,this.selectionEndX) / tileSize);
		var maxX = Math.floor(Math.max(this.selectionStartX,this.selectionEndX) / tileSize);
		var minY = Math.floor(Math.min(this.selectionStartY,this.selectionEndY) / tileSize);
		var maxY = Math.floor(Math.max(this.selectionStartY,this.selectionEndY) / tileSize);
		minX = Math.max(0,minX) | 0;
		maxX = Math.min(mapWidth - 1,maxX) | 0;
		minY = Math.max(0,minY) | 0;
		maxY = Math.min(mapHeight - 1,maxY) | 0;
		var _g = minY;
		var _g1 = maxY + 1;
		while(_g < _g1) {
			var y = _g++;
			var _g2 = minX;
			var _g3 = maxX + 1;
			while(_g2 < _g3) {
				var x = _g2++;
				var key = "" + x + "," + y;
				if(Object.prototype.hasOwnProperty.call(this.tiles.h,key)) {
					this.selectedTiles.h[key] = true;
				}
			}
		}
		console.log("src/editor/layers/TileLayer.hx:338:","Selected tiles: " + Lambda.count(this.selectedTiles) + " tiles");
	}
	,startMove: function(worldX,worldY) {
		this.isMoving = true;
		this.moveStartX = worldX;
		this.moveStartY = worldY;
		this.moveOffsetX = 0;
		this.moveOffsetY = 0;
		this.originalTileData.h = Object.create(null);
		var h = this.selectedTiles.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			if(Object.prototype.hasOwnProperty.call(this.tiles.h,key)) {
				this.originalTileData.h[key] = this.tiles.h[key];
			}
		}
		console.log("src/editor/layers/TileLayer.hx:356:","Started moving " + Lambda.count(this.selectedTiles) + " tiles");
	}
	,finishMove: function() {
		console.log("src/editor/layers/TileLayer.hx:360:","finishMove");
		if(!this.isMoving) {
			return;
		}
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var tileOffsetX = Math.round(this.moveOffsetX / tileSize);
		var tileOffsetY = Math.round(this.moveOffsetY / tileSize);
		if(tileOffsetX == 0 && tileOffsetY == 0) {
			this.isMoving = false;
			return;
		}
		var newPositions = new haxe_ds_StringMap();
		var originalPositionsCopy = new haxe_ds_StringMap();
		var h = this.originalTileData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			originalPositionsCopy.h[key] = this.originalTileData.h[key];
		}
		var h = this.selectedTiles.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var oldX = Std.parseInt(parts[0]);
			var oldY = Std.parseInt(parts[1]);
			var newX = oldX + tileOffsetX;
			var newY = oldY + tileOffsetY;
			if(newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight) {
				var newKey = "" + newX + "," + newY;
				var tileId = originalPositionsCopy.h[key];
				if(tileId != null) {
					newPositions.h[newKey] = tileId;
				}
			}
		}
		if(Lambda.count(originalPositionsCopy) > 0) {
			var command = new editor_commands_MoveTilesCommand(this,originalPositionsCopy,newPositions,this.editor);
			this.editor.executeCommand(command);
			this.selectedTiles.h = Object.create(null);
			var h = newPositions.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				this.selectedTiles.h[key] = true;
			}
		}
		this.isMoving = false;
		this.originalTileData.h = Object.create(null);
		console.log("src/editor/layers/TileLayer.hx:416:","Moved tiles by offset: " + tileOffsetX + ", " + tileOffsetY);
	}
	,renderSelectionOverlay: function(ctx) {
		var tileSize = this.editor.getGridTileSize();
		if(this.isSelecting) {
			var minX = Math.min(this.selectionStartX,this.selectionEndX);
			var maxX = Math.max(this.selectionStartX,this.selectionEndX);
			var minY = Math.min(this.selectionStartY,this.selectionEndY);
			var maxY = Math.max(this.selectionStartY,this.selectionEndY);
			ctx.strokeStyle = "#00AAFF";
			ctx.lineWidth = 2;
			ctx.setLineDash([5,5]);
			ctx.strokeRect(minX,minY,maxX - minX,maxY - minY);
			ctx.setLineDash([]);
		}
		var h = this.selectedTiles.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var renderX = x * tileSize;
			var renderY = y * tileSize;
			if(this.isMoving) {
				renderX += this.moveOffsetX | 0;
				renderY += this.moveOffsetY | 0;
				ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
				ctx.fillRect(renderX,renderY,tileSize,tileSize);
				ctx.strokeStyle = "#FFFF00";
				ctx.lineWidth = 2;
				ctx.setLineDash([3,3]);
				ctx.strokeRect(renderX,renderY,tileSize,tileSize);
				ctx.setLineDash([]);
			} else {
				ctx.fillStyle = "rgba(0, 170, 255, 0.3)";
				ctx.fillRect(renderX,renderY,tileSize,tileSize);
				ctx.strokeStyle = "#00AAFF";
				ctx.lineWidth = 2;
				ctx.strokeRect(renderX,renderY,tileSize,tileSize);
			}
		}
		this.renderHoverPreview(ctx);
	}
	,renderHoverPreview: function(ctx) {
		if(!this.showHoverPreview || this.hoverPreviewX < 0 || this.hoverPreviewY < 0) {
			return;
		}
		if(!((this.palette) instanceof editor_palette_TilePalette)) {
			return;
		}
		var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
		var selectedItem = tilePalette.getSelectedItem();
		if(selectedItem == null) {
			return;
		}
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		ctx.save();
		ctx.globalAlpha = 0.6;
		if(((selectedItem) instanceof Array)) {
			var selectedTiles = js_Boot.__cast(selectedItem , Array);
			if(selectedTiles.length > 1) {
				var dimensions = tilePalette.getSelectionDimensions();
				var _g = 0;
				var _g1 = dimensions.height;
				while(_g < _g1) {
					var offsetY = _g++;
					var _g2 = 0;
					var _g3 = dimensions.width;
					while(_g2 < _g3) {
						var offsetX = _g2++;
						var targetX = this.hoverPreviewX + offsetX;
						var targetY = this.hoverPreviewY + offsetY;
						if(targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
							var tile = tilePalette.getTileAtSelectionOffset(offsetX,offsetY);
							if(tile != null) {
								this.renderPreviewTile(ctx,targetX,targetY,tile,tileSize);
							}
						}
					}
				}
			} else if(selectedTiles.length == 1 && ((selectedTiles[0]) instanceof editor_palette_Tile)) {
				var tile = js_Boot.__cast(selectedTiles[0] , editor_palette_Tile);
				this.renderPreviewTile(ctx,this.hoverPreviewX,this.hoverPreviewY,tile,tileSize);
			}
		} else if(((selectedItem) instanceof editor_palette_Tile)) {
			var tile = js_Boot.__cast(selectedItem , editor_palette_Tile);
			this.renderPreviewTile(ctx,this.hoverPreviewX,this.hoverPreviewY,tile,tileSize);
		}
		ctx.restore();
	}
	,renderPreviewTile: function(ctx,x,y,tile,tileSize) {
		var canvas = tile.getPreviewCanvas();
		ctx.drawImage(canvas,x * tileSize,y * tileSize,tileSize,tileSize);
		ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
		ctx.lineWidth = 1;
		ctx.strokeRect(x * tileSize,y * tileSize,tileSize,tileSize);
	}
	,paintTile: function(tileX,tileY) {
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			var selectedItem = tilePalette.getSelectedItem();
			console.log("src/editor/layers/TileLayer.hx:540:","paintTile: " + tileX + ", " + tileY + " " + selectedItem);
			if(selectedItem != null) {
				if(((selectedItem) instanceof Array)) {
					var selectedTiles = js_Boot.__cast(selectedItem , Array);
					if(selectedTiles.length > 1) {
						this.paintMultipleTilesWithCommand(tileX,tileY,tilePalette);
						return;
					}
				}
				var selectedTile = null;
				if(((selectedItem) instanceof editor_palette_Tile)) {
					selectedTile = js_Boot.__cast(selectedItem , editor_palette_Tile);
				} else if(((selectedItem) instanceof Array)) {
					var selectedTiles = js_Boot.__cast(selectedItem , Array);
					if(selectedTiles.length > 0 && ((selectedTiles[0]) instanceof editor_palette_Tile)) {
						selectedTile = js_Boot.__cast(selectedTiles[0] , editor_palette_Tile);
					}
				}
				if(selectedTile != null) {
					var command = new editor_commands_PaintTileCommand(this,tileX,tileY,selectedTile.id,this.editor);
					this.editor.executeCommand(command);
				}
			}
		}
	}
	,paintMultipleTilesWithCommand: function(startX,startY,tilePalette) {
		var dimensions = tilePalette.getSelectionDimensions();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		console.log("src/editor/layers/TileLayer.hx:576:","paintMultipleTiles: " + startX + ", " + startY + ", dimensions: " + dimensions.width + "x" + dimensions.height);
		var tileData = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = dimensions.height;
		while(_g < _g1) {
			var offsetY = _g++;
			var _g2 = 0;
			var _g3 = dimensions.width;
			while(_g2 < _g3) {
				var offsetX = _g2++;
				var targetX = startX + offsetX;
				var targetY = startY + offsetY;
				if(targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
					var selectedTile = tilePalette.getTileAtSelectionOffset(offsetX,offsetY);
					if(selectedTile != null) {
						var key = "" + targetX + "," + targetY;
						tileData.h[key] = selectedTile.id;
					}
				}
			}
		}
		var h = tileData.h;
		var inlStringMapKeyIterator_h = h;
		var inlStringMapKeyIterator_keys = Object.keys(h);
		var inlStringMapKeyIterator_length = inlStringMapKeyIterator_keys.length;
		var inlStringMapKeyIterator_current = 0;
		if(inlStringMapKeyIterator_current < inlStringMapKeyIterator_length) {
			var command = new editor_commands_PaintMultipleTilesCommand(this,tileData,this.editor);
			this.editor.executeCommand(command);
		}
	}
	,eraseTile: function(tileX,tileY) {
		var command = new editor_commands_EraseTileCommand(this,tileX,tileY,this.editor);
		this.editor.executeCommand(command);
	}
	,startStroke: function() {
		if(!this.isInStroke) {
			this.isInStroke = true;
			this.currentStroke.h = Object.create(null);
			this.strokeOriginalData.h = Object.create(null);
			console.log("src/editor/layers/TileLayer.hx:614:","Starting new stroke");
		}
	}
	,paintTileInStroke: function(tileX,tileY) {
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			var selectedItem = tilePalette.getSelectedItem();
			if(selectedItem != null) {
				if(((selectedItem) instanceof Array)) {
					var selectedTiles = js_Boot.__cast(selectedItem , Array);
					if(selectedTiles.length > 1) {
						this.paintMultipleTilesInStroke(tileX,tileY,tilePalette);
						return;
					}
				}
				var selectedTile = null;
				if(((selectedItem) instanceof editor_palette_Tile)) {
					selectedTile = js_Boot.__cast(selectedItem , editor_palette_Tile);
				} else if(((selectedItem) instanceof Array)) {
					var selectedTiles = js_Boot.__cast(selectedItem , Array);
					if(selectedTiles.length > 0 && ((selectedTiles[0]) instanceof editor_palette_Tile)) {
						selectedTile = js_Boot.__cast(selectedTiles[0] , editor_palette_Tile);
					}
				}
				if(selectedTile != null) {
					this.addTileToStroke(tileX,tileY,selectedTile.id);
				}
			}
		}
	}
	,paintMultipleTilesInStroke: function(startX,startY,tilePalette) {
		var dimensions = tilePalette.getSelectionDimensions();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var _g = 0;
		var _g1 = dimensions.height;
		while(_g < _g1) {
			var offsetY = _g++;
			var _g2 = 0;
			var _g3 = dimensions.width;
			while(_g2 < _g3) {
				var offsetX = _g2++;
				var targetX = startX + offsetX;
				var targetY = startY + offsetY;
				if(targetX >= 0 && targetX < mapWidth && targetY >= 0 && targetY < mapHeight) {
					var selectedTile = tilePalette.getTileAtSelectionOffset(offsetX,offsetY);
					if(selectedTile != null) {
						this.addTileToStroke(targetX,targetY,selectedTile.id);
					}
				}
			}
		}
	}
	,eraseTileInStroke: function(tileX,tileY) {
		this.addTileToStroke(tileX,tileY,-1);
	}
	,addTileToStroke: function(x,y,tileId) {
		var key = "" + x + "," + y;
		if(!Object.prototype.hasOwnProperty.call(this.strokeOriginalData.h,key)) {
			var this1 = this.strokeOriginalData;
			var value = this.getTile(x,y);
			this1.h[key] = value;
		}
		if(tileId == -1) {
			var _this = this.currentStroke;
			if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
				delete(_this.h[key]);
			}
			this.removeTile(x,y);
		} else {
			this.currentStroke.h[key] = tileId;
			this.setTile(x,y,tileId);
		}
		this.editor.render();
	}
	,finishStroke: function() {
		if(!this.isInStroke) {
			return;
		}
		this.isInStroke = false;
		var h = this.currentStroke.h;
		var inlStringMapKeyIterator_h = h;
		var inlStringMapKeyIterator_keys = Object.keys(h);
		var inlStringMapKeyIterator_length = inlStringMapKeyIterator_keys.length;
		var inlStringMapKeyIterator_current = 0;
		if(inlStringMapKeyIterator_current < inlStringMapKeyIterator_length || this.hasErasedTilesInStroke()) {
			var strokeData = new haxe_ds_StringMap();
			var originalData = new haxe_ds_StringMap();
			var h = this.currentStroke.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				strokeData.h[key] = this.currentStroke.h[key];
				originalData.h[key] = this.strokeOriginalData.h[key];
			}
			var h = this.strokeOriginalData.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				if(!Object.prototype.hasOwnProperty.call(this.currentStroke.h,key)) {
					originalData.h[key] = this.strokeOriginalData.h[key];
				}
			}
			var strokeCommand = new editor_commands_StrokeCommand(this,strokeData,originalData,this.editor);
			this.editor.executeCommand(strokeCommand);
			console.log("src/editor/layers/TileLayer.hx:728:","Finished stroke with " + Lambda.count(strokeData) + " tiles painted and " + (Lambda.count(originalData) - Lambda.count(strokeData)) + " tiles erased");
		}
		this.currentStroke.h = Object.create(null);
		this.strokeOriginalData.h = Object.create(null);
	}
	,hasErasedTilesInStroke: function() {
		var h = this.strokeOriginalData.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			if(!Object.prototype.hasOwnProperty.call(this.currentStroke.h,key)) {
				return true;
			}
		}
		return false;
	}
	,onToolChanged: function(toolId) {
		if(this.isInStroke) {
			this.finishStroke();
		}
		this.currentTool = toolId;
		this.isDrawing = false;
		this.clearHoverPreview();
		if(toolId != "select") {
			this.isSelecting = false;
		}
		if(toolId != "move") {
			this.isMoving = false;
			this.originalTileData.h = Object.create(null);
		}
	}
	,getPreviewCanvas: function(width,height) {
		var canvas = window.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d",null);
		ctx.fillStyle = "#2d2d2d";
		ctx.fillRect(0,0,width,height);
		var tileSize = this.editor.getGridTileSize();
		var mapWidth = this.editor.getGridMapWidth();
		var mapHeight = this.editor.getGridMapHeight();
		var scale = Math.min(width / (mapWidth * tileSize),height / (mapHeight * tileSize));
		ctx.scale(scale,scale);
		var h = this.tiles.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var tileId = this.tiles.h[key];
			var colors = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#DDA0DD","#98D8C8","#F7DC6F"];
			ctx.fillStyle = colors[tileId % colors.length];
			ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
		}
		return canvas;
	}
	,getPalette: function() {
		return this.palette;
	}
	,setPalette: function(palette) {
		if(((palette) instanceof editor_palette_TilePalette)) {
			this.palette = js_Boot.__cast(palette , editor_palette_TilePalette);
		}
	}
	,setTilesetImagePath: function(path) {
		this.tilesetImagePath = path;
	}
	,getTilesetImagePath: function() {
		return this.tilesetImagePath;
	}
	,getTilesetData: function() {
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			return tilePalette.getTilesetImageData();
		}
		return null;
	}
	,serialize: function() {
		var tilesArray = [];
		var h = this.tiles.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var parts = key.split(",");
			var x = Std.parseInt(parts[0]);
			var y = Std.parseInt(parts[1]);
			var tileId = this.tiles.h[key];
			tilesArray.push({ x : x, y : y, tileId : tileId});
		}
		return { id : this.id, name : this.name, visible : this.visible, opacity : this.opacity, type : this.type, tags : editor_layers_LayerTagsHelper.serializeTags(this.tags), tiles : tilesArray, tilesetImagePath : this.tilesetImagePath};
	}
	,deserialize: function(data,deserializeCallback) {
		if(data != null) {
			if(data.id != null) {
				this.id = data.id;
			}
			if(data.name != null) {
				this.name = data.name;
			}
			if(data.visible != null) {
				this.visible = data.visible;
			}
			if(data.opacity != null) {
				this.opacity = data.opacity;
			}
			if(data.type != null) {
				this.type = data.type;
			}
			editor_layers_LayerTagsHelper.deserializeTags(this.tags,data);
			if(data.tilesetImagePath != null) {
				this.tilesetImagePath = data.tilesetImagePath;
			}
			this.tiles.h = Object.create(null);
			if(data.tiles != null) {
				var tilesArray = data.tiles;
				var _g = 0;
				while(_g < tilesArray.length) {
					var tile = tilesArray[_g];
					++_g;
					if(tile.x != null && tile.y != null && tile.tileId != null) {
						var key = "" + Std.string(tile.x) + "," + Std.string(tile.y);
						this.tiles.h[key] = tile.tileId;
					}
				}
			}
			if(data.tilesetData != null && ((this.palette) instanceof editor_palette_TilePalette)) {
				var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
				tilePalette.loadTilesetFromDataUrl(data.tilesetData,deserializeCallback);
			}
		}
	}
	,createPropertyPanel: function() {
		var _gthis = this;
		var panel = window.document.createElement("div");
		panel.className = "layer-properties-content";
		var nameLabel = window.document.createElement("label");
		nameLabel.textContent = "Layer Name: ";
		panel.appendChild(nameLabel);
		var nameInput = window.document.createElement("input");
		nameInput.type = "text";
		nameInput.value = this.name;
		nameInput.addEventListener("input",function(e) {
			_gthis.name = nameInput.value;
		});
		panel.appendChild(nameInput);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var opacityLabel = window.document.createElement("label");
		opacityLabel.textContent = "Opacity: ";
		panel.appendChild(opacityLabel);
		var opacityInput = window.document.createElement("input");
		opacityInput.type = "range";
		opacityInput.min = "0";
		opacityInput.max = "100";
		opacityInput.value = Std.string(Math.round(this.opacity * 100));
		opacityInput.addEventListener("input",function(e) {
			var tmp = parseFloat(opacityInput.value);
			_gthis.opacity = tmp / 100;
		});
		panel.appendChild(opacityInput);
		var opacityValue = window.document.createElement("span");
		opacityValue.textContent = " " + opacityInput.value + "%";
		opacityInput.addEventListener("input",function(e) {
			opacityValue.textContent = " " + opacityInput.value + "%";
		});
		panel.appendChild(opacityValue);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var tilesetLabel = window.document.createElement("label");
		tilesetLabel.textContent = "Tileset Image: ";
		panel.appendChild(tilesetLabel);
		var tilesetPathInput = window.document.createElement("input");
		tilesetPathInput.type = "text";
		tilesetPathInput.value = this.tilesetImagePath;
		tilesetPathInput.placeholder = "Path to tileset image...";
		tilesetPathInput.addEventListener("input",function(e) {
			_gthis.setTilesetImagePath(tilesetPathInput.value);
		});
		panel.appendChild(tilesetPathInput);
		panel.appendChild(window.document.createElement("br"));
		var browseBtn = window.document.createElement("button");
		browseBtn.textContent = "Load Tileset...";
		browseBtn.className = "show-palette-btn";
		if(this.palette.isVisible()) {
			browseBtn.classList.add("active");
		}
		browseBtn.addEventListener("click",function(e) {
			var fileInput = window.document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = "image/*";
			fileInput.addEventListener("change",function(e) {
				if(fileInput.files.length > 0) {
					var file = fileInput.files[0];
					tilesetPathInput.value = file.name;
					_gthis.setTilesetImagePath(file.name);
					if(((_gthis.palette) instanceof editor_palette_TilePalette)) {
						var tilePalette = js_Boot.__cast(_gthis.palette , editor_palette_TilePalette);
						tilePalette.loadTilesetFromFile(file);
					}
				}
			});
			fileInput.click();
		});
		panel.appendChild(browseBtn);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var paletteLabel = window.document.createElement("label");
		paletteLabel.textContent = "Palette: ";
		panel.appendChild(paletteLabel);
		var showPaletteBtn = window.document.createElement("button");
		var tmp = this.palette.isVisible() ? "Hide Palette" : "Show Palette";
		showPaletteBtn.textContent = tmp;
		showPaletteBtn.className = "show-palette-btn";
		if(this.palette.isVisible()) {
			showPaletteBtn.classList.add("active");
		}
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			tilePalette.setOnVisibilityChanged(function(isVisible) {
				if(isVisible) {
					showPaletteBtn.textContent = "Hide Palette";
					showPaletteBtn.classList.add("active");
				} else {
					showPaletteBtn.textContent = "Show Palette";
					showPaletteBtn.classList.remove("active");
				}
			});
		}
		showPaletteBtn.addEventListener("click",function(e) {
			if(_gthis.palette.isVisible()) {
				_gthis.palette.hide();
				showPaletteBtn.textContent = "Show Palette";
				showPaletteBtn.classList.remove("active");
			} else {
				_gthis.palette.show();
				showPaletteBtn.textContent = "Hide Palette";
				showPaletteBtn.classList.add("active");
			}
		});
		panel.appendChild(showPaletteBtn);
		panel.appendChild(window.document.createElement("br"));
		panel.appendChild(window.document.createElement("br"));
		var tagControl = new editor_ui_LayerTagControl(this.editor,this);
		panel.appendChild(tagControl.getElement());
		return panel;
	}
	,loadTilesetFromFile: function(file) {
		if(((this.palette) instanceof editor_palette_TilePalette)) {
			var tilePalette = js_Boot.__cast(this.palette , editor_palette_TilePalette);
			tilePalette.loadTilesetFromFile(file);
		}
	}
	,getTile: function(x,y) {
		var key = "" + x + "," + y;
		return this.tiles.h[key];
	}
	,setTile: function(x,y,tileId) {
		var key = "" + x + "," + y;
		this.tiles.h[key] = tileId;
	}
	,removeTile: function(x,y) {
		var key = "" + x + "," + y;
		var _this = this.tiles;
		if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
			delete(_this.h[key]);
		}
	}
	,addTag: function(tag) {
		return editor_layers_LayerTagsHelper.addTag(this.tags,tag);
	}
	,removeTag: function(tag) {
		return editor_layers_LayerTagsHelper.removeTag(this.tags,tag);
	}
	,hasTag: function(tag) {
		return editor_layers_LayerTagsHelper.hasTag(this.tags,tag);
	}
	,getTags: function() {
		return editor_layers_LayerTagsHelper.getTags(this.tags);
	}
	,setTags: function(newTags) {
		editor_layers_LayerTagsHelper.setTags(this.tags,newTags);
	}
	,setSelectedTiles: function(newSelection) {
		this.selectedTiles = newSelection;
	}
	,getSelectedTiles: function() {
		return this.selectedTiles;
	}
	,__class__: editor_layers_TileLayer
};
var editor_objects_ObjectDatabase = function() {
	this.definitions = new haxe_ds_StringMap();
	this.definitionsList = [];
	this.createDefaultDefinitions();
};
editor_objects_ObjectDatabase.__name__ = "editor.objects.ObjectDatabase";
editor_objects_ObjectDatabase.prototype = {
	addDefinition: function(definition) {
		if(!Object.prototype.hasOwnProperty.call(this.definitions.h,definition.id)) {
			this.definitions.h[definition.id] = definition;
			this.definitionsList.push(definition);
		} else {
			this.definitions.h[definition.id] = definition;
			var _g = 0;
			var _g1 = this.definitionsList.length;
			while(_g < _g1) {
				var i = _g++;
				if(this.definitionsList[i].id == definition.id) {
					this.definitionsList[i] = definition;
					break;
				}
			}
		}
	}
	,removeDefinition: function(id) {
		if(Object.prototype.hasOwnProperty.call(this.definitions.h,id)) {
			var _this = this.definitions;
			if(Object.prototype.hasOwnProperty.call(_this.h,id)) {
				delete(_this.h[id]);
			}
			var _g = 0;
			var _g1 = this.definitionsList.length;
			while(_g < _g1) {
				var i = _g++;
				if(this.definitionsList[i].id == id) {
					this.definitionsList.splice(i,1);
					break;
				}
			}
			return true;
		}
		return false;
	}
	,getDefinition: function(id) {
		return this.definitions.h[id];
	}
	,getAllDefinitions: function() {
		return this.definitionsList.slice();
	}
	,getCount: function() {
		return this.definitionsList.length;
	}
	,hasDefinition: function(id) {
		return Object.prototype.hasOwnProperty.call(this.definitions.h,id);
	}
	,createDefinition: function(name) {
		var id = uuid_Uuid.v4();
		var definition = new editor_objects_ObjectDefinition(id,name);
		this.addDefinition(definition);
		return definition;
	}
	,serialize: function() {
		var definitionsArray = [];
		var _g = 0;
		var _g1 = this.definitionsList;
		while(_g < _g1.length) {
			var definition = _g1[_g];
			++_g;
			definitionsArray.push(definition.serialize());
		}
		return { version : "1.0", definitions : definitionsArray};
	}
	,deserialize: function(data) {
		this.definitions.h = Object.create(null);
		this.definitionsList = [];
		if(data.definitions != null) {
			var definitionsArray = data.definitions;
			var _g = 0;
			while(_g < definitionsArray.length) {
				var defData = definitionsArray[_g];
				++_g;
				var definition = new editor_objects_ObjectDefinition(defData.id,defData.name);
				definition.deserialize(defData);
				this.addDefinition(definition);
			}
		}
	}
	,clear: function() {
		this.definitions.h = Object.create(null);
		this.definitionsList = [];
	}
	,createDefaultDefinitions: function() {
		var playerSpawn = this.createDefinition("Player Spawn");
		playerSpawn.addField("team","int",1,"Team number for this spawn point");
		playerSpawn.addField("respawn_time","float",5.0,"Time in seconds before respawn");
		playerSpawn.addField("enabled","bool",true,"Whether this spawn point is active");
		var collectible = this.createDefinition("Collectible");
		collectible.addField("item_type","string","coin","Type of collectible item");
		collectible.addField("value","int",10,"Point value of this item");
		collectible.addField("respawn","bool",false,"Whether item respawns after collection");
		collectible.addField("respawn_time","float",30.0,"Time until respawn if enabled");
		var enemySpawn = this.createDefinition("Enemy Spawn");
		enemySpawn.addField("enemy_type","string","basic","Type of enemy to spawn");
		enemySpawn.addField("level","int",1,"Enemy level");
		enemySpawn.addField("patrol_radius","float",100.0,"Maximum distance enemy will patrol");
		enemySpawn.addField("aggressive","bool",true,"Whether enemy attacks on sight");
		var trigger = this.createDefinition("Trigger Zone");
		trigger.addField("trigger_type","string","once","Trigger behavior: once, repeat, toggle");
		trigger.addField("event_id","string","","ID of event to trigger");
		trigger.addField("delay","float",0.0,"Delay in seconds before triggering");
		trigger.addField("player_only","bool",true,"Whether only player can trigger");
		var checkpoint = this.createDefinition("Checkpoint");
		checkpoint.addField("checkpoint_id","string","cp1","Unique identifier for this checkpoint");
		checkpoint.addField("auto_save","bool",true,"Whether to auto-save when reached");
		checkpoint.addField("heal_player","bool",false,"Whether to heal player when reached");
	}
	,__class__: editor_objects_ObjectDatabase
};
var editor_objects_ObjectDefinition = function(id,name) {
	this.id = id;
	this.name = name;
	this.image = null;
	this.imageLoaded = false;
	this.fields = [];
	this.width = 32;
	this.height = 32;
};
editor_objects_ObjectDefinition.__name__ = "editor.objects.ObjectDefinition";
editor_objects_ObjectDefinition.prototype = {
	setImage: function(imageData) {
		var _gthis = this;
		if(this.image == null) {
			this.image = window.document.createElement("img");
		}
		this.image.onload = function() {
			_gthis.imageLoaded = true;
			_gthis.width = _gthis.image.width;
			_gthis.height = _gthis.image.height;
		};
		this.image.onerror = function() {
			_gthis.imageLoaded = false;
			console.log("src/editor/objects/ObjectDefinition.hx:53:","Error loading image for object definition: " + _gthis.name);
		};
		this.image.src = imageData;
	}
	,addField: function(name,type,defaultValue,description) {
		var _g = 0;
		var _g1 = this.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			if(field.name == name) {
				field.type = type;
				field.defaultValue = defaultValue;
				field.description = description;
				return;
			}
		}
		this.fields.push({ name : name, type : type, defaultValue : defaultValue, description : description});
	}
	,removeField: function(name) {
		var _g = 0;
		var _g1 = this.fields.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.fields[i].name == name) {
				this.fields.splice(i,1);
				return true;
			}
		}
		return false;
	}
	,getField: function(name) {
		var _g = 0;
		var _g1 = this.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			if(field.name == name) {
				return field;
			}
		}
		return null;
	}
	,createDefaultInstanceData: function() {
		var data = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			data.h[field.name] = field.defaultValue;
		}
		return data;
	}
	,serialize: function() {
		return { id : this.id, name : this.name, width : this.width, height : this.height, fields : this.fields, hasImage : this.imageLoaded, imageData : this.imageLoaded ? this.image.src : null};
	}
	,deserialize: function(data) {
		this.id = data.id;
		this.name = data.name;
		this.width = data.width != null ? data.width : 32;
		this.height = data.height != null ? data.height : 32;
		this.fields = [];
		if(data.fields != null) {
			var fieldsArray = data.fields;
			var _g = 0;
			while(_g < fieldsArray.length) {
				var fieldData = fieldsArray[_g];
				++_g;
				this.fields.push({ name : fieldData.name, type : fieldData.type, defaultValue : fieldData.defaultValue, description : fieldData.description});
			}
		}
		if(data.hasImage && data.imageData != null) {
			this.setImage(data.imageData);
		}
	}
	,__class__: editor_objects_ObjectDefinition
};
var editor_objects_ObjectInstance = function(definition,x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.uuid = uuid_Uuid.v4();
	this.definition = definition;
	this.definitionId = definition.id;
	this.x = x;
	this.y = y;
	this.rotation = 0;
	this.scaleX = 1.0;
	this.scaleY = 1.0;
	this.fieldValues = definition.createDefaultInstanceData();
};
editor_objects_ObjectInstance.__name__ = "editor.objects.ObjectInstance";
editor_objects_ObjectInstance.prototype = {
	getFieldValue: function(fieldName) {
		if(Object.prototype.hasOwnProperty.call(this.fieldValues.h,fieldName)) {
			return this.fieldValues.h[fieldName];
		}
		var field = this.definition.getField(fieldName);
		if(field != null) {
			return field.defaultValue;
		}
		return null;
	}
	,setFieldValue: function(fieldName,value) {
		var field = this.definition.getField(fieldName);
		if(field == null) {
			return false;
		}
		var convertedValue = this.validateAndConvertValue(value,field.type);
		if(convertedValue != null) {
			this.fieldValues.h[fieldName] = convertedValue;
			return true;
		}
		return false;
	}
	,validateAndConvertValue: function(value,type) {
		switch(type) {
		case "bool":
			if(typeof(value) == "boolean") {
				return value;
			}
			if(typeof(value) == "string") {
				var str = (js_Boot.__cast(value , String)).toLowerCase();
				if(!(str == "true" || str == "1")) {
					return str == "yes";
				} else {
					return true;
				}
			}
			if(typeof(value) == "number" && ((value | 0) === value)) {
				return js_Boot.__cast(value , Int) != 0;
			}
			if(typeof(value) == "number") {
				return js_Boot.__cast(value , Float) != 0.0;
			}
			return false;
		case "float":
			if(typeof(value) == "number") {
				return value;
			}
			if(typeof(value) == "number" && ((value | 0) === value)) {
				return js_Boot.__cast(value , Float);
			}
			if(typeof(value) == "string") {
				var parsed = parseFloat(js_Boot.__cast(value , String));
				if(!isNaN(parsed)) {
					return parsed;
				} else {
					return 0.0;
				}
			}
			return 0.0;
		case "int":
			if(typeof(value) == "number" && ((value | 0) === value)) {
				return value;
			}
			if(typeof(value) == "number") {
				return value | 0;
			}
			if(typeof(value) == "string") {
				var parsed = Std.parseInt(js_Boot.__cast(value , String));
				if(parsed != null) {
					return parsed;
				} else {
					return 0;
				}
			}
			return 0;
		case "string":
			return Std.string(value);
		default:
			return value;
		}
	}
	,getBounds: function() {
		var width = this.definition.width * this.scaleX;
		var height = this.definition.height * this.scaleY;
		return { x : this.x, y : this.y, width : width, height : height};
	}
	,containsPoint: function(px,py) {
		var bounds = this.getBounds();
		if(px >= bounds.x && px <= bounds.x + bounds.width && py >= bounds.y) {
			return py <= bounds.y + bounds.height;
		} else {
			return false;
		}
	}
	,serialize: function() {
		var fieldsData = { };
		var h = this.fieldValues.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			fieldsData[key] = this.fieldValues.h[key];
		}
		return { uuid : this.uuid, definitionId : this.definitionId, x : this.x, y : this.y, rotation : this.rotation, scaleX : this.scaleX, scaleY : this.scaleY, fieldValues : fieldsData};
	}
	,deserialize: function(data) {
		this.uuid = data.uuid;
		this.definitionId = data.definitionId;
		this.x = data.x != null ? data.x : 0;
		this.y = data.y != null ? data.y : 0;
		this.rotation = data.rotation != null ? data.rotation : 0;
		this.scaleX = data.scaleX != null ? data.scaleX : 1.0;
		this.scaleY = data.scaleY != null ? data.scaleY : 1.0;
		this.fieldValues = new haxe_ds_StringMap();
		if(data.fieldValues != null) {
			var fieldsData = data.fieldValues;
			var _g = 0;
			var _g1 = Reflect.fields(fieldsData);
			while(_g < _g1.length) {
				var fieldName = _g1[_g];
				++_g;
				var value = Reflect.field(fieldsData,fieldName);
				this.fieldValues.h[fieldName] = value;
			}
		}
	}
	,setDefinition: function(definition) {
		this.definition = definition;
		this.definitionId = definition.id;
		var _g = 0;
		var _g1 = definition.fields;
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			if(!Object.prototype.hasOwnProperty.call(this.fieldValues.h,field.name)) {
				this.fieldValues.h[field.name] = field.defaultValue;
			}
		}
	}
	,__class__: editor_objects_ObjectInstance
};
var editor_palette_Palette = function() { };
editor_palette_Palette.__name__ = "editor.palette.Palette";
editor_palette_Palette.__isInterface__ = true;
editor_palette_Palette.prototype = {
	__class__: editor_palette_Palette
};
var editor_palette_IntGridPalette = function(editor,maxValue) {
	if(maxValue == null) {
		maxValue = 15;
	}
	this.dragStartTop = 0;
	this.dragStartLeft = 0;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.selectedTileY = -1;
	this.selectedTileX = -1;
	this.tilesPerRow = 8;
	this.tileDisplaySize = 32;
	this.editor = editor;
	this.maxValue = maxValue;
	this.tiles = [];
	this.loadTemplate();
	this.generateTiles();
	if(editor != null) {
		editor.addEventListener("gridSettingsChanged",$bind(this,this.onGridSettingsChanged));
	}
};
editor_palette_IntGridPalette.__name__ = "editor.palette.IntGridPalette";
editor_palette_IntGridPalette.__interfaces__ = [editor_palette_Palette];
editor_palette_IntGridPalette.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","Palette.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.setupUI();
		this.setupEventListeners();
		this.element.style.left = "50px";
		this.element.style.top = "100px";
	}
	,setupUI: function() {
		var _gthis = this;
		this.element.className = "palette-window";
		this.titleBar = this.element.querySelector(".palette-title-bar");
		this.titleBar.querySelector(".palette-title").textContent = "IntGrid Palette";
		this.closeBtn = this.element.querySelector(".palette-close-btn");
		var windowContent = this.element.querySelector(".palette-window-content");
		windowContent.innerHTML = "";
		var intGridContent = window.document.createElement("div");
		intGridContent.className = "intgrid-palette";
		this.previewArea = window.document.createElement("div");
		this.previewArea.className = "palette-preview";
		intGridContent.appendChild(this.previewArea);
		this.contentArea = window.document.createElement("div");
		this.contentArea.className = "palette-content";
		this.paletteCanvas = window.document.createElement("canvas");
		this.paletteCanvas.className = "intgrid-canvas";
		this.contentArea.appendChild(this.paletteCanvas);
		this.paletteCtx = this.paletteCanvas.getContext("2d",null);
		this.selectionOverlay = window.document.createElement("div");
		this.selectionOverlay.className = "tile-selection-overlay";
		this.contentArea.appendChild(this.selectionOverlay);
		intGridContent.appendChild(this.contentArea);
		this.bottomBar = window.document.createElement("div");
		this.bottomBar.className = "palette-bottom-bar";
		var maxValueLabel = window.document.createElement("label");
		maxValueLabel.textContent = "Max Value: ";
		this.bottomBar.appendChild(maxValueLabel);
		var maxValueInput = window.document.createElement("input");
		maxValueInput.type = "number";
		maxValueInput.min = "1";
		maxValueInput.max = "50";
		maxValueInput.value = Std.string(this.maxValue);
		maxValueInput.addEventListener("change",function(e) {
			var newMaxValue = Std.parseInt(maxValueInput.value);
			if(newMaxValue != null && newMaxValue > 0 && newMaxValue <= 50) {
				_gthis.setMaxValue(newMaxValue);
			}
		});
		this.bottomBar.appendChild(maxValueInput);
		intGridContent.appendChild(this.bottomBar);
		windowContent.appendChild(intGridContent);
		this.updatePaletteSize();
	}
	,setupEventListeners: function() {
		var _gthis = this;
		this.titleBar.addEventListener("mousedown",$bind(this,this.onTitleBarMouseDown));
		window.document.addEventListener("mousemove",$bind(this,this.onDocumentMouseMove));
		window.document.addEventListener("mouseup",$bind(this,this.onDocumentMouseUp));
		this.closeBtn.addEventListener("click",function(e) {
			_gthis.hide();
		});
		this.paletteCanvas.addEventListener("mousedown",$bind(this,this.onCanvasMouseDown));
	}
	,generateTiles: function() {
		this.tiles = [];
		var _g = 0;
		var _g1 = this.maxValue + 1;
		while(_g < _g1) {
			var i = _g++;
			var tile = new editor_palette_IntGridTile(i,this.tileDisplaySize);
			this.tiles.push(tile);
		}
		if(this.tiles.length > 0) {
			this.selectedTileX = 0;
			this.selectedTileY = 0;
			this.setSelectedItem(this.tiles[0]);
		}
		this.refresh();
	}
	,updatePaletteSize: function() {
		var totalTiles = this.maxValue + 1;
		var rows = Math.ceil(totalTiles / this.tilesPerRow);
		this.paletteCanvas.width = this.tilesPerRow * this.tileDisplaySize;
		this.paletteCanvas.height = rows * this.tileDisplaySize;
	}
	,onCanvasMouseDown: function(e) {
		var rect = this.paletteCanvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var tileX = Math.floor(x / this.tileDisplaySize);
		var tileY = Math.floor(y / this.tileDisplaySize);
		if(tileX >= 0 && tileX < this.tilesPerRow && tileY >= 0) {
			var tileIndex = tileY * this.tilesPerRow + tileX;
			if(tileIndex < this.tiles.length) {
				this.selectedTileX = tileX;
				this.selectedTileY = tileY;
				this.setSelectedItem(this.tiles[tileIndex]);
				this.updateSelection();
			}
		}
	}
	,onTitleBarMouseDown: function(e) {
		this.isDragging = true;
		this.dragStartX = e.clientX;
		this.dragStartY = e.clientY;
		var style = window.getComputedStyle(this.element);
		this.dragStartLeft = parseFloat(StringTools.replace(style.left,"px",""));
		this.dragStartTop = parseFloat(StringTools.replace(style.top,"px",""));
		e.preventDefault();
	}
	,onDocumentMouseMove: function(e) {
		if(!this.isDragging) {
			return;
		}
		var deltaX = e.clientX - this.dragStartX;
		var deltaY = e.clientY - this.dragStartY;
		this.element.style.left = this.dragStartLeft + deltaX + "px";
		this.element.style.top = this.dragStartTop + deltaY + "px";
	}
	,onDocumentMouseUp: function(e) {
		this.isDragging = false;
	}
	,drawPalette: function() {
		if(this.tiles.length == 0) {
			return;
		}
		this.paletteCtx.clearRect(0,0,this.paletteCanvas.width,this.paletteCanvas.height);
		var _g = 0;
		var _g1 = this.tiles.length;
		while(_g < _g1) {
			var i = _g++;
			var tile = this.tiles[i];
			var x = i % this.tilesPerRow * this.tileDisplaySize;
			var y = (i / this.tilesPerRow | 0) * this.tileDisplaySize;
			var tileCanvas = tile.getPreviewCanvas();
			this.paletteCtx.drawImage(tileCanvas,x,y,this.tileDisplaySize,this.tileDisplaySize);
		}
		this.paletteCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
		this.paletteCtx.lineWidth = 1;
		var _g = 0;
		var _g1 = this.tilesPerRow + 1;
		while(_g < _g1) {
			var i = _g++;
			var x = i * this.tileDisplaySize;
			this.paletteCtx.beginPath();
			this.paletteCtx.moveTo(x,0);
			this.paletteCtx.lineTo(x,this.paletteCanvas.height);
			this.paletteCtx.stroke();
		}
		var rows = Math.ceil(this.tiles.length / this.tilesPerRow);
		var numRows = rows | 0;
		var _g = 0;
		var _g1 = numRows + 1;
		while(_g < _g1) {
			var i = _g++;
			var y = i * this.tileDisplaySize;
			this.paletteCtx.beginPath();
			this.paletteCtx.moveTo(0,y);
			this.paletteCtx.lineTo(this.paletteCanvas.width,y);
			this.paletteCtx.stroke();
		}
	}
	,updateSelection: function() {
		if(this.selectedTileX >= 0 && this.selectedTileY >= 0) {
			this.selectionOverlay.style.display = "block";
			this.selectionOverlay.style.left = this.selectedTileX * this.tileDisplaySize + "px";
			this.selectionOverlay.style.top = this.selectedTileY * this.tileDisplaySize + "px";
			this.selectionOverlay.style.width = this.tileDisplaySize + "px";
			this.selectionOverlay.style.height = this.tileDisplaySize + "px";
		} else {
			this.selectionOverlay.style.display = "none";
		}
	}
	,setMaxValue: function(newMaxValue) {
		if(newMaxValue != this.maxValue) {
			this.maxValue = newMaxValue;
			this.updatePaletteSize();
			this.generateTiles();
		}
	}
	,show: function() {
		this.element.classList.add("visible");
	}
	,hide: function() {
		this.element.classList.remove("visible");
	}
	,isVisible: function() {
		return this.element.classList.contains("visible");
	}
	,getElement: function() {
		return this.element;
	}
	,getSelectedItem: function() {
		return this.selectedTile;
	}
	,setSelectedItem: function(item) {
		if(((item) instanceof editor_palette_IntGridTile)) {
			this.selectedTile = js_Boot.__cast(item , editor_palette_IntGridTile);
			this.updatePreview();
		}
	}
	,clear: function() {
		this.tiles = [];
		this.selectedTile = null;
		this.selectedTileX = -1;
		this.selectedTileY = -1;
		this.updatePreview();
		this.updateSelection();
	}
	,addItem: function(item) {
		if(((item) instanceof editor_palette_IntGridTile)) {
			var tile = js_Boot.__cast(item , editor_palette_IntGridTile);
			this.tiles.push(tile);
		}
	}
	,removeItem: function(item) {
		if(((item) instanceof editor_palette_IntGridTile)) {
			var tile = js_Boot.__cast(item , editor_palette_IntGridTile);
			HxOverrides.remove(this.tiles,tile);
			if(this.selectedTile == tile) {
				this.selectedTile = null;
				this.selectedTileX = -1;
				this.selectedTileY = -1;
				this.updatePreview();
				this.updateSelection();
			}
		}
	}
	,refresh: function() {
		this.drawPalette();
		this.updateSelection();
	}
	,updatePreview: function() {
		this.previewArea.innerHTML = "";
		if(this.selectedTile != null) {
			var previewCanvas = this.selectedTile.getPreviewCanvas();
			previewCanvas.className = "selected-tile-preview";
			this.previewArea.appendChild(previewCanvas);
			var label = window.document.createElement("div");
			label.className = "preview-label";
			label.textContent = "Value " + this.selectedTile.value;
			this.previewArea.appendChild(label);
		} else {
			var placeholder = window.document.createElement("div");
			placeholder.className = "preview-placeholder";
			placeholder.textContent = "No value selected";
			this.previewArea.appendChild(placeholder);
		}
	}
	,onActivate: function() {
	}
	,onDeactivate: function() {
	}
	,onGridSettingsChanged: function() {
		if(this.editor != null) {
			console.log("src/editor/palette/IntGridPalette.hx:381:","IntGridPalette: Grid settings changed, updating tile display size...");
			this.tileDisplaySize = this.editor.getGridTileSize();
			this.generateTiles();
			this.updatePaletteSize();
			console.log("src/editor/palette/IntGridPalette.hx:392:","IntGridPalette: Updated tile display size to " + this.tileDisplaySize);
		}
	}
	,cleanup: function() {
		if(this.editor != null) {
			this.editor.removeEventListener("gridSettingsChanged",$bind(this,this.onGridSettingsChanged));
		}
	}
	,__class__: editor_palette_IntGridPalette
};
var editor_palette_IntGridTile = function(value,tileSize) {
	if(tileSize == null) {
		tileSize = 32;
	}
	this.value = value;
	this.tileSize = tileSize;
	this.color = this.generateRandomColor(value);
};
editor_palette_IntGridTile.__name__ = "editor.palette.IntGridTile";
editor_palette_IntGridTile.prototype = {
	generateRandomColor: function(seed) {
		var colors = ["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FECA57","#DDA0DD","#98D8C8","#F7DC6F","#FF9F43","#70A1FF","#5352ED","#FF6B6B","#1DD1A1","#FFC048","#FF5722","#9C27B0","#2196F3","#4CAF50","#FFEB3B","#FF9800","#F44336","#E91E63","#3F51B5","#009688"];
		if(seed == 0) {
			return "transparent";
		}
		return colors[seed % colors.length];
	}
	,getPreviewCanvas: function() {
		var canvas = window.document.createElement("canvas");
		canvas.width = this.tileSize;
		canvas.height = this.tileSize;
		var ctx = canvas.getContext("2d",null);
		if(this.value == 0) {
			ctx.strokeStyle = "#666666";
			ctx.setLineDash([4,4]);
			ctx.strokeRect(1,1,this.tileSize - 2,this.tileSize - 2);
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(this.tileSize,this.tileSize);
			ctx.moveTo(this.tileSize,0);
			ctx.lineTo(0,this.tileSize);
			ctx.stroke();
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0,this.tileSize,this.tileSize);
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1;
			ctx.strokeRect(0.5,0.5,this.tileSize - 1,this.tileSize - 1);
		}
		ctx.fillStyle = this.value == 0 ? "#666666" : "#000000";
		ctx.font = "bold " + Math.round(this.tileSize * 0.4) + "px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(Std.string(this.value),this.tileSize / 2,this.tileSize / 2);
		return canvas;
	}
	,renderAt: function(ctx,x,y,size) {
		if(this.value == 0) {
			return;
		}
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(x,y,size,size);
		ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
		ctx.lineWidth = 1;
		ctx.strokeRect(x,y,size,size);
		ctx.fillStyle = "#000000";
		ctx.font = "bold " + Math.round(size * 0.3) + "px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(Std.string(this.value),x + size / 2,y + size / 2);
		ctx.restore();
	}
	,__class__: editor_palette_IntGridTile
};
var editor_palette_Tile = function(id,x,y,width,height,sourceImage) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.sourceImage = sourceImage;
	this.preview = sourceImage.sub(x,y,width,height);
};
editor_palette_Tile.__name__ = "editor.palette.Tile";
editor_palette_Tile.prototype = {
	drawTo: function(target,destX,destY) {
		target.draw(this.preview,destX,destY);
	}
	,getPreviewCanvas: function() {
		return this.preview.getCanvas();
	}
	,__class__: editor_palette_Tile
};
var editor_palette_TilePalette = function(editor) {
	this.hoveredTile = null;
	this.isDragSelecting = false;
	this.dragStartTop = 0;
	this.dragStartLeft = 0;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.selectionEndY = -1;
	this.selectionEndX = -1;
	this.selectionStartY = -1;
	this.selectionStartX = -1;
	this.baseCanvasHeight = 0;
	this.baseCanvasWidth = 0;
	this.maxZoom = 400;
	this.minZoom = 25;
	this.zoomIncrement = 25;
	this.zoomPercentage = 100;
	this.selectedTileY = -1;
	this.selectedTileX = -1;
	this.tilesPerRow = 0;
	this.tileDisplaySize = 32;
	this.editor = editor;
	this.tiles = [];
	this.selectedTiles = [];
	this.loadTemplate();
	if(editor != null) {
		editor.addEventListener("gridSettingsChanged",$bind(this,this.onGridSettingsChanged));
	}
};
editor_palette_TilePalette.__name__ = "editor.palette.TilePalette";
editor_palette_TilePalette.__interfaces__ = [editor_palette_Palette];
editor_palette_TilePalette.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","Palette.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.setupUI();
		this.setupEventListeners();
		this.element.style.left = "50px";
		this.element.style.top = "100px";
	}
	,setupUI: function() {
		this.element.className = "palette-window";
		this.titleBar = this.element.querySelector(".palette-title-bar");
		this.closeBtn = this.element.querySelector(".palette-close-btn");
		var windowContent = this.element.querySelector(".palette-window-content");
		windowContent.innerHTML = "";
		var tileContent = window.document.createElement("div");
		tileContent.className = "tile-palette";
		this.previewArea = window.document.createElement("div");
		this.previewArea.className = "palette-preview";
		tileContent.appendChild(this.previewArea);
		this.contentArea = window.document.createElement("div");
		this.contentArea.className = "palette-content";
		this.tilesetCanvas = window.document.createElement("canvas");
		this.tilesetCanvas.className = "tileset-canvas";
		this.contentArea.appendChild(this.tilesetCanvas);
		this.tilesetCtx = this.tilesetCanvas.getContext("2d",null);
		this.selectionOverlay = window.document.createElement("div");
		this.selectionOverlay.className = "tile-selection-overlay";
		this.contentArea.appendChild(this.selectionOverlay);
		tileContent.appendChild(this.contentArea);
		this.bottomBar = window.document.createElement("div");
		this.bottomBar.className = "palette-bottom-bar";
		var zoomControlsContainer = window.document.createElement("div");
		zoomControlsContainer.className = "zoom-controls";
		this.zoomOutBtn = window.document.createElement("button");
		this.zoomOutBtn.className = "zoom-btn zoom-out-btn";
		this.zoomOutBtn.textContent = "−";
		this.zoomOutBtn.title = "Zoom Out";
		zoomControlsContainer.appendChild(this.zoomOutBtn);
		this.zoomLevelLabel = window.document.createElement("div");
		this.zoomLevelLabel.className = "zoom-level-label";
		this.updateZoomLevelLabel();
		zoomControlsContainer.appendChild(this.zoomLevelLabel);
		this.zoomInBtn = window.document.createElement("button");
		this.zoomInBtn.className = "zoom-btn zoom-in-btn";
		this.zoomInBtn.textContent = "+";
		this.zoomInBtn.title = "Zoom In";
		zoomControlsContainer.appendChild(this.zoomInBtn);
		this.bottomBar.appendChild(zoomControlsContainer);
		tileContent.appendChild(this.bottomBar);
		windowContent.appendChild(tileContent);
		this.updatePreview();
		this.updateZoomControls();
	}
	,setupEventListeners: function() {
		var _gthis = this;
		this.tilesetCanvas.addEventListener("mousedown",$bind(this,this.onCanvasMouseDown));
		this.tilesetCanvas.addEventListener("mousemove",$bind(this,this.onCanvasMouseMove));
		this.tilesetCanvas.addEventListener("mouseup",$bind(this,this.onCanvasMouseUp));
		this.tilesetCanvas.addEventListener("mouseleave",$bind(this,this.onCanvasMouseLeave));
		this.titleBar.addEventListener("mousedown",$bind(this,this.onTitleBarMouseDown));
		window.document.addEventListener("mousemove",$bind(this,this.onDocumentMouseMove));
		window.document.addEventListener("mouseup",$bind(this,this.onDocumentMouseUp));
		this.closeBtn.addEventListener("click",function(e) {
			_gthis.hide();
		});
		this.zoomInBtn.addEventListener("click",function(e) {
			_gthis.zoomIn();
			e.preventDefault();
		});
		this.zoomOutBtn.addEventListener("click",function(e) {
			_gthis.zoomOut();
			e.preventDefault();
		});
	}
	,onCanvasMouseDown: function(e) {
		if(this.currentTileset == null) {
			return;
		}
		var rect = this.tilesetCanvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var scale = this.zoomPercentage / 100.0;
		x /= scale;
		y /= scale;
		var tileX = Math.floor(x / this.getCurrentTileDisplaySize());
		var tileY = Math.floor(y / this.getCurrentTileDisplaySize());
		if(tileX >= 0 && tileX < this.tilesPerRow && tileY >= 0) {
			this.isDragSelecting = true;
			this.selectionStartX = tileX;
			this.selectionStartY = tileY;
			this.selectionEndX = tileX;
			this.selectionEndY = tileY;
			this.selectedTileX = tileX;
			this.selectedTileY = tileY;
			this.updateMultiSelection();
			this.updateSelection();
		}
		e.preventDefault();
	}
	,onCanvasMouseMove: function(e) {
		if(this.currentTileset == null) {
			return;
		}
		var rect = this.tilesetCanvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var scale = this.zoomPercentage / 100.0;
		x /= scale;
		y /= scale;
		var tileX = Math.floor(x / this.getCurrentTileDisplaySize());
		var tileY = Math.floor(y / this.getCurrentTileDisplaySize());
		if(tileX >= 0 && tileX < this.tilesPerRow && tileY >= 0) {
			var tileIndex = tileY * this.tilesPerRow + tileX;
			if(tileIndex < this.tiles.length) {
				this.hoveredTile = this.tiles[tileIndex];
				this.updatePreview();
			}
		}
		if(this.isDragSelecting) {
			tileX = Math.max(0,Math.min(this.tilesPerRow - 1,tileX)) | 0;
			tileY = Math.max(0,Math.min(Math.ceil(this.tiles.length / this.tilesPerRow) - 1,tileY)) | 0;
			this.selectionEndX = tileX;
			this.selectionEndY = tileY;
			this.updateMultiSelection();
			this.updateSelection();
		}
	}
	,onCanvasMouseUp: function(e) {
		this.isDragSelecting = false;
		if(this.selectionStartX == this.selectionEndX && this.selectionStartY == this.selectionEndY) {
			var tileIndex = this.selectionStartY * this.tilesPerRow + this.selectionStartX;
			if(tileIndex < this.tiles.length) {
				this.selectedTile = this.tiles[tileIndex];
				this.selectedTiles = [this.selectedTile];
				this.updatePreview();
			}
		}
	}
	,onCanvasMouseLeave: function(e) {
		this.hoveredTile = null;
		this.updatePreview();
	}
	,updateMultiSelection: function() {
		this.selectedTiles = [];
		var minX = Math.min(this.selectionStartX,this.selectionEndX) | 0;
		var maxX = Math.max(this.selectionStartX,this.selectionEndX) | 0;
		var minY = Math.min(this.selectionStartY,this.selectionEndY) | 0;
		var maxY = Math.max(this.selectionStartY,this.selectionEndY) | 0;
		var _g = minY;
		var _g1 = maxY + 1;
		while(_g < _g1) {
			var y = _g++;
			var _g2 = minX;
			var _g3 = maxX + 1;
			while(_g2 < _g3) {
				var x = _g2++;
				var tileIndex = y * this.tilesPerRow + x;
				if(tileIndex < this.tiles.length) {
					this.selectedTiles.push(this.tiles[tileIndex]);
				}
			}
		}
		if(this.selectedTiles.length > 0) {
			this.selectedTile = this.selectedTiles[0];
			this.updatePreview();
		}
	}
	,onTitleBarMouseDown: function(e) {
		this.isDragging = true;
		this.dragStartX = e.clientX;
		this.dragStartY = e.clientY;
		var style = window.getComputedStyle(this.element);
		this.dragStartLeft = parseFloat(StringTools.replace(style.left,"px",""));
		this.dragStartTop = parseFloat(StringTools.replace(style.top,"px",""));
		e.preventDefault();
	}
	,onDocumentMouseMove: function(e) {
		if(!this.isDragging) {
			return;
		}
		var deltaX = e.clientX - this.dragStartX;
		var deltaY = e.clientY - this.dragStartY;
		this.element.style.left = this.dragStartLeft + deltaX + "px";
		this.element.style.top = this.dragStartTop + deltaY + "px";
	}
	,onDocumentMouseUp: function(e) {
		this.isDragging = false;
	}
	,loadTilesetFromFile: function(file) {
		var _gthis = this;
		var reader = new FileReader();
		reader.onload = function(e) {
			var img = window.document.createElement("img");
			img.onload = function() {
				var tileWidth = _gthis.getTileWidth();
				var tileHeight = _gthis.getTileHeight();
				_gthis.currentTileset = editor_palette_Tileset.fromImageElement(img,tileWidth,tileHeight,file.name);
				_gthis.loadTilesFromTileset();
			};
			img.src = js_Boot.__cast(reader.result , String);
		};
		reader.readAsDataURL(file);
	}
	,loadTilesFromTileset: function() {
		if(this.currentTileset == null) {
			return;
		}
		this.clear();
		this.tilesPerRow = Math.floor(this.currentTileset.getWidth() / this.currentTileset.getTileWidth());
		var _g = 0;
		var _g1 = this.currentTileset.tiles;
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			this.addItem(tile);
		}
		this.baseCanvasWidth = 0;
		this.baseCanvasHeight = 0;
		this.updateCanvasDimensions();
		if(this.tiles.length > 0) {
			this.selectedTileX = 0;
			this.selectedTileY = 0;
			this.setSelectedItem(this.tiles[0]);
		}
		this.refresh();
	}
	,updateCanvasDimensions: function() {
		if(this.baseCanvasWidth == 0 || this.baseCanvasHeight == 0) {
			var totalTiles = this.tiles.length;
			var rows = Math.ceil(totalTiles / this.tilesPerRow);
			this.baseCanvasWidth = this.tilesPerRow * 32;
			this.baseCanvasHeight = rows * 32;
		}
		this.tilesetCanvas.width = this.baseCanvasWidth;
		this.tilesetCanvas.height = this.baseCanvasHeight;
		var scale = this.zoomPercentage / 100.0;
		this.tilesetCanvas.style.transform = "scale(" + scale + ")";
		this.tilesetCanvas.style.transformOrigin = "0 0";
	}
	,getCurrentTileDisplaySize: function() {
		return 32;
	}
	,zoomIn: function() {
		if(this.zoomPercentage < this.maxZoom) {
			this.zoomPercentage += this.zoomIncrement;
			this.onZoomChanged();
		}
	}
	,zoomOut: function() {
		if(this.zoomPercentage > this.minZoom) {
			this.zoomPercentage -= this.zoomIncrement;
			this.onZoomChanged();
		}
	}
	,onZoomChanged: function() {
		this.updateCanvasDimensions();
		this.updateZoomControls();
		this.updateZoomLevelLabel();
		this.refresh();
	}
	,updateZoomControls: function() {
		if(this.zoomOutBtn != null) {
			if(this.zoomPercentage <= this.minZoom) {
				this.zoomOutBtn.classList.add("disabled");
			} else {
				this.zoomOutBtn.classList.remove("disabled");
			}
		}
		if(this.zoomInBtn != null) {
			if(this.zoomPercentage >= this.maxZoom) {
				this.zoomInBtn.classList.add("disabled");
			} else {
				this.zoomInBtn.classList.remove("disabled");
			}
		}
	}
	,updateZoomLevelLabel: function() {
		if(this.zoomLevelLabel != null) {
			this.zoomLevelLabel.textContent = "" + this.zoomPercentage + "%";
		}
	}
	,drawTileset: function() {
		if(this.tiles.length == 0) {
			return;
		}
		this.tilesetCtx.clearRect(0,0,this.tilesetCanvas.width,this.tilesetCanvas.height);
		var currentDisplaySize = this.getCurrentTileDisplaySize();
		var _g = 0;
		var _g1 = this.tiles.length;
		while(_g < _g1) {
			var i = _g++;
			var tile = this.tiles[i];
			var x = i % this.tilesPerRow * currentDisplaySize;
			var y = (i / this.tilesPerRow | 0) * currentDisplaySize;
			var tileCanvas = tile.getPreviewCanvas();
			this.tilesetCtx.drawImage(tileCanvas,x,y,currentDisplaySize,currentDisplaySize);
		}
		this.tilesetCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
		this.tilesetCtx.lineWidth = 1;
		var _g = 0;
		var _g1 = this.tilesPerRow + 1;
		while(_g < _g1) {
			var i = _g++;
			var x = i * currentDisplaySize;
			this.tilesetCtx.beginPath();
			this.tilesetCtx.moveTo(x,0);
			this.tilesetCtx.lineTo(x,this.tilesetCanvas.height);
			this.tilesetCtx.stroke();
		}
		var rows = Math.ceil(this.tiles.length / this.tilesPerRow);
		var numRows = rows | 0;
		var _g = 0;
		var _g1 = numRows + 1;
		while(_g < _g1) {
			var i = _g++;
			var y = i * currentDisplaySize;
			this.tilesetCtx.beginPath();
			this.tilesetCtx.moveTo(0,y);
			this.tilesetCtx.lineTo(this.tilesetCanvas.width,y);
			this.tilesetCtx.stroke();
		}
	}
	,updateSelection: function() {
		if(this.selectionStartX >= 0 && this.selectionStartY >= 0 && this.selectionEndX >= 0 && this.selectionEndY >= 0) {
			var minX = Math.min(this.selectionStartX,this.selectionEndX) | 0;
			var maxX = Math.max(this.selectionStartX,this.selectionEndX) | 0;
			var minY = Math.min(this.selectionStartY,this.selectionEndY) | 0;
			var maxY = Math.max(this.selectionStartY,this.selectionEndY) | 0;
			var currentDisplaySize = this.getCurrentTileDisplaySize();
			var scale = this.zoomPercentage / 100.0;
			this.selectionOverlay.style.display = "block";
			this.selectionOverlay.style.left = minX * currentDisplaySize * scale + "px";
			this.selectionOverlay.style.top = minY * currentDisplaySize * scale + "px";
			this.selectionOverlay.style.width = (maxX - minX + 1) * currentDisplaySize * scale + "px";
			this.selectionOverlay.style.height = (maxY - minY + 1) * currentDisplaySize * scale + "px";
		} else {
			this.selectionOverlay.style.display = "none";
		}
	}
	,show: function() {
		this.element.classList.add("visible");
		if(this.onVisibilityChanged != null) {
			this.onVisibilityChanged(true);
		}
	}
	,hide: function() {
		this.element.classList.remove("visible");
		if(this.onVisibilityChanged != null) {
			this.onVisibilityChanged(false);
		}
	}
	,isVisible: function() {
		return this.element.classList.contains("visible");
	}
	,getElement: function() {
		return this.element;
	}
	,getSelectedItem: function() {
		if(this.selectedTiles.length == 1) {
			return this.selectedTiles[0];
		} else if(this.selectedTiles.length > 1) {
			return this.selectedTiles;
		}
		return this.selectedTile;
	}
	,getSelectedItems: function() {
		return this.selectedTiles.slice();
	}
	,getSelectionDimensions: function() {
		if(this.selectionStartX < 0 || this.selectionStartY < 0 || this.selectionEndX < 0 || this.selectionEndY < 0) {
			return { width : 1, height : 1};
		}
		var minX = Math.min(this.selectionStartX,this.selectionEndX) | 0;
		var maxX = Math.max(this.selectionStartX,this.selectionEndX) | 0;
		var minY = Math.min(this.selectionStartY,this.selectionEndY) | 0;
		var maxY = Math.max(this.selectionStartY,this.selectionEndY) | 0;
		return { width : maxX - minX + 1, height : maxY - minY + 1};
	}
	,getTileAtSelectionOffset: function(offsetX,offsetY) {
		if(this.selectionStartX < 0 || this.selectionStartY < 0 || this.selectionEndX < 0 || this.selectionEndY < 0) {
			return this.selectedTile;
		}
		var minX = Math.min(this.selectionStartX,this.selectionEndX) | 0;
		var minY = Math.min(this.selectionStartY,this.selectionEndY) | 0;
		var dimensions = this.getSelectionDimensions();
		var wrappedX = offsetX % dimensions.width;
		var wrappedY = offsetY % dimensions.height;
		if(wrappedX < 0) {
			wrappedX += dimensions.width;
		}
		if(wrappedY < 0) {
			wrappedY += dimensions.height;
		}
		var tileX = minX + wrappedX;
		var tileY = minY + wrappedY;
		var tileIndex = tileY * this.tilesPerRow + tileX;
		if(tileIndex < this.tiles.length) {
			return this.tiles[tileIndex];
		}
		return this.selectedTile;
	}
	,setSelectedItem: function(item) {
		if(((item) instanceof editor_palette_Tile)) {
			this.selectedTile = js_Boot.__cast(item , editor_palette_Tile);
			this.selectedTiles = [this.selectedTile];
			var tileIndex = this.tiles.indexOf(this.selectedTile);
			if(tileIndex >= 0) {
				this.selectedTileX = tileIndex % this.tilesPerRow;
				this.selectedTileY = tileIndex / this.tilesPerRow | 0;
				this.selectionStartX = this.selectedTileX;
				this.selectionStartY = this.selectedTileY;
				this.selectionEndX = this.selectedTileX;
				this.selectionEndY = this.selectedTileY;
				this.updateSelection();
			}
			this.updatePreview();
		}
	}
	,clear: function() {
		this.tiles = [];
		this.selectedTile = null;
		this.selectedTiles = [];
		this.selectedTileX = -1;
		this.selectedTileY = -1;
		this.selectionStartX = -1;
		this.selectionStartY = -1;
		this.selectionEndX = -1;
		this.selectionEndY = -1;
		this.updatePreview();
		this.updateSelection();
	}
	,addItem: function(item) {
		if(((item) instanceof editor_palette_Tile)) {
			var tile = js_Boot.__cast(item , editor_palette_Tile);
			this.tiles.push(tile);
		}
	}
	,removeItem: function(item) {
		if(((item) instanceof editor_palette_Tile)) {
			var tile = js_Boot.__cast(item , editor_palette_Tile);
			HxOverrides.remove(this.tiles,tile);
			if(this.selectedTile == tile) {
				this.selectedTile = null;
				this.selectedTileX = -1;
				this.selectedTileY = -1;
				this.updatePreview();
				this.updateSelection();
			}
		}
	}
	,refresh: function() {
		this.drawTileset();
		this.updateSelection();
	}
	,updatePreview: function() {
		this.previewArea.innerHTML = "";
		var tileToPreview = null;
		var labelText = "No tile selected";
		if(this.hoveredTile != null) {
			tileToPreview = this.hoveredTile;
			labelText = "Tile " + this.hoveredTile.id + (this.selectedTiles.length > 1 ? " (hovering)" : "");
		} else if(this.selectedTile != null) {
			tileToPreview = this.selectedTile;
			labelText = "Tile " + this.selectedTile.id + (this.selectedTiles.length > 1 ? " (" + this.selectedTiles.length + " selected)" : "");
		}
		if(tileToPreview != null) {
			var previewCanvas = tileToPreview.getPreviewCanvas();
			previewCanvas.className = "selected-tile-preview";
			this.previewArea.appendChild(previewCanvas);
			var label = window.document.createElement("div");
			label.className = "preview-label";
			label.textContent = labelText;
			this.previewArea.appendChild(label);
		} else {
			var placeholder = window.document.createElement("div");
			placeholder.className = "preview-placeholder";
			placeholder.textContent = labelText;
			this.previewArea.appendChild(placeholder);
		}
	}
	,onActivate: function() {
	}
	,onDeactivate: function() {
	}
	,getTileWidth: function() {
		if(this.editor != null) {
			return this.editor.getGridTileSize();
		}
		return 32;
	}
	,getTileHeight: function() {
		if(this.editor != null) {
			return this.editor.getGridTileSize();
		}
		return 32;
	}
	,setTileWidth: function(width) {
	}
	,setTileHeight: function(height) {
	}
	,getTilesetImageData: function() {
		if(this.currentTileset != null && this.currentTileset.sourceImage != null) {
			var canvas = this.currentTileset.sourceImage.getCanvas();
			return canvas.toDataURL("image/png");
		}
		return null;
	}
	,loadTilesetFromDataUrl: function(dataUrl,onLoad) {
		var _gthis = this;
		var img = window.document.createElement("img");
		img.onload = function() {
			var tileWidth = _gthis.getTileWidth();
			var tileHeight = _gthis.getTileHeight();
			_gthis.currentTileset = editor_palette_Tileset.fromImageElement(img,tileWidth,tileHeight,"Loaded Tileset");
			_gthis.loadTilesFromTileset();
			if(onLoad != null) {
				onLoad();
			}
		};
		img.src = dataUrl;
	}
	,onGridSettingsChanged: function() {
		var _gthis = this;
		if(this.currentTileset != null && this.currentTileset.sourceImage != null) {
			console.log("src/editor/palette/TilePalette.hx:759:","TilePalette: Grid settings changed, refreshing tileset...");
			var imageDataUrl = this.getTilesetImageData();
			if(imageDataUrl != null) {
				var newTileWidth = this.getTileWidth();
				var newTileHeight = this.getTileHeight();
				var tilesetName = this.currentTileset.name;
				var img = window.document.createElement("img");
				img.onload = function() {
					_gthis.currentTileset = editor_palette_Tileset.fromImageElement(img,newTileWidth,newTileHeight,tilesetName);
					_gthis.loadTilesFromTileset();
					console.log("src/editor/palette/TilePalette.hx:774:","TilePalette: Tileset refreshed with new tile size: " + newTileWidth + "x" + newTileHeight);
				};
				img.src = imageDataUrl;
			} else {
				console.log("src/editor/palette/TilePalette.hx:778:","TilePalette: Could not get tileset image data for refresh");
			}
		}
	}
	,getTileById: function(id) {
		if(this.currentTileset != null) {
			return this.currentTileset.getTile(id);
		}
		return null;
	}
	,cleanup: function() {
		if(this.editor != null) {
			this.editor.removeEventListener("gridSettingsChanged",$bind(this,this.onGridSettingsChanged));
		}
	}
	,setOnVisibilityChanged: function(callback) {
		this.onVisibilityChanged = callback;
	}
	,__class__: editor_palette_TilePalette
};
var editor_palette_Tileset = function(name,sourceImage,tileWidth,tileHeight) {
	this.name = name;
	this.sourceImage = sourceImage;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.tiles = [];
	this.generateTiles();
};
editor_palette_Tileset.__name__ = "editor.palette.Tileset";
editor_palette_Tileset.fromImageElement = function(imageElement,tileWidth,tileHeight,name) {
	if(name == null) {
		name = "Tileset";
	}
	var sourceImage = util_Image.fromImageElement(imageElement);
	return new editor_palette_Tileset(name,sourceImage,tileWidth,tileHeight);
};
editor_palette_Tileset.prototype = {
	generateTiles: function() {
		var tilesPerRow = Math.floor(this.sourceImage.width / this.tileWidth);
		var tilesPerCol = Math.floor(this.sourceImage.height / this.tileHeight);
		var tileId = 0;
		var _g = 0;
		var _g1 = tilesPerCol;
		while(_g < _g1) {
			var row = _g++;
			var _g2 = 0;
			var _g3 = tilesPerRow;
			while(_g2 < _g3) {
				var col = _g2++;
				var x = col * this.tileWidth;
				var y = row * this.tileHeight;
				var tile = new editor_palette_Tile(tileId,x,y,this.tileWidth,this.tileHeight,this.sourceImage);
				this.tiles.push(tile);
				++tileId;
			}
		}
	}
	,getTile: function(id) {
		if(id >= 0 && id < this.tiles.length) {
			return this.tiles[id];
		}
		return null;
	}
	,getTileCount: function() {
		return this.tiles.length;
	}
	,getWidth: function() {
		return this.sourceImage.width;
	}
	,getTileWidth: function() {
		return this.tileWidth;
	}
	,__class__: editor_palette_Tileset
};
var editor_ui_EditorToolbar = function(editor) {
	this.editor = editor;
	this.toolButtons = new haxe_ds_StringMap();
	this.loadTemplate();
};
editor_ui_EditorToolbar.__name__ = "editor.ui.EditorToolbar";
editor_ui_EditorToolbar.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","EditorToolbar.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.setupEventListeners();
		this.setActiveTool("select");
	}
	,setupEventListeners: function() {
		var _gthis = this;
		var buttons = this.element.querySelectorAll(".tool-button");
		var _g = 0;
		var _g1 = buttons.length;
		while(_g < _g1) {
			var i = _g++;
			var button = js_Boot.__cast(buttons.item(i) , HTMLElement);
			var toolId = [button.getAttribute("data-tool")];
			if(toolId[0] != null) {
				this.toolButtons.h[toolId[0]] = button;
				button.addEventListener("click",(function(toolId) {
					return function(e) {
						_gthis.selectTool(toolId[0]);
					};
				})(toolId));
			}
		}
		window.addEventListener("keydown",$bind(this,this.onKeyDown));
	}
	,onKeyDown: function(e) {
		var target = js_Boot.__cast(e.target , HTMLElement);
		if(target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
			return;
		}
		switch(e.key.toLowerCase()) {
		case "c":
			if(!e.ctrlKey && !e.metaKey) {
				this.selectTool("circle");
				e.preventDefault();
			}
			break;
		case "e":
			this.selectTool("erase");
			e.preventDefault();
			break;
		case "f":
			this.selectTool("fill");
			e.preventDefault();
			break;
		case "l":
			this.selectTool("line");
			e.preventDefault();
			break;
		case "m":
			this.selectTool("move");
			e.preventDefault();
			break;
		case "p":
			this.selectTool("paint");
			e.preventDefault();
			break;
		case "r":
			this.selectTool("rect");
			e.preventDefault();
			break;
		case "s":
			if(!e.ctrlKey && !e.metaKey) {
				this.selectTool("select");
				e.preventDefault();
			}
			break;
		}
	}
	,selectTool: function(toolId) {
		this.editor.setTool(toolId);
		this.setActiveTool(toolId);
	}
	,setActiveTool: function(toolId) {
		var h = this.toolButtons.h;
		var button_h = h;
		var button_keys = Object.keys(h);
		var button_length = button_keys.length;
		var button_current = 0;
		while(button_current < button_length) {
			var button = button_h[button_keys[button_current++]];
			button.classList.remove("active");
		}
		var button = this.toolButtons.h[toolId];
		if(button != null) {
			button.classList.add("active");
		}
		this.updateToolOptions(toolId);
	}
	,updateToolOptions: function(toolId) {
		var optionsContainer = this.element.querySelector("#tool-options");
		if(optionsContainer != null) {
			optionsContainer.innerHTML = "";
			switch(toolId) {
			case "circle":case "rect":
				var fillCheck = window.document.createElement("input");
				fillCheck.type = "checkbox";
				fillCheck.id = "shape-fill";
				optionsContainer.appendChild(fillCheck);
				var fillLabel = window.document.createElement("label");
				fillLabel.htmlFor = "shape-fill";
				fillLabel.textContent = " Fill shape";
				optionsContainer.appendChild(fillLabel);
				break;
			case "erase":case "fill":case "paint":
				var label = window.document.createElement("span");
				label.textContent = "Brush Size: ";
				optionsContainer.appendChild(label);
				var sizeInput = window.document.createElement("input");
				sizeInput.type = "range";
				sizeInput.min = "1";
				sizeInput.max = "10";
				sizeInput.value = "1";
				optionsContainer.appendChild(sizeInput);
				break;
			}
		}
	}
	,getElement: function() {
		return this.element;
	}
	,__class__: editor_ui_EditorToolbar
};
var editor_ui_GridOptionsEdit = function(editor) {
	this.dragStartTop = 0;
	this.dragStartLeft = 0;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.editor = editor;
	this.createElement();
	this.setupEventListeners();
};
editor_ui_GridOptionsEdit.__name__ = "editor.ui.GridOptionsEdit";
editor_ui_GridOptionsEdit.prototype = {
	createElement: function() {
		var _gthis = this;
		this.modal = window.document.createElement("div");
		this.modal.className = "modal-overlay";
		this.modal.style.display = "none";
		this.modal.style.position = "fixed";
		this.modal.style.left = "0";
		this.modal.style.top = "0";
		this.modal.style.width = "100%";
		this.modal.style.height = "100%";
		this.modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		this.modal.style.zIndex = "1000";
		this.modal.style.display = "flex";
		this.modal.style.justifyContent = "center";
		this.modal.style.alignItems = "center";
		this.element = window.document.createElement("div");
		this.element.className = "grid-options-dialog";
		this.element.style.backgroundColor = "#2d2d2d";
		this.element.style.border = "1px solid #3e3e3e";
		this.element.style.borderRadius = "8px";
		this.element.style.boxShadow = "0 4px 16px rgba(0,0,0,0.5)";
		this.element.style.padding = "0";
		this.element.style.minWidth = "400px";
		this.element.style.maxWidth = "500px";
		this.element.style.color = "#e0e0e0";
		var header = window.document.createElement("div");
		header.className = "dialog-header";
		header.style.backgroundColor = "#1e1e1e";
		header.style.borderBottom = "1px solid #3e3e3e";
		header.style.padding = "12px 16px";
		header.style.display = "flex";
		header.style.justifyContent = "space-between";
		header.style.alignItems = "center";
		header.style.cursor = "move";
		header.style.borderRadius = "8px 8px 0 0";
		var title = window.document.createElement("span");
		title.textContent = "Grid Settings";
		title.style.color = "#e0e0e0";
		title.style.fontWeight = "bold";
		title.style.fontSize = "16px";
		header.appendChild(title);
		var closeBtn = window.document.createElement("button");
		closeBtn.textContent = "×";
		closeBtn.style.background = "none";
		closeBtn.style.border = "none";
		closeBtn.style.color = "#e0e0e0";
		closeBtn.style.fontSize = "20px";
		closeBtn.style.cursor = "pointer";
		closeBtn.style.padding = "4px 8px";
		closeBtn.addEventListener("click",function(e) {
			_gthis.hide();
		});
		header.appendChild(closeBtn);
		this.element.appendChild(header);
		var content = window.document.createElement("div");
		content.className = "dialog-content";
		content.style.padding = "20px";
		var gridSizeSection = this.createSection("Grid Cell Size");
		var tileSizeContainer = this.createInputContainer("Cell Size (pixels):","The size of each grid cell in pixels");
		this.tileSizeInput = window.document.createElement("input");
		this.tileSizeInput.type = "number";
		this.tileSizeInput.min = "8";
		this.tileSizeInput.max = "128";
		this.tileSizeInput.value = "32";
		this.tileSizeInput.style.width = "80px";
		this.stylizeInput(this.tileSizeInput);
		tileSizeContainer.appendChild(this.tileSizeInput);
		var pixelLabel = window.document.createElement("span");
		pixelLabel.textContent = " px";
		pixelLabel.style.color = "#a0a0a0";
		tileSizeContainer.appendChild(pixelLabel);
		gridSizeSection.appendChild(tileSizeContainer);
		content.appendChild(gridSizeSection);
		var mapDimensionsSection = this.createSection("Map Dimensions");
		var dimensionsContainer = window.document.createElement("div");
		dimensionsContainer.style.display = "flex";
		dimensionsContainer.style.gap = "16px";
		dimensionsContainer.style.alignItems = "center";
		var widthContainer = this.createInputContainer("Width:","Map width in grid cells");
		widthContainer.style.flex = "1";
		this.mapWidthInput = window.document.createElement("input");
		this.mapWidthInput.type = "number";
		this.mapWidthInput.min = "10";
		this.mapWidthInput.max = "1000";
		this.mapWidthInput.value = "50";
		this.mapWidthInput.style.width = "80px";
		this.stylizeInput(this.mapWidthInput);
		widthContainer.appendChild(this.mapWidthInput);
		var heightContainer = this.createInputContainer("Height:","Map height in grid cells");
		heightContainer.style.flex = "1";
		this.mapHeightInput = window.document.createElement("input");
		this.mapHeightInput.type = "number";
		this.mapHeightInput.min = "10";
		this.mapHeightInput.max = "1000";
		this.mapHeightInput.value = "50";
		this.mapHeightInput.style.width = "80px";
		this.stylizeInput(this.mapHeightInput);
		heightContainer.appendChild(this.mapHeightInput);
		dimensionsContainer.appendChild(widthContainer);
		dimensionsContainer.appendChild(heightContainer);
		mapDimensionsSection.appendChild(dimensionsContainer);
		content.appendChild(mapDimensionsSection);
		this.element.appendChild(content);
		var buttonBar = window.document.createElement("div");
		buttonBar.className = "dialog-button-bar";
		buttonBar.style.padding = "16px 20px";
		buttonBar.style.borderTop = "1px solid #3e3e3e";
		buttonBar.style.display = "flex";
		buttonBar.style.justifyContent = "flex-end";
		buttonBar.style.gap = "12px";
		buttonBar.style.backgroundColor = "#252525";
		buttonBar.style.borderRadius = "0 0 8px 8px";
		var cancelButton = window.document.createElement("button");
		cancelButton.textContent = "Cancel";
		cancelButton.className = "dialog-button secondary";
		this.stylizeButton(cancelButton,false);
		cancelButton.addEventListener("click",function(e) {
			_gthis.hide();
		});
		buttonBar.appendChild(cancelButton);
		var applyButton = window.document.createElement("button");
		applyButton.textContent = "Apply";
		applyButton.className = "dialog-button primary";
		this.stylizeButton(applyButton,true);
		applyButton.addEventListener("click",function(e) {
			_gthis.applySettings();
		});
		buttonBar.appendChild(applyButton);
		this.element.appendChild(buttonBar);
		this.modal.appendChild(this.element);
		header.addEventListener("mousedown",function(e) {
			_gthis.isDragging = true;
			_gthis.dragStartX = e.clientX;
			_gthis.dragStartY = e.clientY;
			var rect = _gthis.element.getBoundingClientRect();
			_gthis.dragStartLeft = rect.left;
			_gthis.dragStartTop = rect.top;
			e.preventDefault();
		});
	}
	,createSection: function(title) {
		var section = window.document.createElement("div");
		section.style.marginBottom = "24px";
		var sectionTitle = window.document.createElement("div");
		sectionTitle.textContent = title;
		sectionTitle.style.color = "#e0e0e0";
		sectionTitle.style.fontSize = "14px";
		sectionTitle.style.fontWeight = "bold";
		sectionTitle.style.marginBottom = "12px";
		sectionTitle.style.borderBottom = "1px solid #3e3e3e";
		sectionTitle.style.paddingBottom = "4px";
		section.appendChild(sectionTitle);
		return section;
	}
	,createInputContainer: function(labelText,description) {
		var container = window.document.createElement("div");
		container.style.marginBottom = "12px";
		container.style.display = "flex";
		container.style.alignItems = "center";
		container.style.gap = "8px";
		var label = window.document.createElement("label");
		label.textContent = labelText;
		label.style.color = "#e0e0e0";
		label.style.minWidth = "120px";
		label.style.fontSize = "13px";
		label.title = description;
		container.appendChild(label);
		return container;
	}
	,stylizeInput: function(input) {
		input.style.padding = "6px 8px";
		input.style.backgroundColor = "#3e3e3e";
		input.style.border = "1px solid #5e5e5e";
		input.style.borderRadius = "4px";
		input.style.color = "#e0e0e0";
		input.style.fontSize = "13px";
		input.addEventListener("focus",function(e) {
			input.style.borderColor = "#007acc";
			input.style.boxShadow = "0 0 0 2px rgba(0, 122, 204, 0.2)";
		});
		input.addEventListener("blur",function(e) {
			input.style.borderColor = "#5e5e5e";
			input.style.boxShadow = "none";
		});
	}
	,stylizeButton: function(button,isPrimary) {
		button.style.padding = "8px 16px";
		button.style.border = "none";
		button.style.borderRadius = "4px";
		button.style.fontSize = "13px";
		button.style.cursor = "pointer";
		button.style.fontWeight = "500";
		if(isPrimary) {
			button.style.backgroundColor = "#007acc";
			button.style.color = "#ffffff";
			button.addEventListener("mouseenter",function(e) {
				button.style.backgroundColor = "#005a9e";
			});
			button.addEventListener("mouseleave",function(e) {
				button.style.backgroundColor = "#007acc";
			});
		} else {
			button.style.backgroundColor = "#4e4e4e";
			button.style.color = "#e0e0e0";
			button.addEventListener("mouseenter",function(e) {
				button.style.backgroundColor = "#5e5e5e";
			});
			button.addEventListener("mouseleave",function(e) {
				button.style.backgroundColor = "#4e4e4e";
			});
		}
	}
	,setupEventListeners: function() {
		var _gthis = this;
		this.modal.addEventListener("click",function(e) {
			if(e.target == _gthis.modal) {
				_gthis.hide();
			}
		});
		window.document.addEventListener("mousemove",function(e) {
			if(_gthis.isDragging) {
				var deltaX = e.clientX - _gthis.dragStartX;
				var deltaY = e.clientY - _gthis.dragStartY;
				_gthis.element.style.left = _gthis.dragStartLeft + deltaX + "px";
				_gthis.element.style.top = _gthis.dragStartTop + deltaY + "px";
				_gthis.element.style.position = "fixed";
				_gthis.modal.style.justifyContent = "flex-start";
				_gthis.modal.style.alignItems = "flex-start";
			}
		});
		window.document.addEventListener("mouseup",function(e) {
			_gthis.isDragging = false;
		});
		window.document.addEventListener("keydown",function(e) {
			if(e.keyCode == 13 && _gthis.modal.style.display != "none") {
				_gthis.applySettings();
			} else if(e.keyCode == 27 && _gthis.modal.style.display != "none") {
				_gthis.hide();
			}
		});
	}
	,loadCurrentSettings: function() {
		var tmp = this.editor.getGridTileSize();
		this.tileSizeInput.value = Std.string(tmp);
		var tmp = this.editor.getGridMapWidth();
		this.mapWidthInput.value = Std.string(tmp);
		var tmp = this.editor.getGridMapHeight();
		this.mapHeightInput.value = Std.string(tmp);
	}
	,applySettings: function() {
		var newTileSize = Std.parseInt(this.tileSizeInput.value);
		var newMapWidth = Std.parseInt(this.mapWidthInput.value);
		var newMapHeight = Std.parseInt(this.mapHeightInput.value);
		if(newTileSize == null || newTileSize < 8 || newTileSize > 128) {
			window.alert("Grid cell size must be between 8 and 128 pixels.");
			return;
		}
		if(newMapWidth == null || newMapWidth < 10 || newMapWidth > 1000) {
			window.alert("Map width must be between 10 and 1000 cells.");
			return;
		}
		if(newMapHeight == null || newMapHeight < 10 || newMapHeight > 1000) {
			window.alert("Map height must be between 10 and 1000 cells.");
			return;
		}
		this.editor.setGridSettings(newTileSize,newMapWidth,newMapHeight);
		console.log("src/editor/ui/GridOptionsEdit.hx:358:","Applied grid settings: tileSize=" + newTileSize + ", mapWidth=" + newMapWidth + ", mapHeight=" + newMapHeight);
		this.hide();
	}
	,show: function() {
		if(!window.document.body.contains(this.modal)) {
			window.document.body.appendChild(this.modal);
		}
		this.element.style.position = "relative";
		this.element.style.left = "auto";
		this.element.style.top = "auto";
		this.modal.style.justifyContent = "center";
		this.modal.style.alignItems = "center";
		this.loadCurrentSettings();
		this.modal.style.display = "flex";
		this.tileSizeInput.focus();
	}
	,hide: function() {
		this.modal.style.display = "none";
	}
	,getElement: function() {
		return this.modal;
	}
	,__class__: editor_ui_GridOptionsEdit
};
var editor_ui_LayerTabNavigator = function(editor) {
	this.dropIndicator = null;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.draggedIndex = -1;
	this.draggedTab = null;
	this.isDragging = false;
	this.editor = editor;
	this.loadTemplate();
};
editor_ui_LayerTabNavigator.__name__ = "editor.ui.LayerTabNavigator";
editor_ui_LayerTabNavigator.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","LayerTabNavigator.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.tabsContainer = this.element.querySelector("#layer-tabs");
		this.setupEventListeners();
		this.createDropIndicator();
	}
	,createDropIndicator: function() {
		this.dropIndicator = window.document.createElement("div");
		this.dropIndicator.className = "layer-tab-drop-indicator";
		this.dropIndicator.style.display = "none";
	}
	,setupEventListeners: function() {
		var addButton = this.element.querySelector("#add-layer-button");
		if(addButton != null) {
			addButton.addEventListener("click",function(e) {
				console.log("src/editor/ui/LayerTabNavigator.hx:55:","Add layer button clicked");
			});
		}
		window.document.addEventListener("mousemove",$bind(this,this.onGlobalMouseMove));
		window.document.addEventListener("mouseup",$bind(this,this.onGlobalMouseUp));
	}
	,getElement: function() {
		return this.element;
	}
	,refresh: function() {
		this.tabsContainer.innerHTML = "";
		var layers = this.editor.getLayers();
		var currentIndex = this.editor.getCurrentLayerIndex();
		var _g = 0;
		var _g1 = layers.length;
		while(_g < _g1) {
			var i = _g++;
			var layer = layers[i];
			var tab = this.createLayerTab(layer.name,i,i == currentIndex);
			this.tabsContainer.appendChild(tab);
		}
		if(this.dropIndicator.parentNode != null) {
			this.dropIndicator.parentNode.removeChild(this.dropIndicator);
		}
		this.tabsContainer.appendChild(this.dropIndicator);
	}
	,createLayerTab: function(name,index,isActive) {
		var _gthis = this;
		var tab = window.document.createElement("div");
		tab.className = isActive ? "layer-tab active" : "layer-tab";
		tab.textContent = name;
		tab.setAttribute("data-index",index == null ? "null" : "" + index);
		tab.addEventListener("mousedown",function(e) {
			_gthis.onTabMouseDown(e,tab,index);
		});
		tab.addEventListener("click",function(e) {
			if(!_gthis.isDragging) {
				_gthis.editor.selectLayer(index);
			}
		});
		return tab;
	}
	,onTabMouseDown: function(e,tab,index) {
		e.preventDefault();
		this.draggedTab = tab;
		this.draggedIndex = index;
		this.dragStartX = e.clientX;
		this.dragStartY = e.clientY;
		tab.classList.add("dragging");
	}
	,onGlobalMouseMove: function(e) {
		if(this.draggedTab != null) {
			var deltaX = Math.abs(e.clientX - this.dragStartX);
			var deltaY = Math.abs(e.clientY - this.dragStartY);
			if(!this.isDragging && (deltaX > 5 || deltaY > 5)) {
				this.startDragging();
			}
			if(this.isDragging) {
				this.updateDragPosition(e);
				this.updateDropIndicator(e);
			}
		}
	}
	,startDragging: function() {
		this.isDragging = true;
		if(this.draggedTab != null) {
			this.draggedTab.classList.add("dragging");
			this.draggedTab.style.zIndex = "1000";
			this.draggedTab.style.position = "relative";
			this.dropIndicator.style.display = "block";
		}
	}
	,updateDragPosition: function(e) {
		if(this.draggedTab != null) {
			var deltaX = e.clientX - this.dragStartX;
			this.draggedTab.style.transform = "translateX(" + deltaX + "px)";
		}
	}
	,updateDropIndicator: function(e) {
		var tabs = this.tabsContainer.querySelectorAll(".layer-tab");
		var dropIndex = -1;
		var insertBefore = null;
		var _g = 0;
		var _g1 = tabs.length;
		while(_g < _g1) {
			var i = _g++;
			var tab = js_Boot.__cast(tabs[i] , HTMLElement);
			if(tab == this.draggedTab) {
				continue;
			}
			var rect = tab.getBoundingClientRect();
			var tabCenter = rect.left + rect.width / 2;
			if(e.clientX < tabCenter) {
				dropIndex = Std.parseInt(tab.getAttribute("data-index"));
				insertBefore = tab;
				break;
			}
		}
		if(insertBefore != null) {
			this.tabsContainer.insertBefore(this.dropIndicator,insertBefore);
		} else {
			var lastTab = js_Boot.__cast(tabs[tabs.length - 1] , HTMLElement);
			if(lastTab != this.draggedTab && lastTab != null) {
				(js_Boot.__cast(lastTab.parentNode , HTMLElement)).insertBefore(this.dropIndicator,lastTab.nextSibling);
			}
		}
	}
	,onGlobalMouseUp: function(e) {
		if(this.draggedTab != null) {
			if(this.isDragging) {
				this.performDrop(e);
			}
			this.draggedTab.classList.remove("dragging");
			this.draggedTab.style.transform = "";
			this.draggedTab.style.zIndex = "";
			this.draggedTab.style.position = "";
			this.dropIndicator.style.display = "none";
			this.draggedTab = null;
			this.draggedIndex = -1;
			this.isDragging = false;
		}
	}
	,performDrop: function(e) {
		var dropIndicatorIndex = -1;
		var _g = 0;
		var _g1 = this.tabsContainer.children.length;
		while(_g < _g1) {
			var i = _g++;
			if(js_Boot.__cast(this.tabsContainer.children[i] , HTMLElement) == this.dropIndicator) {
				dropIndicatorIndex = i;
				break;
			}
		}
		var targetIndex = 0;
		var _g = 0;
		var _g1 = dropIndicatorIndex;
		while(_g < _g1) {
			var i = _g++;
			var child = js_Boot.__cast(this.tabsContainer.children[i] , HTMLElement);
			if(child.classList.contains("layer-tab")) {
				++targetIndex;
			}
		}
		if(targetIndex > this.draggedIndex) {
			--targetIndex;
		}
		if(targetIndex != this.draggedIndex && targetIndex >= 0) {
			this.editor.moveLayer(this.draggedIndex,targetIndex);
		}
	}
	,__class__: editor_ui_LayerTabNavigator
};
var editor_ui_LayerTagControl = function(editor,layer) {
	this.editor = editor;
	this.tagManager = editor.getTagManager();
	this.layer = layer;
	this.createElement();
	this.refreshTagDisplay();
};
editor_ui_LayerTagControl.__name__ = "editor.ui.LayerTagControl";
editor_ui_LayerTagControl.prototype = {
	createElement: function() {
		var _gthis = this;
		this.element = window.document.createElement("div");
		this.element.className = "layer-tag-control";
		var tagsLabel = window.document.createElement("label");
		tagsLabel.textContent = "Tags: ";
		tagsLabel.className = "property-label";
		this.element.appendChild(tagsLabel);
		var tagContainer = window.document.createElement("div");
		tagContainer.className = "tag-container";
		this.tagSelect = window.document.createElement("select");
		this.tagSelect.className = "tag-select";
		var defaultOption = window.document.createElement("option");
		defaultOption.value = "";
		defaultOption.textContent = "Select tag to add...";
		defaultOption.disabled = true;
		defaultOption.selected = true;
		this.tagSelect.appendChild(defaultOption);
		this.refreshTagOptions();
		tagContainer.appendChild(this.tagSelect);
		var addButton = window.document.createElement("button");
		addButton.textContent = "Add";
		addButton.className = "tag-add-button";
		addButton.addEventListener("click",function(e) {
			_gthis.addSelectedTag();
		});
		tagContainer.appendChild(addButton);
		this.element.appendChild(tagContainer);
		this.tagDisplay = window.document.createElement("div");
		this.tagDisplay.className = "tag-display";
		this.element.appendChild(this.tagDisplay);
		this.tagManager.onTagsChanged($bind(this,this.refreshTagOptions));
		this.tagSelect.addEventListener("change",function(e) {
			if(_gthis.tagSelect.value != "") {
				addButton.disabled = false;
			} else {
				addButton.disabled = true;
			}
		});
		addButton.disabled = true;
	}
	,refreshTagOptions: function() {
		while(this.tagSelect.children.length > 1) this.tagSelect.removeChild(this.tagSelect.lastChild);
		var availableTags = this.tagManager.getAllTags();
		var layerTags = this.layer.getTags();
		var _g = 0;
		while(_g < availableTags.length) {
			var tag = availableTags[_g];
			++_g;
			if(!this.layer.hasTag(tag)) {
				var option = window.document.createElement("option");
				option.value = tag;
				option.textContent = tag;
				this.tagSelect.appendChild(option);
			}
		}
		this.tagSelect.selectedIndex = 0;
	}
	,addSelectedTag: function() {
		var selectedTag = this.tagSelect.value;
		if(selectedTag != "" && !this.layer.hasTag(selectedTag)) {
			this.layer.addTag(selectedTag);
			this.refreshTagDisplay();
			this.refreshTagOptions();
			this.tagSelect.selectedIndex = 0;
			this.editor.getPropertiesPanel().updateContent();
		}
	}
	,refreshTagDisplay: function() {
		var _gthis = this;
		this.tagDisplay.innerHTML = "";
		var layerTags = this.layer.getTags();
		if(layerTags.length == 0) {
			var emptyMessage = window.document.createElement("span");
			emptyMessage.textContent = "No tags assigned";
			emptyMessage.className = "empty-tags-message";
			this.tagDisplay.appendChild(emptyMessage);
			return;
		}
		var _g = 0;
		while(_g < layerTags.length) {
			var tag = [layerTags[_g]];
			++_g;
			var tagItem = window.document.createElement("div");
			tagItem.className = "tag-item";
			var tagLabel = window.document.createElement("span");
			tagLabel.textContent = tag[0];
			tagLabel.className = "tag-label";
			tagItem.appendChild(tagLabel);
			var removeButton = window.document.createElement("button");
			removeButton.textContent = "×";
			removeButton.className = "tag-remove-button";
			removeButton.title = "Remove tag";
			removeButton.addEventListener("click",(function(tag) {
				return function(e) {
					_gthis.removeTag(tag[0]);
				};
			})(tag));
			tagItem.appendChild(removeButton);
			this.tagDisplay.appendChild(tagItem);
		}
	}
	,removeTag: function(tag) {
		if(this.layer.removeTag(tag)) {
			this.refreshTagDisplay();
			this.refreshTagOptions();
			this.editor.getPropertiesPanel().updateContent();
		}
	}
	,getElement: function() {
		return this.element;
	}
	,destroy: function() {
		this.tagManager.removeTagsChangedCallback($bind(this,this.refreshTagOptions));
	}
	,__class__: editor_ui_LayerTagControl
};
var editor_ui_MapCanvas = function(editor) {
	this.dragStartViewY = 0;
	this.dragStartViewX = 0;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.editor = editor;
	this.loadTemplate();
};
editor_ui_MapCanvas.__name__ = "editor.ui.MapCanvas";
editor_ui_MapCanvas.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","MapCanvas.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.canvas = this.element.querySelector("#map-canvas");
		this.overlayCanvas = this.element.querySelector("#overlay-canvas");
		this.ctx = this.canvas.getContext("2d",null);
		this.overlayCtx = this.overlayCanvas.getContext("2d",null);
		this.setupEventListeners();
		this.resizeCanvas();
	}
	,setupEventListeners: function() {
		var _gthis = this;
		console.log("src/editor/ui/MapCanvas.hx:56:","setupEventListeners");
		this.canvas.addEventListener("mousedown",$bind(this,this.onMouseDown));
		this.canvas.addEventListener("mousemove",$bind(this,this.onMouseMove));
		this.canvas.addEventListener("mouseup",$bind(this,this.onMouseUp));
		this.canvas.addEventListener("mouseleave",$bind(this,this.onMouseLeave));
		this.canvas.addEventListener("wheel",$bind(this,this.onWheel));
		this.canvas.addEventListener("contextmenu",function(e) {
			e.preventDefault();
		});
		this.canvas.setAttribute("tabindex","0");
		this.canvas.addEventListener("keydown",$bind(this,this.onKeyDown));
		this.canvas.addEventListener("focus",function(e) {
			_gthis.canvas.style.outline = "2px solid #007ACC";
		});
		this.canvas.addEventListener("blur",function(e) {
			_gthis.canvas.style.outline = "none";
		});
		window.document.addEventListener("keydown",$bind(this,this.onDocumentKeyDown));
		var zoomInBtn = this.element.querySelector("#zoom-in-btn");
		var zoomOutBtn = this.element.querySelector("#zoom-out-btn");
		if(zoomInBtn != null) {
			zoomInBtn.addEventListener("click",function(e) {
				var zoom = _gthis.editor.getZoom();
				_gthis.editor.setView(_gthis.editor.getViewX(),_gthis.editor.getViewY(),zoom * 1.25);
				_gthis.updateZoomDisplay();
			});
		}
		if(zoomOutBtn != null) {
			zoomOutBtn.addEventListener("click",function(e) {
				var zoom = _gthis.editor.getZoom();
				_gthis.editor.setView(_gthis.editor.getViewX(),_gthis.editor.getViewY(),zoom / 1.25);
				_gthis.updateZoomDisplay();
			});
		}
		window.addEventListener("resize",$bind(this,this.resizeCanvas));
	}
	,refresh: function() {
		this.resizeCanvas();
	}
	,resizeCanvas: function() {
		var viewport = this.element.querySelector(".canvas-viewport");
		if(viewport != null) {
			var rect = viewport.getBoundingClientRect();
			this.canvas.width = Math.floor(rect.width);
			this.canvas.height = Math.floor(rect.height);
			this.overlayCanvas.width = this.canvas.width;
			this.overlayCanvas.height = this.canvas.height;
			this.render();
		}
	}
	,onMouseDown: function(e) {
		var worldPos = this.screenToWorld(e.offsetX,e.offsetY);
		if(e.button == 1 || e.button == 2 && this.editor.getCurrentTool() != "select") {
			this.isDragging = true;
			this.dragStartX = e.offsetX;
			this.dragStartY = e.offsetY;
			this.dragStartViewX = this.editor.getViewX();
			this.dragStartViewY = this.editor.getViewY();
			this.canvas.style.cursor = "move";
			e.preventDefault();
			return;
		}
		var layer = this.editor.getCurrentLayer();
		if(layer != null) {
			if(layer.onMouseDown(worldPos.x,worldPos.y,e.button)) {
				this.render();
			}
		}
	}
	,onMouseMove: function(e) {
		var worldPos = this.screenToWorld(e.offsetX,e.offsetY);
		var posDisplay = this.element.querySelector("#mouse-position");
		if(posDisplay != null) {
			posDisplay.textContent = "X: " + Math.floor(worldPos.x) + ", Y: " + Math.floor(worldPos.y);
		}
		if(this.isDragging) {
			var dx = e.offsetX - this.dragStartX;
			var dy = e.offsetY - this.dragStartY;
			var zoom = this.editor.getZoom();
			this.editor.setView(this.dragStartViewX - dx / zoom,this.dragStartViewY - dy / zoom,zoom);
			return;
		}
		var layer = this.editor.getCurrentLayer();
		if(layer != null) {
			if(layer.onMouseMove(worldPos.x,worldPos.y)) {
				this.render();
			}
		}
	}
	,onMouseUp: function(e) {
		if(this.isDragging) {
			this.isDragging = false;
			this.canvas.style.cursor = "default";
			return;
		}
		var worldPos = this.screenToWorld(e.offsetX,e.offsetY);
		var layer = this.editor.getCurrentLayer();
		if(layer != null) {
			if(layer.onMouseUp(worldPos.x,worldPos.y,e.button)) {
				this.render();
			}
		}
	}
	,onMouseLeave: function(e) {
		var layer = this.editor.getCurrentLayer();
		if(layer != null) {
			if(((layer) instanceof editor_layers_TileLayer)) {
				var tileLayer = js_Boot.__cast(layer , editor_layers_TileLayer);
				tileLayer.onMouseLeave();
				this.render();
			}
		}
	}
	,onWheel: function(e) {
		e.preventDefault();
		var zoom = this.editor.getZoom();
		var newZoom = e.deltaY > 0 ? zoom / 1.1 : zoom * 1.1;
		newZoom = Math.max(0.1,Math.min(10,newZoom));
		var mouseWorld = this.screenToWorld(e.offsetX,e.offsetY);
		var viewX = this.editor.getViewX();
		var viewY = this.editor.getViewY();
		var newViewX = mouseWorld.x - e.offsetX / newZoom;
		var newViewY = mouseWorld.y - e.offsetY / newZoom;
		this.editor.setView(newViewX,newViewY,newZoom);
		this.updateZoomDisplay();
	}
	,onKeyDown: function(e) {
		var scrollSpeed = 32;
		var zoom = this.editor.getZoom();
		var viewX = this.editor.getViewX();
		var viewY = this.editor.getViewY();
		switch(e.code) {
		case "ArrowDown":
			this.editor.setView(viewX,viewY + scrollSpeed / zoom,zoom);
			e.preventDefault();
			break;
		case "ArrowLeft":
			this.editor.setView(viewX - scrollSpeed / zoom,viewY,zoom);
			e.preventDefault();
			break;
		case "ArrowRight":
			this.editor.setView(viewX + scrollSpeed / zoom,viewY,zoom);
			e.preventDefault();
			break;
		case "ArrowUp":
			this.editor.setView(viewX,viewY - scrollSpeed / zoom,zoom);
			e.preventDefault();
			break;
		}
	}
	,onDocumentKeyDown: function(e) {
		switch(e.code) {
		case "Digit0":
			if(e.ctrlKey || e.metaKey) {
				this.editor.setView(0,0,1.0);
				this.updateZoomDisplay();
				e.preventDefault();
			}
			break;
		case "Home":
			this.editor.setView(0,0,1.0);
			this.updateZoomDisplay();
			e.preventDefault();
			break;
		}
	}
	,screenToWorld: function(screenX,screenY) {
		var zoom = this.editor.getZoom();
		return { x : this.editor.getViewX() + screenX / zoom, y : this.editor.getViewY() + screenY / zoom};
	}
	,worldToScreen: function(worldX,worldY) {
		var zoom = this.editor.getZoom();
		return { x : (worldX - this.editor.getViewX()) * zoom, y : (worldY - this.editor.getViewY()) * zoom};
	}
	,render: function() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height);
		this.ctx.save();
		this.overlayCtx.save();
		var zoom = this.editor.getZoom();
		var viewX = this.editor.getViewX();
		var viewY = this.editor.getViewY();
		this.ctx.scale(zoom,zoom);
		this.ctx.translate(-viewX,-viewY);
		this.overlayCtx.scale(zoom,zoom);
		this.overlayCtx.translate(-viewX,-viewY);
		this.renderGrid();
		var layers = this.editor.getLayers();
		var _g = 0;
		while(_g < layers.length) {
			var layer = layers[_g];
			++_g;
			if(layer.visible) {
				this.ctx.globalAlpha = layer.opacity;
				layer.render(this.ctx,viewX,viewY,zoom);
			}
		}
		var currentLayer = this.editor.getCurrentLayer();
		if(currentLayer != null) {
			if(((currentLayer) instanceof editor_layers_TileLayer)) {
				var tileLayer = js_Boot.__cast(currentLayer , editor_layers_TileLayer);
				tileLayer.renderSelectionOverlay(this.overlayCtx);
			} else if(((currentLayer) instanceof editor_layers_IntGridLayer)) {
				var intGridLayer = js_Boot.__cast(currentLayer , editor_layers_IntGridLayer);
				intGridLayer.renderSelectionOverlay(this.overlayCtx);
			} else if(((currentLayer) instanceof editor_layers_ObjectLayer)) {
				var objectLayer = js_Boot.__cast(currentLayer , editor_layers_ObjectLayer);
				objectLayer.renderSelectionOverlay(this.overlayCtx);
			}
		}
		this.ctx.restore();
		this.overlayCtx.restore();
	}
	,renderGrid: function() {
		var gridSize = this.editor.getGridTileSize();
		var zoom = this.editor.getZoom();
		var viewX = this.editor.getViewX();
		var viewY = this.editor.getViewY();
		var startX = Math.floor(viewX / gridSize) * gridSize;
		var startY = Math.floor(viewY / gridSize) * gridSize;
		var endX = Math.ceil((viewX + this.canvas.width / zoom) / gridSize) * gridSize;
		var endY = Math.ceil((viewY + this.canvas.height / zoom) / gridSize) * gridSize;
		this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
		this.ctx.lineWidth = 1 / zoom;
		this.ctx.beginPath();
		var _g = startX;
		var _g1 = endX;
		while(_g < _g1) {
			var x = _g++;
			if(x % gridSize == 0 && x != 0) {
				this.ctx.moveTo(x,startY);
				this.ctx.lineTo(x,endY);
			}
		}
		var _g = startY;
		var _g1 = endY;
		while(_g < _g1) {
			var y = _g++;
			if(y % gridSize == 0 && y != 0) {
				this.ctx.moveTo(startX,y);
				this.ctx.lineTo(endX,y);
			}
		}
		this.ctx.stroke();
		var originVisible = startX <= 0 && endX >= 0 || startY <= 0 && endY >= 0;
		if(originVisible) {
			this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
			this.ctx.lineWidth = 2 / zoom;
			this.ctx.beginPath();
			if(startX <= 0 && endX >= 0) {
				this.ctx.moveTo(0,startY);
				this.ctx.lineTo(0,endY);
			}
			if(startY <= 0 && endY >= 0) {
				this.ctx.moveTo(startX,0);
				this.ctx.lineTo(endX,0);
			}
			this.ctx.stroke();
		}
	}
	,updateZoomDisplay: function() {
		var zoomLevel = this.element.querySelector("#zoom-level");
		if(zoomLevel != null) {
			var zoom = Math.round(this.editor.getZoom() * 100);
			zoomLevel.textContent = "" + zoom + "%";
		}
	}
	,getElement: function() {
		return this.element;
	}
	,__class__: editor_ui_MapCanvas
};
var editor_ui_ObjectDatabaseEditor = function(editor) {
	this.dragStartTop = 0;
	this.dragStartLeft = 0;
	this.dragStartY = 0;
	this.dragStartX = 0;
	this.isDragging = false;
	this.editor = editor;
	this.objectDatabase = editor.getGlobalObjectDatabase();
	this.createElement();
	this.setupEventListeners();
	this.refreshObjectList();
};
editor_ui_ObjectDatabaseEditor.__name__ = "editor.ui.ObjectDatabaseEditor";
editor_ui_ObjectDatabaseEditor.prototype = {
	getGlobalObjectDatabase: function() {
		return this.editor.getGlobalObjectDatabase();
	}
	,createElement: function() {
		this.element = window.document.createElement("div");
		this.element.className = "object-database-editor";
		this.element.style.position = "absolute";
		this.element.style.left = "100px";
		this.element.style.top = "100px";
		this.element.style.width = "800px";
		this.element.style.height = "600px";
		this.element.style.backgroundColor = "#2d2d2d";
		this.element.style.border = "1px solid #3e3e3e";
		this.element.style.borderRadius = "4px";
		this.element.style.boxShadow = "0 4px 16px rgba(0,0,0,0.5)";
		this.element.style.zIndex = "1000";
		this.element.style.display = "flex";
		this.element.style.flexDirection = "column";
		this.createHeader();
		this.createContent();
	}
	,createHeader: function() {
		var _gthis = this;
		var header = window.document.createElement("div");
		header.className = "object-editor-header";
		header.style.backgroundColor = "#1e1e1e";
		header.style.borderBottom = "1px solid #3e3e3e";
		header.style.padding = "8px 12px";
		header.style.display = "flex";
		header.style.justifyContent = "space-between";
		header.style.alignItems = "center";
		header.style.cursor = "move";
		var title = window.document.createElement("span");
		title.textContent = "Object Database Editor";
		title.style.color = "#e0e0e0";
		title.style.fontWeight = "bold";
		title.style.fontSize = "14px";
		header.appendChild(title);
		var closeBtn = window.document.createElement("button");
		closeBtn.textContent = "×";
		closeBtn.style.background = "none";
		closeBtn.style.border = "none";
		closeBtn.style.color = "#e0e0e0";
		closeBtn.style.fontSize = "18px";
		closeBtn.style.cursor = "pointer";
		closeBtn.style.padding = "4px 8px";
		closeBtn.addEventListener("click",function(e) {
			_gthis.hide();
		});
		header.appendChild(closeBtn);
		this.element.appendChild(header);
		header.addEventListener("mousedown",function(e) {
			_gthis.isDragging = true;
			_gthis.dragStartX = e.clientX;
			_gthis.dragStartY = e.clientY;
			var rect = _gthis.element.getBoundingClientRect();
			_gthis.dragStartLeft = rect.left;
			_gthis.dragStartTop = rect.top;
			e.preventDefault();
		});
	}
	,createContent: function() {
		var content = window.document.createElement("div");
		content.style.flex = "1";
		content.style.display = "flex";
		content.style.overflow = "hidden";
		this.createObjectList(content);
		this.createEditorPanel(content);
		this.element.appendChild(content);
	}
	,createObjectList: function(parent) {
		var _gthis = this;
		var listContainer = window.document.createElement("div");
		listContainer.style.width = "250px";
		listContainer.style.borderRight = "1px solid #3e3e3e";
		listContainer.style.display = "flex";
		listContainer.style.flexDirection = "column";
		var listHeader = window.document.createElement("div");
		listHeader.style.padding = "12px";
		listHeader.style.borderBottom = "1px solid #3e3e3e";
		var addBtn = window.document.createElement("button");
		addBtn.textContent = "Add New Object";
		addBtn.style.width = "100%";
		addBtn.style.padding = "8px";
		addBtn.style.backgroundColor = "#4CAF50";
		addBtn.style.color = "white";
		addBtn.style.border = "none";
		addBtn.style.borderRadius = "4px";
		addBtn.style.cursor = "pointer";
		addBtn.addEventListener("click",function(e) {
			_gthis.addNewObject();
		});
		listHeader.appendChild(addBtn);
		listContainer.appendChild(listHeader);
		this.objectList = window.document.createElement("div");
		this.objectList.style.flex = "1";
		this.objectList.style.overflowY = "auto";
		this.objectList.style.padding = "8px";
		listContainer.appendChild(this.objectList);
		parent.appendChild(listContainer);
	}
	,createEditorPanel: function(parent) {
		this.editorPanel = window.document.createElement("div");
		this.editorPanel.style.flex = "1";
		this.editorPanel.style.padding = "16px";
		this.editorPanel.style.overflowY = "auto";
		var emptyMsg = window.document.createElement("div");
		emptyMsg.textContent = "Select an object to edit";
		emptyMsg.style.color = "#a0a0a0";
		emptyMsg.style.textAlign = "center";
		emptyMsg.style.marginTop = "50px";
		this.editorPanel.appendChild(emptyMsg);
		parent.appendChild(this.editorPanel);
	}
	,refreshObjectList: function() {
		var _gthis = this;
		this.objectList.innerHTML = "";
		var definitions = this.objectDatabase.getAllDefinitions();
		var _g = 0;
		while(_g < definitions.length) {
			var definition = [definitions[_g]];
			++_g;
			var item = [window.document.createElement("div")];
			item[0].className = "object-list-item";
			item[0].style.padding = "8px 12px";
			item[0].style.marginBottom = "4px";
			item[0].style.backgroundColor = "#3e3e3e";
			item[0].style.borderRadius = "4px";
			item[0].style.cursor = "pointer";
			item[0].style.color = "#e0e0e0";
			item[0].style.display = "flex";
			item[0].style.justifyContent = "space-between";
			item[0].style.alignItems = "center";
			var nameSpan = window.document.createElement("span");
			nameSpan.textContent = definition[0].name;
			item[0].appendChild(nameSpan);
			var deleteBtn = window.document.createElement("button");
			deleteBtn.textContent = "×";
			deleteBtn.style.background = "none";
			deleteBtn.style.border = "none";
			deleteBtn.style.color = "#ff6b6b";
			deleteBtn.style.cursor = "pointer";
			deleteBtn.style.fontSize = "16px";
			deleteBtn.style.padding = "2px 6px";
			deleteBtn.addEventListener("click",(function(definition) {
				return function(e) {
					e.stopPropagation();
					_gthis.deleteObject(definition[0]);
				};
			})(definition));
			item[0].appendChild(deleteBtn);
			item[0].addEventListener("click",(function(definition) {
				return function(e) {
					_gthis.selectObject(definition[0]);
				};
			})(definition));
			item[0].addEventListener("mouseenter",(function(item) {
				return function(e) {
					item[0].style.backgroundColor = "#4e4e4e";
				};
			})(item));
			item[0].addEventListener("mouseleave",(function(item,definition) {
				return function(e) {
					if(_gthis.currentDefinition != definition[0]) {
						item[0].style.backgroundColor = "#3e3e3e";
					}
				};
			})(item,definition));
			this.objectList.appendChild(item[0]);
		}
	}
	,addNewObject: function() {
		var name = window.prompt("Enter object name:","New Object");
		if(name != null && StringTools.trim(name) != "") {
			var definition = this.objectDatabase.createDefinition(StringTools.trim(name));
			this.refreshObjectList();
			this.selectObject(definition);
		}
	}
	,deleteObject: function(definition) {
		var confirmed = window.confirm("Delete object '" + definition.name + "'?");
		if(confirmed) {
			this.objectDatabase.removeDefinition(definition.id);
			if(this.currentDefinition == definition) {
				this.currentDefinition = null;
				this.showEmptyEditor();
			}
			this.refreshObjectList();
		}
	}
	,selectObject: function(definition) {
		this.currentDefinition = definition;
		var items = this.objectList.querySelectorAll(".object-list-item");
		var _g = 0;
		var _g1 = items.length;
		while(_g < _g1) {
			var i = _g++;
			var item = items.item(i);
			if(item != null) {
				(js_Boot.__cast(item , HTMLElement)).style.backgroundColor = "#3e3e3e";
			}
		}
		var selectedIndex = this.objectDatabase.getAllDefinitions().indexOf(definition);
		if(selectedIndex >= 0 && selectedIndex < items.length) {
			var selectedItem = items.item(selectedIndex);
			if(selectedItem != null) {
				(js_Boot.__cast(selectedItem , HTMLElement)).style.backgroundColor = "#5a5a5a";
			}
		}
		this.showObjectEditor(definition);
	}
	,showEmptyEditor: function() {
		this.editorPanel.innerHTML = "";
		var emptyMsg = window.document.createElement("div");
		emptyMsg.textContent = "Select an object to edit";
		emptyMsg.style.color = "#a0a0a0";
		emptyMsg.style.textAlign = "center";
		emptyMsg.style.marginTop = "50px";
		this.editorPanel.appendChild(emptyMsg);
	}
	,showObjectEditor: function(definition) {
		var _gthis = this;
		this.editorPanel.innerHTML = "";
		var section = window.document.createElement("div");
		section.style.marginBottom = "24px";
		var sectionTitle = window.document.createElement("h3");
		sectionTitle.textContent = "Basic Properties";
		sectionTitle.style.color = "#e0e0e0";
		sectionTitle.style.marginBottom = "12px";
		sectionTitle.style.fontSize = "16px";
		section.appendChild(sectionTitle);
		var nameLabel = window.document.createElement("label");
		nameLabel.textContent = "Name:";
		nameLabel.style.display = "block";
		nameLabel.style.color = "#e0e0e0";
		nameLabel.style.marginBottom = "4px";
		section.appendChild(nameLabel);
		this.nameInput = window.document.createElement("input");
		this.nameInput.type = "text";
		this.nameInput.value = definition.name;
		this.nameInput.style.width = "100%";
		this.nameInput.style.padding = "6px";
		this.nameInput.style.marginBottom = "12px";
		this.nameInput.style.backgroundColor = "#3e3e3e";
		this.nameInput.style.border = "1px solid #5e5e5e";
		this.nameInput.style.borderRadius = "4px";
		this.nameInput.style.color = "#e0e0e0";
		this.nameInput.addEventListener("input",function(e) {
			definition.name = _gthis.nameInput.value;
			_gthis.refreshObjectList();
			_gthis.selectObject(definition);
		});
		section.appendChild(this.nameInput);
		var dimensionsRow = window.document.createElement("div");
		dimensionsRow.style.display = "flex";
		dimensionsRow.style.gap = "12px";
		dimensionsRow.style.marginBottom = "12px";
		var widthContainer = window.document.createElement("div");
		widthContainer.style.flex = "1";
		var widthLabel = window.document.createElement("label");
		widthLabel.textContent = "Width:";
		widthLabel.style.display = "block";
		widthLabel.style.color = "#e0e0e0";
		widthLabel.style.marginBottom = "4px";
		widthContainer.appendChild(widthLabel);
		this.widthInput = window.document.createElement("input");
		this.widthInput.type = "number";
		this.widthInput.value = definition.width == null ? "null" : "" + definition.width;
		this.widthInput.style.width = "100%";
		this.widthInput.style.padding = "6px";
		this.widthInput.style.backgroundColor = "#3e3e3e";
		this.widthInput.style.border = "1px solid #5e5e5e";
		this.widthInput.style.borderRadius = "4px";
		this.widthInput.style.color = "#e0e0e0";
		this.widthInput.addEventListener("input",function(e) {
			var tmp = parseFloat(_gthis.widthInput.value);
			definition.width = tmp;
		});
		widthContainer.appendChild(this.widthInput);
		dimensionsRow.appendChild(widthContainer);
		var heightContainer = window.document.createElement("div");
		heightContainer.style.flex = "1";
		var heightLabel = window.document.createElement("label");
		heightLabel.textContent = "Height:";
		heightLabel.style.display = "block";
		heightLabel.style.color = "#e0e0e0";
		heightLabel.style.marginBottom = "4px";
		heightContainer.appendChild(heightLabel);
		this.heightInput = window.document.createElement("input");
		this.heightInput.type = "number";
		this.heightInput.value = definition.height == null ? "null" : "" + definition.height;
		this.heightInput.style.width = "100%";
		this.heightInput.style.padding = "6px";
		this.heightInput.style.backgroundColor = "#3e3e3e";
		this.heightInput.style.border = "1px solid #5e5e5e";
		this.heightInput.style.borderRadius = "4px";
		this.heightInput.style.color = "#e0e0e0";
		this.heightInput.addEventListener("input",function(e) {
			var tmp = parseFloat(_gthis.heightInput.value);
			definition.height = tmp;
		});
		heightContainer.appendChild(this.heightInput);
		dimensionsRow.appendChild(heightContainer);
		section.appendChild(dimensionsRow);
		this.editorPanel.appendChild(section);
		this.createImageSection(definition);
		this.createFieldsSection(definition);
	}
	,createImageSection: function(definition) {
		var _gthis = this;
		var section = window.document.createElement("div");
		section.style.marginBottom = "24px";
		var sectionTitle = window.document.createElement("h3");
		sectionTitle.textContent = "Image";
		sectionTitle.style.color = "#e0e0e0";
		sectionTitle.style.marginBottom = "12px";
		sectionTitle.style.fontSize = "16px";
		section.appendChild(sectionTitle);
		this.imagePreview = window.document.createElement("img");
		this.imagePreview.style.maxWidth = "128px";
		this.imagePreview.style.maxHeight = "128px";
		this.imagePreview.style.border = "1px solid #5e5e5e";
		this.imagePreview.style.borderRadius = "4px";
		this.imagePreview.style.backgroundColor = "#3e3e3e";
		this.imagePreview.style.display = "block";
		this.imagePreview.style.margin = "8px 0";
		if(definition.imageLoaded && definition.image != null) {
			this.imagePreview.src = definition.image.src;
		} else {
			this.imagePreview.style.width = "128px";
			this.imagePreview.style.height = "64px";
		}
		section.appendChild(this.imagePreview);
		var loadBtn = window.document.createElement("button");
		loadBtn.textContent = "Load Image";
		loadBtn.style.padding = "6px 12px";
		loadBtn.style.backgroundColor = "#4CAF50";
		loadBtn.style.color = "white";
		loadBtn.style.border = "none";
		loadBtn.style.borderRadius = "4px";
		loadBtn.style.cursor = "pointer";
		loadBtn.style.marginRight = "8px";
		loadBtn.addEventListener("click",function(e) {
			_gthis.loadImageForObject(definition);
		});
		section.appendChild(loadBtn);
		if(definition.imageLoaded) {
			var clearBtn = window.document.createElement("button");
			clearBtn.textContent = "Clear Image";
			clearBtn.style.padding = "6px 12px";
			clearBtn.style.backgroundColor = "#f44336";
			clearBtn.style.color = "white";
			clearBtn.style.border = "none";
			clearBtn.style.borderRadius = "4px";
			clearBtn.style.cursor = "pointer";
			clearBtn.addEventListener("click",function(e) {
				_gthis.clearImageForObject(definition);
			});
			section.appendChild(clearBtn);
		}
		this.editorPanel.appendChild(section);
	}
	,createFieldsSection: function(definition) {
		var _gthis = this;
		var section = window.document.createElement("div");
		section.style.marginBottom = "24px";
		var header = window.document.createElement("div");
		header.style.display = "flex";
		header.style.justifyContent = "space-between";
		header.style.alignItems = "center";
		header.style.marginBottom = "12px";
		var sectionTitle = window.document.createElement("h3");
		sectionTitle.textContent = "Custom Fields";
		sectionTitle.style.color = "#e0e0e0";
		sectionTitle.style.fontSize = "16px";
		header.appendChild(sectionTitle);
		var addFieldBtn = window.document.createElement("button");
		addFieldBtn.textContent = "Add Field";
		addFieldBtn.style.padding = "4px 8px";
		addFieldBtn.style.backgroundColor = "#2196F3";
		addFieldBtn.style.color = "white";
		addFieldBtn.style.border = "none";
		addFieldBtn.style.borderRadius = "4px";
		addFieldBtn.style.cursor = "pointer";
		addFieldBtn.style.fontSize = "12px";
		addFieldBtn.addEventListener("click",function(e) {
			_gthis.addFieldToObject(definition);
		});
		header.appendChild(addFieldBtn);
		section.appendChild(header);
		this.fieldsContainer = window.document.createElement("div");
		section.appendChild(this.fieldsContainer);
		this.refreshFieldsList(definition);
		this.editorPanel.appendChild(section);
	}
	,refreshFieldsList: function(definition) {
		var _gthis = this;
		this.fieldsContainer.innerHTML = "";
		var _g = 0;
		var _g1 = definition.fields;
		while(_g < _g1.length) {
			var field = [_g1[_g]];
			++_g;
			var fieldRow = window.document.createElement("div");
			fieldRow.style.display = "flex";
			fieldRow.style.gap = "8px";
			fieldRow.style.alignItems = "center";
			fieldRow.style.marginBottom = "8px";
			fieldRow.style.padding = "8px";
			fieldRow.style.backgroundColor = "#3e3e3e";
			fieldRow.style.borderRadius = "4px";
			var nameInput = [window.document.createElement("input")];
			nameInput[0].type = "text";
			nameInput[0].value = field[0].name;
			nameInput[0].style.flex = "2";
			nameInput[0].style.padding = "4px";
			nameInput[0].style.backgroundColor = "#2e2e2e";
			nameInput[0].style.border = "1px solid #5e5e5e";
			nameInput[0].style.borderRadius = "4px";
			nameInput[0].style.color = "#e0e0e0";
			nameInput[0].addEventListener("input",(function(nameInput,field) {
				return function(e) {
					var oldName = field[0].name;
					field[0].name = nameInput[0].value;
					definition.removeField(oldName);
					definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
				};
			})(nameInput,field));
			fieldRow.appendChild(nameInput[0]);
			var typeSelect = [window.document.createElement("select")];
			typeSelect[0].style.flex = "1";
			typeSelect[0].style.padding = "4px";
			typeSelect[0].style.backgroundColor = "#2e2e2e";
			typeSelect[0].style.border = "1px solid #5e5e5e";
			typeSelect[0].style.borderRadius = "4px";
			typeSelect[0].style.color = "#e0e0e0";
			var types = ["string","int","float","bool"];
			var _g2 = 0;
			while(_g2 < types.length) {
				var type = types[_g2];
				++_g2;
				var option = window.document.createElement("option");
				option.value = type;
				option.text = type;
				if(type == field[0].type) {
					option.selected = true;
				}
				typeSelect[0].appendChild(option);
			}
			typeSelect[0].addEventListener("change",(function(typeSelect,field) {
				return function(e) {
					field[0].type = typeSelect[0].value;
					switch(field[0].type) {
					case "bool":
						field[0].defaultValue = false;
						break;
					case "float":
						field[0].defaultValue = 0.0;
						break;
					case "int":
						field[0].defaultValue = 0;
						break;
					default:
						field[0].defaultValue = "";
					}
					definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
					_gthis.refreshFieldsList(definition);
				};
			})(typeSelect,field));
			fieldRow.appendChild(typeSelect[0]);
			var defaultInput = [window.document.createElement("input")];
			defaultInput[0].style.flex = "2";
			defaultInput[0].style.padding = "4px";
			defaultInput[0].style.backgroundColor = "#2e2e2e";
			defaultInput[0].style.border = "1px solid #5e5e5e";
			defaultInput[0].style.borderRadius = "4px";
			defaultInput[0].style.color = "#e0e0e0";
			switch(field[0].type) {
			case "bool":
				defaultInput[0].type = "checkbox";
				defaultInput[0].checked = field[0].defaultValue == true;
				defaultInput[0].addEventListener("change",(function(defaultInput,field) {
					return function(e) {
						field[0].defaultValue = defaultInput[0].checked;
						definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
					};
				})(defaultInput,field));
				break;
			case "float":
				defaultInput[0].type = "number";
				defaultInput[0].step = "0.1";
				defaultInput[0].value = Std.string(field[0].defaultValue);
				defaultInput[0].addEventListener("input",(function(defaultInput,field) {
					return function(e) {
						var tmp = parseFloat(defaultInput[0].value);
						field[0].defaultValue = tmp;
						definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
					};
				})(defaultInput,field));
				break;
			case "int":
				defaultInput[0].type = "number";
				defaultInput[0].step = "1";
				defaultInput[0].value = Std.string(field[0].defaultValue);
				defaultInput[0].addEventListener("input",(function(defaultInput,field) {
					return function(e) {
						field[0].defaultValue = Std.parseInt(defaultInput[0].value);
						definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
					};
				})(defaultInput,field));
				break;
			default:
				defaultInput[0].type = "text";
				defaultInput[0].value = Std.string(field[0].defaultValue);
				defaultInput[0].addEventListener("input",(function(defaultInput,field) {
					return function(e) {
						field[0].defaultValue = defaultInput[0].value;
						definition.addField(field[0].name,field[0].type,field[0].defaultValue,field[0].description);
					};
				})(defaultInput,field));
			}
			fieldRow.appendChild(defaultInput[0]);
			var deleteBtn = window.document.createElement("button");
			deleteBtn.textContent = "×";
			deleteBtn.style.backgroundColor = "#f44336";
			deleteBtn.style.color = "white";
			deleteBtn.style.border = "none";
			deleteBtn.style.borderRadius = "4px";
			deleteBtn.style.cursor = "pointer";
			deleteBtn.style.padding = "4px 8px";
			deleteBtn.addEventListener("click",(function(field) {
				return function(e) {
					definition.removeField(field[0].name);
					_gthis.refreshFieldsList(definition);
				};
			})(field));
			fieldRow.appendChild(deleteBtn);
			this.fieldsContainer.appendChild(fieldRow);
		}
	}
	,addFieldToObject: function(definition) {
		var name = window.prompt("Enter field name:","field_name");
		if(name != null && StringTools.trim(name) != "") {
			definition.addField(StringTools.trim(name),"string","","");
			this.refreshFieldsList(definition);
		}
	}
	,loadImageForObject: function(definition) {
		var _gthis = this;
		var fileInput = window.document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.style.display = "none";
		fileInput.addEventListener("change",function(e) {
			var files = fileInput.files;
			if(files.length > 0) {
				var file = files[0];
				var reader = new FileReader();
				reader.onload = function(e) {
					var dataUrl = js_Boot.__cast(reader.result , String);
					definition.setImage(dataUrl);
					_gthis.imagePreview.src = dataUrl;
					_gthis.showObjectEditor(definition);
				};
				reader.readAsDataURL(file);
			}
			window.document.body.removeChild(fileInput);
		});
		window.document.body.appendChild(fileInput);
		fileInput.click();
	}
	,clearImageForObject: function(definition) {
		definition.image = null;
		definition.imageLoaded = false;
		this.showObjectEditor(definition);
	}
	,setupEventListeners: function() {
		var _gthis = this;
		window.document.addEventListener("mousemove",function(e) {
			if(_gthis.isDragging) {
				var deltaX = e.clientX - _gthis.dragStartX;
				var deltaY = e.clientY - _gthis.dragStartY;
				_gthis.element.style.left = _gthis.dragStartLeft + deltaX + "px";
				_gthis.element.style.top = _gthis.dragStartTop + deltaY + "px";
			}
		});
		window.document.addEventListener("mouseup",function(e) {
			_gthis.isDragging = false;
		});
	}
	,show: function() {
		if(this.element.parentElement == null) {
			window.document.body.appendChild(this.element);
		}
		this.element.style.display = "flex";
		this.refreshObjectList();
	}
	,hide: function() {
		this.element.style.display = "none";
	}
	,getElement: function() {
		return this.element;
	}
	,__class__: editor_ui_ObjectDatabaseEditor
};
var editor_ui_PropertiesPanel = function(editor) {
	this.editor = editor;
	this.createElement();
};
editor_ui_PropertiesPanel.__name__ = "editor.ui.PropertiesPanel";
editor_ui_PropertiesPanel.prototype = {
	createElement: function() {
		this.element = window.document.createElement("div");
		this.element.className = "properties-sidebar";
		this.headerElement = window.document.createElement("div");
		this.headerElement.className = "properties-sidebar-header";
		this.headerElement.textContent = "Layer Properties";
		this.element.appendChild(this.headerElement);
		this.contentElement = window.document.createElement("div");
		this.contentElement.className = "properties-sidebar-content";
		this.element.appendChild(this.contentElement);
		this.updateContent();
	}
	,getElement: function() {
		return this.element;
	}
	,updateContent: function() {
		this.contentElement.innerHTML = "";
		var currentLayer = this.editor.getCurrentLayer();
		if(currentLayer != null) {
			this.headerElement.textContent = "Properties - " + currentLayer.name;
			var propertyPanel = currentLayer.createPropertyPanel();
			if(propertyPanel != null) {
				this.contentElement.appendChild(propertyPanel);
			}
		} else {
			this.headerElement.textContent = "Layer Properties";
			var emptyMessage = window.document.createElement("div");
			emptyMessage.textContent = "No layer selected";
			emptyMessage.style.color = "#a0a0a0";
			emptyMessage.style.textAlign = "center";
			emptyMessage.style.marginTop = "20px";
			this.contentElement.appendChild(emptyMessage);
		}
	}
	,__class__: editor_ui_PropertiesPanel
};
var editor_ui_TagEditor = function(editor) {
	this.editor = editor;
	this.tagManager = editor.getTagManager();
	this.createElement();
};
editor_ui_TagEditor.__name__ = "editor.ui.TagEditor";
editor_ui_TagEditor.prototype = {
	createElement: function() {
		this.modal = window.document.createElement("div");
		this.modal.className = "modal-overlay";
		this.modal.style.display = "none";
		this.element = window.document.createElement("div");
		this.element.className = "tag-editor-dialog";
		var header = window.document.createElement("div");
		header.className = "dialog-header";
		header.textContent = "Manage Tags";
		this.element.appendChild(header);
		var content = window.document.createElement("div");
		content.className = "dialog-content";
		var addSection = window.document.createElement("div");
		addSection.className = "add-tag-section";
		var addLabel = window.document.createElement("label");
		addLabel.textContent = "Add new tag:";
		addSection.appendChild(addLabel);
		var addContainer = window.document.createElement("div");
		addContainer.className = "add-tag-container";
		this.newTagInput = window.document.createElement("input");
		this.newTagInput.type = "text";
		this.newTagInput.placeholder = "Enter tag name...";
		this.newTagInput.className = "tag-input";
		addContainer.appendChild(this.newTagInput);
		this.addButton = window.document.createElement("button");
		this.addButton.textContent = "Add";
		this.addButton.className = "add-tag-button";
		addContainer.appendChild(this.addButton);
		addSection.appendChild(addContainer);
		content.appendChild(addSection);
		var listSection = window.document.createElement("div");
		listSection.className = "tag-list-section";
		var listLabel = window.document.createElement("label");
		listLabel.textContent = "Existing tags:";
		listSection.appendChild(listLabel);
		this.tagListElement = window.document.createElement("div");
		this.tagListElement.className = "tag-list";
		listSection.appendChild(this.tagListElement);
		content.appendChild(listSection);
		this.element.appendChild(content);
		var buttonBar = window.document.createElement("div");
		buttonBar.className = "dialog-button-bar";
		var closeButton = window.document.createElement("button");
		closeButton.textContent = "Close";
		closeButton.className = "dialog-button";
		buttonBar.appendChild(closeButton);
		this.element.appendChild(buttonBar);
		this.modal.appendChild(this.element);
		this.setupEventListeners(closeButton);
		this.refreshTagList();
	}
	,setupEventListeners: function(closeButton) {
		var _gthis = this;
		this.addButton.addEventListener("click",function(e) {
			_gthis.addNewTag();
		});
		this.newTagInput.addEventListener("keypress",function(e) {
			if(e.keyCode == 13) {
				_gthis.addNewTag();
			}
		});
		closeButton.addEventListener("click",function(e) {
			_gthis.hide();
		});
		this.modal.addEventListener("click",function(e) {
			if(e.target == _gthis.modal) {
				_gthis.hide();
			}
		});
		this.tagManager.onTagsChanged($bind(this,this.refreshTagList));
	}
	,addNewTag: function() {
		var tagName = StringTools.trim(this.newTagInput.value);
		if(tagName != "") {
			if(this.tagManager.addTag(tagName)) {
				this.newTagInput.value = "";
			} else {
				window.alert("Tag already exists or invalid tag name.");
			}
		}
	}
	,refreshTagList: function() {
		var _gthis = this;
		this.tagListElement.innerHTML = "";
		var tags = this.tagManager.getAllTags();
		if(tags.length == 0) {
			var emptyMessage = window.document.createElement("div");
			emptyMessage.textContent = "No tags defined";
			emptyMessage.className = "empty-message";
			this.tagListElement.appendChild(emptyMessage);
			return;
		}
		var _g = 0;
		while(_g < tags.length) {
			var tag = [tags[_g]];
			++_g;
			var tagItem = window.document.createElement("div");
			tagItem.className = "tag-item";
			var tagName = window.document.createElement("span");
			tagName.textContent = tag[0];
			tagName.className = "tag-name";
			tagItem.appendChild(tagName);
			var buttonContainer = window.document.createElement("div");
			buttonContainer.className = "tag-buttons";
			var renameButton = window.document.createElement("button");
			renameButton.textContent = "Rename";
			renameButton.className = "tag-action-button";
			renameButton.addEventListener("click",(function(tag) {
				return function(e) {
					_gthis.renameTag(tag[0]);
				};
			})(tag));
			buttonContainer.appendChild(renameButton);
			var deleteButton = window.document.createElement("button");
			deleteButton.textContent = "Delete";
			deleteButton.className = "tag-action-button delete-button";
			deleteButton.addEventListener("click",(function(tag) {
				return function(e) {
					_gthis.deleteTag(tag[0]);
				};
			})(tag));
			buttonContainer.appendChild(deleteButton);
			tagItem.appendChild(buttonContainer);
			this.tagListElement.appendChild(tagItem);
		}
	}
	,renameTag: function(oldTag) {
		var newName = window.prompt("Enter new name for tag:",oldTag);
		if(newName != null && StringTools.trim(newName) != "") {
			if(!this.tagManager.renameTag(oldTag,newName)) {
				window.alert("Failed to rename tag. Tag name may already exist or be invalid.");
			}
		}
	}
	,deleteTag: function(tag) {
		var confirmed = window.confirm("Are you sure you want to delete the tag \"" + tag + "\"?\n\nThis will remove the tag from all layers that use it.");
		if(confirmed) {
			this.tagManager.removeTag(tag);
		}
	}
	,show: function() {
		if(this.modal.parentNode == null) {
			window.document.body.appendChild(this.modal);
		}
		this.modal.style.display = "flex";
		this.newTagInput.focus();
	}
	,hide: function() {
		this.modal.style.display = "none";
	}
	,getElement: function() {
		return this.modal;
	}
	,__class__: editor_ui_TagEditor
};
var editor_ui_TopToolbar = function(editor) {
	this.editor = editor;
	this.objectDatabaseEditor = null;
	this.tagEditor = null;
	this.gridOptionsEdit = null;
	this.loadTemplate();
};
editor_ui_TopToolbar.__name__ = "editor.ui.TopToolbar";
editor_ui_TopToolbar.prototype = {
	loadTemplate: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET","TopToolbar.html",false);
		xhr.send();
		var container = window.document.createElement("div");
		container.innerHTML = xhr.responseText;
		this.element = container.firstElementChild;
		this.setupEventListeners();
	}
	,setupEventListeners: function() {
		this.addClickListener("new-map",$bind(this,this.onNewMap));
		this.addClickListener("open-map",$bind(this,this.onOpenMap));
		this.addClickListener("save-map",$bind(this,this.onSaveMap));
		this.addClickListener("save-map-as",$bind(this,this.onSaveMapAs));
		this.addClickListener("export-template",$bind(this,this.onExportTemplate));
		this.addClickListener("load-template",$bind(this,this.onLoadTemplate));
		this.addClickListener("export-map",$bind(this,this.onExportMap));
		this.addClickListener("undo",$bind(this,this.onUndo));
		this.addClickListener("redo",$bind(this,this.onRedo));
		this.addClickListener("cut",$bind(this,this.onCut));
		this.addClickListener("copy",$bind(this,this.onCopy));
		this.addClickListener("paste",$bind(this,this.onPaste));
		this.addClickListener("zoom-in",$bind(this,this.onZoomIn));
		this.addClickListener("zoom-out",$bind(this,this.onZoomOut));
		this.addClickListener("zoom-fit",$bind(this,this.onZoomFit));
		this.addClickListener("zoom-100",$bind(this,this.onZoom100));
		this.addClickListener("toggle-grid",$bind(this,this.onToggleGrid));
		this.addClickListener("add-tile-layer",$bind(this,this.onAddTileLayer));
		this.addClickListener("add-object-layer",$bind(this,this.onAddObjectLayer));
		this.addClickListener("add-image-layer",$bind(this,this.onAddImageLayer));
		this.addClickListener("add-intgrid-layer",$bind(this,this.onAddIntGridLayer));
		this.addClickListener("duplicate-layer",$bind(this,this.onDuplicateLayer));
		this.addClickListener("delete-layer",$bind(this,this.onDeleteLayer));
		this.addClickListener("manage-tags",$bind(this,this.onManageTags));
		this.addClickListener("grid-settings",$bind(this,this.onGridSettings));
		this.addClickListener("edit-objects",$bind(this,this.onEditObjects));
		this.addClickListener("run-unit-test",$bind(this,this.onRunUnitTest));
	}
	,addClickListener: function(id,handler) {
		var elem = this.element.querySelector("#" + id);
		if(elem != null) {
			elem.addEventListener("click",function(e) {
				e.preventDefault();
				handler();
			});
		}
	}
	,getElement: function() {
		return this.element;
	}
	,onNewMap: function() {
		var confirmed = window.confirm("Create a new map? This will clear the current map. Make sure to save first if needed.");
		if(confirmed) {
			this.editor.createNewMap();
		}
	}
	,onOpenMap: function() {
		var _gthis = this;
		var fileInput = window.document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = ".zip";
		fileInput.style.display = "none";
		fileInput.addEventListener("change",function(e) {
			var files = fileInput.files;
			if(files.length > 0) {
				_gthis.loadMapFromZip(files[0]);
			}
			window.document.body.removeChild(fileInput);
		});
		window.document.body.appendChild(fileInput);
		fileInput.click();
	}
	,loadMapFromZip: function(file) {
		var jsZip = new JSZip();
		var promise = jsZip.loadAsync(file);
		var self = this;
		promise.then(function(zip) {
            
            var mapJsonFile = zip.file('map.json');
            if (!mapJsonFile) {
                alert('Invalid map file: map.json not found');
                return;
            }
            
            
            mapJsonFile.async('string').then(function(mapJsonContent) {
                try {
                    var mapData = JSON.parse(mapJsonContent);
                    self.loadMapFromData(mapData, zip);
                } catch (error) {
                    alert('Invalid map file: Could not parse map.json - ' + error.message);
                }
            });
        }).catch(function(error) {
            alert('Could not open zip file: ' + error.message);
        });
	}
	,loadMapFromData: function(mapData,zip) {
		var _gthis = this;
		var resources = new haxe_ds_StringMap();
		var resourcesFolder = zip.folder('resources');
		if(resourcesFolder != null) {
			this.loadResourcesFromZip(resourcesFolder,resources,function() {
				_gthis.editor.loadMap(mapData,resources);
			});
		} else {
			this.editor.loadMap(mapData,resources);
		}
	}
	,loadResourcesFromZip: function(resourcesFolder,resources,callback) {
		var pendingResources = 0;
		var loadedResources = 0;
		var self = this;
		resourcesFolder.forEach(function(relativePath, file) {
            if (!file.dir) {
                pendingResources++;
            }
        });
		if(pendingResources == 0) {
			callback();
			return;
		}
		resourcesFolder.forEach(function(relativePath, file) {
            if (!file.dir) {
                file.async('base64').then(function(data) {
                    var dataUrl = 'data:image/png;base64,' + data;
                    self.addResourceToMap(relativePath, dataUrl, resources);
                    loadedResources++;
                    
                    if (loadedResources >= pendingResources) {
                        callback();
                    }
                }).catch(function(error) {
                    console.error('Error loading resource:', relativePath, error);
                    loadedResources++;
                    if (loadedResources >= pendingResources) {
                        callback();
                    }
                });
            }
        });
	}
	,addResourceToMap: function(filename,dataUrl,resources) {
		resources.h[filename] = dataUrl;
	}
	,checkAndLoadMap: function(mapData,resources) {
		this.editor.loadMap(mapData,resources);
	}
	,onSaveMap: function() {
		console.log("src/editor/ui/TopToolbar.hx:226:","onSaveMap");
		var mapData = this.editor.serializeMap();
		var resources = this.editor.collectResources();
		console.log("src/editor/ui/TopToolbar.hx:229:","resources: " + (resources == null ? "null" : haxe_ds_StringMap.stringify(resources.h)));
		this.createAndDownloadZip(mapData,resources,"map.zip");
	}
	,onSaveMapAs: function() {
		var filename = window.prompt("Enter filename for the map (without extension):","my_map");
		if(filename != null && filename != "") {
			var _this_r = new RegExp("[^a-zA-Z0-9_-]","g".split("u").join(""));
			filename = filename.replace(_this_r,"_");
			var mapData = this.editor.serializeMap();
			var resources = this.editor.collectResources();
			this.createAndDownloadZip(mapData,resources,filename + ".zip");
		}
	}
	,createAndDownloadZip: function(mapData,resources,zipFilename) {
		if(zipFilename == null) {
			zipFilename = "map.zip";
		}
		var zip = new JSZip();
		var mapJsonString = JSON.stringify(mapData,null,"  ");
		zip.file('map.json', mapJsonString);
		var h = resources.h;
		var inlStringMapKeyIterator_h = h;
		var inlStringMapKeyIterator_keys = Object.keys(h);
		var inlStringMapKeyIterator_length = inlStringMapKeyIterator_keys.length;
		var inlStringMapKeyIterator_current = 0;
		if(inlStringMapKeyIterator_current < inlStringMapKeyIterator_length) {
			var resourcesFolder = zip.folder('resources');
			var h = resources.h;
			var filename_h = h;
			var filename_keys = Object.keys(h);
			var filename_length = filename_keys.length;
			var filename_current = 0;
			while(filename_current < filename_length) {
				var filename = filename_keys[filename_current++];
				var dataUrl = resources.h[filename];
				var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
				resourcesFolder.file(filename, base64Data, {base64: true});
			}
		}
		var promise = zip.generateAsync({type: 'blob'});
		promise.then(function(content) {
            
            var url = URL.createObjectURL(content);
            var a = document.createElement('a');
            a.href = url;
            a.download = promise;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
	}
	,onExportMap: function() {
		console.log("src/editor/ui/TopToolbar.hx:292:","Export Map");
	}
	,onExportTemplate: function() {
		var filename = window.prompt("Enter filename for the template (without extension):","my_template");
		if(filename != null && filename != "") {
			var _this_r = new RegExp("[^a-zA-Z0-9_-]","g".split("u").join(""));
			filename = filename.replace(_this_r,"_");
			var templateData = { version : "1.0", objectDatabase : this.editor.getGlobalObjectDatabase().serialize(), tagManager : this.editor.getTagManager().serialize(), timestamp : new Date().getTime()};
			var resources = this.collectObjectResources();
			this.createAndDownloadTemplateZip(templateData,resources,filename + ".template.zip");
		}
	}
	,onLoadTemplate: function() {
		var _gthis = this;
		var fileInput = window.document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = ".zip";
		fileInput.style.display = "none";
		fileInput.addEventListener("change",function(e) {
			var files = fileInput.files;
			if(files.length > 0) {
				_gthis.loadTemplateFromZip(files[0]);
			}
			window.document.body.removeChild(fileInput);
		});
		window.document.body.appendChild(fileInput);
		fileInput.click();
	}
	,onUndo: function() {
		if(this.editor.canUndo()) {
			var description = this.editor.getUndoDescription();
			console.log("src/editor/ui/TopToolbar.hx:344:","Undoing: " + description);
			this.editor.undo();
		} else {
			console.log("src/editor/ui/TopToolbar.hx:347:","Nothing to undo");
		}
	}
	,onRedo: function() {
		if(this.editor.canRedo()) {
			var description = this.editor.getRedoDescription();
			console.log("src/editor/ui/TopToolbar.hx:354:","Redoing: " + description);
			this.editor.redo();
		} else {
			console.log("src/editor/ui/TopToolbar.hx:357:","Nothing to redo");
		}
	}
	,onCut: function() {
		console.log("src/editor/ui/TopToolbar.hx:363:","Cut");
	}
	,onCopy: function() {
		console.log("src/editor/ui/TopToolbar.hx:368:","Copy");
	}
	,onPaste: function() {
		console.log("src/editor/ui/TopToolbar.hx:373:","Paste");
	}
	,onZoomIn: function() {
		var currentZoom = this.editor.getZoom();
		this.editor.setView(this.editor.getViewX(),this.editor.getViewY(),currentZoom * 1.25);
	}
	,onZoomOut: function() {
		var currentZoom = this.editor.getZoom();
		this.editor.setView(this.editor.getViewX(),this.editor.getViewY(),currentZoom / 1.25);
	}
	,onZoomFit: function() {
		console.log("src/editor/ui/TopToolbar.hx:389:","Zoom Fit");
	}
	,onZoom100: function() {
		this.editor.setView(this.editor.getViewX(),this.editor.getViewY(),1.0);
	}
	,onToggleGrid: function() {
		console.log("src/editor/ui/TopToolbar.hx:398:","Toggle Grid");
	}
	,onAddTileLayer: function() {
		var layer = new editor_layers_TileLayer(this.editor);
		var command = new editor_commands_AddLayerCommand(this.editor,layer);
		this.editor.executeCommand(command);
	}
	,onAddObjectLayer: function() {
		var layer = new editor_layers_ObjectLayer(this.editor);
		var command = new editor_commands_AddLayerCommand(this.editor,layer);
		this.editor.executeCommand(command);
	}
	,onAddImageLayer: function() {
		var layer = new editor_layers_ImageLayer(this.editor);
		var command = new editor_commands_AddLayerCommand(this.editor,layer);
		this.editor.executeCommand(command);
	}
	,onAddIntGridLayer: function() {
		var layer = new editor_layers_IntGridLayer(this.editor);
		var command = new editor_commands_AddLayerCommand(this.editor,layer);
		this.editor.executeCommand(command);
	}
	,onDuplicateLayer: function() {
		console.log("src/editor/ui/TopToolbar.hx:428:","Duplicate Layer");
	}
	,onDeleteLayer: function() {
		var currentIndex = this.editor.getCurrentLayerIndex();
		if(currentIndex >= 0) {
			var command = new editor_commands_RemoveLayerCommand(this.editor,currentIndex);
			this.editor.executeCommand(command);
		}
	}
	,onManageTags: function() {
		if(this.tagEditor == null) {
			this.tagEditor = new editor_ui_TagEditor(this.editor);
		}
		this.tagEditor.show();
	}
	,onGridSettings: function() {
		if(this.gridOptionsEdit == null) {
			this.gridOptionsEdit = new editor_ui_GridOptionsEdit(this.editor);
		}
		this.gridOptionsEdit.show();
	}
	,onEditObjects: function() {
		if(this.objectDatabaseEditor == null) {
			this.objectDatabaseEditor = new editor_ui_ObjectDatabaseEditor(this.editor);
		}
		this.objectDatabaseEditor.show();
	}
	,onRunUnitTest: function() {
		console.log("src/editor/ui/TopToolbar.hx:465:","Starting unit test...");
		this.runSaveLoadTest();
	}
	,runSaveLoadTest: function() {
		var _gthis = this;
		try {
			console.log("src/editor/ui/TopToolbar.hx:472:","Step 1: Creating first zip file...");
			var mapData1 = this.editor.serializeMap();
			var resources1 = this.editor.collectResources();
			this.createZipBlob(mapData1,resources1,function(firstZipBlob) {
				console.log("src/editor/ui/TopToolbar.hx:477:","Step 2: Loading from first zip...");
				_gthis.loadMapFromZipBlob(firstZipBlob,function() {
					console.log("src/editor/ui/TopToolbar.hx:481:","Step 3: Creating second zip file...");
					var mapData2 = _gthis.editor.serializeMap();
					var resources2 = _gthis.editor.collectResources();
					_gthis.createZipBlob(mapData2,resources2,function(secondZipBlob) {
						console.log("src/editor/ui/TopToolbar.hx:488:","Step 4: Comparing zip files...");
						_gthis.compareZipBlobs(firstZipBlob,secondZipBlob,function(areEqual) {
							if(areEqual) {
								console.log("src/editor/ui/TopToolbar.hx:493:","✓ Unit test PASSED: Save/Load round-trip successful!");
								window.alert("✓ Unit test PASSED: Save/Load round-trip successful!");
							} else {
								console.log("src/editor/ui/TopToolbar.hx:496:","✗ Unit test FAILED: Zip files are different after round-trip!");
								window.alert("✗ Unit test FAILED: Zip files are different after round-trip!");
							}
						});
					});
				});
			});
		} catch( _g ) {
			var error = haxe_Exception.caught(_g).unwrap();
			console.log("src/editor/ui/TopToolbar.hx:505:","Unit test ERROR: " + Std.string(error));
			window.alert("Unit test ERROR: " + Std.string(error));
		}
	}
	,createZipBlob: function(mapData,resources,callback) {
		var zip = new JSZip();
		var mapJsonString = JSON.stringify(mapData,null,"  ");
		zip.file('map.json', mapJsonString);
		var h = resources.h;
		var inlStringMapKeyIterator_h = h;
		var inlStringMapKeyIterator_keys = Object.keys(h);
		var inlStringMapKeyIterator_length = inlStringMapKeyIterator_keys.length;
		var inlStringMapKeyIterator_current = 0;
		if(inlStringMapKeyIterator_current < inlStringMapKeyIterator_length) {
			var resourcesFolder = zip.folder('resources');
			var h = resources.h;
			var filename_h = h;
			var filename_keys = Object.keys(h);
			var filename_length = filename_keys.length;
			var filename_current = 0;
			while(filename_current < filename_length) {
				var filename = filename_keys[filename_current++];
				var dataUrl = resources.h[filename];
				var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
				resourcesFolder.file(filename, base64Data, {base64: true});
			}
		}
		var promise = zip.generateAsync({type: 'blob'});
		promise.then(function(content) {
            callback(content);
        });
	}
	,loadMapFromZipBlob: function(zipBlob,callback) {
		var jsZip = new JSZip();
		var promise = jsZip.loadAsync(zipBlob);
		var self = this;
		promise.then(function(zip) {
            
            var mapJsonFile = zip.file('map.json');
            if (!mapJsonFile) {
                throw 'Invalid map file: map.json not found';
            }
            
            
            mapJsonFile.async('string').then(function(mapJsonContent) {
                try {
                    var mapData = JSON.parse(mapJsonContent);
                    self.loadMapFromZipData(mapData, zip, callback);
                } catch (error) {
                    throw 'Invalid map file: Could not parse map.json - ' + error.message;
                }
            });
        }).catch(function(error) {
            throw 'Could not open zip blob: ' + error.message;
        });
	}
	,loadMapFromZipData: function(mapData,zip,callback) {
		var _gthis = this;
		var resources = new haxe_ds_StringMap();
		var resourcesFolder = zip.folder('resources');
		if(resourcesFolder != null) {
			this.loadResourcesFromZip(resourcesFolder,resources,function() {
				_gthis.editor.loadMap(mapData,resources);
				callback();
			});
		} else {
			this.editor.loadMap(mapData,resources);
			callback();
		}
	}
	,compareZipBlobs: function(blob1,blob2,callback) {
		var reader1 = new FileReader();
		var reader2 = new FileReader();
		var buffer1 = null;
		var buffer2 = null;
		var checkComparison = function() {
			if(buffer1 != null && buffer2 != null) {
				if(buffer1.byteLength != buffer2.byteLength) {
					console.log("src/editor/ui/TopToolbar.hx:595:","Different sizes: " + buffer1.byteLength + " vs " + buffer2.byteLength);
					callback(false);
					return;
				}
				var view1 = new Uint8Array(buffer1);
				var view2 = new Uint8Array(buffer2);
				var _g = 0;
				var _g1 = buffer1.byteLength;
				while(_g < _g1) {
					var i = _g++;
					var byte1 = view1[i];
					var byte2 = view2[i];
					if(byte1 != byte2) {
						console.log("src/editor/ui/TopToolbar.hx:608:","Different bytes at position " + i + ": " + byte1 + " vs " + byte2);
						callback(false);
						return;
					}
				}
				console.log("src/editor/ui/TopToolbar.hx:614:","Zip files are identical!");
				callback(true);
			}
		};
		reader1.onload = function(e) {
            buffer1 = e.target.result;
            checkComparison();
        }
		reader2.onload = function(e) {
            buffer2 = e.target.result;
            checkComparison();
        }
		reader1.readAsArrayBuffer(blob1);
		reader2.readAsArrayBuffer(blob2);
	}
	,collectObjectResources: function() {
		var resources = new haxe_ds_StringMap();
		var objectDatabase = this.editor.getGlobalObjectDatabase();
		var definitions = objectDatabase.getAllDefinitions();
		var _g = 0;
		while(_g < definitions.length) {
			var definition = definitions[_g];
			++_g;
			if(definition.imageLoaded && definition.image != null) {
				var filename = "object_" + definition.id + ".png";
				resources.h[filename] = definition.image.src;
			}
		}
		return resources;
	}
	,loadTemplateFromZip: function(file) {
		var jsZip = new JSZip();
		var promise = jsZip.loadAsync(file);
		var self = this;
		promise.then(function(zip) {
            
            var templateJsonFile = zip.file('template.json');
            if (!templateJsonFile) {
                alert('Invalid template file: template.json not found');
                return;
            }
            
            
            templateJsonFile.async('string').then(function(templateJsonContent) {
                try {
                    var templateData = JSON.parse(templateJsonContent);
                    self.loadTemplateFromData(templateData, zip);
                } catch (error) {
                    alert('Invalid template file: Could not parse template.json - ' + error.message);
                }
            });
        }).catch(function(error) {
            alert('Could not open template file: ' + error.message);
        });
	}
	,loadTemplateFromData: function(templateData,zip) {
		var _gthis = this;
		var resources = new haxe_ds_StringMap();
		var resourcesFolder = zip.folder('resources');
		if(resourcesFolder != null) {
			this.loadResourcesFromZip(resourcesFolder,resources,function() {
				_gthis.applyTemplate(templateData,resources);
			});
		} else {
			this.applyTemplate(templateData,resources);
		}
	}
	,applyTemplate: function(templateData,resources) {
		try {
			if(templateData.tagManager != null) {
				this.editor.getTagManager().deserialize(templateData.tagManager);
			}
			if(templateData.objectDatabase != null) {
				var objectDatabase = this.editor.getGlobalObjectDatabase();
				objectDatabase.deserialize(templateData.objectDatabase);
				var definitions = objectDatabase.getAllDefinitions();
				var _g = 0;
				while(_g < definitions.length) {
					var definition = definitions[_g];
					++_g;
					if(definition.imageLoaded) {
						var filename = "object_" + definition.id + ".png";
						var imageData = resources.h[filename];
						if(imageData != null) {
							definition.setImage(imageData);
						}
					}
				}
			}
			console.log("src/editor/ui/TopToolbar.hx:716:","Template loaded successfully");
			window.alert("Template loaded successfully!");
		} catch( _g ) {
			var error = haxe_Exception.caught(_g).unwrap();
			console.log("src/editor/ui/TopToolbar.hx:720:","Error applying template: " + Std.string(error));
			window.alert("Error applying template: " + Std.string(error));
		}
	}
	,createAndDownloadTemplateZip: function(templateData,resources,zipFilename) {
		if(zipFilename == null) {
			zipFilename = "template.zip";
		}
		var zip = new JSZip();
		var templateJsonString = JSON.stringify(templateData,null,"  ");
		zip.file('template.json', templateJsonString);
		var h = resources.h;
		var inlStringMapKeyIterator_h = h;
		var inlStringMapKeyIterator_keys = Object.keys(h);
		var inlStringMapKeyIterator_length = inlStringMapKeyIterator_keys.length;
		var inlStringMapKeyIterator_current = 0;
		if(inlStringMapKeyIterator_current < inlStringMapKeyIterator_length) {
			var resourcesFolder = zip.folder('resources');
			var h = resources.h;
			var filename_h = h;
			var filename_keys = Object.keys(h);
			var filename_length = filename_keys.length;
			var filename_current = 0;
			while(filename_current < filename_length) {
				var filename = filename_keys[filename_current++];
				var dataUrl = resources.h[filename];
				var base64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
				resourcesFolder.file(filename, base64Data, {base64: true});
			}
		}
		var promise = zip.generateAsync({type: 'blob'});
		promise.then(function(content) {
            
            var url = URL.createObjectURL(content);
            var a = document.createElement('a');
            a.href = url;
            a.download = promise;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
	}
	,__class__: editor_ui_TopToolbar
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Int32 = {};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
var haxe_Int64 = {};
haxe_Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe_Exception.thrown("divide by zero");
		case 1:
			return { quotient : new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low), modulus : new haxe__$Int64__$_$_$Int64(0,0)};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	} else {
		modulus = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		divisor = new haxe__$Int64__$_$_$Int64(high,low);
	}
	var quotient = new haxe__$Int64__$_$_$Int64(0,0);
	var mask = new haxe__$Int64__$_$_$Int64(0,1);
	while(!(divisor.high < 0)) {
		var v = haxe_Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
		var b = 1;
		b &= 63;
		divisor = b == 0 ? new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b) : new haxe__$Int64__$_$_$Int64(divisor.low << b - 32,0);
		var b1 = 1;
		b1 &= 63;
		mask = b1 == 0 ? new haxe__$Int64__$_$_$Int64(mask.high,mask.low) : b1 < 32 ? new haxe__$Int64__$_$_$Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1) : new haxe__$Int64__$_$_$Int64(mask.low << b1 - 32,0);
		if(cmp >= 0) {
			break;
		}
	}
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(mask.high != b_high || mask.low != b_low)) {
			break;
		}
		var v = haxe_Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			quotient = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			var high = modulus.high - divisor.high | 0;
			var low = modulus.low - divisor.low | 0;
			if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
				var ret = high--;
				high = high | 0;
			}
			modulus = new haxe__$Int64__$_$_$Int64(high,low);
		}
		var b = 1;
		b &= 63;
		mask = b == 0 ? new haxe__$Int64__$_$_$Int64(mask.high,mask.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(mask.high >>> b,mask.high << 32 - b | mask.low >>> b) : new haxe__$Int64__$_$_$Int64(0,mask.high >>> b - 32);
		var b1 = 1;
		b1 &= 63;
		divisor = b1 == 0 ? new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low) : b1 < 32 ? new haxe__$Int64__$_$_$Int64(divisor.high >>> b1,divisor.high << 32 - b1 | divisor.low >>> b1) : new haxe__$Int64__$_$_$Int64(0,divisor.high >>> b1 - 32);
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		quotient = new haxe__$Int64__$_$_$Int64(high,low);
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return { quotient : quotient, modulus : modulus};
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Int64Helper = function() { };
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
haxe_Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe_Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe_Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe_Exception.thrown("Conversion underflow");
	}
	var result = new haxe__$Int64__$_$_$Int64(0,0);
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(a_high,a_low) : b < 32 ? new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b) : new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe_Int32.ucompare(low,result.low) < 0) {
				var ret = high++;
				high = high | 0;
			}
			result = new haxe__$Int64__$_$_$Int64(high,low);
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		result = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return result;
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Md5 = function() {
};
haxe_crypto_Md5.__name__ = "haxe.crypto.Md5";
haxe_crypto_Md5.make = function(b) {
	var h = new haxe_crypto_Md5().doEncode(haxe_crypto_Md5.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(16));
	var p = 0;
	out.b[p++] = h[0] & 255;
	out.b[p++] = h[0] >> 8 & 255;
	out.b[p++] = h[0] >> 16 & 255;
	out.b[p++] = h[0] >>> 24;
	out.b[p++] = h[1] & 255;
	out.b[p++] = h[1] >> 8 & 255;
	out.b[p++] = h[1] >> 16 & 255;
	out.b[p++] = h[1] >>> 24;
	out.b[p++] = h[2] & 255;
	out.b[p++] = h[2] >> 8 & 255;
	out.b[p++] = h[2] >> 16 & 255;
	out.b[p++] = h[2] >>> 24;
	out.b[p++] = h[3] & 255;
	out.b[p++] = h[3] >> 8 & 255;
	out.b[p++] = h[3] >> 16 & 255;
	out.b[p++] = h[3] >>> 24;
	return out;
};
haxe_crypto_Md5.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var blksSize = nblk * 16;
	var _g = 0;
	var _g1 = blksSize;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var i = 0;
	while(i < b.length) {
		blks[i >> 2] |= b.b[i] << (((b.length << 3) + i & 3) << 3);
		++i;
	}
	blks[i >> 2] |= 128 << (b.length * 8 + i) % 4 * 8;
	var l = b.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe_crypto_Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe_crypto_Md5
};
var haxe_crypto_Sha1 = function() {
};
haxe_crypto_Sha1.__name__ = "haxe.crypto.Sha1";
haxe_crypto_Sha1.make = function(b) {
	var h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(20));
	var p = 0;
	out.b[p++] = h[0] >>> 24;
	out.b[p++] = h[0] >> 16 & 255;
	out.b[p++] = h[0] >> 8 & 255;
	out.b[p++] = h[0] & 255;
	out.b[p++] = h[1] >>> 24;
	out.b[p++] = h[1] >> 16 & 255;
	out.b[p++] = h[1] >> 8 & 255;
	out.b[p++] = h[1] & 255;
	out.b[p++] = h[2] >>> 24;
	out.b[p++] = h[2] >> 16 & 255;
	out.b[p++] = h[2] >> 8 & 255;
	out.b[p++] = h[2] & 255;
	out.b[p++] = h[3] >>> 24;
	out.b[p++] = h[3] >> 16 & 255;
	out.b[p++] = h[3] >> 8 & 255;
	out.b[p++] = h[3] & 255;
	out.b[p++] = h[4] >>> 24;
	out.b[p++] = h[4] >> 16 & 255;
	out.b[p++] = h[4] >> 8 & 255;
	out.b[p++] = h[4] & 255;
	return out;
};
haxe_crypto_Sha1.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g = 0;
	var _g1 = nblk * 16;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var _g = 0;
	var _g1 = b.length;
	while(_g < _g1) {
		var i = _g++;
		var p = i >> 2;
		blks[p] |= b.b[i] << 24 - ((i & 3) << 3);
	}
	var i = b.length;
	var p = i >> 2;
	blks[p] |= 128 << 24 - ((i & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha1.prototype = {
	doEncode: function(x) {
		var w = [];
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			var j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					var num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				var t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t;
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	,ft: function(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	,kt: function(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
	,__class__: haxe_crypto_Sha1
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
haxe_ds__$List_ListIterator.__name__ = "haxe.ds._List.ListIterator";
haxe_ds__$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: haxe_ds__$List_ListIterator
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.stringify = function(h) {
	var s = "[";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "]";
};
haxe_ds_StringMap.prototype = {
	iterator: function() {
		return new haxe_ds__$StringMap_StringMapValueIterator(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_ds__$StringMap_StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
haxe_ds__$StringMap_StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe_ds__$StringMap_StringMapValueIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe_ds__$StringMap_StringMapValueIterator
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var util_Image = function(w,h) {
	this.originY = 0;
	this.originX = 0;
	this.width = w;
	this.height = h;
	this.canvas = window.document.createElement("canvas");
	this.origin = this.canvas;
	this.canvas.width = w;
	this.canvas.height = h;
	this.init();
};
util_Image.__name__ = "util.Image";
util_Image.fromImageElement = function(i) {
	var img = new util_Image(i.width,i.height);
	img.ctx.drawImage(i,0,0);
	img.origin = i;
	return img;
};
util_Image.fromCanvas = function(c) {
	var i = new util_Image(0,0);
	i.width = c.width;
	i.height = c.height;
	i.canvas = i.origin = c;
	i.init();
	return i;
};
util_Image.prototype = {
	get_smooth: function() {
		return this.ctx.imageSmoothingEnabled;
	}
	,set_smooth: function(v) {
		return this.ctx.imageSmoothingEnabled = v;
	}
	,get_alpha: function() {
		return this.ctx.globalAlpha;
	}
	,set_alpha: function(v) {
		return this.ctx.globalAlpha = v;
	}
	,init: function() {
		this.ctx = this.canvas.getContext("2d",null);
		this.ctx.imageSmoothingEnabled = false;
	}
	,getColor: function(color) {
		if(color >>> 24 == 255) {
			return "#" + StringTools.hex(color & 16777215,6);
		} else {
			return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + (color >>> 24) / 255 + ")";
		}
	}
	,getCanvas: function() {
		return this.canvas;
	}
	,clear: function() {
		this.ctx.clearRect(0,0,this.width,this.height);
		this.invalidate();
	}
	,invalidate: function() {
		if(this.origin == this.canvas) {
			return;
		}
		this.origin = this.canvas;
		this.originX = this.originY = 0;
		this.origin.texture = null;
	}
	,fill: function(color) {
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.fillRect(0,0,this.width,this.height);
		this.invalidate();
	}
	,fillRect: function(x,y,w,h,color) {
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.fillRect(x,y,w,h);
		this.invalidate();
	}
	,drawCircle: function(x,y,r,color) {
		this.ctx.strokeStyle = this.getColor(color);
		this.ctx.beginPath();
		this.ctx.arc(x,y,r,0,2 * Math.PI,false);
		this.ctx.stroke();
		this.invalidate();
	}
	,sub: function(x,y,w,h) {
		var i = new util_Image(w,h);
		i.ctx.drawImage(this.origin,x,y,w,h,0,0,w,h);
		i.origin = this.origin;
		i.originX = this.originX + x;
		i.originY = this.originY + y;
		return i;
	}
	,text: function(text,x,y,color) {
		if(color == null) {
			color = -1;
		}
		this.ctx.fillStyle = this.getColor(color);
		this.ctx.font = "bold 16px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillText(text,x,y + 8);
		this.invalidate();
	}
	,draw: function(img,x,y) {
		if(((img) instanceof util_Image)) {
			var i = img;
			this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,x,y,i.width,i.height);
			this.invalidate();
		} else if(((img) instanceof util_ImageData)) {
			var i = img;
			i.drawOnto(this,x,y);
		}
	}
	,drawMat: function(i,m) {
		this.ctx.setTransform(m.a,m.b,m.c,m.d,m.x,m.y);
		this.draw(i,0,0);
		this.ctx.setTransform(1,0,0,1,0,0);
	}
	,drawScaled: function(i,x,y,width,height) {
		this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,x,y,width,height);
		this.invalidate();
	}
	,drawSub: function(i,srcX,srcY,srcW,srcH,x,y,dstW,dstH) {
		if(dstH == null) {
			dstH = -1;
		}
		if(dstW == null) {
			dstW = -1;
		}
		if(dstW < 0) {
			dstW = srcW;
		}
		if(dstH < 0) {
			dstH = srcH;
		}
		this.ctx.drawImage(i.origin,srcX + i.originX,srcY + i.originY,srcW,srcH,x,y,dstW,dstH);
		this.invalidate();
	}
	,copyFrom: function(i) {
		this.ctx.fillStyle = "rgba(0,0,0,0)";
		this.ctx.fillRect(0,0,this.width,this.height);
		this.ctx.drawImage(i.origin,i.originX,i.originY,i.width,i.height,0,0,this.width,this.height);
		this.invalidate();
	}
	,isBlank: function() {
		var i = this.ctx.getImageData(0,0,this.width,this.height);
		var _g = 0;
		var _g1 = this.width * this.height * 4;
		while(_g < _g1) {
			var k = _g++;
			if(i.data[k] != 0) {
				return false;
			}
		}
		return true;
	}
	,getPixel: function(x,y) {
		var i = this.ctx.getImageData(x,y,1,1);
		return i.data[3] << 24 | i.data[0] << 16 | i.data[1] << 8 | i.data[2];
	}
	,setSize: function(width,height) {
		if(width == this.width && height == this.height) {
			return;
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.setAttribute("width",width + "px");
		this.canvas.setAttribute("height",height + "px");
		this.width = width;
		this.height = height;
		this.init();
		this.invalidate();
	}
	,resize: function(width,height) {
		if(width == this.width && height == this.height) {
			return;
		}
		var c = window.document.createElement("canvas");
		c.width = width;
		c.height = height;
		var ctx2 = c.getContext("2d",null);
		ctx2.imageSmoothingEnabled = this.ctx.imageSmoothingEnabled;
		ctx2.drawImage(this.canvas,0,0,this.width,this.height,0,0,width,height);
		this.ctx = ctx2;
		this.canvas = c;
		this.width = width;
		this.height = height;
		this.invalidate();
	}
	,__class__: util_Image
};
var util_ImageData = function() {
};
util_ImageData.__name__ = "util.ImageData";
util_ImageData.create = function(image,x,y,w,h) {
	var id = new util_ImageData();
	id.origin = { image : image, x : x, y : y, w : w, h : h};
	return id;
};
util_ImageData.prototype = {
	drawOnto: function(i,x,y) {
		i.ctx.drawImage(this.origin.image,this.origin.x,this.origin.y,this.origin.w,this.origin.h,x,y,this.origin.w,this.origin.h);
		i.invalidate();
	}
	,drawOntoCanvas: function(c,x,y) {
		c.getContext("2d",null).drawImage(this.origin.image,this.origin.x,this.origin.y,this.origin.w,this.origin.h,x,y,this.origin.w,this.origin.h);
	}
	,getImageSrc: function() {
		return this.origin.image.src;
	}
	,createImage: function() {
		if(this.i != null) {
			return this.i;
		}
		this.i = new util_Image(this.origin.w,this.origin.h);
		this.i.ctx.drawImage(this.origin.image,this.origin.x,this.origin.y,this.origin.w,this.origin.h,0,0,this.origin.w,this.origin.h);
		this.i.invalidate();
		return this.i;
	}
	,width: function() {
		return this.origin.w;
	}
	,height: function() {
		return this.origin.h;
	}
	,__class__: util_ImageData
};
var uuid_Uuid = function() { };
uuid_Uuid.__name__ = "uuid.Uuid";
uuid_Uuid.splitmix64_seed = function(index) {
	var b_high = -1640531527;
	var b_low = 2135587861;
	var high = index.high + b_high | 0;
	var low = index.low + b_low | 0;
	if(haxe_Int32.ucompare(low,index.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var result = new haxe__$Int64__$_$_$Int64(high,low);
	var b = 30;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(result.high,result.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b) : new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
	var a_high = result.high ^ b1.high;
	var a_low = result.low ^ b1.low;
	var b_high = -1084733587;
	var b_low = 484763065;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	result = new haxe__$Int64__$_$_$Int64(high,low);
	var b = 27;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(result.high,result.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b) : new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
	var a_high = result.high ^ b1.high;
	var a_low = result.low ^ b1.low;
	var b_high = -1798288965;
	var b_low = 321982955;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	result = new haxe__$Int64__$_$_$Int64(high,low);
	var b = 31;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(result.high,result.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b) : new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
	return new haxe__$Int64__$_$_$Int64(result.high ^ b1.high,result.low ^ b1.low);
};
uuid_Uuid.randomFromRange = function(min,max) {
	var s1 = uuid_Uuid.state0;
	var s0 = uuid_Uuid.state1;
	uuid_Uuid.state0 = s0;
	var b = 23;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(s1.high,s1.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(s1.high << b | s1.low >>> 32 - b,s1.low << b) : new haxe__$Int64__$_$_$Int64(s1.low << b - 32,0);
	s1 = new haxe__$Int64__$_$_$Int64(s1.high ^ b1.high,s1.low ^ b1.low);
	var a_high = s1.high ^ s0.high;
	var a_low = s1.low ^ s0.low;
	var b = 18;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(s1.high,s1.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(s1.high >>> b,s1.high << 32 - b | s1.low >>> b) : new haxe__$Int64__$_$_$Int64(0,s1.high >>> b - 32);
	var a_high1 = a_high ^ b1.high;
	var a_low1 = a_low ^ b1.low;
	var b = 5;
	b &= 63;
	var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(s0.high,s0.low) : b < 32 ? new haxe__$Int64__$_$_$Int64(s0.high >>> b,s0.high << 32 - b | s0.low >>> b) : new haxe__$Int64__$_$_$Int64(0,s0.high >>> b - 32);
	uuid_Uuid.state1 = new haxe__$Int64__$_$_$Int64(a_high1 ^ b1.high,a_low1 ^ b1.low);
	var a = uuid_Uuid.state1;
	var high = a.high + s0.high | 0;
	var low = a.low + s0.low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var x = max - min + 1;
	var result = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(high,low),new haxe__$Int64__$_$_$Int64(x >> 31,x)).modulus.low;
	if(result < 0) {
		result = -result;
	}
	return result + min;
};
uuid_Uuid.randomByte = function() {
	return uuid_Uuid.randomFromRange(0,255);
};
uuid_Uuid.fromShort = function(shortUuid,separator,fromAlphabet) {
	if(fromAlphabet == null) {
		fromAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	var uuid = uuid_Uuid.convert(shortUuid,fromAlphabet,"0123456789abcdef");
	return uuid_Uuid.hexToUuid(uuid,separator);
};
uuid_Uuid.toShort = function(uuid,separator,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"").toLowerCase();
	return uuid_Uuid.convert(uuid,"0123456789abcdef",toAlphabet);
};
uuid_Uuid.fromNano = function(nanoUuid,separator,fromAlphabet) {
	if(fromAlphabet == null) {
		fromAlphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	var uuid = uuid_Uuid.convert(nanoUuid,fromAlphabet,"0123456789abcdef");
	return uuid_Uuid.hexToUuid(uuid,separator);
};
uuid_Uuid.toNano = function(uuid,separator,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"").toLowerCase();
	return uuid_Uuid.convert(uuid,"0123456789abcdef",toAlphabet);
};
uuid_Uuid.v1 = function(node,optClockSequence,msecs,optNsecs,randomFunc,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(optNsecs == null) {
		optNsecs = -1;
	}
	if(msecs == null) {
		msecs = -1;
	}
	if(optClockSequence == null) {
		optClockSequence = -1;
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	var buffer = new haxe_io_Bytes(new ArrayBuffer(16));
	if(node == null) {
		node = new haxe_io_Bytes(new ArrayBuffer(6));
		var v = randomFunc();
		node.b[0] = v;
		var v = randomFunc();
		node.b[1] = v;
		var v = randomFunc();
		node.b[2] = v;
		var v = randomFunc();
		node.b[3] = v;
		var v = randomFunc();
		node.b[4] = v;
		var v = randomFunc();
		node.b[5] = v;
		node.b[0] |= 1;
	}
	if(uuid_Uuid.clockSequenceBuffer == -1) {
		uuid_Uuid.clockSequenceBuffer = (randomFunc() << 8 | randomFunc()) & 16383;
	}
	var clockSeq = optClockSequence;
	if(optClockSequence == -1) {
		clockSeq = uuid_Uuid.clockSequenceBuffer;
	}
	if(msecs == -1) {
		msecs = Math.round(Date.now());
	}
	var nsecs = optNsecs;
	if(optNsecs == -1) {
		nsecs = uuid_Uuid.lastNSecs + 1;
	}
	var dt = msecs - uuid_Uuid.lastMSecs + (nsecs - uuid_Uuid.lastNSecs) / 10000;
	if(dt < 0 && optClockSequence == -1) {
		clockSeq = clockSeq + 1 & 16383;
	}
	if((dt < 0 || msecs > uuid_Uuid.lastMSecs) && optNsecs == -1) {
		nsecs = 0;
	}
	if(nsecs >= 10000) {
		throw haxe_Exception.thrown("Can't create more than 10M uuids/sec");
	}
	uuid_Uuid.lastMSecs = msecs;
	uuid_Uuid.lastNSecs = nsecs;
	uuid_Uuid.clockSequenceBuffer = clockSeq;
	msecs += 12219292800000;
	var imsecs = haxe_Int64Helper.fromFloat(msecs);
	var b_high = 0;
	var b_low = 268435455;
	var a_high = imsecs.high & b_high;
	var a_low = imsecs.low & b_low;
	var b_high = 0;
	var b_low = 10000;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	var a_high = high;
	var a_low = low;
	var b_high = nsecs >> 31;
	var b_low = nsecs;
	var high = a_high + b_high | 0;
	var low = a_low + b_low | 0;
	if(haxe_Int32.ucompare(low,a_low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var tl = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(high,low),uuid_Uuid.DVS).modulus.low;
	buffer.b[0] = tl >>> 24 & 255;
	buffer.b[1] = tl >>> 16 & 255;
	buffer.b[2] = tl >>> 8 & 255;
	buffer.b[3] = tl & 255;
	var a = haxe_Int64.divMod(imsecs,uuid_Uuid.DVS).quotient;
	var b_high = 0;
	var b_low = 10000;
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b_high) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
	var a_high = high;
	var a_low = low;
	var b_high = 0;
	var b_low = 268435455;
	var this_high = a_high & b_high;
	var this_low = a_low & b_low;
	var tmh = this_low;
	buffer.b[4] = tmh >>> 8 & 255;
	buffer.b[5] = tmh & 255;
	buffer.b[6] = tmh >>> 24 & 15 | 16;
	buffer.b[7] = tmh >>> 16 & 255;
	buffer.b[8] = clockSeq >>> 8 | 128;
	buffer.b[9] = clockSeq & 255;
	buffer.b[10] = node.b[0];
	buffer.b[11] = node.b[1];
	buffer.b[12] = node.b[2];
	buffer.b[13] = node.b[3];
	buffer.b[14] = node.b[4];
	buffer.b[15] = node.b[5];
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v3 = function(name,namespace,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(namespace == null) {
		namespace = "";
	}
	namespace = StringTools.replace(namespace,"-","");
	var buffer = haxe_crypto_Md5.make(haxe_io_Bytes.ofHex(namespace + haxe_io_Bytes.ofString(name).toHex()));
	buffer.b[6] = buffer.b[6] & 15 | 48;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v4 = function(randBytes,randomFunc,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	var buffer = randBytes;
	if(buffer == null) {
		buffer = new haxe_io_Bytes(new ArrayBuffer(16));
		var v = randomFunc();
		buffer.b[0] = v;
		var v = randomFunc();
		buffer.b[1] = v;
		var v = randomFunc();
		buffer.b[2] = v;
		var v = randomFunc();
		buffer.b[3] = v;
		var v = randomFunc();
		buffer.b[4] = v;
		var v = randomFunc();
		buffer.b[5] = v;
		var v = randomFunc();
		buffer.b[6] = v;
		var v = randomFunc();
		buffer.b[7] = v;
		var v = randomFunc();
		buffer.b[8] = v;
		var v = randomFunc();
		buffer.b[9] = v;
		var v = randomFunc();
		buffer.b[10] = v;
		var v = randomFunc();
		buffer.b[11] = v;
		var v = randomFunc();
		buffer.b[12] = v;
		var v = randomFunc();
		buffer.b[13] = v;
		var v = randomFunc();
		buffer.b[14] = v;
		var v = randomFunc();
		buffer.b[15] = v;
	} else if(buffer.length < 16) {
		throw haxe_Exception.thrown("Random bytes should be at least 16 bytes");
	}
	buffer.b[6] = buffer.b[6] & 15 | 64;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v5 = function(name,namespace,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(namespace == null) {
		namespace = "";
	}
	namespace = StringTools.replace(namespace,"-","");
	var buffer = haxe_crypto_Sha1.make(haxe_io_Bytes.ofHex(namespace + haxe_io_Bytes.ofString(name).toHex()));
	buffer.b[6] = buffer.b[6] & 15 | 80;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.stringify = function(data,separator) {
	if(separator == null) {
		separator = "-";
	}
	return uuid_Uuid.hexToUuid(data.toHex(),separator);
};
uuid_Uuid.parse = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	return haxe_io_Bytes.ofHex(StringTools.replace(uuid,separator,""));
};
uuid_Uuid.validate = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	if(separator == "") {
		uuid = HxOverrides.substr(uuid,0,8) + "-" + HxOverrides.substr(uuid,8,4) + "-" + HxOverrides.substr(uuid,12,4) + "-" + HxOverrides.substr(uuid,16,4) + "-" + HxOverrides.substr(uuid,20,12);
	} else if(separator != "-") {
		uuid = StringTools.replace(uuid,separator,"-");
	}
	return uuid_Uuid.regexp.match(uuid);
};
uuid_Uuid.version = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"");
	return Std.parseInt("0x" + HxOverrides.substr(uuid,12,1));
};
uuid_Uuid.hexToUuid = function(hex,separator) {
	return HxOverrides.substr(hex,0,8) + separator + HxOverrides.substr(hex,8,4) + separator + HxOverrides.substr(hex,12,4) + separator + HxOverrides.substr(hex,16,4) + separator + HxOverrides.substr(hex,20,12);
};
uuid_Uuid.convert = function(number,fromAlphabet,toAlphabet) {
	var fromBase = fromAlphabet.length;
	var toBase = toAlphabet.length;
	var len = number.length;
	var buf = "";
	var numberMap = new Array(len);
	var divide = 0;
	var newlen = 0;
	var _g = 0;
	var _g1 = len;
	while(_g < _g1) {
		var i = _g++;
		numberMap[i] = fromAlphabet.indexOf(number.charAt(i));
	}
	do {
		divide = 0;
		newlen = 0;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			divide = divide * fromBase + numberMap[i];
			if(divide >= toBase) {
				numberMap[newlen++] = Math.floor(divide / toBase);
				divide %= toBase;
			} else if(newlen > 0) {
				numberMap[newlen++] = 0;
			}
		}
		len = newlen;
		buf = toAlphabet.charAt(divide) + buf;
	} while(newlen != 0);
	return buf;
};
uuid_Uuid.nanoId = function(len,alphabet,randomFunc) {
	if(alphabet == null) {
		alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(len == null) {
		len = 21;
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	if(alphabet == null) {
		throw haxe_Exception.thrown("Alphabet cannot be null");
	}
	if(alphabet.length == 0 || alphabet.length >= 256) {
		throw haxe_Exception.thrown("Alphabet must contain between 1 and 255 symbols");
	}
	if(len <= 0) {
		throw haxe_Exception.thrown("Length must be greater than zero");
	}
	var mask = (2 << Math.floor(Math.log(alphabet.length - 1) / Math.log(2))) - 1;
	var step = Math.ceil(1.6 * mask * len / alphabet.length);
	var sb_b = "";
	while(sb_b.length != len) {
		var _g = 0;
		var _g1 = step;
		while(_g < _g1) {
			var i = _g++;
			var rnd = randomFunc();
			var aIndex = rnd & mask;
			if(aIndex < alphabet.length) {
				sb_b += Std.string(alphabet.charAt(aIndex));
				if(sb_b.length == len) {
					break;
				}
			}
		}
	}
	return sb_b;
};
uuid_Uuid.short = function(toAlphabet,randomFunc) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	return uuid_Uuid.v4(null,randomFunc,null,true,toAlphabet);
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
Object.defineProperty(String.prototype,"__class__",{ value : String, enumerable : false, writable : true});
String.__name__ = "String";
Array.__name__ = "Array";
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
uuid_Uuid.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.ISO_OID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.X500_DN = "6ba7b814-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.NIL = "00000000-0000-0000-0000-000000000000";
uuid_Uuid.LOWERCASE_BASE26 = "abcdefghijklmnopqrstuvwxyz";
uuid_Uuid.UPPERCASE_BASE26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
uuid_Uuid.NO_LOOK_ALIKES_BASE51 = "2346789ABCDEFGHJKLMNPQRTUVWXYZabcdefghijkmnpqrtwxyz";
uuid_Uuid.FLICKR_BASE58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
uuid_Uuid.BASE_70 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+!@#$^";
uuid_Uuid.BASE_85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
uuid_Uuid.COOKIE_BASE90 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~";
uuid_Uuid.NANO_ID_ALPHABET = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
uuid_Uuid.NUMBERS_BIN = "01";
uuid_Uuid.NUMBERS_OCT = "01234567";
uuid_Uuid.NUMBERS_DEC = "0123456789";
uuid_Uuid.NUMBERS_HEX = "0123456789abcdef";
uuid_Uuid.lastMSecs = 0;
uuid_Uuid.lastNSecs = 0;
uuid_Uuid.clockSequenceBuffer = -1;
uuid_Uuid.regexp = new EReg("^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$","i");
uuid_Uuid.rndSeed = haxe_Int64Helper.fromFloat(Date.now());
uuid_Uuid.state0 = uuid_Uuid.splitmix64_seed(uuid_Uuid.rndSeed);
uuid_Uuid.state1 = (function($this) {
	var $r;
	var a = uuid_Uuid.rndSeed;
	var x = Std.random(10000);
	var b_high = x >> 31;
	var b_low = x;
	var high = a.high + b_high | 0;
	var low = a.low + b_low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var a_high = high;
	var a_low = low;
	var b_high = 0;
	var b_low = 1;
	var high = a_high + b_high | 0;
	var low = a_low + b_low | 0;
	if(haxe_Int32.ucompare(low,a_low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	$r = uuid_Uuid.splitmix64_seed(new haxe__$Int64__$_$_$Int64(high,low));
	return $r;
}(this));
uuid_Uuid.DVS = new haxe__$Int64__$_$_$Int64(1,0);
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
