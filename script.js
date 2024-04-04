//globalne zmienne
let activeBlock = "";
let gameRunning = false;
let staticCords = [];
let ghostBlockCords = [];
let alreadyPressedHold = true;
let hardDropUsed = false;
let ghostPlaced = false;
let level = 0;
let numberOfDeletedLines = 0;
let score = 0;
let tickTime = 1000;
let seconds = 0;
let minutes = 0;
let alreadySend = false;
window.addEventListener("keydown", clickEvent);


//funkcja do startu gry
function startGame() {
    if (!gameRunning)
    {
        alreadySend = false;
        shuffle(pieces);
        document.querySelector("#startGame").setAttribute("onclick","");
        let toClear = document.querySelectorAll(".column");
        document.querySelector("#scoreDiv").innerHTML = "<span id='score-text'>Score</span><p id='score' class='scorePoints'>0</p>";
        $("#levelDiv").css("opacity", "1");
        $("#timeDiv").css("opacity", "1");
        staticCords = [];
        activeBlock = ""
        toClear.forEach(element =>{
        element.style.color = "";
        element.style.backgroundColor = "";
        element.innerHTML = "";
        })
        gameRunning = true;
        window.addEventListener("keydown", clickEvent);

        $("#endScreen").fadeOut(300);
        document.querySelector("#time").innerHTML = "0:00";
        createNewBlock(true);
        tickTime = 1000;
        gameTick();
        seconds = 0;
        minutes = 0;
        timer();
        alreadyPressedHold = false;
        document.querySelector("#holdP").src = "";

        toClear.forEach(element =>{
            element.style.border = ``;
        })

        level = 0;
        numberOfDeletedLines = 0;
        score = 0;

        document.querySelector("#level").innerHTML = 0;
    }
}
function changeVisibility()
{
    $("#launch").css("display", "none");
    $("#end").css("display", "block");
}

function stopGame(){
    if (gameRunning)
    {
        staticCords = [];
        activeBlock = "";
        // document.querySelector("#score-text").innerHTML = "Score<p id='score'>0</p>";
        document.querySelector("#scoreDiv").innerHTML = "<span id='score-text'>GAME OVER</span>";
        $("#levelDiv").css("opacity", "0");
        $("#timeDiv").css("opacity", "0");
        
        document.querySelector("#startGame").setAttribute("onclick","startGame()");
    
        document.getElementById('PlayerName').value = '';
        document.querySelector("#finalScoreNumber").innerHTML = score.toLocaleString("en-US");
        document.querySelector("#finalTimeNumber").innerHTML = document.querySelector("#time").innerHTML;
        document.querySelector("#finalLevelNumber").innerHTML = level;
        changeVisibility();
        $("#endScreen").fadeIn(300);
        
        let next = document.querySelectorAll(".nextP");
        next.forEach( element =>{
            element.src = "";
        })
    
        document.querySelector("#holdP").src = "";
        alreadyPressedHold = true;
    
        let toClear = document.querySelectorAll(".column");
        toClear.forEach(element =>{
            element.style.color = "";
            element.style.backgroundColor = "";
            element.innerHTML = "";
            element.style.border = ``;
        })
        gameRunning = false
    }
}
function checkGameOver(){
    staticCords.forEach(element => {
        if(element.y >= 1 && element.y <=2){
            gameRunning = false;
            window.removeEventListener("keydown",clickEvent);
            document.querySelector("#scoreDiv").innerHTML = "<span id='score-text'>GAME OVER</span>";
            $("#levelDiv").css("opacity", "0");
            $("#timeDiv").css("opacity", "0");
            document.querySelector("#startGame").setAttribute("onclick","startGame()");
            document.getElementById('PlayerName').value = '';
            document.querySelector("#finalScoreNumber").innerHTML = score.toLocaleString("en-US");
            document.querySelector("#finalTimeNumber").innerHTML = document.querySelector("#time").innerHTML;
            document.querySelector("#finalLevelNumber").innerHTML = level;
            $("#endScreen").fadeIn(300);
            changeVisibility();
        }
    });
}
//1 tick to jedno przejscie klocka w dół
function gameTick() {
    if (gameRunning) {
        setTimeout(() => {
            moveBlockDown();
            gameTick();
        }, tickTime);
    }
}
function timer(){
    if(gameRunning){
        setTimeout(() =>{
            seconds += 1;
            if(seconds == 60){
                minutes += 1
                seconds = 0;
            }
            if(seconds < 10){
                document.querySelector("#time").innerHTML = `${minutes}:0${seconds}`;
            }
            else{
                document.querySelector("#time").innerHTML = `${minutes}:${seconds}`;
            }
            timer();
        },1000)
    }
}
//tworzy nowy blok z 7 dostępnych
//todo: trzeba tu dodać by tworzyło ich więcej by w kolejce pokazywało

