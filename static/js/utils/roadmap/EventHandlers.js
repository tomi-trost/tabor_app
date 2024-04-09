import { Element } from "./Element.js";
import { Tooltip } from "./Tooltip.js";
import { Position } from "./Position.js";
import { Node } from "./Node.js";
import { Size } from "./Size.js";
import { Text } from "./Text.js";

export function canvasClickHandler(event, nodeTree) {

    const click = getMousePosition(event);

    nodeTree.traverse(node => {
        
        let element = node.getComponentOfType(Element);
        if (!element) return;
        if (!collisionAABB(element, click)) return;    
        if (node.name !== 'add-btn') return;

        node.getComponentOfType(Tooltip).hide();
        // show form
        document.querySelector('#form-container').style.display = 'block'; 
    });
}

export function canvasMoveHandler(event, nodeTree) {

    const mousePosition = getMousePosition(event);

    nodeTree.traverse(node => {

        const element = node.getComponentOfType(Element);
        const tooltip = node.getComponentOfType(Tooltip);

        if ( !(element && tooltip ) ) {
            return;
        }

        if (collisionAABB(element, mousePosition)) {
            tooltip.show(mousePosition);
        } else {
            tooltip.hide();
        }
        
    });
}

function getMousePosition(event) {
    return new Position({x: event.offsetX, y: event.offsetY});
}

function collisionAABB(element, mouse) {
    if (mouse.x > element.position.x && mouse.x < element.position.x + element.size.width &&
        mouse.y > element.position.y && mouse.y < element.position.y + element.size.height)
    {
        return true;
    }
    return false;
}

export function leftButtonClickHandler(event, nodeTree) {
    const positions = nodeTree.map(node => node.getComponentOfType(Element)?.position);
    positions.forEach(position => {
        position?.moveRight(50);
    });
}

export function rightButtonClickHandler(event, nodeTree) {
    const positions = nodeTree.map(node => node.getComponentOfType(Element)?.position);
    positions.forEach(position => {
        position?.moveLeft(50);
    });    
}

export function upButtonClickHandler(event, nodeTree) {
    const positions = nodeTree.map(node => node.getComponentOfType(Element)?.position);
    positions.forEach(position => {
        position?.moveDown(50);
    });       
}

export function downButtonClickHandler(event, nodeTree) {
    const positions = nodeTree.map(node => node.getComponentOfType(Element)?.position);
    positions.forEach(position => {
        position?.moveUp(50);
    });        
}

export function formSubmitClickHandler(event, nodeTree, canvasRect) {

    event.preventDefault();
    const formData = new FormData(event.target);

    // Fetch the addButton that was responsible
    // for the creation of new element.
    const node = nodeTree.find(node => node.name === 'add-btn');
    const element = node.getComponentOfType(Element);

    // Assign new postition
    const elementsPerView = 3;

    const width = canvasRect.width;
    const height = canvasRect.height;

    const widthBuffer = width - width*0.1;
    const heightBuffer = height - height*0.1;

    const btnX = element.position.x;
    const btnY = element.position.y;

    const generatedOffset = widthBuffer/elementsPerView;
    const generatedX = btnX + generatedOffset;


    // Move add button to the right  
    element.position.x = generatedX;

    const elementSize = new Size({
        width: 24,
        height: 24
    });

    // Construct the element
    const newElement = new Element({
        position: new Position({
            x: btnX + elementSize.width/2,
            y: btnY + elementSize.height/2
        }),
        size: elementSize
    });

    const text = new Text({
        title: formData.get('element-title'),
        date: formData.get('element-date'),
        description: formData.get('element-description'),
    })
    
    node.insertNodeBefore(new Node({
        name: 'new-element',
        components: [newElement, text]
    }));

    document.querySelector('#form-container').style.display = 'none';     
}

export function formCancelClickHandler(event) {
    // document.querySelector('#new-element-form').reset();
    document.querySelector('#form-container').style.display = 'none'; 
}