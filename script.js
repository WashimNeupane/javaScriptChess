let numSquares = 64;
let sColors = ["#ffffc2", "lightgreen"];
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
        if (square.id >= 9 && square.id <= 16) { square.innerHTML = "p";}
        else if (square.id >= 49 && square.id <= 56) { square.innerHTML = "p"; }
        //rook
        else if (square.id == 1 || square.id == 8) { square.innerHTML = "r";}
        else if (square.id == 57 || square.id == 64) { square.innerHTML = "r"; }
        //knight
        else if (square.id == 2 || square.id == 7) { square.innerHTML = "n";}
        else if (square.id == 58 || square.id == 63) { square.innerHTML = "n" }
        //bishop
        else if (square.id == 3 || square.id == 6) { square.innerHTML = "b";}
        else if (square.id == 59 || square.id == 62) { square.innerHTML = "b"; }
        //queen
        else if (square.id == 4) { square.innerHTML = "q";}
        else if (square.id == 60) { square.innerHTML = "q"; }
        //king
        else if (square.id == 5) { square.innerHTML = "k";}
        else if (square.id == 61) { square.innerHTML = "k"; }
        //other squares
        else { square.innerHTML = ""; }

        //assign to black or white class
        if(square.id<17){square.classList.add('white'); square.style.color = "blue";}
        else if(square.id>48){square.classList.add('black');}
    }
}

//selects two squares(i.e TO and FROM). If move possible, then call the function that moves the piece.
function play() {
    let sq = document.querySelectorAll('.squares');
    let counter = 0;
    let index = [];
    sq.forEach(item => {
        item.addEventListener('mousedown', event => {

            console.log(counter);
            //check number of clicks ==2 because you only need to move piece from index1 to index2 (i.e 2 clicks)
            if (counter == 1) {
                index.push(item.id-1);
                if (isLegal(index)) {
                    movePiece(index);
                }
                else {
                    console.log("Illegal move made.Select another.");
                }
                removeSquareSelection();
                index = [];
                counter = 0;
                return 0;
            }
            //else highlight the square
            else {
                item.style.backgroundColor = "orange";
                index.push(item.id-1);
                console.log(item.id-1);
                counter++;
            }
        })
    })
}

//removes highlighted squares after move is made
function removeSquareSelection() {
    const sq = document.querySelectorAll('.squares');
    for (let i = 0; i < numSquares; i++) {
        document.getElementById(i + 1).style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? sColors[0] : sColors[1];
    }
}

//move piece from one index to the next. this is called when a legal move is made
function movePiece(index) {
    let sq = document.querySelectorAll('.squares');
    sq[index[1]].innerHTML = sq[index[0]].innerHTML;
    sq[index[1]].style.color = sq[index[0]].style.color;
    sq[index[0]].innerHTML = "";

    //when white takes over black or vice versa, update the current cell to who-ever took over 
    //i.e if black takes over white piece, the new cell is now black
    var currentPlayer = sq[index[0]].className.split(/\s+/);
    var nextPlayer = sq[index[1]].className.split(/\s+/);
    sq[index[0]].classList.remove(currentPlayer[1]);
    sq[index[1]].classList.remove(nextPlayer[1]);
    sq[index[1]].classList.add(currentPlayer[1]);

    //check if pawn is being promoted
    if(sq[index[1]].innerHTML=='p' && (index[1]>55 || index[1]<8))
    {
        let promote = prompt("Pawn is getting promoted. Select 'q' for queen, 'b' for bishop,'n' for night,'r' for rook","q");
        sq[index[1]].innerHTML = promote;
    };
}

//check of a certain piece is making a legally allowed move
function isLegal(index) {
    let sq = document.querySelectorAll('.squares');
    let idx=[]; idx.push(Number(index[0]));idx.push(Number(index[1]));

    //get the row and col index of the given square
    let current_row = Math.floor(idx[0]/8); let target_row = Math.floor(idx[1]/8);
    let current_col = idx[0]-(8*(current_row)); let target_col = idx[1]-(8*(target_row));

    //Since white moves in opposite direction of black, establish which direction to move
    let shift;
    let currentPlayer = sq[index[0]].className.split(/\s+/)[1];
    if(currentPlayer == "white"){shift = Number(8);}
    else{shift = Number(-8);}

    //pieces belonging to the same player cannot take pieces
    if(sq[index[1]].classList.contains(currentPlayer))
    {   console.log("You cannot take over your own pieces");
        return false;}

    //pieces cannot move unless it removes checkmate

    //for each peice, assing the types of moves they can legally make
    switch(sq[index[0]].innerHTML){
        //if piece is pawn
        case 'p':
            if(idx[1]==idx[0]+shift && sq[idx[1]].innerHTML ==""){
                return true;}
            else if((sq[idx[1]].innerHTML!="" && idx[1]==idx[0]+shift-1) || (idx[1]==idx[0]+shift+1 && sq[idx[1]].innerHTML!=""))
                {return true;}
            else if((idx[0]<17||idx[0]>48) && idx[1]==idx[0]+(2*shift))
                {return true;}
        
        case 'k':
        case 'q':
            if((idx[1]<=idx[0]+shift+1 && idx[1]>=idx[0]+shift-1) || (idx[1]>=idx[0]-1 && idx[1]<=idx[0]+1) || (idx[1]>=idx[0]-shift-1 && idx[1]<=idx[0]-shift+1))
                return true;

        case 'b':
        case 'q':
            let divisor;
            console.log("ROW  "+current_row+" "+target_row);
            console.log("COL  "+current_col+" "+target_col);
            if((target_row>current_row && target_col<current_col)||(target_row<current_row && target_col>current_col)){divisor = 7;}
            else{divisor =9;}
            console.log("DIV ==  "+divisor);
            if((Math.abs(idx[1]-idx[0])%divisor==0))
                return true;
        case 'r':
        case 'q':
            if(current_row==target_row || current_col==target_col)
                return true;
    }
    return false;
}