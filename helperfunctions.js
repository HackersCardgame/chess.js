function print(text)
{
  console.log(text);
}

function println(text)
{
  console.log(text);
}



//fields in html code
fields = [["f00", "f01", "f02", "f03", "f04", "f05", "f06","f07"],
          ["f10", "f11", "f12", "f13", "f14", "f15", "f16","f17"],
          ["f20", "f21", "f22", "f23", "f24", "f25", "f26","f27"],
          ["f30", "f31", "f32", "f33", "f34", "f35", "f36","f37"],
          ["f40", "f41", "f42", "f43", "f44", "f45", "f46","f47"],
          ["f50", "f51", "f52", "f53", "f54", "f55", "f56","f57"],
          ["f60", "f61", "f62", "f63", "f64", "f65", "f66","f67"],
          ["f70", "f71", "f72", "f73", "f74", "f75", "f76","f77"]];



//register mouselistener to fields
function colorizeHtml() {
  console.log("colorizeHtml()");
  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      if((i+j)%2==0) document.getElementById(fields[i][j]).style.backgroundColor = "blanchedalmond";
      else document.getElementById(fields[i][j]).style.backgroundColor = "peru";
    }
  }
}

firstSelected = "";

//register mouselistener to fields
function registerMouselistener() {
  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      document.getElementById(fields[i][j]).onclick = function( event ) {
        console.log(event.target.id);
        if (firstSelected=="") {
          if (document.getElementById(event.target.id).innerHTML=="") return;
          document.getElementById(event.target.id).className="selected";
          firstSelected=event.target.id;
        }
        else {
          if(check(firstSelected, event.target.id)==false) {
            document.getElementById(firstSelected).className="";
            firstSelected="";
            return false;
          }
          document.getElementById(firstSelected).className="";
          console.log(document.getElementById(firstSelected).innerHTML);
          console.log(getXY(firstSelected) + " => " + getXY(event.target.id) + ": " + sub(getXY(event.target.id), getXY(firstSelected)) );
          document.getElementById(event.target.id).innerHTML = document.getElementById(firstSelected).innerHTML;
          document.getElementById(firstSelected).innerHTML="";
          firstSelected="";
        }
      }
    }
  }
}

function reset() {
  for(var i = 0; i < 3; i++)
    for(var j = 0; j < 3; j++)
       myboard[i][j]=0;
  drawToHtml();
  document.getElementById("output").innerHTML="";
}

//draw board to html
function drawToHtml() {
  for (var i = 0; i<3; i++) {
    for (var j = 0; j<3; j++) {
      if(myboard[i][j]==0)
        document.getElementById(fields[i][j]).innerHTML= "_";
      if(myboard[i][j]==1)
        document.getElementById(fields[i][j]).innerHTML= "o";
      if(myboard[i][j]==-1)
        document.getElementById(fields[i][j]).innerHTML= "x";
    }
  }
}


//find out if someone won the game
function win(localBoard)
{
  var total = 0;
  max=0;
  for(var i = 0; i < 3; i++)
  {
    var sum = localBoard[i][0]+localBoard[i][1]+localBoard[i][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  }
  for(var i = 0; i < 3; i++)
  {
    var sum = localBoard[0][i]+localBoard[1][i]+localBoard[2][i];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  }
  var sum = localBoard[0][0]+localBoard[1][1]+localBoard[2][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;

  var sum = localBoard[2][0]+localBoard[1][1]+localBoard[0][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  //console.log("Total: " + total);
  return max;
}

//get list of possible moves
function possibleMoves(localBoard)
{
  //if(win(localBoard)!=0) return "";
  var moves=[];
  for (var i=0; i<3; i++)
    for (var j=0; j<3; j++)
      if(localBoard[i][j]==0)
        moves.push([i,j]);
  return moves;
}

function sub(a, b) {
  var x = a.map(function(item, index) {
    // In this case item correspond to currentValue of array a, 
    // using index to get value from array b
    return item - b[index];
  })
  return x;
}

function add(a, b) {
  var x = a.map(function(item, index) {
    // In this case item correspond to currentValue of array a, 
    // using index to get value from array b
    return item + b[index];
  })
  return x;
}

function scalar(a, scalar) {
  return a.map(function(x) { return x * scalar; });
}


function comp(a, b) {
  var x = a.map(function(item, index) {
    // In this case item correspond to currentValue of array a, 
    // using index to get value from array b
    return (item == b[index]);
  })
  return x[0] && x[1];
}

