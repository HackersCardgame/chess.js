var debug=true;

var myboard = [ [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0] ];

var valueBefore = 0;

function play() {


  var depth = parseInt(document.getElementById("depth").value);
    var nextMove = minimax(depth, 1, true);
    document.getElementById("output").innerHTML+="White: "+nextMove[0] + " => " + nextMove[1] + "<br>";
    document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).innerHTML = document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML;
    document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML = "";
    document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
    document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
    setTimeout(function(){  resetBoard();  document.getElementById("calc").className=""; }, 2000);
    getBoard();


}

function computerMove() {
  console.log("Computer Move");
  
  //getBoard();
  var depth = parseInt(document.getElementById("depth").value);
  nextMove = minimax(depth, -1, true);
    document.getElementById("output").innerHTML+="White: "+nextMove[0] + " => " + nextMove[1] + "<br>";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).innerHTML = document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML;
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML = "";
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){  resetBoard();
                          document.getElementById("calc").className="";                            }, 3000);
  getBoard();
  //

}

function bothKingExists() {
  var numKings = 0;
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      if (Math.abs(countField(i, j))==100)
        numKings++;
  if(numKings==2) return true;
  return false;
}

function resetBoard() {
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      document.getElementById("f"+i+j).className="";
}



//get list of possible moves
function possibleMoves(player)
{
  oldFigure="";
  var moves=[];

  if(player==1)
    for(var i = 0; i < 8; i++)
      for(var j = 0; j < 8; j++)
        if (isWhite(myboard[i][j]))
          for(var k = 0; k < 8; k ++)
            for(var l = 0; l < 8; l++)
            {
              if( check( [i,j], [k, l] ) )
              {
                moves.push([[i, j], [k, l]]);
              }
            }

  if(player==-1)
    for(var i = 0; i < 8; i++)
      for(var j = 0; j < 8; j++)
        if (isBlack(myboard[i][j]))
          for(var k = 0; k < 8; k ++)
            for(var l = 0; l < 8; l++)
            {
              if( check( [i,j], [k, l] ) )
              {
                moves.push([[i, j], [k, l]]);
              }
            }

  return moves;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//white = maximizing  // black = minimizing
function evaluateBoard() {
  var points=0;
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
    {
      points+=countField(i, j);
      //console.log(points);
    }
  return points;
}

function countField(i, j)
{

  switch (myboard[i][j]) {
    case "♔": return  100;   //white maximizing
    case "♕": return   50;
    case "♖": return   30;
    case "♗": return   20;
    case "♘": return   15;
    case "♙": return    5;
    
    case "♚": return -100;  //black minimizing
    case "♛": return   -50;
    case "♜": return   -30;
    case "♝": return   -20;
    case "♞": return   -15;
    case "♟": return    -5;
  }
    return 0;
    
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//minmax algorithm that does the game
function minimax(depth, player, init)
{
  var valueArray = [];

  var bestMove = [[0,0],[0,0]];    

  if(depth < 1) return evaluateBoard();

  var moves = shuffle(possibleMoves(player));

    var bestValue=-1000000*player;
    for(var i = 0; i < moves.length; i++)
    {
        FROM = 0; TO = 1; X = 0; Y = 1;

        //Make the move
        var rollback = myboard[moves[i][TO][X]][moves[i][TO][Y]];
        myboard[moves[i][TO][X]][moves[i][TO][Y]] = myboard[moves[i][FROM][X]][moves[i][FROM][Y]];
        myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = "";

        var value = minimax(depth-1, -1*player, false);
        
        if(player==1)        
        if(value>bestValue)
        {
          bestValue = value;
          bestMove = moves[i];
        }
        
        if(player==-1)
        if(value<bestValue)
        {
          bestValue = value;
          bestMove = moves[i];
        }

        //Revert the move
        myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = myboard[moves[i][TO][X]][moves[i][TO][Y]];
        myboard[moves[i][TO][X]][moves[i][TO][Y]] = rollback;
    }

  //we return the points except the first move we return the move to play    
  if (init) return bestMove;
  else return bestValue;

}

