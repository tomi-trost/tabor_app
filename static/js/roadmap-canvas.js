import { ImageLoader } from "./utils/roadmap/ImageLoader.js";
import { Node } from "./utils/roadmap/Node.js";
import { Position } from "./utils/roadmap/Position.js";
import { Size } from "./utils/roadmap/Size.js";
import { Tooltip } from "./utils/roadmap/Tooltip.js";
import { Element } from "./utils/roadmap/Element.js";
import { Icon } from "./utils/roadmap/Icon.js";
import { Draw } from "./utils/roadmap/Draw.js";
import { 
    canvasClickHandler,
    canvasMoveHandler,
    leftButtonClickHandler,
    rightButtonClickHandler,
    upButtonClickHandler,
    downButtonClickHandler,
    formSubmitClickHandler,
    formCancelClickHandler

} from "./utils/roadmap/EventHandlers.js";

const dateP = document.querySelector('#date p');
const date = formatDate(new Date());
dateP.innerHTML = date;

const canvas = document.querySelector('#roadmap-canvas');
const ctx = canvas.getContext('2d');

// Set canvas width and height to ensure correct 
// drawing.
const canvasRect = canvas.getBoundingClientRect();
const {width, height} = {width: canvasRect.width, height: canvasRect.height};
canvas.width = width;
canvas.height = height - 1;

// Check if the device is a moblie phone.
const isPhone = width < 500;

// Detect display orientation.
const upDownOrientation = height > width;

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

const nodeTree = new Node({name: 'root'});
const drawer = new Draw({
    canvas: canvas,
    ctx: ctx, 
    scene: nodeTree
});

loadIconsAndInitialize(iconUrls, isPhone);

async function loadIconsAndInitialize(iconUrls, isPhone) {

    const imageLoader = new ImageLoader({deviceIsPhone: isPhone});
    const icons = await imageLoader.bufferImages(iconUrls, isPhone);

    const addIcon = icons['add'];

    const icon = new Icon({image: addIcon});
    const iconSize = new Size({
        width: addIcon.width,
        height: addIcon.height
    });
    const addButtonElement = new Element({
        position: new Position({
            x: (width - addIcon.width)/2,
            y: (height - addIcon.height)/2
        }),
        size: iconSize, 
    });
    const tooltip = new Tooltip({
        message: "Create a new roadmap node.",
        canvasRect: canvasRect,
        parentSize: iconSize
    });

    nodeTree.addChild(new Node({
        name: "add-btn",
        components: [addButtonElement, tooltip, icon]
    }));

    drawer.drawScene();
}

function formatDate(date) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}. ${month} ${year}`;
}

canvas.addEventListener('mousedown', (e) => {
    canvasClickHandler(e, nodeTree, canvasRect);
});

canvas.addEventListener('mousemove', (e) => {
    canvasMoveHandler(e, nodeTree);
});

document.querySelector('#left-btn').addEventListener('mousedown', (e) => {
    leftButtonClickHandler(e, nodeTree);
    drawer.drawScene();
});

document.querySelector('#right-btn').addEventListener('mousedown', (e) => {
    rightButtonClickHandler(e, nodeTree);
    drawer.drawScene();
});

document.querySelector('#up-btn').addEventListener('mousedown', (e) => {
    upButtonClickHandler(e, nodeTree);
    drawer.drawScene();
});

document.querySelector('#down-btn').addEventListener('mousedown', (e) => {
    downButtonClickHandler(e, nodeTree);
    drawer.drawScene();
});

document.querySelector('#new-element-form').addEventListener('submit', (e) => {
    formSubmitClickHandler(e, nodeTree, canvasRect);
    drawer.drawScene();
});

document.querySelector('#new-element-form').addEventListener('reset', (e) => {
    formCancelClickHandler(e);
});


// Automatic resizing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        
        const canvasRect = canvas.getBoundingClientRect();
        const {width, height} = {width: canvasRect.width, height: canvasRect.height};
        canvas.width = width;
        // [!remove] -1 prevents overflow becouse it
        // gives the canvas 1px of space for its border.
        canvas.height = height - 1;

        const upDownOrientation = height > width;
        if (upDownOrientation)  { possitionUpDownButtons(); } 
        else                    { possitionLeftRightButtons(); }

        // drawer.drawScene();
    }, );
}); 