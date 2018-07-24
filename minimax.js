var debug=true;

var  myboard = [ [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0] ];

var valueBefore = 0;

function computerMove() {
  console.log("Computer Move");

  
  //getBoard();
  valueBefore = evaluateBoard();
  nextMove = minimax(3, -1, true);
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).innerHTML = document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML;
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML = "";
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){  resetBoard();
                          document.getElementById("calc").className="";                            }, 3000);
  getBoard();
  //

}

function resetBoard() {
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      document.getElementById("f"+i+j).className="";
}



//get list of possible moves
function possibleMoves()
{
  oldFigure="";
  var moves=[];
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
    
    case "♚": return -1000;  //black minimizing
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
  console.log("ENTER Depth: "+depth+" P: "+player + " Parent: "+parent);
  var valueArray = [];

  var bestMove = [[0,0],[0,0]];    

  if(depth < 2) return evaluateBoard();

  console.log("checkpoint");
  var moves = shuffle(possibleMoves());

  console.log(moves);

  //maximizing player  

    var bestValue=-1000000*player;
    for(var i = 0; i < moves.length; i++)
    {
    
       if (debug) console.log("LOOP P: "+player+ " board: "+myboard + " EVAL: "+evaluateBoard() + " " +
                              myboard[moves[i][0][0]][moves[i][0][1]] +": "+
                              moves[i][0][0]+"."+moves[i][0][1] +" ==> "+moves[i][1][0]+"."+moves[i][1][1]);


        //Make the move
        rollback = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = myboard[moves[i][0][0]][moves[i][0][1]];
        myboard[moves[i][0][0]][moves[i][0][1]] = "";

        
        var value = minimax(depth-1, -1*player, false, handler);
        
        valueArray.push([value, "_", moves[i][0],"=>", moves[i][1]]);

        if(player==1)        
        if(value>bestValue)
        {
          bestValue = value;
          bestMove = moves[i].slice();
        }
        
        if(player==-1)
        if(value<bestValue)
        {
          bestValue = value;
          bestMove = moves[i].slice();
        }
        

        myboard[moves[i][0][0]][moves[i][0][1]] = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = rollback;
    }

    if(debug) console.log(" Values: " + valueArray + " best: " + bestValue + " BestMove: " + bestMove);  
  if (init) 
  {

    return bestMove;
  }
  else return bestValue;

}

