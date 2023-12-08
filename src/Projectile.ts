/**
 * Represents a projectile in the game.
 */
class Projectile {
  private xCordinate: number;
  private yCordinate: number;
  public element: HTMLImageElement;

  /**
   * Creates a new projectile with the specified coordinates.
   *
   * @param xValue - The initial x-coordinate of the projectile.
   * @param yValue - The initial y-coordinate of the projectile.
   */
  constructor(xValue: number, yValue: number) {
    this.xCordinate = xValue;
    this.yCordinate = yValue;
    this.element = this.getHTML();
  }

  /**
   * Gets the current y-coordinate of the projectile.
   *
   * @returns {number} The y-coordinate of the projectile.
   */
  public getYCordinate(): number {
    return this.yCordinate;
  }

  /**
   * Gets the current x-coordinate of the projectile.
   *
   * @returns {number} The x-coordinate of the projectile.
   */
  public getXCordinate(): number {
    return this.xCordinate;
  }

  /**
   * Creates an HTML element representing the projectile.
   *
   * @private
   * @returns {HTMLImageElement} The HTML element representing the projectile.
   */
  private getHTML() {
    const projectileElement = document.createElement("img");
    projectileElement.src = "./src/images/fireball.png";
    projectileElement.classList.add("game-board__fireball");
    projectileElement.style.gridColumn = `${this.xCordinate} / span 1`;
    projectileElement.style.gridRow = `${this.yCordinate} / span 1`;
    projectileElement.style.animation = "move-up-animation 2s ease-in-out";
    return projectileElement;
  }

  /**
   * Updates the projectile's HTML element with the current coordinates.
   */
  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  /**
   * Moves the projectile upward by decrementing the y-coordinate.
   */
  public moveUp() {
    this.yCordinate--;
  }
}

export default Projectile;