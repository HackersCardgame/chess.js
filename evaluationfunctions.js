
function check(from, to) {
    if(checkPawn(from, to)) return true;

  return false;
}


function checkPawn(from, to) {
  if (document.getElementById(from).innerHTML=="♟") {

    //check single move
    delta = sub(getXY(to), getXY(from));
    if(comp(delta, [0, 1])) return true;

    //check double start move
    if(comp(delta, [0, 2]) && getXY(from)[1]==1) return true;
    
    return false;
  }

  if (document.getElementById(from).innerHTML=="♙") {
    delta = sub(getXY(to), getXY(from));
    if(comp(delta, [0, -1])) return true;
    else return false;
  }

}

function getXY(place) {
  y = place.substring(1,2);
  x = place.substring(2,3);
  return [x, y]
}
