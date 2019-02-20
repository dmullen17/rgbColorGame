/* Select DOM elements and define variables */
const colorSquares = document.querySelectorAll('.color-square');
let gameData = {
    'answer': [55, 75, 62],
    
};

/* Define functions */ 
function randomColor() {
    colors = [];
    for (let i = 0; i < 3; i++) {
        colors.push(Math.floor(Math.random() * 256));
    }
    return colors;
}

function resetGame() {
    for (let i = 0; i < 6; i++) {
        const name = `color${i}`;
        gameData[name].name = name;
        gameData[name].color = randomColor();
    }
}

function hoverSquare() {
    this.classList.add('hover');
}

function removeHoverSquare() {
    this.classList.remove('hover');
}

/* Set up Event Listeners */
colorSquares.forEach(square => square.addEventListener('mouseover', hoverSquare));
colorSquares.forEach(square => square.addEventListener('mouseleave', removeHoverSquare));
