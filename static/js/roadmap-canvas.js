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

    const icons = await bufferImages(iconUrls, isPhone);

    const addIcon = icons['add'];

    let addButton = {
        name: "add",
        type: "add-btn",
        position: {
            x: (width - addIcon.width)/2,
            y: (height - addIcon.height)/2
        },
        size: {
            width: addIcon.width,
            height: addIcon.height
        }, 
        tooltip: document.createElement('div')
    }

    const tooltip = addButton.tooltip;
    tooltip.style.position = 'absolute';
    tooltip.style.border = '1px solid black';
    tooltip.style.display = 'none';
    tooltip.textContent = "Create a new roadmap node.";
    tooltip.style.textAlign = 'center';
    tooltip.style.fontStyle = 'italic';
    tooltip.style.padding = '5px';

    document.querySelector('#main-container').appendChild(tooltip);
    canvasElements.push(addButton);
    drawEmptyRoadmap(icons);
}


async function bufferImages(images, isPhone) {
    
    const loadedImages = await Promise.all(images.map(async image => {
        const url = isPhone ? (image.phone.url || image.other.url) : image.other.url;
        const loadedImage = await loadImage(url);
        return ({ name: image.name, img: loadedImage});
    }));

    const buffer = {};
    loadedImages.forEach(({ name, img }) => {
        buffer[name] = img;
    });

    return buffer;
}


function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
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

    canvasElements.forEach(element => {
        if (collisionAABB(element, click)) {

        }
    });
}

function handleCanvasHover(event) {

    const mousePosition = getMousePosition(event);

    canvasElements.forEach(element => {
        if (collisionAABB(element, mousePosition)) {
            showTooltip(element, mousePosition);
        } else {
            hideTooltip(element);
        }
    });
}

function showTooltip(element, mousePosition) {
    element.tooltip.style.display = 'block';
    element.tooltip.style.top = `${canvasRect.top + mousePosition.y - element.size.height}px`;
    element.tooltip.style.left = `${canvasRect.left + mousePosition.x}px`;
    element.tooltip.style.transform = 'translate(-50%, 0)';

}

function hideTooltip(element) {
    element.tooltip.style.display = 'none';
}

function getMousePosition(event) {
    return {x: event.offsetX, y: event.offsetY};
}

function collisionAABB(element, click) {
    if (click.x > element.position.x - element.size.width && click.x < element.position.x + element.size.width &&
        click.y > element.position.y - element.size.height && click.y < element.position.y + element.size.height)
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