class Wizard {
  private xCordinate: number = 4;
  private yCordinate: number = 8;
  public element: HTMLImageElement;

  constructor() {
    this.element = this.getHTML();
  }

  public getXCordinate(): number {
    return this.xCordinate;
  }

  public getYCordinate(): number {
    return this.yCordinate;
  }

  private getHTML() {
    const wizardElement = document.createElement("img");
    wizardElement.src = "./src/images/wizard.png";
    wizardElement.classList.add("game-board__player-character");
    wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
    wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
    return wizardElement;
  }

  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  public moveRight() {
    this.xCordinate++;
    this.element.style.animation = "move-right-animation 0.5s ease-in-out";
    this.element.addEventListener("animationend", () => {
      this.stopMovementAnimation();
      this.updateCordinates();
    }, { once: true });
  }

  public moveLeft() {
    this.xCordinate--;
    this.element.style.animation = "move-left-animation 0.5s ease-in-out";
    this.element.addEventListener("animationend", () => {
      this.stopMovementAnimation();
      this.updateCordinates();
    }, { once: true });
  }
  
  private stopMovementAnimation() {
    this.element.style.animation = "none";
  }
}

export default Wizard;
