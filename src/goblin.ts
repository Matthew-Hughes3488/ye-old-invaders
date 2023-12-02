class Goblin{
    private xCordinate : number
    private yCordinate : number

    constructor(xValue : number, yValue : number) {
        this.xCordinate = xValue;
        this.yCordinate = yValue;
    }

    public getGoblinHTML (){
        return `<img class="game-board__goblin" src="./images/goblin.png" alt="">`;
      };
}

export default Goblin;