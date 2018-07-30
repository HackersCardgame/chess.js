const cols=8;
const rows=8;

const emptyField =   0;

const whitePawn =    1;
const whiteBishop =  5;
const whiteKnight =  7;
const whiteRook =   10;
const whiteQueen =  30;
const whiteKing =  100;

const blackPawn =   -1;
const blackBishop = -5;
const blackKnight = -7;
const blackRook =  -10;
const blackQueen = -30;
const blackKing = -100;



var board = new Int8Array(cols*rows);

var from = new Int8Array(2);
var to = new Int8Array(2);
var player = new Int8Array(1);


function checking(from, to, player)
{
  //check if player wants to move his own figures
  if(player*board[from[0]*8+from[1]]<0)
    return false;

  //check if move is not to the same field
  if(from[0]==to[0]&&from[1]==to[1])
    return false;

  switch (board[from[0]*8+from[1]]) {
  
    case whitePawn:
      return checkPawn(from, to, player);
      
    case blackPawn:
      return checkPawn(from, to, player);
  
    case whiteKnight:
      return checkKnight(from, to, player);

    case blackKnight:
      return checkKnight(from, to, player);
  
    case whiteBishop:
      return checkBishop(from, to, player);
      
    case blackBishop:
      return checkBishop(from, to, player);
  
    case whiteRook:
      return checkRook(from, to, player);
      
    case blackRook:
      return checkRook(from, to, player);

    case whiteQueen:
      return checkQueen(from, to, player);
      
    case blackQueen:
      return checkQueen(from, to, player);

    case whiteKing:
      return checkKing(from, to, player);
      
    case blackKing:
      return checkKing(from, to, player);
  }

  return false;
}

function checkPawn(from, to, player) {

  //check single move
  if(from[1]==to[1] && ((to[0]-from[0])==-player) && board[to[0]*8+to[1]]==0)
    return true;
  
  var home=0;
  
  if(player==1) { home=6; traverse = 0; }
  if(player==-1) { home=1; traverse = 7; }

  
  //check 2 field move (first move), tests: index.html#♜♞♝♛♚♝♞♜♟♟__♟_♟♟__________________♟♙________♙♟__♙♙♙♙♙♙♙♙♖♘♗♕♔♗♘♖
  if(from[1]==to[1] && from[0]==home && ((to[0]-from[0])==-player*2) && board[to[0]*8+to[1]]==0 && board[(to[0]+player)*8+to[1]]==0)
    return true;

  var deltaVertical=to[0]-from[0];
  var deltaHorizontal=Math.abs(to[1]-from[1]);
  var target = board[to[0]*8+to[1]];

  //check beating an opponents chess piece diagonal, tests: index.html#♜♞♝♛♚♝♞♜♟♟♟♟♟♟♟_____♟______♟♟_______♙______♙____♙♙♙__♙♙♙♖♘♗♕♔♗♘♖
  if(deltaHorizontal==1 && deltaVertical*player==-1 && player*target<0)
    return true;

    
  return false;
}

function checkKnight(from, to, player) {

  //check 1 to the side and 2 up or down
  if(Math.abs(from[1]-to[1])==1 && Math.abs(from[0]-to[0])==2 && board[to[0]*8+to[1]]*player<=0)
    return true;
    
  //check 2 to the side and 1 up or down
  if(Math.abs(from[1]-to[1])==2 && Math.abs(from[0]-to[0])==1 && board[to[0]*8+to[1]]*player<=0)
    return true;
    
  return false;
}


function checkBishop(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];

  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)

  var directionVertical=vertical/stepsVertical;
  var directionHorizontal=horizontal/stepsHorizontal;
  


  //check diagonal if move is not diagonal
  if( stepsVertical!=stepsHorizontal )
    return false;

  //check if there is a figure between the start and endpoint
  for(var i=1; i<stepsVertical; i++)
    if(board[(from[0]-i*directionVertical)*8+from[1]-i*directionHorizontal]!=0)
      return false;

  //check if its empty or opponent
  if(board[to[0]*8+to[1]]*player<=0)
    return true;

  return false;
}

