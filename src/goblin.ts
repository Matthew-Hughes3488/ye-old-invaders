/**
 * Represents a Goblin in the game.
 */
class Goblin {
  private static numOfGoblins = 1;
  private xCordinate: number;
  private yCordinate: number;
  public goblinID: number;
  public element: HTMLImageElement;
  public static movementDirection: string = "right";

  /**
   * Creates a new Goblin with the specified coordinates.
   *
   * @param xValue - The initial x-coordinate of the Goblin.
   * @param yValue - The initial y-coordinate of the Goblin.
   */
  constructor(xValue: number, yValue: number) {
    this.xCordinate = xValue;
    this.yCordinate = yValue;
    this.goblinID = Goblin.numOfGoblins;
    this.element = this.getHTML();
  }
  
  /**
   * Gets the current x-coordinate of the Goblin.
   *
   * @returns The x-coordinate of the Goblin.
   */
  public getXCordinate(): number {
    return this.xCordinate;
  }

  /**
   * Gets the current y-coordinate of the Goblin.
   *
   * @returns The y-coordinate of the Goblin.
   */
  public getYCordinate(): number {
    return this.yCordinate;
  }

  /**
   * Creates an HTML element representing the Goblin.
   *
   * @private
   * @returns {HTMLImageElement} The HTML element representing the Goblin.
   */
  private getHTML() {
    const goblinElement = document.createElement("img");
    goblinElement.src = "./src/images/goblin.png";
    goblinElement.classList.add("game-board__goblin");
    goblinElement.classList.add(`game-board--goblin-${Goblin.numOfGoblins++}`);
    goblinElement.style.gridColumn = `${this.xCordinate} / span 1`;
    goblinElement.style.gridRow = `${this.yCordinate} / span 1`;
    return goblinElement;
  }

  /**
   * Updates the Goblin's HTML element with the current coordinates.
   */
  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  /**
   * Moves the Goblin down by incrementing the y-coordinate.
   */
  public moveDown() {
    this.yCordinate++;
    this.updateCordinates();
  }

  /**
   * Moves the Goblin right by incrementing the x-coordinate.
   */
  public moveRight() {
    this.xCordinate++;
    this.updateCordinates();
  }

  /**
   * Moves the Goblin left by decrementing the x-coordinate.
   */
  public moveLeft() {
    this.xCordinate--;
    this.updateCordinates();
  }
}

export default Goblin;
