
var blackKingMoved=false;
var whiteKingMoved=false;
var blackT1Moved=false;
var blackT2Moved=false;
var whiteT1Moved=false;
var whiteT2Moved=false;

function checking(from, to, realMove, player) {
    if(from[0]==to[0]&&from[1]==to[1]) return false;
    
    if(realMove)
      if(isCheck(player, [from, to]))
        return false;

    if(checkPawn(from, to)) return true;

    if(checkKnight(from, to))
    {
      if(comp(from, [7,4]))
        whiteKingMoved=true; 

      if(comp(from, [0,4]))
        blackKingMoved=true;

      return true;
    }

    if(checkBishop(from, to)) return true;
    
    if(checkRook(from, to))
    {
      if(comp(from, [7,0]))
        if (realMove) whiteT1Moved=true;
      if(comp(from, [7,7]))
        if (realMove) whiteT2Moved=true;

      if(comp(from, [0,0]))
        if (realMove) blackT1Moved=true;
      if(comp(from, [0,7]))
        if (realMove) blackT2Moved=true;

      return true;
    }
    
    if(checkQueen(from, to)) return true;
    
    if(checkKing(from, to, realMove))
    {

      if(comp(from, [7,4]))
        if (realMove) whiteKingMoved=true;

      if(comp(from, [0,4]))
        if (realMove) blackKingMoved=true;
        
      return true;
    }

  return false;
}


function checkPawn(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♟") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♙") 
    player = -1;
  
  if(player == 0) return false;

    //check single move
    delta = sub(to, from);
    if(comp(delta, [1*player, 0]) && !isEnemy(from,to) && isEmpty(to)) return true;
    1
    //check double start move
    if(comp(delta, [2*player, 0]) && isEmpty([to[0],to[1]]) && isEmpty([from[0]+player,from[1]]) && (from[0]==1 ||from[0]==6)) 
      if(!isEnemy(from, to))
        return true;
    
    //check diagonal 1 when attacking enemy
    if( ( comp(delta, [1*player, 1*player]) && isEnemy(from, to) ) || ( comp(delta, [1*player, -1*player]) && isEnemy(from, to) ) ) return true;

    return false;

}


function checkKnight(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♞") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♘") 
    player = -1;

  if(player == 0) return false;

  //check if move is an 2 by 1 move in each direction with a for loop
  delta = sub(to, from);

  for(var i = 0; i < 2; i++)
    for(var j = 0; j < 2; j++)
    {
      if(i==0) k=1;
      else k=-1;
      if(j==0) l=1;
      else l=-1;

      if(comp(delta, [(k*-1)*2, (l*-1)*1]) )
        if(isEmpty(to) || isEnemy(from, to))
          return true;
      if(comp(delta, [(k*-1)*1, (l*-1)*2]) )
        if(isEmpty(to) || isEnemy(from, to))
          return true;
     }
     return false;
}

function checkBishop(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♝") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♗") 
    player = -1;

  if(player == 0) return false;

  return checkDiagonal(from, to);
}


function checkDiagonal(from, to) {

  //check if move is diagonal
  delta = sub(to, from);

  if(Math.abs(delta[0])!=Math.abs(delta[1])) return false;  //TODO: without this line there is still a bug, why?
  
  var direction = [0, 0];
  var step = [0, 0];
  direction[0] = Math.sign(delta[0]);
  direction[1] = Math.sign(delta[1]);
  delta[0] = Math.abs(delta[0]);
  delta[1] = Math.abs(delta[1]);

  for(var i=1; i<delta[0]+1; i++)
  {
    step[0] = from[0]+(direction[0]*scalar([1 ,1], i)[0]);
    step[1] = from[1]+(direction[1]*scalar([1 ,1], i)[1]);
    if(!isEmpty(step))
    {
      if(i==delta[0] && isEnemy(from, to))
        return true;
      return false;
    }
    if(comp(delta, scalar([1, 1], i)))
      return true;
  }

  return false;

}

function checkRook(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♜") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♖") 
    player = -1;

  if(player == 0) return false;

  return checkStraight(from, to);

}

