
function check(from, to) {

    //console.log(from + " " + to);
    if(from[0]==to[0]&&from[1]==to[1]) return false;  //TODO: überall anders auch einbauen oder hier rausnehmen und debuggen

    //console.log("CHECK: "+from+" => "+to);
    if(checkPawn(from, to)) return true;

    if(checkKnight(from, to)) return true;

    if(checkBishop(from, to)) return true;
    
    if(checkRook(from, to)) return true;
    
    if(checkQueen(from, to)) return true;
    
    if(checkKing(from, to)) return true;

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
    if(comp(delta, [2*player, 0]) && isEmpty([from[0]+player,from[1]]) && ((from[0]==1 ||from[0]==6))) 
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
      //console.log([(k*-1)*2, (l*-1)*1]);
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

blackKingMoved=false;
whiteKingMoved=false;

//TODO: Rochade programmieren: https://de.wikipedia.org/wiki/Rochade
function checkKing(from, to) {
  player = 0;
  if (myboard[from[0]][from[1]]=="♚") 
    player = 1;
  if (myboard[from[0]][from[1]]=="♔") 
    player = -1;

  if(player == 0) return false;

  delta = sub(to, from);
  
  //TODO: rochade und ersten zug einbauen
  if(Math.abs(delta[0])>1 || Math.abs(delta[1])>1)
  {
    return false;
  }
    
  return checkDiagonal(from, to) || checkStraight(from, to);
}


function isEnemy(from, to) {
  me = myboard[from[0]][from[1]];
  he = myboard[to[0]][to[1]];
  if(me == "♕" || me == "♔" || me == "♗" || me == "♘" || me == "♖" || me == "♙")
    if(he == "♛" || he == "♚" || he == "♝" || he == "♞" || he == "♜" || he == "♟")
      return true;

  if(me == "♛" || me == "♚" || me == "♝" || me == "♞" || me == "♜" || me == "♟")
    if(he == "♕" || he == "♔" || he == "♗" || he == "♘" || he == "♖" || he == "♙")
      return true;
      
  return false;      
}

function isEmpty(to) {
  //console.log(to);
  target = myboard[to[0]][to[1]];

  if(target == "♕" || target == "♔" || target == "♗" || target == "♘" || target == "♖" || target == "♙" ||
     target == "♛" || target == "♚" || target == "♝" || target == "♞" || target == "♜" || target == "♟" ) 
    return false;
  return true;
}

