var myboard = [ [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0] ];

function computerMove() {
  console.log("Computer Move");
  getBoard();
  console.log(myboard);
  console.log(possibleMoves());
  console.log(minimax(5, -1, false));
}


//get list of possible moves
function possibleMoves()
{
  oldFigure="";
  valueBevore = evaluateBoard();
  var moves=[];
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      if (isBlack(myboard[i][j]))
        for(var k = 0; k < 8; k ++)
          for(var l = 0; l < 8; l++)
          {
            //console.log("f"+i+j+" => "+"f"+k+l+ ": "+ check("f"+i+j, "f"+k+l));
            //console.log("counters: "+i+" "+j+" "+k+" "+l);
            if( check("f"+i+j, "f"+k+l) )
            {
              oldFigure = myboard[k][l];
              myboard[k][l] = myboard[i][j];
              myboard[i][j] = "";
              difference = evaluateBoard()-valueBevore;
              //console.log(myboard);
              moves.push(["f"+i+j, "f"+k+l, difference]);
              myboard[i][j]=myboard[k][l];
              myboard[k][l]=oldFigure;
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
  // ["♕", "♔", "♗", "♘", "♖", "♙"]
  // ["♛", "♚", "♝", "♞", "♜", "♟"]

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
  //console.log("minimax("+depth+", "+player+")");
  
  var moves = possibleMoves();
  //console.log(moves);
  var maxPoints = [0, 0, 0];
  var bestMove = [0, 0, 0];
  
  for(var i = 0; i < moves.length; i++)
  {
    //maximizing player
    if(player==1)
      if(maxPoints[2] < moves[i][2])
      {
        maxPoints = moves[i].slice();
      }
    //minimizing player
    if(player==-1)
      if(maxPoints[2] > moves[i][2])
      {
        maxPoints = moves[i].slice();
      }
  }


  if(depth < 1) return maxPoints;
  depth -= 1;

  //maximizing player  
  if(player==1)
  {
    bestMove=[0,0,-1000000];
    for(var i = 0; i < moves.length; i++)
    {
      if(moves[i][2]==maxPoints[2])
      {
        var myArray = minimax(depth-1, -player, false);
        //console.log("Myarray >:"+myArray+" bestMove: "+bestMove);
        if(myArray[2]>bestMove[2])
        {
          bestMove=moves[i].slice();
          //console.log("BETTER");
        }
      }
    }
  }

  if(player==-1)
  {
    bestMove=[0,0,1000000];
    for(var i = 0; i < moves.length; i++)
    {
      if(moves[i][2]==maxPoints[2])
      {
        //console.log("checkp2:"+moves[i]);
        var myArray = minimax(depth-1, -player, false);
        //console.log("Myarray <:"+myArray+" bestMove: "+bestMove);
        if(myArray[2]<bestMove[2])
        {
          bestMove=moves[i].slice();
          //console.log("BETTER");
        }
      }
    }
  }
  //console.log("BEST: "+bestMove);
  return bestMove;
}

