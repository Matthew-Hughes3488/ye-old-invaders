import Goblin from "./Goblin";
import Wizard from "./Wizard";
import Projectile from "./Projectile";
import GameAudio from "./GameAudio";
import gameAudioType from "./GameAudioType";

/**
 * The Game class represents the main game logic and functionality.
 */
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
        audio: new GameAudio("./src/audio/Battle-music.mp3", 0.1),
      },
      {
        name: "fireball whoosh",
        audio: new GameAudio("./src/audio/Fireball-whoosh.mp3", 0.4),
      },
      {
        name: "fireball impact",
        audio: new GameAudio("./src/audio/Fireball-impact.mp3", 0.2),
      },
      {
        name: "goblin death",
        audio: new GameAudio("./src/audio/goblin-death.mp3", 0.6),
      },
      {
        name: "defeat",
        audio: new GameAudio("./src/audio/Defeat.mp3", 0.2),
      },
      {
        name: "victory",
        audio: new GameAudio("./src/audio/Victory.mp3", 0.2),
      },
    ];

    this.wizard = new Wizard();
    this.gameBoardElement = this.getGameBoardHTML();
  }

  /**
   * Generates and returns the HTML element for the game board.
   *
   * @returns {HTMLElement} - The game board HTML element.
   */
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
   * Checks if any goblin has reached the end of the game board.
   *
   * @param {Goblin[]} goblins - An array of goblins to check.
   * @returns {boolean} - True if any goblin has reached the end of the board, otherwise false.
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
   * Moves the goblins down on the game grid.
   * Updates the goblins' positions and changes their horizontal movement direction.
   *
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
   * Moves the goblins horizontally based on their current direction.
   * If the goblins are moving right, they move to the right; if left, they move to the left.
   *
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
   * Updates the position of the goblins on the game grid.
   * If any goblin has reached the end of the board, they move down; otherwise, they move horizontally.
   *
   * @returns {void}
   */
  private updateGoblinPosition() {
    if (this.haveGoblinsReachedEndOfBoard()) {
      this.moveGoblinsDown();
    } else {
      this.moveGoblinsHorizontailly();
    }
  }

  /**
   * Handles the left movement of the wizard if it is not at the leftmost boundary.
   *
   * @returns {void}
   */
  private handleLeftWizardMovement() {
    if (this.wizard.getXCordinate() != 1) {
      this.wizard.moveLeft();
    }
  }

  /**
   * Handles the right movement of the wizard if it is not at the rightmost boundary.
   *
   * @returns {void}
   */
  private handleRightWizardMovement() {
    if (this.wizard.getXCordinate() != 8) {
      this.wizard.moveRight();
    }
  }

  /**
   * Creates a new fireball projectile at the wizard's position.
   *
   * @returns {Projectile} - The newly created fireball projectile.
   */
  private createFireball(): Projectile {
    const xValue = this.wizard.getXCordinate();
    const yValue = this.wizard.getYCordinate() - 1;
    const fireBall = new Projectile(xValue, yValue);
    this.gameBoardElement.appendChild(fireBall.element);
    return fireBall;
  }

  /**
   * Removes the specified fireball projectile from the game board.
   *
   * @param {Projectile} fireBall - The fireball projectile to be removed.
   * @returns {void}
   */
  private removeFireball(fireBall: Projectile) {
    this.gameBoardElement.removeChild(fireBall.element);
  }

  /**
   * Updates the position of the specified fireball projectile on the game board.
   * If the fireball reaches the top of the board, it is removed; otherwise, it moves upward.
   *
   * @param {Projectile} fireBall - The fireball projectile to be updated.
   * @returns {void}
   */
  private updateFireBallPosition(fireBall: Projectile) {
    if (fireBall.getYCordinate() === 1) {
      this.removeFireball(fireBall);
      this.clearFireBallAndCollisionIntervals();
    } else fireBall.moveUp();
  }

  /**
   * Manages the creation, movement, and collision checking of the fireball projectile.
   * If no fireball is currently active, it creates a new fireball and starts intervals for updating its position and checking collisions.
   *
   * @returns {void}
   */
  private manageFireball() {
    if (this.fireballUpdateIntervalId === undefined) {
      const fireBall = this.createFireball();
      this.startAudio("fireball whoosh");

      this.fireballUpdateIntervalId = setInterval(() => {
        this.updateFireBallPosition(fireBall);
      }, 250);
      this.collisionCheckerIntervalId = setInterval(() => {
        this.collisionChecker(fireBall);
      }, 100);
    }
  }

  /**
   * Clears the intervals related to fireball movement and collision checking.
   *
   * @returns {void}
   */
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

  /**
   * Destroys a goblin by removing its element from the screen, playing audio for impact and death,
   * and removing it from the array of active goblins.
   *
   * @param {Goblin} destroyedGoblin - The goblin to be destroyed.
   * @returns {void}
   */
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

  /**
   * Checks for collisions between the specified fireball projectile and active goblins.
   * If a collision is detected, the corresponding goblin is destroyed, and the fireball is removed.
   *
   * @param {Projectile} fireBall - The fireball projectile to check for collisions.
   * @returns {void}
   */
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

  /**
   * Initiates an interval to update the position of the goblins on the game grid at a regular interval.
   *
   * @returns {void}
   */
  private goblinMovementInterval() {
    this.goblinMovementIntervalId = setInterval(() => {
      this.updateGoblinPosition();
    }, 2000);
  }

  /**
   * Registers event listeners for keyboard input to control the wizard's movement and fireball creation.
   *
   * @returns {void}
   */
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

  /**
   * Checks if all goblins have been defeated, meaning the array of active goblins is empty.
   *
   * @returns {boolean} - True if all goblins are defeated, otherwise false.
   */
  private allGoblinsDead(): boolean {
    if (this.goblins.length === 0) return true;
    else return false;
  }

  /**
   * Checks if any goblin has reached the row where the wizard is located, indicating the wizard's defeat.
   *
   * @returns {boolean} - True if any goblin has reached the wizard's row, otherwise false.
   */
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

  /**
   * Checks the game state to determine if the game should be stopped.
   * If all goblins are defeated, the player wins; if any goblin reaches the wizard, the player loses.
   *
   * @returns {void}
   */
  private gameOverChecker() {
    if (this.allGoblinsDead()) {
      this.stopGame(true);
    } else if (this.goblinsDestroyedWizard()) {
      this.stopGame(false);
    }
  }

  /**
   * Initiates an interval to periodically check the game state for a game-over condition.
   * The interval determines whether the player has won or lost the game.
   *
   * @returns {void}
   */
  private gameOverInterval() {
    this.gameOverIntervalId = setInterval(() => {
      this.gameOverChecker();
    }, 1000);
  }

  /**
   * Displays a victory message on the game board when the player successfully defeats all goblins.
   * It also adds a happy wizard image to celebrate the victory.
   *
   * @returns {void}
   */
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

  /**
   * Displays a defeat message on the game board when the goblins reach the wizard.
   * It also adds a sad wizard image to convey the loss.
   *
   * @returns {void}
   */
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

  /**
   * Clears all active intervals used in the game, including fireball updates,
   * goblin movements, collision checks, and game-over checks.
   *
   * @returns {void}
   */
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

  /**
   * Clears the entire game board by removing all child elements from the game board element.
   *
   * @returns {void}
   */
  public clearGameBoard() {
    this.gameBoardElement.replaceChildren("");
  }

  /**
   * Initiates the playback of a specific audio file by name and, if provided,
   * starts an interval for continuous audio playback.
   *
   * @param {string} audioName - The name of the audio file to be played.
   * @param {number} [intervalNumber=0] - Optional. If provided, starts an interval for continuous audio playback.
   * @returns {void}
   */
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

  /**
   * Stops the playback of a specific audio file by name and clears any associated playback intervals.
   *
   * @param {string} audioName - The name of the audio file to be stopped.
   * @returns {void}
   */
  private stopAudio(audioName: string) {
    for (let i = 0; i < this.gameAudioFiles.length; i++) {
      const audioFile = this.gameAudioFiles[i];
      if (audioFile.name === audioName) {
        audioFile.audio.stopAudio();
        audioFile.audio.stopAudioInterval();
      }
    }
  }

  /**
   * Stops the playback of all audio files in the game and clears any associated playback intervals.
   *
   * @returns {void}
   */
  private stopAllAudio() {
    this.gameAudioFiles.forEach((file) => {
      file.audio.stopAudio();
    });
  }

  /**
   * Initializes and starts the game by adding the game board to the document body,
   * playing the battle theme audio, populating the board with goblins, adding the wizard to the board,
   * setting up event listeners, starting the goblin movement interval, and initiating the game over interval.
   *
   * @returns {void}
   */
  public startGame() {
    document.body.appendChild(this.gameBoardElement);
    this.startAudio("battle theme", 161000);
    this.populateBoardWithGoblins(this.goblins);
    this.addWizardToBoard();
    this.gameEventListeners();
    this.goblinMovementInterval();
    this.gameOverInterval();
  }

  /**
   * Stops the game by clearing all intervals, clearing the game board,
   * stopping the battle theme audio, and displaying a game over message based on the game outcome.
   *
   * @param {boolean} didWin - Indicates whether the player won or lost the game.
   * @returns {void}
   */
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

  /**
   * Resets the game by clearing all intervals, clearing the game board,
   * removing the game board element from the document body, reinitializing goblins,
   * setting the goblin movement direction, stopping all audio, and restarting the game.
   *
   * @returns {void}
   */
  public resetGame() {
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

    this.clearAllIntervals();
    this.clearGameBoard();
    document.body.removeChild(this.gameBoardElement);

    this.startGame();
  }
}

export default Game;
