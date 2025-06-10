package editor.ui;

import js.Browser;
import js.html.Element;
import js.html.XMLHttpRequest;
import js.html.MouseEvent;
import editor.MapEditor;

class LayerTabNavigator {
    private var editor: MapEditor;
    private var element: Element;
    private var tabsContainer: Element;
    
    
    private var isDragging: Bool = false;
    private var draggedTab: Element = null;
    private var draggedIndex: Int = -1;
    private var dragStartX: Float = 0;
    private var dragStartY: Float = 0;
    private var dropIndicator: Element = null;
    
    public function new(editor: MapEditor) {
        this.editor = editor;
        loadTemplate();
    }
    
    private function loadTemplate(): Void {
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "LayerTabNavigator.html", false);
        xhr.send();
        
        var container = Browser.document.createDivElement();
        container.innerHTML = xhr.responseText;
        element = container.firstElementChild;
        
        tabsContainer = element.querySelector("#layer-tabs");
        
        setupEventListeners();
        createDropIndicator();
    }
    
    private function createDropIndicator(): Void {
        dropIndicator = Browser.document.createDivElement();
        dropIndicator.className = "layer-tab-drop-indicator";
        dropIndicator.style.display = "none";
    }
    
    private function setupEventListeners(): Void {
        var addButton = element.querySelector("#add-layer-button");
        if (addButton != null) {
            addButton.addEventListener("click", function(e) {
                
                
                Log.trace("Add layer button clicked");
            });
        }
        
        
        Browser.document.addEventListener("mousemove", onGlobalMouseMove);
        Browser.document.addEventListener("mouseup", onGlobalMouseUp);
    }
    
    public function getElement(): Element {
        return element;
    }
    
    public function refresh(): Void {
        
        tabsContainer.innerHTML = "";
        
        var layers = editor.getLayers();
        var currentIndex = editor.getCurrentLayerIndex();
        
        
        for (i in 0...layers.length) {
            var layer = layers[i];
            var tab = createLayerTab(layer.name, i, i == currentIndex);
            tabsContainer.appendChild(tab);
        }
        
        
        if (dropIndicator.parentNode != null) {
            dropIndicator.parentNode.removeChild(dropIndicator);
        }
        tabsContainer.appendChild(dropIndicator);
    }
    
    private function createLayerTab(name: String, index: Int, isActive: Bool): Element {
        var tab = Browser.document.createDivElement();
        tab.className = isActive ? "layer-tab active" : "layer-tab";
        tab.textContent = name;
        tab.setAttribute("data-index", Std.string(index));
        
        
        tab.addEventListener("mousedown", function(e: MouseEvent) {
            onTabMouseDown(e, tab, index);
        });
        
        tab.addEventListener("click", function(e: MouseEvent) {
            if (!isDragging) {
                editor.selectLayer(index);
            }
        });
        
        return tab;
    }
    
    private function onTabMouseDown(e: MouseEvent, tab: Element, index: Int): Void {
        e.preventDefault();
        
        draggedTab = tab;
        draggedIndex = index;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        
        
        tab.classList.add("dragging");
        
        
    }
    
    private function onGlobalMouseMove(e: MouseEvent): Void {
        if (draggedTab != null) {
            var deltaX = Math.abs(e.clientX - dragStartX);
            var deltaY = Math.abs(e.clientY - dragStartY);
            
            
            if (!isDragging && (deltaX > 5 || deltaY > 5)) {
                startDragging();
            }
            
            if (isDragging) {
                updateDragPosition(e);
                updateDropIndicator(e);
            }
        }
    }
    
    private function startDragging(): Void {
        isDragging = true;
        
        if (draggedTab != null) {
            draggedTab.classList.add("dragging");
            draggedTab.style.zIndex = "1000";
            draggedTab.style.position = "relative";
            dropIndicator.style.display = "block";
        }
    }
    
    private function updateDragPosition(e: MouseEvent): Void {
        if (draggedTab != null) {
            var deltaX = e.clientX - dragStartX;
            draggedTab.style.transform = 'translateX(${deltaX}px)';
        }
    }
    
    private function updateDropIndicator(e: MouseEvent): Void {
        var tabs = tabsContainer.querySelectorAll(".layer-tab");
        var dropIndex = -1;
        var insertBefore: Element = null;
        
        for (i in 0...tabs.length) {
            var tab = cast(tabs[i], Element);
            if (tab == draggedTab) continue;
            
            var rect = tab.getBoundingClientRect();
            var tabCenter = rect.left + rect.width / 2;
            
            if (e.clientX < tabCenter) {
                dropIndex = Std.parseInt(tab.getAttribute("data-index"));
                insertBefore = tab;
                break;
            }
        }
        
        
        if (insertBefore != null) {
            tabsContainer.insertBefore(dropIndicator, insertBefore);
        } else {
            
            var lastTab = cast(tabs[tabs.length - 1], Element);
            if (lastTab != draggedTab && lastTab != null) {
                cast(lastTab.parentNode, Element).insertBefore(dropIndicator, lastTab.nextSibling);
            }
        }
    }
    
    private function onGlobalMouseUp(e: MouseEvent): Void {
        if (draggedTab != null) {
            if (isDragging) {
                performDrop(e);
            }
            
            
            draggedTab.classList.remove("dragging");
            draggedTab.style.transform = "";
            draggedTab.style.zIndex = "";
            draggedTab.style.position = "";
            dropIndicator.style.display = "none";
            
            draggedTab = null;
            draggedIndex = -1;
            isDragging = false;
        }
    }
    
    private function performDrop(e: MouseEvent): Void {
        var dropIndicatorIndex = -1;
        for (i in 0...tabsContainer.children.length) {
            if (cast(tabsContainer.children[i], Element) == dropIndicator) {
                dropIndicatorIndex = i;
                break;
            }
        }
        
        
        var targetIndex = 0;
        for (i in 0...dropIndicatorIndex) {
            var child = cast(tabsContainer.children[i], Element);
            if (child.classList.contains("layer-tab")) {
                targetIndex++;
            }
        }
        
        
        if (targetIndex > draggedIndex) {
            targetIndex--;
        }
        
        if (targetIndex != draggedIndex && targetIndex >= 0) {
            
            editor.moveLayer(draggedIndex, targetIndex);
        }
    }
} 