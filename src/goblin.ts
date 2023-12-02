class Goblin{
    private xCordinate : number
    private yCordinate : number
    private static numOfGoblins = 1;

    constructor(xValue : number, yValue : number) {
        this.xCordinate = xValue;
        this.yCordinate = yValue;
    }

    public getGoblinHTML(goblin : Goblin){
        const goblinElement = document.createElement("img");
        goblinElement.src = "./src/images/goblin.png"
        goblinElement.classList.add("game-board__goblin");
        goblinElement.classList.add(`game-board--goblin-${Goblin.numOfGoblins++}`);
        goblinElement.style.gridColumn = `${goblin.xCordinate} / span 1`;
        goblinElement.style.gridRow = `${goblin.yCordinate} / span 1`;
        return goblinElement;

        //`<img 
        //class="game-board__goblin game-board--goblin-${goblinIdNumber}" 
        //src="./src/images/goblin.png" alt="">`
    }
}

export default Goblin;