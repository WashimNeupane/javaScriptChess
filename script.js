let numSquares = 64;
let sColors = ["#ffffc2","lightgreen"];
const chessBoard = document.getElementById("mainChessBoard");
initialiseBoard();
makeMove();

//draws the chessBoard. generates the index. places each piece into appropriate place. 
function initialiseBoard(){
    for(let i=0;i<numSquares;i++)
    {
        const square = document.createElement('div');
        square.classList.add('squares');
        square.id = i+1;
        square.style.backgroundColor= parseInt((i/8)+i)%2==0?sColors[0]:sColors[1];
        chessBoard.appendChild(square);
        //pawns
        if(square.id>=9 && square.id<=16){square.innerHTML = "p"; square.style.color="blue";}
        else if(square.id>=49 && square.id<=56){square.innerHTML = "p";}
        //rook
        else if(square.id==1 || square.id == 8) {square.innerHTML = "r";square.style.color="blue";}
        else if(square.id==57 || square.id == 64) {square.innerHTML = "r";}
        //knight
        else if(square.id==2 || square.id == 7) {square.innerHTML = "n";square.style.color="blue";}
        else if(square.id==58 || square.id == 63) {square.innerHTML = "n"}
        //bishop
        else if(square.id==3 || square.id == 6) {square.innerHTML = "b";square.style.color="blue";}
        else if(square.id==59 || square.id == 62) {square.innerHTML = "b";}
        //queen
        else if(square.id==4 ) {square.innerHTML = "q";square.style.color="blue";}
        else if(square.id==60) {square.innerHTML = "q";}
        //king
        else if(square.id==5) {square.innerHTML = "k";square.style.color="blue";}
        else if(square.id==61) {square.innerHTML = "k";}
    }
}

//selects two squares(i.e TO and FROM). If move possible, then call the function that moves the piece.
function makeMove(){    
    let sq = document.querySelectorAll('.squares');
    let counter=0;
    sq.forEach(item =>{
        item.addEventListener('mousedown',event =>{       
            
        console.log(counter); 
        //check number of clicks ==2 because you only need to move piece from index1 to index2 (i.e 2 clicks)
        if(counter==1){
            console.log("Making a move");
            //if(isLegal(Piece,from,to))
            //{
            //    movePiece([Piece,from,to]);
            //}
            //else{
            //    console.log("Illegal move made.Select another.");
            //    counter =0;
            //}
            counter = 0;
            removeSquareSelection();
            return 0;
        }           
        //else highlight the square
        else{item.style.backgroundColor = "orange";                     
        counter++;
        }
        })
    })
}

//removes highlighted squares after move is made
function removeSquareSelection()
{
    const sq = document.querySelectorAll('.squares');
    for(let i=0;i<numSquares;i++)
    {
        document.getElementById(i+1).style.backgroundColor = parseInt((i/8)+i)%2==0?sColors[0]:sColors[1];
    }
}

function movePiece(Piece,from,to){

}

function isLegal(){
    return false;
}