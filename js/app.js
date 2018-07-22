//Tutorial help from  https://www.youtube.com/watch?v=_rUH-sEs68Y&feature=youtu.be with Mike Wales
//Modal styling from https://www.w3schools.com/howto/howto_css_modals.asp
//Create cards array with fa icons using concat method
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
cards = cards.concat(cards);
let stars = document.querySelectorAll('.fa-star');
let starsNumber = 3;
let timer = document.querySelector('.time');
let cardsFlipped = 0;
let movesNumber = document.querySelector('.moves');
let restart = document.querySelector('.restart');
let openCards = [];
let moves = 0;
let time;
let timeStart = false;
let seconds = 0;
let popup = document.querySelector('.popup');
let popupText = document.querySelector('.popupText');
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
//Create HTML for cards
function generateCard(card) {
	return `<li class = "card" data-card = "${card}"><i class = "fa ${card}"></i></li>`;
}
//Generate cards, shuffle them, reset timer, reset move counter, and rating
function initGame() {
	let deck = document.querySelector('.deck');
	let cardHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	moves = 0;
	movesNumber.innerText = moves;
	seconds = 0;
	timer.innerHTML = seconds;
	resetTimer();
	resetStars();
	deck.innerHTML = cardHTML.join('');
	startGame();
	popup.style.display = 'none';
	cardsFlipped = 0;
}
//Reset stars
function resetStars() {
	stars[0].style.visibility = 'visible';
	stars[1].style.visibility = 'visible';
	starsNumber = 3;
}
// Timer functions
function startTimer() {
	timeStart = true;
	time = setInterval(function() {
		timer.innerHTML = seconds;
		seconds++;
	}, 1000);
}
//Reset timer
function resetTimer() {
	clearInterval(time);
	seconds = 0;
	timer.innerHTML = seconds;
	timeStart = false;
}
// Game over modal with star rating and score 
function gameOver() {
	popup.style.display = 'block';
	if (starsNumber === 3) {
		popupText.innerHTML = ('You beat the game in ' + seconds + ' seconds! You did awesome! <i class="fa fa-thumbs-o-up"></i><br /> You got a 3 star rating <i class = "fa fa-star"></i><i class = "fa fa-star"></i><i class = "fa fa-star"></i>');
	} else if (starsNumber === 2) {
		popupText.innerHTML = ('You beat the game in ' + seconds + ' seconds. You should aim a little higher! <i class="fa fa-hand-o-up"></i><br /> You got a 2 star rating <i class = "fa fa-star"></i> <i class = "fa fa-star"></i>');
	} else {
		popupText.innerHTML = ('You beat the game in ' + seconds + ' seconds. You should try harder next time! <i class="fa fa-thumbs-o-down"></i><br /> You only got a 1 star rating <i class = "fa fa-star"></i>');
	}
};
//Game play information
function startGame() {
	//Create the cards
	let allCards = document.querySelectorAll('.card');
	allCards.forEach(function(card) {
		card.addEventListener('click', function(e) {
			//Check if card open, or matched
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				//start timer if not started
				if (timeStart === false) {
					startTimer();
				}
				//Show the cards
				card.classList.add('open', 'show');
				openCards.push(card);
				//if two cards are open, compare them
				if (openCards.length == 2) {
					if (openCards[0].dataset.card == openCards[1].dataset.card) {
						openCards[0].classList.add('match');
						openCards[1].classList.add('match');
						cardsFlipped += 2;
						openCards = [];
						//Check for game over
						if (cardsFlipped === cards.length) {
							clearInterval(time);
							gameOver();
						}
					} else {
						//Flip cards 
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show');
							});
							openCards = [];
						}, 800);
					}
					//Move counter and star rating
					moves += 1;
					movesNumber.innerText = moves;
					if (moves > 14) {
						stars[0].style.visibility = 'hidden';
						starsNumber = 2;
					}
					if (moves > 20) {
						stars[1].style.visibility = 'hidden';
						starsNumber = 1;
					}
				}
			}
		});
	});
}
initGame();
//Reset game by shuffling cards, the move counter, and time to zero
$('.restart').on('click', function() {
	initGame();
});
// Allows player to play the game again
$('.playAgain').on('click', (function() {
	$('.popup').hide();
	initGame();
}));
// Allows player to close the modal popup and view their completed game
$('.close').on('click', (function() {
	$('.popup').hide();
}));