function checkRook(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];

  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)

  var directionVertical=vertical/stepsVertical;
  var directionHorizontal=horizontal/stepsHorizontal;


  //check if only vertical or only horizontal
  if ( stepsHorizontal!=0 && stepsVertical!=0 )
  {
    return false;
  }
  
  if(stepsVertical==0)
    for(var i=1; i<stepsHorizontal; i++)
      if(board[from[0]*8+from[1]-i*directionHorizontal]!=0)
        return false;

  if(stepsHorizontal==0)
    for(var i=1; i<stepsVertical; i++)
      if(board[(from[0]-i*directionVertical)*8+from[1]]!=0)
        return false;
        
  //check if its empty or opponent
  if(board[to[0]*8+to[1]]*player<=0)
    return true;        
    
  return false;
    
}

function checkQueen(from, to, player) {

  //reuse the tests from Bishop and Rook  
  return checkBishop(from, to, player) || checkRook(from, to, player);
  
  return false;

}

function checkKing(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];
  
  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)
  
  if( ( stepsVertical==1 && stepsHorizontal==1 || 
        stepsVertical==0 && stepsHorizontal==1 ||
        stepsVertical==1 && stepsHorizontal==0    ) && board[to[0]*8+to[1]]*player<=0 )
    return true;


  return castlingMovePossible([from, to], player);
}



function castlingMovePossible(move, player) {
  if(move[1][0]==7&&move[1][1]==6)   //Check small Castling (rochade) move white
    if(board[move[0][0]*8+move[0][1]]==whiteKing)
      if(board[7*8+5]==emptyField)
        if(board[7*8+6]==emptyField)
          if(board[7*8+7]==whiteRook)
            return true;

  if(move[1][0]==0&&move[1][1]==6)   //Check small Castling (rochade) move black
    if(board[move[0][0]*8+move[0][1]]==blackKing)
      if(board[0*8+5]==emptyField)
        if(board[0*8+6]==emptyField)
          if(board[0*8+7]==blackRook)
              return true;
  return false;
}

function postMoveProcessing(move, player)
{
  console.log("postMoveProcessing: "+move +" p: "+player);
  makeCastlingMove(move, player);
  pawnPromotion(move, player);
}


function castlingMovePossible(move, player) {
  if(move[1][0]==7&&move[1][1]==6)   //Check small Castling (rochade) move white
    if(board[move[0][0]*8+move[0][1]]==whiteKing)
      if(board[7*8+5]==emptyField)
        if(board[7*8+6]==emptyField)
          if(board[7*8+7]==whiteRook)
            return true;

  if(move[1][0]==0&&move[1][1]==6)   //Check small Castling (rochade) move black
    if(board[move[0][0]*8+move[0][1]]==blackKing)
      if(board[0*8+5]==emptyField)
        if(board[0*8+6]==emptyField)
          if(board[0*8+7]==blackRook)
              return true;
  return false;
}


function makeCastlingMove(move, player) {
  var move2=[];
  if(move[FROM][0]==7 && move[FROM][1]==4 && move[TO][0]==7 && move[TO][1]==6)
  {
    move2=[[7,7],[7,5]];
    board[move2[TO][0]*8+move2[TO][1]]=board[move2[FROM][0]*8+move2[FROM][1]];
    board[move2[FROM][0]*8+move2[FROM][1]]=0;
    return [ move2, board[move2[TO][0]*8+move2[TO][1]], board[move2[FROM][0]*8+move2[FROM][1]] ]; //here TO and From is exchanged because the move was already done
  }

  if(move[FROM][0]==0 && move[FROM][1]==4 && move[TO][0]==0 && move[TO][1]==6)
  {
    move2=[[0,7],[0,5]];
    board[move2[TO][0]*8+move2[TO][1]]=board[move2[FROM][0]*8+move2[FROM][1]];
    board[move2[FROM][0]*8+move2[FROM][1]]=0;

    return [ move2, board[move2[TO][0]*8+move2[TO][1]], board[move2[FROM][0]*8+move2[FROM][1]] ];  //here TO and From is exchanged because the move was already done
  }
}


function pawnPromotion(move, player) {
  if(player==1)
    if(board[move[TO][0]*8+move[TO][1]]==whitePawn)
    {
      if(move[TO][0]==0)
      {
        board[move[TO][0]*8+move[TO][1]]=whiteQueen;
        return [move, board[move[FROM][0]*8+move[FROM][1]], board[move[TO][0]*8+move[TO][1]]]
      }
    }

  if(player==-1)
    if(board[move[TO][0]*8+move[TO][1]]==blackPawn)
    {
      if(move[TO][0]==7)
      {
        board[move[TO][0]*8+move[TO][1]]=blackQueen;
        return [move, board[move[FROM][0]*8+move[FROM][1]], board[move[TO][0]*8+move[TO][1]]]
      }
    }
}

