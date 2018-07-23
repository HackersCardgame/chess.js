
function check(from, to) {
    if(checkPawn(from, to)) return true;

    if(checkKnight(from, to)) return true;

    if(checkBishop(from, to)) return true;

  return false;
}


function checkPawn(from, to) {
  player = 0;
  if (document.getElementById(from).innerHTML=="♟") 
    player = 1;
  if (document.getElementById(from).innerHTML=="♙") 
    player = -1;
  
  if(player == 0) return false;

    //check single move
    delta = sub(getXY(to), getXY(from));
    if(comp(delta, [0, 1*player]) && !isEnemy(from,to)) return true;

    //check double start move
    if(comp(delta, [0, 2*player]) && (getXY(from)[1]==1 ||getXY(from)[1]==6)) return true;
    
    //check diagonal 1 when attacking enemy
    if( ( comp(delta, [1*player, 1*player]) && isEnemy(from, to) ) || ( comp(delta, [-1*player, 1*player]) && isEnemy(from, to) ) ) return true;

    return false;

}


function checkKnight(from, to) {
  player = 0;
  if (document.getElementById(from).innerHTML=="♞") 
    player = 1;
  if (document.getElementById(from).innerHTML=="♘") 
    player = -1;

  if(player == 0) return false;


  //check if move is an 2 by 1 move in each direction with a for loop
  delta = sub(getXY(to), getXY(from));

  for(var i = 0; i < 2; i++)
    for(var j = 0; j < 2; j++)
    {
      if(i==0) k=1;
      else k=-1;
      if(j==0) l=1;
      else l=-1;
      console.log([(k*-1)*2, (l*-1)*1]);
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
  if (document.getElementById(from).innerHTML=="♝") 
    player = 1;
  if (document.getElementById(from).innerHTML=="♗") 
    player = -1;

  if(player == 0) return false;

  //check if move is diagonal
  delta = sub(getXY(to), getXY(from));
  delta[0] = Math.abs(delta[0]);
  delta[1] = Math.abs(delta[1]);

  for(var i=0; i<8; i++)
  {
    console.log(scalar([1, 1], i));
    if(comp(delta, scalar([1, 1], i)))
      return true;
  }

  return false;

}


function getXY(place) {
  y = place.substring(1,2);
  x = place.substring(2,3);
  return [x, y]
}

function isEnemy(from, to) {
  me = document.getElementById(from).innerHTML;
  he = document.getElementById(to).innerHTML;
  if(me == "♕" || me == "♔" || me == "♗" || me == "♘" || me == "♖" || me == "♙")
    if(he == "♛" || he == "♚" || he == "♝" || he == "♞" || he == "♜" || he == "♟")
      return true;

  if(me == "♛" || me == "♚" || me == "♝" || me == "♞" || me == "♜" || me == "♟")
    if(he == "♕" || he == "♔" || he == "♗" || he == "♘" || he == "♖" || he == "♙")
      return true;
      
  return false;      
}

function isEmpty(to) {
  target = document.getElementById(to).innerHTML;

  if(target == "♕" || target == "♔" || target == "♗" || target == "♘" || target == "♖" || target == "♙" ||
     target == "♛" || target == "♚" || target == "♝" || target == "♞" || target == "♜" || target == "♟" ) 
    return false;
  return true;
}

