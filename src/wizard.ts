class Wizard{
    private xCordinate : number = 4
    private yCordinate : number = 8
    public wizardElement : HTMLImageElement;

    constructor(){
        this.wizardElement = this.getWizardHTML();
    }

    public getWizardHTML(){
        const wizardElement = document.createElement("img");
        wizardElement.src = "./src/images/wizard.png"
        wizardElement.classList.add("game-board__player-character");
        wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
        wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
        return wizardElement;
    }

    public moveRight(){
        this.xCordinate++;
    }

    public moveLeft(){
        this.xCordinate--;
    }
}

export default Wizard;