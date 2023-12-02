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

/**
 * Takes an array of goblins and check to see if any have reached the
 * end of the game board
 * 
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {boolean} - true if any goblin has reached the end of the board, otherwise false
 */
const haveReachedEndOfBoard = (goblins : Goblin[]) : boolean =>{
  return false;
}

/**
 * moves the goblins across and down the game grid
 * If they have reached the end of the board they move down
 * if they havent they will move left or right
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {void}
 */
const updateGoblinPosition = (goblins : Goblin[]) =>{
  //Check if the end of the board is reached, if not move left or right
  //if they have, move down and change wether they move left or right for this collumn

  //if(haveReachedEndOfBoard) {
    //move all goblins down
    //change movement direction
  //}
  //else: if(moving right) move right, else move left
}


populateBoardWithGoblins(goblins);
addWizardToBoard();
