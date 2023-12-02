class Wizard{
    private xCordinate : number = 4
    private yCordinate : number = 8

    public getWizardHTML(){
        const wizardElement = document.createElement("img");
        wizardElement.src = "./src/images/wizard.png"
        wizardElement.classList.add("game-board__wizard");
        wizardElement.style.gridColumn = `${this.xCordinate} / span 1`;
        wizardElement.style.gridRow = `${this.yCordinate} / span 1`;
        return wizardElement;
    }
}

export default Wizard;