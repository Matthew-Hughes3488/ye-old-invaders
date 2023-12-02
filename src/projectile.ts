class Projectile {
    private xCordinate: number;
    private yCordinate: number;
    public projectileElement : HTMLImageElement

    constructor(xValue : number, yValue: number){
        this.xCordinate = xValue;
        this.yCordinate = yValue;
        this.projectileElement = this.getProjectileHTML();
    }
    public getProjectileHTML() {
        const projectileElement = document.createElement("img");
        projectileElement.src = "./src/images/fireball.jpg";
        projectileElement.classList.add("game-board__fireball");
        projectileElement.style.gridColumn = `${this.xCordinate} / span 1`;
        projectileElement.style.gridRow = `${this.yCordinate} / span 1`;
        return projectileElement;
      }
}