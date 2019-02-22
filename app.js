/* Select DOM elements and define variables */
const colorSquares = document.querySelectorAll('.color-square');
const difficulties = document.querySelector('#difficulties');
const answerRGB = document.querySelector('.answerRGB');
let numberOfGuesses = 2;
let answer; 

/* Define functions */ 
function randomColor() {
    colors = [];
    for (let i = 0; i < 3; i++) {
        colors.push(Math.floor(Math.random() * 256));
    }
    return `rgb(${colors.join(', ')})`;
}

function resetGame() {
    // Reset the colors on each square 
    colorSquares.forEach(square => {
        const color = randomColor();
        square.style.background = color;
        square.dataset.color = color;
    })
    
    // Randomly set the answer to one of the squares 
    const index = Math.floor((Math.random() * colorSquares.length));
    answer = colorSquares[index].dataset.color;
    
    // Update text 
    answerRGB.innerText = answer.toUpperCase();
    
}

function hoverSquare() {
    this.classList.add('hover');
    console.log(this.dataset.color);
}

function removeHoverSquare() {
    this.classList.remove('hover');
}

function setDifficulty(e) {
    if (e.target.dataset.guesses) {
        numberOfGuesses = parseInt(e.target.dataset.guesses);
    }
}

/* Set up Event Listeners */
colorSquares.forEach(square => square.addEventListener('mouseover', hoverSquare));
colorSquares.forEach(square => square.addEventListener('mouseleave', removeHoverSquare));
difficulties.addEventListener('click', setDifficulty)