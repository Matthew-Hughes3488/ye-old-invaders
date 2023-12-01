import "./main.scss";

/* Generate goblins feature
    function to get goblin HTML
    DOM to get game board
    function to populate the board with x goblins
    will update in the future to create goblin objects
    and place them on the board based on the x and y attributes */

const gameBoard = document.querySelector("game-board")
if(!gameBoard) throw new Error("Query error");

const populateBoardWithGoblins = (numberOfGoblins: number) =>{
    for (let i = 1; i <= numberOfGoblins; i++) {
        gameBoard.innerHTML += `<img class="game-board__goblin game-board--goblin-${i}" src="./images/goblin.png" alt="">`
    }
}