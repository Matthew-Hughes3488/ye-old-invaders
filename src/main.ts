import "./main.scss";
import Game from "./game";
import GameAudio from "./audio";

const startButton = document.querySelector(".start-button");
if (!startButton) throw new Error("ssd");

const game = new Game();
game.startGame();

