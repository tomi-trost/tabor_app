export function possitionUpDownButtons() {
    
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

export function possitionLeftRightButtons() {

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