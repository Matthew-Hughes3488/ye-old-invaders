class Wizard {
  private xCordinate: number = 4;
  private yCordinate: number = 8;
  private isMoving: boolean = false;
  public element: HTMLImageElement;

  /**
   * Creates a new Wizard character and initializes its HTML element.
   */
  constructor() {
    this.element = this.getHTML();
  }

  /**
   * Gets the current x-coordinate of the Wizard.
   *
   * @returns {number} The x-coordinate of the Wizard.
   */
  public getXCordinate(): number {
    return this.xCordinate;
  }

  /**
   * Gets the current y-coordinate of the Wizard.
   *
   * @returns {number} The y-coordinate of the Wizard.
   */
  public getYCordinate(): number {
    return this.yCordinate;
  }

  /**
   * Updates the Wizard's HTML element with the current coordinates.
   */
  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  /**
   * Moves the Wizard to the right, triggering a rightward animation.
   */
  public moveRight() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.xCordinate++;
      this.element.style.animation = "move-right-animation 0.5s ease-in-out";
      this.animationEndListener();
    }
  }

  /**
   * Moves the Wizard to the left, triggering a leftward animation.
   */
  public moveLeft() {
    if (!this.isMoving) {
      this.xCordinate--;
      this.isMoving = true;
      this.element.style.animation = "move-left-animation 0.5s ease-in-out";
      this.animationEndListener();
    }
  }

  /**
   * Creates an HTML element representing the Wizard.
   *
   * @private
   * @returns {HTMLImageElement} The HTML element representing the Wizard.
   */
  private getHTML() {
    const wizardElement = document.createElement("img");
    wizardElement.src = "./src/images/wizard.png";
    wizardElement.classList.add("game-board__player-character");
    wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
    wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
    return wizardElement;
  }

  /**
   * Adds an event listener to the animation end event to handle the end of movement animation.
   *
   * @private
   */
  private animationEndListener() {
    this.element.addEventListener(
      "animationend",
      () => {
        this.stopMovementAnimation();
        this.updateCordinates();
        this.isMoving = false;
      },
      { once: true }
    );
  }

  /**
   * Stops the movement animation of the Wizard.
   *
   * @private
   */
  private stopMovementAnimation() {
    this.element.style.animation = "none";
  }
}

export default Wizard;
