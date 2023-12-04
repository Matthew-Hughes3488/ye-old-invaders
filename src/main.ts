import "./main.scss";
import Game from "./game";
import GameAudio from "./audio";

const startButton = document.querySelector(".start-button");
if (!startButton) throw new Error("ssd");

let game : Game;




const handleStartButtonPress = () => {
    if(!game){
        game = new Game();
        game.startGame();
    }
}

startButton.addEventListener("click", handleStartButtonPress);