function createNewBlock(check) {
    if(gameRunning){
        if (check)
        {
            displayNextPieces(true)
            shufflePieces(true)
        }
        else
        {
            displayNextPieces(false)
            shufflePieces(false)
        }
        switch (currentPiece) {
            case 1:
            case 2:
                activeBlock = new Iblock();break;
            case 3:
            case 4:
                activeBlock = new Jblock();break;
            case 5:
            case 6:
                activeBlock = new Lblock();break;
            case 7:
            case 8:
                activeBlock = new Oblock();break;
            case 9:
            case 10:
                activeBlock = new Sblock();break;
            case 11:
            case 12:
                activeBlock = new Tblock();break;
            case 13:
            case 14:
                activeBlock = new Zblock();break;
        }
        drawGhostBlock();
    }
}
function drawBlock(){
    activeBlock.tiles.forEach((element) => {
        let cell = document.querySelector(`#row${element.y} #column${element.x}`);
        // cell.innerHTML = "X";
        cell.style.color = activeBlock.color;
        cell.style.backgroundColor = activeBlock.color;
        
    });    
    drawGhostBlock();
}
function clearBlock(){
    activeBlock.tiles.forEach((element) => {
        let cell = document.querySelector(`#row${element.y} #column${element.x}`);
        cell.innerHTML = "";
        cell.style.color = "";
        cell.style.backgroundColor = "";
    });
}
function drawGhostBlock(){
    //to tutaj ma zostac niezakomentowane bo smierc
    if(ghostBlockCords.length>0){
        ghostBlockCords.forEach(element => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            cell.style.border = ``;
        });
    }
    ghostBlockCords = [];
    // --------------------------------------------------------rozwiązanie #1 --------- nie dziala w ogóle ale chyba bedzie latwiej ogarnąc --------------------------------------------------------------
    activeBlock.tiles.forEach(element => {
        ghostBlockCords.push({y:element.y, x:element.x});        
    });
    
    let validMoveGhost = true;
    while(!ghostPlaced){
        ghostBlockCords.forEach((element) => {
            if (element.y == 20) {//tutaj sprawdza czy nie wychodzi poza planszę
                validMoveGhost = false;
            }
            staticCords.forEach((cord) => {//ta pętla sprawdza czy blok nie wchodzi na któryś z statycznych już bloków
                if (cord.y == element.y + 1 && cord.x == element.x) {
                    validMoveGhost = false;
                }
            });
        });
        if(validMoveGhost){
            ghostBlockCords.forEach(element => {
                element.y = element.y + 1;
            });
        }
        else{
            ghostPlaced = true;
        }
    }
    ghostBlockCords.forEach(element => {
        let cell = document.querySelector(`#row${element.y} #column${element.x}`);
        cell.style.border = `4px solid ${activeBlock.color}`;
    });
    ghostPlaced = false;    
}