function checkStraight(from, to) {
  //check if move is straight
  delta = sub(to, from);

  //check if there are any obstacles vertically
  if (delta[0]==0)
    for(var i=1; i<Math.abs(delta[1])+1; i++)
    {
      field = [];
      field[0] = from[0];
      field[1] = from[1]+i*Math.sign(delta[1]);

      if(!isEmpty(field))
      {
        if (i==Math.abs(delta[1]) && isEnemy(from, to))
          return true;
        return false;
      }
    }


  //check if there are any obstacles horizontaly
  if (delta[1]==0)
    for(var i=1; i<Math.abs(delta[0])+1; i++)
    {
      field = [];
      field[0] = from[0]+i*Math.sign(delta[0]);
      field[1] = from[1];

      if(!isEmpty(field))
      {
        if (i==Math.abs(delta[0]) && isEnemy(from, to))
          return true;
        return false;
      }
    }

  //if there is noting between start and endpoint and we move only straight we return true
  if (delta[0]==0 || delta[1]==0)
    return true;



  return false;
  
}


function checkQueen(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♛") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♕") 
    player = -1;

  if(player == 0) return false;
  
  return checkDiagonal(from, to) || checkStraight(from, to);
}


//TODO: Rochade programmieren: https://de.wikipedia.org/wiki/Rochade
function checkKing(from, to, realMove) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♚") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♔") 
    player = -1;

  if(player == 0) return false;
  
  if(isWhite(getFigure([from,to])))
    if(!whiteKingMoved && !whiteT2Moved)
      if(comp(from, [7, 4]) && comp(to, [7, 6]) && realMove)
      {
        myboard[7][5]=myboard[7][7];
        myboard[7][7]="";
        return true;
      }

  if(isWhite(getFigure([from,to])))
    if(!whiteKingMoved && !whiteT2Moved)
      if(comp(from, [7, 4]) && comp(to, [7, 2]) && realMove)
      {
        myboard[7][3]=myboard[7][0];
        myboard[7][0]="";
        return true;
      }
  
  if(isBlack(getFigure([from,to])))
    if(!blackKingMoved && !blackT2Moved)
      if(comp(from, [0, 4]) && comp(to, [0, 6]) && realMove)
      {
        myboard[0][5]=myboard[0][7];
        myboard[0][7]="";
        return true;
      }

  if(isBlack(getFigure([from,to])))
    if(!blackKingMoved && !blackT2Moved)
      if(comp(from, [0, 4]) && comp(to, [0, 2]) && realMove)
      {
        myboard[0][3]=myboard[0][0];
        myboard[0][0]="";
        return true;
      }

  delta = sub(to, from);
  
  //TODO: rochade und ersten zug einbauen
  if(Math.abs(delta[0])>1 || Math.abs(delta[1])>1)
  {
    return false;
  }
    
  return checkDiagonal(from, to) || checkStraight(from, to);
}


function isCheck(player, tempMove) {  //TODO: check and checkmate checking very ugly, maybe add tempBoard but this would affect performance
  FROM = 0; TO = 1; X = 0; Y = 1;

  tempBoard = copyArray(myboard);

  var rollbacktemp = myboard[tempMove[TO][X]][tempMove[TO][Y]];
  myboard[tempMove[TO][X]][tempMove[TO][Y]]=myboard[tempMove[FROM][X]][tempMove[FROM][Y]];
  myboard[tempMove[FROM][X]][tempMove[FROM][Y]]="";
    
  currentPoints = evaluateBoard();
  var moves = possibleMoves(-player);
  
  for(var i = 0; i<moves.length; i++)
  {
    //Make the move
    var rollback = myboard[moves[i][TO][X]][moves[i][TO][Y]];
    myboard[moves[i][TO][X]][moves[i][TO][Y]] = myboard[moves[i][FROM][X]][moves[i][FROM][Y]];
    myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = "";
    
    newPoints = evaluateBoard();
    difference = currentPoints-newPoints;
    if(difference==(player*100))
    {
      console.log("IS CHECK");
      return true;
    }
    //Revert the move
    myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = myboard[moves[i][TO][X]][moves[i][TO][Y]];
    myboard[moves[i][TO][X]][moves[i][TO][Y]] = rollback;
   }
   
  //Revert the Tempmove
  myboard[tempMove[FROM][X]][tempMove[FROM][Y]] = myboard[tempMove[TO][X]][tempMove[TO][Y]];
  myboard[tempMove[TO][X]][tempMove[TO][Y]] = rollbacktemp;

  return false;
}

function isInCheck(player) {
  FROM = 0; TO = 1; X = 0; Y = 1;

  var moves = possibleMoves(-player);
  
  for(var i=0; i<moves.length; i++)
  {
    if(player=-1)
      if(myboard[moves[i][TO][X]][moves[i][TO][Y]]=="♚")
        return true;
      
    if(player=1)
      if(myboard[moves[i][TO][X]][moves[i][TO][Y]]=="♔")
        return true;
  }
  return false;
}
