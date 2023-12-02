import "./main.scss";
import Goblin from "./goblin";
import Wizard from "./wizard";

const goblins : Goblin[] = [
    new Goblin(1, 1),
    new Goblin(1, 2),
    new Goblin(1, 3),
    new Goblin(1, 4),
    new Goblin(1, 5),
    new Goblin(2, 1),
    new Goblin(2, 2),
    new Goblin(2, 3),
    new Goblin(2, 4),
    new Goblin(2, 5)
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

const getGoblinHTML = (goblinIdNumber: number) => {
  return `<img class="game-board__goblin game-board--goblin-${goblinIdNumber}" src="./src/images/goblin.png" alt="">`;
};

const populateBoardWithGoblins = (numberOfGoblins: number) => {
  for (let i = 1; i <= numberOfGoblins; i++) {
    gameBoard.innerHTML += getGoblinHTML(i);
  }
};

const addWizardToBoard = () => {
  gameBoard.innerHTML += `<img class="game-board__player-character" src="./src/images/wizard.png" alt="">`;
};

populateBoardWithGoblins(10);
addWizardToBoard();
