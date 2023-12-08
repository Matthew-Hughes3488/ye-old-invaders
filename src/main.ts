import "./main.scss";
import Game from "./Game";

let gameStarted = false;
const game = new Game();

const startButton = document.querySelector(".start-button");
if (!startButton) throw new Error("Query Error");


const handleStartButtonPress = () => {
    if(!gameStarted){
        game.startGame();
        gameStarted = true;
    }
    else{
        game.resetGame();
    }
}

startButton.addEventListener("click", handleStartButtonPress);

