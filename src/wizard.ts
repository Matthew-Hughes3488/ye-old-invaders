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
    this.element.classList.add("move-right");
    this.element.classList.remove("move-left", "move-right");
  }

  public moveLeft() {
    this.xCordinate--;
    this.element.classList.add("move-left");
    this.element.classList.remove("move-left", "move-right");
  }
  
  private stopMovementAnimation() {
    this.element.classList.remove("move-left", "move-right");
  }
}

export default Wizard;