function rotateBlockLeft() {
    clearBlock();
    const rotatedTiles = [];
    const center = activeBlock.tiles[1];
    activeBlock.tiles.forEach((tile) => {
      // Translate coordinates to origin and rotate by -90 degrees
      const color = tile.color;
      const x = -(tile.y - center.y) + center.x;
      const y = (tile.x - center.x) + center.y;
      // Check if tile is within bounds
      if (x < 1 || x > 10 || y < 1 || y > 20) {
        drawBlock();
        throw new Error("Block cannot be rotated outside of the board.");
      }
      // Check if tile overlaps with static coordinates
      if (staticCords.some((cord) => cord.x === x && cord.y === y)) {
        drawBlock();
        throw new Error("Block cannot be rotated into static coordinates.");
      }
      rotatedTiles.push({ x, y, color});
    });
    activeBlock.tiles = rotatedTiles;
    drawBlock();
  }
  function rotateBlockRight() {
    clearBlock();
    const rotatedTiles = [];
    const center = activeBlock.tiles[1];
    activeBlock.tiles.forEach((tile) => {
      // Translate coordinates to origin and rotate by 90 degrees
      const color = tile.color;
      const x = tile.y - center.y + center.x;
      const y = -(tile.x - center.x) + center.y;
      // Check if tile is within bounds
      if (x < 1 || x > 10 || y < 1 || y > 20) {
        drawBlock();
        throw new Error("Block cannot be rotated outside of the board.");
      }
      // Check if tile overlaps with static coordinates
      if (staticCords.some((cord) => cord.x === x && cord.y === y)) {
        drawBlock();
        throw new Error("Block cannot be rotated into static coordinates.");
      }
      rotatedTiles.push({ x, y , color});
    });
    activeBlock.tiles = rotatedTiles;
    drawBlock();
  }
//sprawdza co jest klinięte i wywołuje odpowiednie funkcje do tego
function clickEvent(event) {
    if(gameRunning){
        const pressedKey = event.keyCode;
        const right = 39;
        const left = 37;
        const down = 40;
        const rotateLeft1 = 88;
        const rotateLeft2 = 38;
        const rotateRight1 = 90;
        const rotateRight2 = 17;
        const instantDown = 32;
        const hold1 = 67;
        const hold2 = 16;
    
        switch (pressedKey) {
            case right:
                moveBlockRight();
                break;
            case left:
                moveBlockLeft();
                break;
            case down:
                moveBlockDown();
                break;
            case rotateRight1:
            case rotateRight2:
                rotateBlockRight();
                break;
            case rotateLeft1:
            case rotateLeft2:
                rotateBlockLeft();
                break;
            case hold1:
            case hold2:
                hold();
                break;
            case instantDown:
                hardDrop();
        }
    }
}
//rusza blok w dół
function moveBlockDown() {
    if(gameRunning){
        let validMove = true;
        activeBlock.tiles.forEach((element) => {
            if (element.y == 20) {//tutaj sprawdza czy nie wychodzi poza planszę
                validMove = false;
            }
            staticCords.forEach((cord) => {//ta pętla sprawdza czy blok nie wchodzi na któryś z statycznych już bloków
                if (cord.y == element.y + 1 && cord.x == element.x) {
                    validMove = false;
                }
            });
        });
        if (validMove) {
            activeBlock.tiles.forEach((element) => {//ta pętla wymazuje blok 
                let cell = document.querySelector(`#row${element.y} #column${element.x}`);
                cell.innerHTML = "";
                cell.style.color = "";
                cell.style.backgroundColor = "";
                element.y = element.y + 1;
            });
            drawBlock();
        } else {
            // jeśli blok nie może dalej iść w dół to dodaje jego kordy do tablicy staticCords
            addToStaticBlocks();
            hardDropUsed = true;
        }
    }
}
function hardDrop(){
    if(gameRunning){
        while(!hardDropUsed){
            moveBlockDown();
        }
        hardDropUsed = false;
    }
}
function moveBlockRight() {//wyglądaa praktyznie tak samo jak move down 
    let validMove = true;
    activeBlock.tiles.forEach((element) => {
        if (element.x == 10) {
            validMove = false;
        }
        staticCords.forEach((cord) => {
            if (cord.x == element.x + 1 && cord.y == element.y) {
                validMove = false;
            }
        });
    });
    if (validMove) {
        activeBlock.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            cell.innerHTML = "";
            cell.style.color = "";
            cell.style.backgroundColor = "";
            element.x = element.x + 1;
        });
        drawBlock();
    }
}
function moveBlockLeft() {//to samo co move right
    let validMove = true;
    activeBlock.tiles.forEach((element) => {
        if (element.x == 1) {
            validMove = false;
        }
        staticCords.forEach((cord) => {
            if (cord.x == element.x - 1 && cord.y == element.y) {
                validMove = false;
            }
        });
    });

    if (validMove) {
        activeBlock.tiles.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            cell.innerHTML = "";
            cell.style.color = "";
            cell.style.backgroundColor = "";
            element.x = element.x - 1;
        });
        drawBlock();
    }
}

