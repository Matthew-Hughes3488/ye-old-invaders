class Goblin {
  private static numOfGoblins = 1;
  private xCordinate: number;
  private yCordinate: number;
  public goblinID: number
  public element: HTMLImageElement;
  public static movementDirection: string = "right";

  constructor(xValue: number, yValue: number) {
    this.xCordinate = xValue;
    this.yCordinate = yValue;
    this.goblinID = Goblin.numOfGoblins;
    this.element = this.getHTML();
  }

  public getXCordinate(): number {
    return this.xCordinate;
  }

  public getYCordinate(): number {
    return this.yCordinate;
  }

  private getHTML() {
    const goblinElement = document.createElement("img");
    goblinElement.src = "./src/images/goblin.png";
    goblinElement.classList.add("game-board__goblin");
    goblinElement.classList.add(`game-board--goblin-${Goblin.numOfGoblins++}`);
    goblinElement.style.gridColumn = `${this.xCordinate} / span 1`;
    goblinElement.style.gridRow = `${this.yCordinate} / span 1`;
    return goblinElement;
  }

  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  public moveDown() {
    this.yCordinate++;
    this.updateCordinates();
  }

  public moveRight() {
    this.xCordinate++;
    this.updateCordinates();
  }

  public moveLeft() {
    this.xCordinate--;
    this.updateCordinates();
  }
}

export default Goblin;
