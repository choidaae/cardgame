document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    const overlay = document.getElementById('overlay');
    const cardValues = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg'];
    let selectedCards = [];
    let canFlip = false;
    let countdownTimer;
    let matchedCount = 0;
    const totalPairs = cardValues.length;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(value) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
    
        let cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
    
        let cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.style.backgroundImage = `url('./${value}')`;
    
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        return card;
    }

    function flipCard(card) {
        if (!canFlip || card.classList.contains('is-flipped')) return;
        card.classList.add('is-flipped');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        let [card1, card2] = selectedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matchedCount++;
            selectedCards = [];
            if (matchedCount === totalPairs) {
                clearInterval(countdownTimer);
                Swal.fire({
                    icon: 'success',
                    title: '게임 성공!',
                    toast: true,
                    showConfirmButton: false
                });
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                selectedCards = [];
            }, 800);
        }
        canFlip = false;
        setTimeout(() => {
            canFlip = true;
        }, 1000);
    }

    function startCountdown(duration) {
        let timer = duration, minutes, seconds;
        countdownTimer = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdownElement.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(countdownTimer);
                canFlip = false;
                Swal.fire({
                    icon: 'error',
                    title: '아쉬워요!',
                    toast: true,
                    showConfirmButton: false
                });
            }
        }, 1000);
    }

    function initializeBoard() {
        let mixedValues = shuffle([...cardValues, ...cardValues]);
        mixedValues.forEach(value => {
            gameBoard.appendChild(createCard(value));
        });
    }

    gameBoard.addEventListener('click', event => {
        let clickedCard = event.target.closest('.card');
        if (clickedCard) {
            flipCard(clickedCard);
        }
    });

    startButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        startCountdown(60); // 1분 00초 (60초) 카운트다운
        canFlip = true;
    });

    initializeBoard();
});
