/* TO DO */
// Store difficulty in localStorage - use this to update numberOfGuesses 
// Make animation on guessing correctly 
// Keep stats in localStorage 


/* Select DOM elements and define variables */
const colorSquares = document.querySelectorAll('.color-square');
const difficulties = document.querySelector('#difficulties');
const answerRGB = document.querySelector('.answerRGB');
const playAgain = document.querySelector('.play-again');
const guesses = document.querySelector('.guesses');
let numberOfGuesses = 2;
let answerSquare;
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
    // Remove any previous style
    if (answerSquare) {
        answerSquare.innerText = '';
        answerSquare.style.transform = 'scale(1.0)';
    }

    // Reset the colors on each square 
    colorSquares.forEach(square => {
        const color = randomColor();
        square.style.background = color;
        square.dataset.color = color;
    })
    
    // Randomly set the answer to one of the squares 
    const index = Math.floor((Math.random() * colorSquares.length));
    answer = colorSquares[index].dataset.color;
    answerSquare = colorSquares[index]; // used for displaying the correct square if you lose the game
    
    // Update text 
    answerRGB.innerText = answer.toUpperCase();
    
    // Update numberOfGuesses
    numberOfGuesses = 2;
}

function checkGuess() {
    if (numberOfGuesses === 0) return;
    const guess = this.dataset.color;
    console.log(guess);
    
    // win game 
    if (guess === answer) {
        console.log('YOU WIN!!!');
        return;
    }
    
    // incorrect guess
    numberOfGuesses --; 
    guesses.innerText = `${numberOfGuesses} guess remaining`;
    if (numberOfGuesses === 0) {
        // Show correct answer
        answerSquare.style.transform = 'scale(1.2)';
        answerSquare.style.color = rgbColorOffset(answer, 255);
        answerSquare.innerText = 'Try Again!';
    }
}

function rgbColorOffset(rgbString, offset) {
    const matches = rgbString.match(/^rgb\((\d+),\s(\d+),\s(\d+)/);
    const colors = [matches[1], matches[2], matches[3]];
    return `rgb(${colors.map(color => (parseInt(color) - 255) * -1).join(',')})`;
}

function hoverSquare() {
    this.classList.add('hover');
    //console.log(this.dataset.color);
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
window.addEventListener('load', resetGame);
playAgain.addEventListener('click', resetGame);
difficulties.addEventListener('click', setDifficulty);
colorSquares.forEach(square => square.addEventListener('mouseover', hoverSquare));
colorSquares.forEach(square => square.addEventListener('mouseleave', removeHoverSquare));
colorSquares.forEach(square => square.addEventListener('click', checkGuess));

