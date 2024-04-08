import { ImageLoader } from "./utils/ImageLoader.js";
import { Node } from "./utils/Node.js";
import { Position } from "./utils/Position.js";
import { Size } from "./utils/Size.js";
import { Tooltip } from "./utils/Tooltip.js";


const canvas = document.querySelector('#roadmap-canvas');
const ctx = canvas.getContext('2d');

// Set canvas width and height to ensure correct 
// drawing.
const canvasRect = canvas.getBoundingClientRect();
const { width, height } = getCanvasDimensions();
canvas.width = width;
canvas.height = height - 1;

// Check if the device is a moblie phone.
const isPhone = width < 500;

// Detect display orientation.
const upDownOrientation = height > width;
if (upDownOrientation)  { possitionUpDownButtons(); } 
else                    { possitionLeftRightButtons(); }


const iconUrls = [
    {
        name: "add",
        phone: {
            url: '/static/png/add/add-24.png',
            size: {width: 24, height: 24},
        },
        other: {
            url: '/static/png/add/add-48.png',
            size: {width: 48, height: 48},
        }
    },
];


let canvasElements = [];
loadIconsAndInitialize(iconUrls, isPhone);

async function loadIconsAndInitialize(iconUrls, isPhone) {

    const imageLoader = new ImageLoader({deviceIsPhone: isPhone});
    const icons = await imageLoader.bufferImages(iconUrls, isPhone);

    const addIcon = icons['add'];
    const iconSize = new Size({
        width: addIcon.width,
        height: addIcon.height
    })

    const addButton = new Node({
        name: "add",
        type: "add-btn",
        position: new Position({
            x: (width - addIcon.width)/2,
            y: (height - addIcon.height)/2
        }),
        size: iconSize, 
        tooltip: new Tooltip({
            message: "Create a new roadmap node.",
            canvasRect: canvasRect,
            parentSize: iconSize
        })
    });

    canvasElements.push(addButton);
    drawEmptyRoadmap(icons);
}

function drawEmptyRoadmap(icons) {
    const addIcon = icons['add'];
    ctx.drawImage(addIcon, (width - addIcon.width)/2, (height - addIcon.height)/2);
} 

function possitionUpDownButtons() {
    
    const backButton = document.getElementById('back-btn');
    const forwardButton = document.getElementById('forward-btn');

    backButton.style.top = '30px';
    backButton.style.left = '50%';
    backButton.style.transform = 'translate(-50%, 0)';
    backButton.textContent = '⇧';

    forwardButton.style.bottom = '30px';
    forwardButton.style.left = '50%';
    forwardButton.style.transform = 'translate(-50%, 0)';
    forwardButton.textContent = '⇩';
}

function possitionLeftRightButtons() {

    const backButton = document.getElementById('back-btn');
    const forwardButton = document.getElementById('forward-btn');

    backButton.style.left = '30px';
    backButton.style.top = '50%';
    backButton.style.transform = 'translate(0, -50%)';
    backButton.textContent = '⇦';

    forwardButton.style.right = '30px'
    forwardButton.style.top = '50%'; 
    forwardButton.style.transform = 'translate(0, -50%)';
    forwardButton.textContent = '⇨';

}

function getCanvasDimensions() {
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    return { width: canvasWidth, height: canvasHeight };
}

function addDot(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function handleCanvasClick(event) {

    const click = getMousePosition(event);

    canvasElements.forEach(node => {
        console.log(collisionAABB(node, click));
        if (collisionAABB(node, click)) {

        }
    });
}

function handleCanvasHover(event) {

    const mousePosition = getMousePosition(event);

    canvasElements.forEach(node => {
        if (collisionAABB(node, mousePosition)) {
            node.tooltip.show(mousePosition);
        } else {
            node.tooltip.hide();
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

function isClickedEucledian(element, click) {}

canvas.addEventListener('mousedown', (e) => {
    handleCanvasClick(e);
});

canvas.addEventListener('mousemove', (e) => {
    handleCanvasHover(e);
});


// // Automatic resizing
// let resizeTimeout;
// window.addEventListener('resize', () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
        
    
//         const { width, height } = getCanvasDimensions();
//         canvas.width = width;
//         // [!remove] -1 prevents overflow becouse it
//         // gives the canvas 1px of space for its border.
//         canvas.height = height - 1;

//         const upDownOrientation = height > width;
//         if (upDownOrientation)  { possitionUpDownButtons(); } 
//         else                    { possitionLeftRightButtons(); }

//     }, );
// }); 