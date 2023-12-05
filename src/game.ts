import Goblin from "./goblin";
import Wizard from "./wizard";
import Projectile from "./projectile";
import GameAudio from "./audio";
import gameAudioType from "./gameAudioType";

class Game {
  private goblins: Goblin[];
  private gameAudioFiles: gameAudioType[];
  private wizard: Wizard;
  private gameBoardElement: HTMLElement;
  private goblinMovementIntervalId?: number = undefined;
  private fireballUpdateIntervalId?: number = undefined;
  private collisionCheckerIntervalId?: number = undefined;
  private gameOverIntervalId?: number = undefined;

  constructor() {
    this.goblins = [
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

    this.gameAudioFiles = [
      {
        name: "battle theme",
        audio: new GameAudio("./src/audio/Battle-music.mp3", 0.2),
      },
      {
        name: "fireball whoosh",
        audio: new GameAudio("./src/audio/Fireball-whoosh.mp3", 0.5),
      },
      {
        name: "fireball impact",
        audio: new GameAudio("./src/audio/Fireball-impact.mp3", 0.5),
      },
      {
        name: "goblin death",
        audio: new GameAudio("./src/audio/goblin-death.mp3", 0.5),
      },
      {
        name: "defeat",
        audio: new GameAudio("./src/audio/Defeat.mp3", 0.5),
      },
      {
        name: "victory",
        audio: new GameAudio("./src/audio/Victory.mp3", 0.5),
      },
    ];

    this.wizard = new Wizard();
    this.gameBoardElement = this.getGameBoardHTML();
  }

  private getGameBoardHTML() {
    const gameBoardElement = document.createElement("section");
    gameBoardElement.classList.add("game-board");
    return gameBoardElement;
  }

  /**
   * Populates the game board with goblin elements.
   *
   * @param {Goblin[]} goblins - An array of Goblin instances.
   * @returns {void}
   */
  private populateBoardWithGoblins(goblins: Goblin[]) {
    goblins.forEach((goblin) => {
      if (this.gameBoardElement)
        this.gameBoardElement.appendChild(goblin.element);
    });
  }

  /**
   * Populates the game board with a wizard element.
   *
   * @param {Wizard} wizard - A wizard object.
   * @returns {void}
   */
  private addWizardToBoard() {
    this.gameBoardElement.appendChild(this.wizard.element);
  }

  /**
   * Takes an array of goblins and check to see if any have reached the
   * end of the game board
   *
   * @param {Goblin[]} goblins - array of goblins
   * @returns {boolean} - true if any goblin has reached the end of the board, otherwise false
   */
  private haveGoblinsReachedEndOfBoard(): boolean {
    let result = false;

    this.goblins.forEach((goblin) => {
      if (
        (goblin.getXCordinate() === 1 && Goblin.movementDirection === "left") ||
        (goblin.getXCordinate() === 8 && Goblin.movementDirection === "right")
      ) {
        result = true;
      }
    });
    return result;
  }

  /**
   * Takes an array of goblins, updates the ycoordinate for each one
   * Updates the goblins postion on the grid.
   * Updates the horizontal direction the goblins are moving in
   *
   * @param {Goblin[]} goblins - array of goblins
   * @returns {void}
   */
  private moveGoblinsDown() {
    this.goblins.forEach((goblin) => {
      goblin.moveDown();
    });

    if (Goblin.movementDirection === "right") Goblin.movementDirection = "left";
    else Goblin.movementDirection = "right";
  }

  /**
   * Takes an array of goblins, updates the x coordinate for each one
   * Depending on if they are currently moving left or right
   *
   * @param {Goblin[]} goblins - array of goblins
   * @returns {void}
   */
  private moveGoblinsHorizontailly() {
    if (Goblin.movementDirection === "right") {
      this.goblins.forEach((goblin) => {
        goblin.moveRight();
      });
    } else {
      this.goblins.forEach((goblin) => {
        goblin.moveLeft();
      });
    }
  }

  /**
   * moves the goblins across and down the game grid
   * If they have reached the end of the board they move down
   * if they havent they will move left or right
   *
   * @param {Goblin[]} goblins - array of goblins
   * @returns {void}
   */
  private updateGoblinPosition() {
    if (this.haveGoblinsReachedEndOfBoard()) {
      this.moveGoblinsDown();
    } else {
      this.moveGoblinsHorizontailly();
    }
  }

  private handleLeftWizardMovement() {
    if (this.wizard.getXCordinate() != 1) {
      this.wizard.moveLeft();
    }
  }

  private handleRightWizardMovement() {
    if (this.wizard.getXCordinate() != 8) {
      this.wizard.moveRight();
    }
  }

  private createFireball(): Projectile {
    const xValue = this.wizard.getXCordinate();
    const yValue = this.wizard.getYCordinate() - 1;
    const fireBall = new Projectile(xValue, yValue);
    this.gameBoardElement.appendChild(fireBall.element);
    return fireBall;
  }

  private removeFireball(fireBall: Projectile) {
    this.gameBoardElement.removeChild(fireBall.element);
  }

  private updateFireBallPosition(fireBall: Projectile) {
    if (fireBall.getYCordinate() === 1) {
      this.removeFireball(fireBall);
      this.clearFireBallAndCollisionIntervals();
    } else fireBall.moveUp();
  }

  private manageFireball() {
    if (this.fireballUpdateIntervalId === undefined) {
      const fireBall = this.createFireball();
      this.startAudio("fireball whoosh");

      this.fireballUpdateIntervalId = setInterval(() => {
        this.updateFireBallPosition(fireBall);
      }, 500);
      this.collisionCheckerIntervalId = setInterval(() => {
        this.collisionChecker(fireBall);
      }, 500);
    }
  }

  private clearFireBallAndCollisionIntervals() {
    if (this.fireballUpdateIntervalId !== undefined) {
      clearInterval(this.fireballUpdateIntervalId);
      this.fireballUpdateIntervalId = undefined;
    }
    if (this.collisionCheckerIntervalId !== undefined) {
      clearInterval(this.collisionCheckerIntervalId);
      this.collisionCheckerIntervalId = undefined;
    }
  }

  private destroyGoblin(destroyedGoblin: Goblin) {
    this.startAudio("fireball impact");
    this.startAudio("goblin death");
    //removed goblin element from the screen
    this.gameBoardElement.removeChild(destroyedGoblin.element);
    //remove goblin from goblins array
    this.goblins = this.goblins.filter((goblin) => {
      return !(goblin.goblinID === destroyedGoblin.goblinID);
    });
  }

  private collisionChecker(fireBall: Projectile) {
    const fireBallXCoordinate = fireBall.getXCordinate();
    const fireBallYCoordinate = fireBall.getYCordinate();

    this.goblins.forEach((goblin) => {
      if (
        goblin.getXCordinate() == fireBallXCoordinate &&
        goblin.getYCordinate() == fireBallYCoordinate
      ) {
        this.destroyGoblin(goblin);
        this.removeFireball(fireBall);
        this.clearFireBallAndCollisionIntervals();
      }
    });
  }

  private goblinMovementInterval() {
    this.goblinMovementIntervalId = setInterval(() => {
      this.updateGoblinPosition();
    }, 2000);
  }

  private gameEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        this.handleLeftWizardMovement();
      } else if (event.code === "ArrowRight") {
        this.handleRightWizardMovement();
      } else if (event.code === "Space") {
        this.manageFireball();
      }
    });
  }

  private allGoblinsDead(): boolean {
    if (this.goblins.length === 0) return true;
    else return false;
  }

  private goblinsDestroyedWizard(): boolean {
    let result = false;

    for (let i = 0; i < this.goblins.length; i++) {
      const goblin = this.goblins[i];
      if (goblin.getYCordinate() === 8) {
        result = true;
        break;
      }
    }

    return result;
  }

  private gameOverChecker() {
    if (this.allGoblinsDead()) {
      this.stopGame(true);
    } else if (this.goblinsDestroyedWizard()) {
      this.stopGame(false);
    }
  }

  private gameOverInterval() {
    this.gameOverIntervalId = setInterval(() => {
      this.gameOverChecker();
    }, 1000);
  }

  private youWinHTML() {
    const message = document.createElement("h1");
    message.classList.add("game-board__game-over-message");
    message.textContent = "Well Done, you slayed the goblin hoard";
    const image = document.createElement("img");
    image.classList.add("game-board__game-over-meme");
    image.src = "./src/images/happy-wizard.gif";

    this.gameBoardElement.appendChild(message);
    this.gameBoardElement.appendChild(image);
  }

  private youLoseHTML() {
    const message = document.createElement("h1");
    message.classList.add("game-board__game-over-message");
    message.textContent = "You failed, the city... is lost";
    const image = document.createElement("img");
    image.classList.add("game-board__game-over-meme");
    image.src = "./src/images/sad-wizard.gif";

    this.gameBoardElement.appendChild(message);
    this.gameBoardElement.appendChild(image);
  }

  private clearAllIntervals() {
    if (this.fireballUpdateIntervalId !== undefined) {
      clearInterval(this.fireballUpdateIntervalId);
      this.fireballUpdateIntervalId = undefined;
    }
    if (this.goblinMovementIntervalId !== undefined) {
      clearInterval(this.goblinMovementIntervalId);
      this.goblinMovementIntervalId = undefined;
    }
    if (this.collisionCheckerIntervalId !== undefined) {
      clearInterval(this.collisionCheckerIntervalId);
      this.collisionCheckerIntervalId = undefined;
    }
    if (this.gameOverIntervalId !== undefined) {
      clearInterval(this.gameOverIntervalId);
      this.gameOverIntervalId = undefined;
    }
  }

  public clearGameBoard() {
    this.gameBoardElement.replaceChildren("");
  }

  private startAudio(audioName: string, intervalNumber: number = 0) {
    for (let i = 0; i < this.gameAudioFiles.length; i++) {
      const audioFile = this.gameAudioFiles[i];
      if (audioFile.name === audioName) {
        audioFile.audio.playAudio();
        if (intervalNumber !== 0)
          audioFile.audio.startAudioInterval(intervalNumber);
        break;
      }
    }
  }

  private stopAudio(audioName: string) {
    for (let i = 0; i < this.gameAudioFiles.length; i++) {
      const audioFile = this.gameAudioFiles[i];
      if (audioFile.name === audioName) {
        audioFile.audio.stopAudio();
        audioFile.audio.stopAudioInterval();
      }
    }
  }

  private stopAllAudio() {
    this.gameAudioFiles.forEach((file) => {
      file.audio.stopAudio();
    });
  }

  public startGame() {
    document.body.appendChild(this.gameBoardElement);
    this.startAudio("battle theme", 161000);
    this.populateBoardWithGoblins(this.goblins);
    this.addWizardToBoard();
    this.gameEventListeners();
    this.goblinMovementInterval();
    this.gameOverInterval();
  }

  public stopGame(didWin: boolean) {
    this.clearAllIntervals();
    this.clearGameBoard();
    this.stopAudio("battle theme");

    if (didWin) {
      this.youWinHTML();
      this.startAudio("victory");
    } else {
      this.youLoseHTML();
      this.startAudio("defeat");
    }
  }

  public resetGame() {
    this.clearAllIntervals();
    this.clearGameBoard();
    document.body.removeChild(this.gameBoardElement);
    this.goblins = [
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
    Goblin.movementDirection = "right";
    this.stopAllAudio();
    this.startGame();
  }
}

export default Game;
