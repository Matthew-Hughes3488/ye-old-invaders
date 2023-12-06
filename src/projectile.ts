class Projectile {
  private xCordinate: number;
  private yCordinate: number;
  public element: HTMLImageElement;

  constructor(xValue: number, yValue: number) {
    this.xCordinate = xValue;
    this.yCordinate = yValue;
    this.element = this.getHTML();
  }

  public getYCordinate(): number {
    return this.yCordinate;
  }

  public getXCordinate(): number {
    return this.xCordinate;
  }

  private getHTML() {
    const projectileElement = document.createElement("img");
    projectileElement.src = "./src/images/fireball.png";
    projectileElement.classList.add("game-board__fireball");
    //projectileElement.style.transform = "rotate(180deg)";
    projectileElement.style.gridColumn = `${this.xCordinate} / span 1`;
    projectileElement.style.gridRow = `${this.yCordinate} / span 1`;
    projectileElement.style.animation= "move-up-animation 2s ease-in-out";
    return projectileElement;
  }

  public updateCordinates() {
    this.element.style.gridColumn = `${this.xCordinate} / span 1`;
    this.element.style.gridRow = `${this.yCordinate} / span 1`;
  }

  public moveUp() {
      this.yCordinate--;
  }
}

export default Projectile;
