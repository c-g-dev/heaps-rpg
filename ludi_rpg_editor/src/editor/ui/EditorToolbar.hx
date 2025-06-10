package editor.ui;

import js.Browser;
import js.html.Element;
import js.html.XMLHttpRequest;
import editor.MapEditor;

class EditorToolbar {
    private var editor: MapEditor;
    private var element: Element;
    private var toolButtons: Map<String, Element>;
    
    public function new(editor: MapEditor) {
        this.editor = editor;
        this.toolButtons = new Map();
        loadTemplate();
    }
    
    private function loadTemplate(): Void {
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "EditorToolbar.html", false);
        xhr.send();
        
        var container = Browser.document.createDivElement();
        container.innerHTML = xhr.responseText;
        element = container.firstElementChild;
        
        setupEventListeners();
        
        
        setActiveTool("select");
    }
    
    private function setupEventListeners(): Void {
        
        var buttons = element.querySelectorAll(".tool-button");
        for (i in 0...buttons.length) {
            var button = cast(buttons.item(i), Element);
            var toolId = button.getAttribute("data-tool");
            if (toolId != null) {
                toolButtons.set(toolId, button);
                button.addEventListener("click", function(e) {
                    selectTool(toolId);
                });
            }
        }
        
        
        Browser.window.addEventListener("keydown", onKeyDown);
    }
    
    private function onKeyDown(e: js.html.KeyboardEvent): Void {
        
        var target = cast(e.target, Element);
        if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
            return;
        }
        
        
        switch (e.key.toLowerCase()) {
            case "s":
                if (!e.ctrlKey && !e.metaKey) {
                    selectTool("select");
                    e.preventDefault();
                }
            case "m":
                selectTool("move");
                e.preventDefault();
            case "p":
                selectTool("paint");
                e.preventDefault();
            case "e":
                selectTool("erase");
                e.preventDefault();
            case "f":
                selectTool("fill");
                e.preventDefault();
            case "r":
                selectTool("rect");
                e.preventDefault();
            case "c":
                if (!e.ctrlKey && !e.metaKey) {
                    selectTool("circle");
                    e.preventDefault();
                }
            case "l":
                selectTool("line");
                e.preventDefault();
        }
    }
    
    private function selectTool(toolId: String): Void {
        editor.setTool(toolId);
        setActiveTool(toolId);
    }
    
    private function setActiveTool(toolId: String): Void {
        
        for (button in toolButtons) {
            button.classList.remove("active");
        }
        
        
        var button = toolButtons.get(toolId);
        if (button != null) {
            button.classList.add("active");
        }
        
        
        updateToolOptions(toolId);
    }
    
    private function updateToolOptions(toolId: String): Void {
        var optionsContainer = element.querySelector("#tool-options");
        if (optionsContainer != null) {
            optionsContainer.innerHTML = "";
            
            
            switch (toolId) {
                case "paint", "erase", "fill":
                    
                    var label = Browser.document.createSpanElement();
                    label.textContent = "Brush Size: ";
                    optionsContainer.appendChild(label);
                    
                    var sizeInput = Browser.document.createInputElement();
                    sizeInput.type = "range";
                    sizeInput.min = "1";
                    sizeInput.max = "10";
                    sizeInput.value = "1";
                    optionsContainer.appendChild(sizeInput);
                    
                case "rect", "circle":
                    
                    var fillCheck = Browser.document.createInputElement();
                    fillCheck.type = "checkbox";
                    fillCheck.id = "shape-fill";
                    optionsContainer.appendChild(fillCheck);
                    
                    var fillLabel = Browser.document.createLabelElement();
                    fillLabel.htmlFor = "shape-fill";
                    fillLabel.textContent = " Fill shape";
                    optionsContainer.appendChild(fillLabel);
            }
        }
    }
    
    public function getElement(): Element {
        return element;
    }
} 