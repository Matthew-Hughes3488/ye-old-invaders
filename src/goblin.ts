class Goblin{
    private static numOfGoblins = 1;
    private xCordinate : number
    private yCordinate : number
    public goblinElement : HTMLImageElement

    constructor(xValue : number, yValue : number) {
        this.xCordinate = xValue;
        this.yCordinate = yValue;
        this.goblinElement = this.getGoblinHTML()
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

    public updateGoblinCordinates(){
        this.goblinElement.style.gridColumn = `${this.xCordinate} / span 1`;
        this.goblinElement.style.gridRow = `${this.yCordinate} / span 1`;
    }

    public moveDown(){
        this.yCordinate++;
        this.updateGoblinCordinates()
    }

    public moveRight(){
        this.xCordinate++;
        this.updateGoblinCordinates()
    }

    public moveLeft(){
        this.xCordinate--;
        this.updateGoblinCordinates()
    }
}

export default Goblin;