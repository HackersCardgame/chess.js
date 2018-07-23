
function check(from, to) {
    if(checkPawn(from, to)) return true;

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
