/* Select DOM elements and define variables */
const colorSquares = document.querySelectorAll('.color-square');
const difficulties = document.querySelector('#difficulties');
const answerRGB = document.querySelector('.answerRGB');
const playAgain = document.querySelector('.play-again');
const guesses = document.querySelector('.guesses');
let numberOfGuesses = 2;
let answerSquare;
let answer; 
let previousGuess;
const stats = {
    'correct': 0,
    'incorrect': 0,
    'wins': 0,
    'losses': 0
}
const wins = document.querySelector('#wins');
const losses = document.querySelector('#losses');
const percentage = document.querySelector('#percentage');


/* Define functions */
// Returns a random background in 'rgb(255, 150, 147)' format
function randomBackgroundRGB() {
    colors = [];
    for (let i = 0; i < 3; i++) {
        colors.push(Math.floor(Math.random() * 256));
    }
    return `rgb(${colors.join(', ')})`;
}

function resetGame() {
    // Remove any previous style
    if (answerSquare) {
        answerSquare.textContent = '';
        answerSquare.style.transform = 'scale(1.0)';
    }

    // Reset the colors on each square 
    colorSquares.forEach(square => {
        const color = randomBackgroundRGB();
        square.style.background = color;
        square.dataset.color = color;
    })
    
    // Randomly set the answer to one of the squares 
    const index = Math.floor((Math.random() * colorSquares.length));
    answer = colorSquares[index].dataset.color;
    answerSquare = colorSquares[index]; // used for displaying the correct square if you lose the game
    
    // Update text 
    answerRGB.textContent = answer.toUpperCase();
    
    // Update numberOfGuesses
    const localGuesses = window.localStorage.getItem('guesses');
    numberOfGuesses = localGuesses ? localGuesses : 2;
    guesses.textContent = `${numberOfGuesses} ${numberOfGuesses > 1 ? 'guesses' : 'guess'} remaining`;
    
    // Set difficulty style based on numberOfGuesses
    const selectedDifficulty = document.querySelector(`li[data-guesses='${numberOfGuesses}']`);
    selectedDifficulty.style.textDecoration = 'underline #FFF';
    
    // Reset previousGuess
    previousGuess = null;
    
    // Testing that highlighted Text has something to do with the color 
    //colorSquares.forEach(color => color.style.background = 'yellow');
    // wasn't related to the color
}

function checkGuess() {
    if (numberOfGuesses === 0) return;
    if (previousGuess && previousGuess == this) return; 
    
    const guess = this.dataset.color;
    //console.log(guess);
    
    // win game 
    if (guess === answer) {
        displayTextInSquare(answerSquare, 'You win!');
        // Update States
        stats.correct ++;
        stats.wins ++;
        updateStats();
        // Set guess to 0 to end the game 
        numberOfGuesses = 0;
        return;
    }
    
    // incorrect guess
    numberOfGuesses --;
    guesses.textContent = `${numberOfGuesses} ${numberOfGuesses > 1 ? 'guesses' : 'guess'} remaining`;
    stats.incorrect ++;
    this.style.background = 'rgba(0, 0, 0, 0)'; // fade out square
    previousGuess = this;
    
    // lose game 
    if (numberOfGuesses === 0) {
        stats.losses ++;
        // Show correct answer
        displayTextInSquare(answerSquare, 'Try Again!');
    }
    
    // update stats
    updateStats();
}

// Takes a string in 'rgb(255, 150, 147)' fromat and returns its complimentary color 
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

// Scales a square and adds .textContent in the square's complimentary color
function displayTextInSquare(square, text) {
    square.style.transform = 'scale(1.2)';
    square.style.color = rgbColorOffset(square.style.background, 255);
    square.textContent = text;
}

function setDifficulty(e) {
    if (e.target.dataset.guesses) {
        window.localStorage.setItem('guesses', e.target.dataset.guesses);
        // Remove underline styling from all children
        difficulties.querySelectorAll('li').forEach(li => li.style.textDecoration = '');
        // Add underline styling to target
        e.target.style.textDecoration = 'underline #FFF';
        resetGame();
    }
}

function updateStats() {
    wins.textContent = `Wins: ${stats.wins}`;
    losses.textContent = `Losses: ${stats.losses}`;
    percentage.textContent = `Guess Percentage: ${Math.round(stats.correct / (stats.correct + stats.incorrect)*100)}%`;
}


/* Set up Event Listeners */
window.addEventListener('load', resetGame);
playAgain.addEventListener('click', resetGame);
difficulties.addEventListener('click', setDifficulty);
colorSquares.forEach(square => square.addEventListener('mouseover', hoverSquare));
colorSquares.forEach(square => square.addEventListener('mouseleave', removeHoverSquare));
colorSquares.forEach(square => square.addEventListener('click', checkGuess));

