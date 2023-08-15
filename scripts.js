const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.champion === secondCard.dataset.champion) {
    disableCardClicking();
  } else {
    unflipCard();
  }
}

function disableCardClicking() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}
function unflipCard() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1500);
}
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function suffle() {
  cards.forEach((cards) => {
    let randomNum = Math.floor(Math.random() * 12);
    cards.style.order = randomNum;
  });
})();

function disableCardClicking() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  if (document.querySelectorAll(".memory-card:not(.flip)").length === 0) {
    const winModal = document.getElementById("winModal");
    winModal.style.display = "block";

    const playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.addEventListener("click", () => {
      resetGame();
      winModal.style.display = "none";
    });

    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", () => {
      winModal.style.display = "none";
    });
  }
}
function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
}

cards.forEach((cards) => cards.addEventListener("click", flipCard));
