const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

// link text
playerLivesCount.textContent = playerLives;

// generate data
const getData = () => [
    { imgSrc: "./images/durk2.jpeg", name: "durk2 "},
    { imgSrc: "./images/views.jpeg", name: "durk22 "},
    { imgSrc: "./images/scorpion.jpeg", name: "durk222 "},
    { imgSrc: "./images/morelife.jpeg", name: "durk2 "},
    { imgSrc: "./images/nwts.jpeg", name: "durk22 "},
    { imgSrc: "./images/durk2.jpeg", name: "durk222 "},
    { imgSrc: "./images/views.jpeg", name: "durk2222 "},
    { imgSrc: "./images/scorpion.jpeg", name: "durk2222 "},
    { imgSrc: "./images/morelife.jpeg", name: "durk "},
    { imgSrc: "./images/nwts.jpeg", name: "durk "},
];

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;

};

//Card Generator function
const cardGenerator = () => {
    const cardData = randomize();
    //Genereate the HTML
    cardData.forEach((item,) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach the info to the cards
        face.src = item.imgSrc;
       card.setAttribute("name", item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });     
    });
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");

    //Logic
    if(flippedCards.length === 2) {
        if(
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
         ){
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("Wrong");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
               setTimeout(() => card.classList.remove("toggleCard"),1000);
            });
            //lives controlls
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart(" try again");
            }
         }

        }
        //Run a check to see if we won the game
        if(toggleCard.length === 16 ) {
            restart("You won the game");
        };
};

//restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents="none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //Randomzie
        setTimeout(() => {
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents="all";
        }, 1000);
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();





 