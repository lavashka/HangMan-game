const buttons = document.querySelectorAll('.btn');
const guessDisplay = document.querySelector('.guess');
const message = document.createElement('p');
const hangmanImageContainer = document.getElementById('hangman-image-container');
let hangmanImage = document.getElementById('hangman-image');

const carBrands = ["TOYOTA", "FORD", "BMW", "HONDA", "AUDI", "MERCEDES", "VOLKSWAGEN", "NISSAN", "CHEVROLET", "HYUNDAI"];

const randomIndex = Math.floor(Math.random() * carBrands.length);
let selectedCarBrand = carBrands[randomIndex];

console.log(selectedCarBrand);

let guesses = [];
for (let i = 0; i < selectedCarBrand.length; i++) {
    guesses.push("_");
}

updateGuessDisplay();

let incorrectGuessCount = 0; 
const maxIncorrectGuesses = 6;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const letter = button.textContent;
        if (selectedCarBrand.includes(letter)) {
            for (let i = 0; i < selectedCarBrand.length; i++) {
                if (selectedCarBrand[i] === letter) {
                    guesses[i] = letter;
                }
            }
            updateGuessDisplay();
            if (!guesses.includes('_')) {
                showResultMessage(true);
            }   
        } else {
            incorrectGuessCount++;
            updateHangmanImage(); 
            if (incorrectGuessCount >= maxIncorrectGuesses) { 
                showResultMessage(false);
            }
        }
    });
});
 


function updateGuessDisplay() {
    guessDisplay.textContent = guesses.join(" ");
}

function showResultMessage(isWin) {
    message.textContent = isWin ? "You win!" : "You lose!";
    message.style.color = isWin ? "green" : "red";
    document.body.appendChild(message);
}

function updateHangmanImage() {
    if (!hangmanImage) {
        hangmanImage = document.createElement('img');
        hangmanImage.id = 'hangman-image';
        hangmanImage.src = 'images/hangman-1.svg';
        hangmanImageContainer.appendChild(hangmanImage);
    } else {
        let currentStage = parseInt(hangmanImage.src.substr(-5, 1)); 
        
        if (currentStage < 6) {
            currentStage++;
            hangmanImage.src = `images/hangman-${currentStage}.svg`;
        }
    }
}
