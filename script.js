document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cardValues = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg']; // 책 표지 대신 임시로 사용
    let selectedCards = [];
    let canFlip = true;

    // 카드 섞기 및 보드 초기화
    function initializeBoard() {
        let mixedValues = shuffle([...cardValues, ...cardValues]);
        mixedValues.forEach(value => {
            gameBoard.appendChild(createCard(value));
        });
    }

    // 카드 생성
    function createCard(value) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
    
        let cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
    
        let cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.style.backgroundImage = `url('./${value}')`; // 이미지 경로 설정
    
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        return card;
    }

    // 카드 뒤집기
    function flipCard(card) {
        if (!canFlip || card.classList.contains('is-flipped')) return;
        card.classList.add('is-flipped');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkForMatch();
        }
    }

    // 매칭 확인
    function checkForMatch() {
        canFlip = false;
        let [card1, card2] = selectedCards;

        if (card1.dataset.value === card2.dataset.value) {
            selectedCards = [];
            canFlip = true;
        } else {
            setTimeout(() => {
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                selectedCards = [];
                canFlip = true;
            }, 1000);
        }
    }

    // 배열 섞기 (Fisher-Yates Shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 게임 보드에 클릭 이벤트 리스너 추가
    gameBoard.addEventListener('click', event => {
        let clickedCard = event.target.closest('.card');
        if (clickedCard) {
            flipCard(clickedCard);
        }
    });

    initializeBoard();
});
