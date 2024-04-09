import { Node } from "./Node.js";
import { Element } from "./Element.js";
import { Icon } from "./Icon.js";
import { Text } from "./Text.js";

export class Draw {

    constructor({
        ctx,
        canvas,
        scene = new Node(),
        backgroundColor = 'white'
    } = {}) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scene = scene;
        this.backgroundColor = backgroundColor;
    }

    drawScene() {
        this.clearCanvas();
        this.scene.traverse(node => {

            const element = node.getComponentOfType(Element);
            if (!element) return; 
            
            node.children.forEach(childNode => {
                const childElement = childNode.getComponentOfType(Element);
                this.connectElements(element, childElement);
            });

            const icon = node.getComponentOfType(Icon);
            if (icon) {
                this.drawIcon(icon, element);
            } else {
                this.drawElement(element)
            }

            const text = node.getComponentOfType(Text);
            if (!text) return;

            this.drawText(element, text);
        });
    }

    drawIcon(icon, element) {
        this.ctx.drawImage(icon.image, element.position.x, element.position.y);
    }

    clearCanvas() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawElement(element) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        const x = element.position.x;
        const y = element.position.y;
        const w = element.size.width;
        const h = element.size.height;
        this.ctx.fillRect(x, y, w, h);
    }

    drawText(element, text) {

        let offsetY = 30;
        this.ctx.font = '15px Arial';
        this.ctx.fillStyle = 'black';

        if (text.date) {
            const dateString = `date: ${text.date}`
            this.ctx.fillText(dateString, element.position.x, element.position.y - offsetY);
            offsetY += 30;
        }

        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(text.title, element.position.x, element.position.y - offsetY);
    } 

    connectElements(element1, element2) {
        const position1 = this.generateCenterPosition(element1);
        const position2 = this.generateCenterPosition(element2);

        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(position1.x, position1.y);
        this.ctx.lineTo(position2.x, position2.y);
        this.ctx.stroke();
    }

    generateCenterPosition(element) {
        
        const x = element.position.x;
        const y = element.position.y;
        const w = element.size.width;
        const h = element.size.height;

        return {x: x+w/2, y: y+h/2};
    }
}