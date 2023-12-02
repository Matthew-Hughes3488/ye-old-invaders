class Projectile {
  private xCordinate: number;
  private yCordinate: number;
  public projectileElement: HTMLImageElement;

  constructor(xValue: number, yValue: number) {
    this.xCordinate = xValue;
    this.yCordinate = yValue;
    this.projectileElement = this.getProjectileHTML();
  }

  public getYCordinate(): number {
    return this.yCordinate;
  }

  private getProjectileHTML() {
    const projectileElement = document.createElement("img");
    projectileElement.src = "./src/images/fireball.png";
    projectileElement.classList.add("game-board__fireball");
    projectileElement.style.transform = "rotate(180deg)";
    projectileElement.style.gridColumn = `${this.xCordinate} / span 1`;
    projectileElement.style.gridRow = `${this.yCordinate} / span 1`;
    return projectileElement;
  }

  public updateProjectileCordinates() {
    this.projectileElement.style.gridColumn = `${this.xCordinate} / span 1`;
    this.projectileElement.style.gridRow = `${this.yCordinate} / span 1`;
  }

  public moveUp() {
    this.yCordinate--;
    this.updateProjectileCordinates();
  }
}

export default Projectile;
