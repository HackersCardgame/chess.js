
function check(from, to) {
    if(checkPawn(from, to)) return true;

    if(checkKnight(from, to)) return true;

    if(checkBishop(from, to)) return true;
    
    if(checkRook(from, to)) return true;

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
  var direction = [0, 0];
  var step = [0, 0];
  direction[0] = Math.sign(delta[0]);
  direction[1] = Math.sign(delta[1]);
  delta[0] = Math.abs(delta[0]);
  delta[1] = Math.abs(delta[1]);

  for(var i=1; i<delta[0]+1; i++)
  {
    step[1] = getXY(from)[0]+(direction[0]*scalar([1 ,1], i)[0]);
    step[0] = getXY(from)[1]+(direction[1]*scalar([1 ,1], i)[1]);
    if(!isEmpty("f"+step[0]+step[1]))
    {
      if(i==delta[0] && isEnemy(from, to))
        return true;
      console.log("return for non-empty");
      return false;
    }
    console.log(comp(delta, scalar([1, 1], i)));
    console.log(delta);
    console.log(scalar([1, 1], i));
    if(comp(delta, scalar([1, 1], i)))
      return true;
  }

  return false;

}

function checkRook(from, to) {
  player = 0;
  if (document.getElementById(from).innerHTML=="♜") 
    player = 1;
  if (document.getElementById(from).innerHTML=="♖") 
    player = -1;

  if(player == 0) return false;

  //check if move is straight
  delta = sub(getXY(to), getXY(from));

  //check if there are any obstacles vertically
  if (delta[0]==0)
    for(var i=1; i<Math.abs(delta[1])+1; i++)
    {
      field = "f"+(getXY(from)[1]+i*Math.sign(delta[1]))+(getXY(from)[0]);

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
      field = "f"+(getXY(from)[1])+(getXY(from)[0]+i*Math.sign(delta[0]));

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



function getXY(place) {
  y = parseInt(place.substring(1,2));
  x = parseInt(place.substring(2,3));
  return [x, y]
}

function isEnemy(from, to) {
  console.log("IS ENEMY "+to);
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
  //console.log(to);
  target = document.getElementById(to).innerHTML;

  if(target == "♕" || target == "♔" || target == "♗" || target == "♘" || target == "♖" || target == "♙" ||
     target == "♛" || target == "♚" || target == "♝" || target == "♞" || target == "♜" || target == "♟" ) 
    return false;
  return true;
}

