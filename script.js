let numSquares = 64;
let endgame = 0;
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
        square.style.backgroundColor= parseInt((i/8)+i)%2==0?'#ffffcc':'lightgreen';
        square.innerHTML = square.id;
        chessBoard.appendChild(square);
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
        document.getElementById(i+1).style.backgroundColor = parseInt((i/8)+i)%2==0?'#ababaa':'white';
    }
}

function movePiece(Piece,from,to){

}

function isLegal(){
    return false;
}