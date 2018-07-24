var myboard = [ [0,0,0,0,0,0,0,0],
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
  getBoard();
  valueBefore = evaluateBoard();
  nextMove = minimax(4, -1, true);
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).innerHTML = document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML;
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).innerHTML = "";
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){ 
                          document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="";
                          document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className=""; }, 3000);
  getBoard(); 
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

//white = maximizing  // black = minimizing
function evaluateBoard() {
  points=0;
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      points+=countField(i, j);
  return points;
}

function countField(i, j)
{
  switch (myboard[i][j]) {
    case "♔": return 1000;   //white maximizing
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


//minmax algorithm that does the game
function minimax(depth, player, init)
{

  var moves = possibleMoves();

  var bestMove = [[0,0],[0,0]];    

  if(depth < 1) return valueBefore-evaluateBoard();


  //maximizing player  
  if(player==1)
  {
    var bestValue=-1000000;
    for(var i = 0; i < moves.length; i++)
    {

        rollback = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = myboard[moves[i][0][0]][moves[i][0][1]];
        myboard[moves[i][0][0]][moves[i][0][1]] = "";
   
        var value = minimax(depth-1, -player, false);
        

        if(value>bestValue)
        {
          bestValue = value;
          bestMove = moves[i].slice();
        }

        myboard[moves[i][0][0]][moves[i][0][1]] = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = rollback;
    }
  }
  
  //minimizing player  
  if(player==-1)
  {
    var bestValue=1000000;
    for(var i = 0; i < moves.length; i++)
    {
        rollback = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = myboard[moves[i][0][0]][moves[i][0][1]];
        myboard[moves[i][0][0]][moves[i][0][1]] = "";
   
        var value = minimax(depth-1, -player, false);

        if(value<bestValue)
        {
          bestValue = value;
          bestMove = moves[i].slice();
        }

        myboard[moves[i][0][0]][moves[i][0][1]] = myboard[moves[i][1][0]][moves[i][1][1]];
        myboard[moves[i][1][0]][moves[i][1][1]] = rollback;
    }
  }
  
  if (init) 
  {
    return bestMove;
  }
  else return bestValue;

}