function addToStaticBlocks() {//dodaje kordy elementu do tablicy z statycznymi kordynatami
    activeBlock.tiles.forEach((element) => {
        staticCords.push(element);
    });
    checkGameOver()
    createNewBlock(true);
    deleteFullLines();
    alreadyPressedHold = false;
}

let oldLevel = 0;
function deleteFullLines(){
    let linesToCheck = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    linesToDelete = []
    linesToCheck.forEach(line => {
        let count = 0;
        staticCords.forEach(cords => {
            if(cords.y == line){
                count++;
            }
        });
        if(count == 10){
            linesToDelete.push(line);
        }
    });
    console.log(linesToDelete);
    switch(linesToDelete.length){
        case 1:
            score += 40 * (level + 1);

            $("#whyThisScore").append("<span>Single: + " + (40 * (level + 1)).toLocaleString("en-US") + "</span><br>")
            .fadeIn(300).animate({fontSize: "20px" }, 500)
            .animate({ "top": "-30px" }, {
                queue: false,
                duration: 500
            })
            .fadeOut(500, function() {$("#whyThisScore").animate({ "top": "+30px" }, 1).empty();});
            
            break;
        case 2:
            score += 100 * (level + 1);

            $("#whyThisScore").append("<span>Double: + " + (100 * (level + 1)).toLocaleString("en-US") + "</span><br>")
            .fadeIn(300).animate({fontSize: "20px" }, 500)
            .animate({ "top": "-30px" }, {
                queue: false,
                duration: 500
            })
            .fadeOut(500, function() {$("#whyThisScore").animate({ "top": "+30px" }, 1).empty();});
            
            break;
        case 3:
            score += 300 * (level + 1);

            $("#whyThisScore").append("<span>Triple: + " + (300 * (level + 1)).toLocaleString("en-US") + "</span><br>")
            .fadeIn(300).animate({fontSize: "20px" }, 500)
            .animate({ "top": "-30px" }, {
                queue: false,
                duration: 500
            })
            .fadeOut(500, function() {$("#whyThisScore").animate({ "top": "+30px" }, 1).empty();});
            
            break;
        case 4:
            score += 1200 * (level + 1);

            $("#whyThisScore").append("<span>Tetris: + " + (1200 * (level + 1)).toLocaleString("en-US") + "</span><br>")
            .fadeIn(300).animate({fontSize: "20px" }, 500)
            .animate({ "top": "-30px" }, {
                queue: false,
                duration: 500
            })
            .fadeOut(500, function() {$("#whyThisScore").animate({ "top": "+30px" }, 1).empty();});
            
            break;
    }
    document.querySelector("#score").innerHTML = score.toLocaleString("en-US");
    numberOfDeletedLines += linesToDelete.length;
    if(linesToDelete.length != 0 && level < 30){
        level = Math.floor(numberOfDeletedLines / 10);
        if (level != oldLevel && level != 0)
        {
            tickTime *= 0.85;
            oldLevel = level;

            $("#levelUp").fadeIn(300).animate({fontSize: "25px" }, 500).fadeOut(500).animate({fontSize: "20px" }, 1);
        }
        document.querySelector("#level").innerHTML = level;
        // console.log(`OldLevel: ${oldLevel}`);
    }
    // console.log(`tickTime: ${tickTime}`);
    // console.log(`level: ${level}`);
    // console.log(`numberOfDeletedLines: ${numberOfDeletedLines}`);
    
    linesToDelete.forEach(line => {
        staticCords.forEach((element) => {
            let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            cell.innerHTML = "";
            cell.style.color = "";
            cell.style.backgroundColor = "";
        });
        // usuwa linie z static cordow
        for (let i = staticCords.length - 1; i >= 0; i--) {
            if (staticCords[i].y === line) {
                staticCords.splice(i, 1);
            }
        }
        //zwiększa kordy tak by bloki spadly 
        staticCords.forEach((cord) => {
            if (cord.y < line) {
              cord.y++;
            }
          });


           staticCords.forEach((element) => {
             let cell = document.querySelector(`#row${element.y} #column${element.x}`);
            //  cell.innerHTML = "X";
             cell.style.color = element.color;
             cell.style.backgroundColor = element.color;
         });
    });

}
let pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let currentPiece;
shuffle(pieces);
function shufflePieces(check)
{
    if (pieces.length <= 8)
    {
        let a =[];
        for (let i = 1; i <= 14; i++) {
            if (!pieces.includes(i))
            {
                a.push(i);
            }
        }
        pieces = pieces.concat(shuffle(a));
    }

    // currentPiece = p;
    if (check)
    {
        pieces.shift();
    }
    let p = pieces[0];
    if (check)
    {
        currentPiece = p;
    }
    // console.log(p)
    return p;
}

