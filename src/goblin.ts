class Goblin{
    private xCordinate : number
    private yCordinate : number
    private static numOfGoblins = 1;

    constructor(xValue : number, yValue : number) {
        this.xCordinate = xValue;
        this.yCordinate = yValue;
    }

    public getGoblinHTML(){
        const goblinElement = document.createElement("img");
        goblinElement.src = "./src/images/goblin.png"
        goblinElement.classList.add("game-board__goblin");
        goblinElement.classList.add(`game-board--goblin-${Goblin.numOfGoblins++}`);
        goblinElement.style.gridColumn = `${this.xCordinate} / span 1`;
        goblinElement.style.gridRow = `${this.yCordinate} / span 1`;
        return goblinElement;
    }
}

export default Goblin;