
//fields in html code
fields = [["f00", "f01", "f02", "f03", "f04", "f05", "f06","f07"],
          ["f10", "f11", "f12", "f13", "f14", "f15", "f16","f17"],
          ["f20", "f21", "f22", "f23", "f24", "f25", "f26","f27"],
          ["f30", "f31", "f32", "f33", "f34", "f35", "f36","f37"],
          ["f40", "f41", "f42", "f43", "f44", "f45", "f46","f47"],
          ["f50", "f51", "f52", "f53", "f54", "f55", "f56","f57"],
          ["f60", "f61", "f62", "f63", "f64", "f65", "f66","f67"],
          ["f70", "f71", "f72", "f73", "f74", "f75", "f76","f77"]];

boardHistory = [];

//set the colors from the chessboard the lazy way
function colorizeHtml() {
  console.log("colorizeHtml()");
  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      if((i+j)%2==0) document.getElementById(fields[i][j]).style.backgroundColor = "blanchedalmond";
      else document.getElementById(fields[i][j]).style.backgroundColor = "peru";
    }
  }
}

function drawBoardToConsole()
{
  var line="";
  for(var i = 0; i<8; i++)
  {
    for(var j = 0; j<8; j++)
    {
      if(myboard[i][j]=="")
        line+= " _ ";
      else
        line+= " "+myboard[i][j]+" ";
    }
    console.log(line);
    line="";
  }

}

function getFieldCoord(description)
{
  for(var i=0; i<8; i++)
    for(var j=0; j<8; j++)
      if(fields[i][j] == description)
       return [i, j];
}

var firstSelected = "";
var secondSelected  = "";

//register mouselistener to fields
function registerMouselistener() {

  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      document.getElementById(fields[i][j]).onclick = function( event ) {
        getBoard();
        if(!bothKingExists()) return;  //TODO: alte variante, neu machen
        if (firstSelected=="") {
          if (document.getElementById(event.target.id).innerHTML=="") return;
          document.getElementById(event.target.id).className="selected";
          firstSelected=getFieldCoord(event.target.id);
        }
        else {
          secondSelected=getFieldCoord(event.target.id);
          if(checking(firstSelected, secondSelected, true, 1)==false)
          {
            document.getElementById(fields[firstSelected[0]][firstSelected[1]]).className="";
            firstSelected="";
            return false;
          }
          boardHistory.push(copyArray(myboard));
          historyPointer+=1;
          document.getElementById(fields[firstSelected[0]][firstSelected[1]]).className="";
          myboard[secondSelected[0]][secondSelected[1]]=myboard[firstSelected[0]][firstSelected[1]];
          //document.getElementById(event.target.id).innerHTML = document.getElementById(fields[firstSelected[0]][firstSelected[1]]).innerHTML;
          myboard[firstSelected[0]][firstSelected[1]]="";
          //document.getElementById(fields[firstSelected[0]][firstSelected[1]]).innerHTML="";
          document.getElementById("output").innerHTML+="White: " + getFigure([firstSelected, getFieldCoord(event.target.id)]) + " " +firstSelected +" => " + getFieldCoord(event.target.id)+"<br>" ;
          firstSelected="";
          secondSelected="";
          drawBoard();
          document.getElementById("lostBlack").innerHTML = getLostFigures(-1);
          setTimeout(function(){ moveBlack(); }, 1000);
          setTimeout(function(){ document.getElementById("calc").className="selected";   }, 100);
        }
      }
    }
  }
}



function getBoard() {
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      myboard[i][j] = document.getElementById("f"+i+j).innerHTML;
}

function drawBoard() {
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      document.getElementById("f"+i+j).innerHTML=myboard[i][j];
}

function getFigure(move) {
  return myboard[move[0][0]][move[0][1]];
}


function isBlack(field) {
  figures = ["♛", "♚", "♝", "♞", "♜", "♟"];
  if(figures.includes(field))
    return true;
  return false;
}

function isWhite(field) {
  figures = ["♕", "♔", "♗", "♘", "♖", "♙"]
  if(figures.includes(field))
    return true;
  return false;
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

function getLostFigures(player) {
  if(player==1) figures = ["♕", "♔", "♗", "♗", "♘","♘", "♖", "♖", "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"];
  if(player==-1) figures = ["♛", "♚", "♝", "♝", "♞", "♞", "♜", "♜", "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"];

  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      for(var k = 0; k<16; k++)
        if(myboard[i][j]==figures[k]) { figures[k]=""; break;}
  return figures.join("");
}



function importFromURL() {
  if(window.location.hash=="") return;
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
    {
      if(decodeURIComponent(window.location.hash).replace("#", "").substring(0+i*8+j,1+i*8+j)=="_")
        document.getElementById("f"+i+j).innerHTML="";
      else
      //console.log(decodeURIComponent(window.location.hash).replace("#", "").substring(2*i*8+j,1+i*8+j));
        document.getElementById("f"+i+j).innerHTML=decodeURIComponent(window.location.hash).replace("#", "").substring(0+i*8+j,1+i*8+j);
    }
    getBoard();
}

function exportToURL() {
  window.location.hash="";
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      if(document.getElementById("f"+i+j).innerHTML=="")
        window.location.hash+="_";
      else
        window.location.hash+=document.getElementById("f"+i+j).innerHTML;
}

function copyArray(source) {
  var destination = [];

  for (var i = 0; i < source.length; i++)
    destination[i] = source[i].slice();
  
  return destination;
}

var historyPointer=0;

function revert(index) {
  historyPointer-=index;
  current = boardHistory.pop();
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      myboard[i][j] = current[i][j];
  drawBoardToConsole(myboard);
  drawBoardToConsole(boardHistory);
  drawBoard();
}