const pieceImages = ["Ipiece.png", "Ipiece.png", "Jpiece.png", "Jpiece.png", "Lpiece.png", "Lpiece.png", "Opiece.png", "Opiece.png", "Spiece.png", "Spiece.png", "Tpiece.png", "Tpiece.png", "Zpiece.png", "Zpiece.png"]

function displayNextPieces(check)
{
    if (check)
    {
        let next = document.querySelectorAll(".next-piece");
        let srcs = document.querySelectorAll(".nextP");
        for (let i = 0; i < next.length; i++) {
            // next[i].innerHTML = pieces[i+1];
            // console.log(srcs[i].getAttribute('src'))
            // console.log(pieceImages[pieces[i]])
            srcs[i].src = ("images/Pieces/" + pieceImages[pieces[i+2] - 1]);
        }
        // console.log(pieceImages[pieces[1] - 1] + " " + pieceImages[pieces[2] - 1] + " " + pieceImages[pieces[3] - 1] + " " + pieceImages[pieces[4] - 1] + " " + pieceImages[pieces[5] - 1] + " " + pieceImages[pieces[6] - 1])
    }
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let heldPiece;
function hold()
{
    let hold = document.querySelector("#holdP");
    let heldPieceImage = pieceImages[currentPiece-1];
    let temp;

    if (!alreadyPressedHold)
    {
        if (!hold.getAttribute('src'))
        {
            hold.src = ("images/Pieces/" + heldPieceImage);
            clearBlock()
            heldPiece = currentPiece;
            createNewBlock(true)
        }
        else
        {
            hold.src = ("images/Pieces/" + pieceImages[currentPiece-1]);
            temp = heldPiece;
            heldPiece = currentPiece;
            currentPiece = temp;
            clearBlock()
            createNewBlock(false);
        }
        alreadyPressedHold = true;
    }
}
