function loadingIcon() {
  var myVar = setTimeout(showPage, 2000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("container").style.display = "block";
}

//after newgame button is clicked
let numSquares = 64;
let sColors = ["slategray", ""];
const chessBoard = document.getElementById("mainChessBoard");
initialiseBoard();
play();

//draws the chessBoard. generates the index. places each piece into appropriate place. 
function initialiseBoard() {
    for (let i = 0; i < numSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('squares');
        square.style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? sColors[0] : sColors[1];
        square.id = i + 1;
        chessBoard.appendChild(square);
        //pawns
        if (square.id >= 9 && square.id <= 16) { square.innerHTML = "o"; }
        else if (square.id >= 49 && square.id <= 56) { square.innerHTML = "o"; }
        //rook
        else if (square.id == 1 || square.id == 8) { square.innerHTML = "t"; }
        else if (square.id == 57 || square.id == 64) { square.innerHTML = "t"; }
        //knight
        else if (square.id == 2 || square.id == 7) { square.innerHTML = "m"; }
        else if (square.id == 58 || square.id == 63) { square.innerHTML = "m" }
        //bishop
        else if (square.id == 3 || square.id == 6) { square.innerHTML = "v"; }
        else if (square.id == 59 || square.id == 62) { square.innerHTML = "v"; }
        //queen
        else if (square.id == 4) { square.innerHTML = "w"; }
        else if (square.id == 60) { square.innerHTML = "w"; }
        //king
        else if (square.id == 5) { square.innerHTML = "l"; }
        else if (square.id == 61) { square.innerHTML = "l"; }
        //other squares
        else { square.innerHTML = "a"; }

        //assign to black or white class
        if (square.id < 17) { square.classList.add('white'); square.style.color = "white"; }
        else if (square.id > 48) { square.classList.add('black'); }
    }
}

//selects two squares(i.e TO and FROM). If move possible, then call the function that moves the piece.
function play() {
    let sq = document.querySelectorAll('.squares');
    let counter = 0;
    let index = [];
    sq.forEach(item => {
        item.addEventListener('mousedown', event => {

            //check number of clicks ==2 because you only need to move piece from index1 to index2 (i.e 2 clicks)
            if (counter == 1) {
                index.push(item.id - 1);
                item.style.backgroundColor = "orange";
                if (isLegal(index)) {
                    movePiece(index);
                }
                else {
                    console.log("Illegal move made.Select another.");
                }         
                
                removeSquareSelection(index);  
                counter = 0;              
                index = [];
                return 0;
            }
            //else highlight the square
            else {
                item.style.backgroundColor = "orange";
                index.push(item.id - 1);
                counter++;
            }
        })
    })
}

//removes highlighted squares after move is made
function removeSquareSelection(i) {
    document.getElementById(i[0] + 1).style.backgroundColor = parseInt((i[0] / 8) + i[0]) % 2 == 0 ? sColors[0] : sColors[1];
    document.getElementById(i[1] + 1).style.backgroundColor = parseInt((i[1] / 8) + i[1]) % 2 == 0 ? sColors[0] : sColors[1];
}

//move piece from one index to the next. this is called when a legal move is made
function movePiece(index) {
    let sq = document.querySelectorAll('.squares');
    sq[index[1]].innerHTML = sq[index[0]].innerHTML;
    sq[index[1]].style.color = sq[index[0]].style.color;
    sq[index[0]].innerHTML = "a";

    //when white takes over black or vice versa, update the current cell to who-ever took over 
    //i.e if black takes over white piece, the new cell is now black
    var currentPlayer = sq[index[0]].className.split(/\s+/);
    var nextPlayer = sq[index[1]].className.split(/\s+/);
    sq[index[0]].classList.remove(currentPlayer[1]);
    sq[index[1]].classList.remove(nextPlayer[1]);
    sq[index[1]].classList.add(currentPlayer[1]);

    //check if pawn is being promoted
    if (sq[index[1]].innerHTML == 'o' && (index[1] > 55 || index[1] < 8)) {
        let promote = prompt("Pawn is getting promoted. Select 'q' for queen, 'b' for bishop,'n' for night,'r' for rook", "q");
        sq[index[1]].innerHTML = promote;
    };
}

//check of a certain piece is making a legally allowed move
function isLegal(index) {
    let sq = document.querySelectorAll('.squares');
    let idx = []; idx.push(Number(index[0])); idx.push(Number(index[1]));

    //get the row and col index of the given square
    let current_row = Math.floor(idx[0] / 8); let target_row = Math.floor(idx[1] / 8);
    let current_col = idx[0] - (8 * (current_row)); let target_col = idx[1] - (8 * (target_row));

    //Since white moves in opposite direction of black, establish which direction to move
    let shift;
    let currentPlayer = sq[index[0]].className.split(/\s+/)[1];
    if (currentPlayer == "white") { shift = Number(8); }
    else { shift = Number(-8); }

    //check how much to move in the given direction. Useful for bishop and queen moves
    if ((target_row > current_row && target_col < current_col) || (target_row < current_row && target_col > current_col)) { divisor = 7; }
    else { divisor = 9; }
    let flidx = []; flidx[0] = idx[1]; flidx[1] = idx[0];

    //pieces belonging to the same player cannot take pieces
    if (sq[index[1]].classList.contains(currentPlayer)) {
        console.log("You cannot take over your own pieces");
        return false;
    }

    //pieces cannot move unless it removes checkmate

    //for each peice, assing the types of moves they can legally make
    switch (sq[index[0]].innerHTML) {
        //if piece is pawn
        case 'o':
            if (idx[1] == idx[0] + shift && sq[idx[1]].innerHTML == "a") {
                return true;
            }
            else if ((sq[idx[1]].innerHTML != "a" && idx[1] == idx[0] + shift - 1) || (idx[1] == idx[0] + shift + 1 && sq[idx[1]].innerHTML != "a")) { return true; }
            else if ((idx[0] < 17 || idx[0] > 47) && idx[1] == idx[0] + (2 * shift) && sq[idx[1]].innerHTML == "a" && sq[idx[1] - shift].innerHTML == "a") { return true; }
            break;
        case 'l':
            if ((idx[1] <= idx[0] + shift + 1 && idx[1] >= idx[0] + shift - 1) || (idx[1] >= idx[0] - 1 && idx[1] <= idx[0] + 1) || (idx[1] >= idx[0] - shift - 1 && idx[1] <= idx[0] - shift + 1))
                return true;
            break;
        case 'v':
            return Math.abs(idx[1] - idx[0]) % divisor == 0 ? detectObstruction(idx, divisor) : false;
            break;
        case 't':
            if(target_row==current_row){
                return detectObstruction(idx,1);
            }
            else if(target_col==current_col){
                return detectObstruction(idx,8);
            }
            else{
                return false;
            }
            break;
        case 'm':
            let possibleStates = [6, 10, 15, 17];
            if (possibleStates.indexOf(Math.abs(idx[1] - idx[0])) > -1) { return true; }
            break
        case 'w':
            let param1,param2,param3;
            if(target_row==current_row){
                return detectObstruction(idx,1);
            }
            else if(target_col==current_col){
                return detectObstruction(idx,8);
            }
            else if(Math.abs(idx[1] - idx[0]) % divisor == 0){
                return detectObstruction(idx, divisor);
            }
            else{
                return false;
            }
            break;
    }
    return false;
}

//Detects if there is obstruction between start and end position when moving a player. if there is, then move is invalid.
function detectObstruction(idx, stepSize) {
    const sq = document.querySelectorAll('.squares');
    if (idx[1] < idx[0]) {
        idx[0] = idx[0] - stepSize;
    }
    else {
        idx[0] = idx[0] + stepSize;
    }

    console.log(sq[idx[0]]);
    if (idx[1] == idx[0]) {
        return true;
    }
    return sq[idx[0]].innerHTML == "a" ? detectObstruction(idx, stepSize) : false;
}