
var start=0;
var end=0;


function moveWhite() {
  start = new Date().getTime();
  move(1);
  end = new Date().getTime();
  time = (end-start)/1000;
  document.getElementById("white").innerHTML="turn White ("+time+"s)";
}


function moveBlack() {
  start = new Date().getTime();
  move(-1);
  end = new Date().getTime();
  time = (end-start)/1000;
  document.getElementById("black").innerHTML="turn Black ("+parseInt(time)+"s)";
}



function move(player) {
  var depth = parseInt(document.getElementById("depth").value);
  var nextMove = minimax(depth, player, true, false);
  //nextMove = alphabeta(depth, player, true, -1000000, 1000000);
  
  if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) openModal("win");
  
  save();
  //move logging
  document.getElementById("output").innerHTML+= getFigure(nextMove) + " " + getVerticalLetter(nextMove[0][0])+getHorizontalNumber(nextMove[0][1]) + " => " + getVerticalLetter(nextMove[1][0]) + getHorizontalNumber(nextMove[1][1]) + "<br>";
  
  board[nextMove[1][0]*8+nextMove[1][1]]=board[nextMove[0][0]*8+nextMove[0][1]];
  board[nextMove[0][0]*8+nextMove[0][1]]=""
  postMoveProcessing(nextMove, player);
   
  drawBoard();
  document.getElementById("lostWhite").innerHTML = getLostFigures(1);
  
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  //console.log("f"+nextMove[0][0]+nextMove[0][1]);
  setTimeout(function(){ document.getElementById("white").className=""; }, 100);
  setTimeout(function(){ document.getElementById("black").className=""; }, 100);
  if(player==1) setTimeout(function(){ document.getElementById("black").className="selected";   }, 1000);
  else setTimeout(function(){ document.getElementById("white").className="selected";   }, 1000);



  var nextMove = minimax(1, -player, true, false);
  //var nextMove = alphabeta(depth, player, true, -1000000, 1000000);
    if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) 
    {
      openModal("checkmate");
    }
    else if(isInCheck(-player)) openModal("check");
    //console.log(nextMove);

  setTimeout(function(){  resetBoard(); }, 5000);

}
