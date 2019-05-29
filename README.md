# rgbColorGame
RGB Color Game with JS 

Welcome to my RGB Color Game! 

This game is built on the simple premise of guessing which color a combination red, green, and blue LED pixel values represents.
For instance the value `RGB(255, 0, 0)` corresponds to the maximum value of the red pixel LED and the minimum for green and blue. 
The idea for this came from a project I saw on twitter - however all the code is purely my own.


+ 
+ The game keeps track of your wins, losses, and guess percentage in a global `stats` object and displays the information in the <nav> bar. 
+ Hovering over a color in the pallete applies a psuedo-class to the DOM element that applies a 1.07 scale transformation. 
