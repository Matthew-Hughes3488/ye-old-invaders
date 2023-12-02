import "./main.scss";
import Goblin from "./goblin";
import Wizard from "./wizard";
import Projectile from "./projectile";

const goblins: Goblin[] = [
  new Goblin(1, 1),
  new Goblin(2, 1),
  new Goblin(3, 1),
  new Goblin(4, 1),
  new Goblin(5, 1),
  new Goblin(1, 2),
  new Goblin(2, 2),
  new Goblin(3, 2),
  new Goblin(4, 2),
  new Goblin(5, 2),
];

const wizard = new Wizard();

const gameBoard = document.querySelector(".game-board");
if (!gameBoard) throw new Error("Query error");

/**
 * Populates the game board with goblin elements.
 *
 * @param {Goblin[]} goblins - An array of Goblin instances.
 * @returns {void}
 */
const populateBoardWithGoblins = (goblins: Goblin[]) => {
  goblins.forEach((goblin) => {
    gameBoard.appendChild(goblin.element);
  });
};

/**
 * Populates the game board with a wizard element.
 *
 * @param {Wizard} wizard - A wizard object.
 * @returns {void}
 */
const addWizardToBoard = () => {
  gameBoard.appendChild(wizard.element);
};

/**
 * Takes an array of goblins and check to see if any have reached the
 * end of the game board
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {boolean} - true if any goblin has reached the end of the board, otherwise false
 */
const haveReachedEndOfBoard = (goblins: Goblin[]): boolean => {
  let result = false;

  goblins.forEach((goblin) => {
    if (
      (goblin.getXCordinate() === 1 && Goblin.movementDirection === "left") ||
      (goblin.getXCordinate() === 8 && Goblin.movementDirection === "right")
    ) {
      result = true;
    }
  });
  return result;
};

/**
 * Takes an array of goblins, updates the ycoordinate for each one
 * Updates the goblins postion on the grid.
 * Updates the horizontal direction the goblins are moving in
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {void}
 */
const moveGoblinsDown = (goblins: Goblin[]) => {
  goblins.forEach((goblin) => {
    goblin.moveDown();
  });

  if (Goblin.movementDirection === "right") Goblin.movementDirection = "left";
  else Goblin.movementDirection = "right";
};

/**
 * Takes an array of goblins, updates the x coordinate for each one
 * Depending on if they are currently moving left or right
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {void}
 */
const moveGoblinsHorizontailly = (goblins: Goblin[]) => {
  if (Goblin.movementDirection === "right") {
    goblins.forEach((goblin) => {
      goblin.moveRight();
    });
  } else {
    goblins.forEach((goblin) => {
      goblin.moveLeft();
    });
  }
};

/**
 * moves the goblins across and down the game grid
 * If they have reached the end of the board they move down
 * if they havent they will move left or right
 *
 * @param {Goblin[]} goblins - array of goblins
 * @returns {void}
 */
const updateGoblinPosition = (goblins: Goblin[]) => {
  console.log(haveReachedEndOfBoard(goblins));

  if (haveReachedEndOfBoard(goblins)) {
    moveGoblinsDown(goblins);
  } else {
    moveGoblinsHorizontailly(goblins);
  }
};

populateBoardWithGoblins(goblins);
addWizardToBoard();

setInterval(() => {
  updateGoblinPosition(goblins);
}, 5000);

const handleLeftWizardMovement = () => {
  if (wizard.getXCordinate() != 1) {
    wizard.moveLeft();
  }
};

const handleRightWizardMovement = () => {
  if (wizard.getXCordinate() != 8) {
    wizard.moveRight();
  }
};

const createFireball = (): Projectile => {
  const xValue = wizard.getXCordinate();
  const yValue = wizard.getYCordinate() - 1;
  const fireBall = new Projectile(xValue, yValue);
  gameBoard.appendChild(fireBall.element);
  return fireBall;
};

const removeFireball = (fireBall : Projectile) =>{
  gameBoard.removeChild(fireBall.element)
}

const updateFireBallPosition = (fireBall: Projectile) => {
  if(fireBall.getYCordinate() === 1)
    removeFireball(fireBall);
  fireBall.moveUp();
};

const manageFireball = () => {
  const fireBall = createFireball();

  setInterval(() => {
    updateFireBallPosition(fireBall);
  }, 500);
};

// Event lister for when the player wanst to move the wizard character
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    handleLeftWizardMovement();
  } else if (event.code === "ArrowRight") {
    handleRightWizardMovement();
  } else if (event.code === "Space") {
    console.log("space bar was pressed");
    //Function to create and move the projectile
    manageFireball();
  }
});
