﻿import { Position } from "./Position";

export class Tooltip {
    
    constructor({
        message = '',
        domElement = document.createElement('div'),
        targetDomElement = document.querySelector('#main-container'),
        canvasRect = {top: 0, left: 0},
        parentNode = None
    } = {}) {
        this.message = message;
        this.domElement = domElement;
        this.targetDomElement = targetDomElement;
        this.canvasRect = canvasRect;
        this.parentNode = parentNode;
        this.init();
    }

    init() {
        this.domElement.style.position = 'absolute';
        this.domElement.style.border = '1px solid black';
        this.domElement.style.display = 'none';
        this.domElement.textContent = "Create a new roadmap node.";
        this.domElement.style.textAlign = 'center';
        this.domElement.style.fontStyle = 'italic';
        this.domElement.style.padding = '5px';
        
        this.targetDomElement.appendChild(this.domElement);
    }

    hide() {
        this.domElement.style.display = 'none';
    }

    show({
        mousePosition = new Position()
    } = {}) {
        this.domElement.style.display = 'block';
        this.domElement.style.top = `${this.canvasRect.top + mousePosition.y - this.parentNode.size.height}px`;
        this.domElement.style.left = `${this.canvasRect.left + mousePosition.x}px`;
        this.domElement.style.transform = 'translate(-50%, 0)';
    }
}