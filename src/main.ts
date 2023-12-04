import "./main.scss";
import Game from "./game";
import GameAudio from "./audio";

const startButton = document.querySelector(".start-button");
if (!startButton) throw new Error("ssd");

let gameStarted = false;
const game = new Game();

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

