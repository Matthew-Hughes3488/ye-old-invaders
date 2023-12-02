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

const wizard = new Wizard()

const gameBoard = document.querySelector(".game-board");
if (!gameBoard) throw new Error("Query error");

/**
 * Populates the game board with goblin elements.
 *
 * @param {Goblin[]} goblins - An array of Goblin instances.
 * @returns {void}
 */
const populateBoardWithGoblins = (goblins: Goblin[]) => {
  goblins.forEach(goblin =>{
    gameBoard.appendChild(goblin.goblinElement)
  })
};

/**
 * Populates the game board with a wizard element.
 *
 * @param {Wizard} wizard - A wizard object.
 * @returns {void}
 */
const addWizardToBoard = () => {
  gameBoard.appendChild(wizard.wizardElement)
};

populateBoardWithGoblins(goblins);
addWizardToBoard();
