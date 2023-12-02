class Wizard {
  private xCordinate: number = 4;
  private yCordinate: number = 8;
  public wizardElement: HTMLImageElement;

  constructor() {
    this.wizardElement = this.getWizardHTML();
  }

  public getXCordinate(): number {
    return this.xCordinate;
  }

  public getYCordinate(): number {
    return this.yCordinate;
  }

  public getWizardHTML() {
    const wizardElement = document.createElement("img");
    wizardElement.src = "./src/images/wizard.png";
    wizardElement.classList.add("game-board__player-character");
    wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
    wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
    return wizardElement;
  }

  public updateWizardCordinates() {
    this.wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
    this.wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
  }

  public moveRight() {
    this.xCordinate++;
    this.updateWizardCordinates();
  }

  public moveLeft() {
    this.xCordinate--;
    this.updateWizardCordinates();
  }
}

export default Wizard;
