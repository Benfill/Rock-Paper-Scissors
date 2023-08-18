let result = '';
let computerMove = '';
let randomNumber;
let jsScore = document.querySelector('.js-score');
let gameScore = JSON.parse(localStorage.getItem('gameScore')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
const rockElm = document.querySelector('.js-rock')
    .addEventListener('click', () => {
        gamePlay('rock');
    });

const paperElm = document.querySelector('.js-paper')
    .addEventListener('click', () => {
        gamePlay('paper');
    });
    
    const scissorsElm = document.querySelector('.js-scissors')
    .addEventListener('click', () => {
        gamePlay('scissors');
    });
    
    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r')
        gamePlay('rock');
        else if (event.key === 'p')
        gamePlay('paper');
        else if (event.key === 's')
        gamePlay('scissors');
        else if (event.key === ' ') {
            reset();
            jsScore.innerHTML = `<p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>`;
        }
    });

    
    const resetElm = document.querySelector('.js-reset')
    .addEventListener('click', () => {
        if (gameScore.wins != 0 || gameScore.ties != 0 || gameScore.loses != 0) {
            document.querySelector('.areUSure')
            .innerHTML = `Are You Sure!
            <button class="js-yes">Yes</button>
            <button class="js-no">No</button>`;
        }
        const yesElm = document.querySelector('.js-yes')
            .addEventListener('click', () => {
                reset();
                jsScore.innerHTML = `<p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>`;
                document.querySelector('.areUSure')
                    .innerHTML = '';
                
            });
        
        const NoElm = document.querySelector('.js-no')
            .addEventListener('click', () => {
                document.querySelector('.areUSure')
                    .innerHTML = '';
            });
    });

    jsScore.innerHTML = `<p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>`;
    
    
    function reset() {
        if (gameScore.loses != 0 || gameScore.ties != 0 || gameScore.wins != 0) {
            gameScore.wins = 0;
            gameScore.loses = 0;
            gameScore.ties = 0;
        }
        localStorage.removeItem('gameScore');
    }
    
    function gamePlay(playerMove) {

    pickComputerMove();

    if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'Tie';
            gameScore.ties++;
        } else if (computerMove === 'paper') {
            result = 'You Lose';
            gameScore.loses++;
        } else if (computerMove === 'scissors') {
            result = 'You Win';
            gameScore.wins++;
        }

    } else if (playerMove == 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win!';
            gameScore.wins++;
        } else if (computerMove === 'paper') {
            result = 'Tie';
            gameScore.ties++;
        } else if (computerMove === 'scissors') {
            result = 'You Lose!';
            gameScore.loses++;
        }

    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose!';
            gameScore.loses++;
        } else if (computerMove === 'paper') {
            result = 'You Win!';
            gameScore.wins++;
        } else if (computerMove === 'scissors') {
            result = 'Tie';
            gameScore.ties++;
        }

    }

    jsScore.innerHTML = `<p class="result">${result}</p>

                <p class="moves">You <img class="emoji" src="images/${playerMove}-emoji.png" alt="">
                    <img src="images/${computerMove}-emoji.png" class="emoji" alt="">
                    Computer
                </p>
                <p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>`;

    if (gameScore.wins === 5) {
        jsScore.innerHTML = `<p class="result">You Win</p>
                <p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>
                `;
        reset();
    } else if (gameScore.loses === 5) {
        jsScore.innerHTML = `<p class="result">You Lose</p>
                <p class="js-score moves">Wins: ${gameScore.wins}, Losses: ${gameScore.loses}, Ties: ${gameScore.ties}</p>
                `;
        reset();
    }


    localStorage.setItem('gameScore', JSON.stringify(gameScore));
}

function pickComputerMove() {
    randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
}

let autoPlayvar;
let autoPlayChecker = false;
const autoPlayElm = document.querySelector('.js-autoPlay');
autoPlayElm.addEventListener('click', () => {
    autoPlay();
    onPlay();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
        onPlay();
    }
});

function autoPlay() {
    if (!autoPlayChecker) {
        autoPlayvar = setInterval(() => {
            let randomNumber = Math.random();
            if (randomNumber >= 0 && randomNumber < 1 / 3) {
                gamePlay('rock');
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                gamePlay('paper');
            } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
                gamePlay('scissors');
            }
        }, 1000);
    } else {
        clearInterval(autoPlayvar);
    }
    autoPlayChecker = !autoPlayChecker;
}

onPlay = () => {
    if (!autoPlayChecker) {
        autoPlayElm.innerHTML = 'Auto Play';
    } else
        autoPlayElm.innerHTML = 'Stop Playing ';
}


