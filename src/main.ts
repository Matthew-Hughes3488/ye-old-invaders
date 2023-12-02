import "./main.scss";
import Goblin from "./goblin";
import Wizard from "./wizard";

const goblins : Goblin[] = [
    new Goblin(1, 1),
    new Goblin(2, 1),
    new Goblin(3, 1),
    new Goblin(4, 1),
    new Goblin(5, 1),
    new Goblin(1, 2),
    new Goblin(2, 2),
    new Goblin(3, 2),
    new Goblin(4, 2),
    new Goblin(5, 2)
]

/* Generate goblins feature
    function to get goblin HTML
    DOM to get game board
    function to populate the board with x goblins
    will update in the future to create goblin objects
    and place them on the board based on the x and y attributes 
    */

const gameBoard = document.querySelector(".game-board");
if (!gameBoard) throw new Error("Query error");

const populateBoardWithGoblins = (goblins: Goblin[]) => {
  goblins.forEach(goblin =>{
    gameBoard.appendChild(goblin.getGoblinHTML())
  })
};

const addWizardToBoard = () => {
  gameBoard.innerHTML += `<img class="game-board__player-character" src="./src/images/wizard.png" alt="">`;
};

populateBoardWithGoblins(goblins);
addWizardToBoard();
