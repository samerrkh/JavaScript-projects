class MemoryGame {
    constructor() {
        this.gameBoard = []; // 2D array to represent the state of the game board
        this.stepsCounter = 0; // counter for the number of steps taken
        this.pairsCounter = 0; // counter for the number of pairs found
        this.firstSelectedSquare = null; // coordinates of the first selected square
    }

    // function to initialize the game
    init() {
        // create the game board and mix up the images
        this.gameBoard = this.createAndMixBoard();
        this.stepsCounter = 0;
        this.pairsCounter = 0;

        // attach event listeners to the squares and the new game button
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', this.handleSquareClick.bind(this));
        });
        document.getElementById('new-game-button').addEventListener('click', this.handleNewGameButtonClick.bind(this));
    }

    // function to create and mix up the game board
    createAndMixBoard() {
        // Create a 2D array to represent the game board
        let board = [];
        for (let i = 0; i < 6; i++) {
            board[i] = [];
            for (let j = 0; j < 5; j++) {
                board[i][j] = 0;
            }
        }
            // Create a 1D array to hold the images
            let images = ['./images/1.jpeg',
                './images/2.jpeg',
                './images/3.jpeg',
                './images/4.jpeg',
                './images/5.jpeg',
                './images/6.jpeg',
                './images/7.jpeg',
                './images/8.jpeg',
                './images/9.jpeg',
                './images/10.jpeg',
                // './images/11.jpeg',
                // './images/12.jpeg',
                // './images/13.jpeg',
                // './images/14.jpeg',
                // './images/15.jpeg',
                './images/1.jpeg',
                './images/2.jpeg',
                './images/3.jpeg',
                './images/4.jpeg',
                './images/5.jpeg',
                './images/6.jpeg',
                './images/7.jpeg',
                './images/8.jpeg',
                './images/9.jpeg',
                './images/10.jpeg',
                // './images/11.jpeg',
                // './images/12.jpeg',
                // './images/13.jpeg',
                // './images/14.jpeg',
                // './images/15.jpeg',
            ];
    
            // Randomly assign the images to the squares
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    let randomIndex = Math.floor(Math.random() * images.length);
                    board[i][j] = images[randomIndex];
                    images.splice(randomIndex, 1);
                }
            }
            let pairs = board.length * board[0].length / 2;
            return board.slice(0, pairs);
        }
    
        handleSquareClick(event) {
            let square = event.target;
            let x = parseInt(square.dataset.x);
            let y = parseInt(square.dataset.y);
    
            // check if the square is already revealed or not
            if (!square.classList.contains('revealed') && !square.classList.contains('match')) {
                // increment the steps counter
                this.stepsCounter++;
    
                // reveal the square
                square.classList.add('revealed');
                square.style.backgroundImage = `url(${this.gameBoard[x][y]})`;
                square.style.backgroundSize = "cover";
    
                // check if it's the first square selected
                if (!this.firstSelectedSquare) {
                    this.firstSelectedSquare = { x, y };
                } else {
                    // check if the two selected squares match
                    if (this.gameBoard[x][y] === this.gameBoard[this.firstSelectedSquare.x][this.firstSelectedSquare.y]) {
                    // increment the pairs counter
                    this.pairsCounter++;
                    square.classList.add('match');
                    document.querySelector(`.card[data-x="${this.firstSelectedSquare.x}"][data-y="${this.firstSelectedSquare.y}"]`).classList.add('match');
                    if (this.pairsCounter === 15) {
                        alert('You won!');
                    }
                } else {
                    // hide the squares after 1 sec
                    let selectedSquare = document.querySelector(`.card[data-x="${this.firstSelectedSquare.x}"][data-y="${this.firstSelectedSquare.y}"]`);
                    if(!selectedSquare.classList.contains('match')) {
                        setTimeout(() => {
                            square.classList.remove('revealed');
                            square.style.backgroundImage = '';
                            selectedSquare.classList.remove('revealed');
                            selectedSquare.style.backgroundImage = '';
                        }, 1000);
                    }
                }

                // reset the first selected square
                this.firstSelectedSquare = null;
                document.getElementById("steps-counter").innerHTML = this.stepsCounter;
                document.getElementById("pairs-counter").innerHTML = this.pairsCounter;
            }
        }
    }

    handleNewGameButtonClick() {
        this.gameBoard = this.createAndMixBoard();
        this.stepsCounter = 0;
        this.pairsCounter = 0;
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('revealed', 'match');
            card.style.backgroundImage = '';
        });
        document.getElementById("steps-counter").innerHTML = this.stepsCounter;
        document.getElementById("pairs-counter").innerHTML = this.pairsCounter;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const memoryGame = new MemoryGame();
    memoryGame.init();
  });