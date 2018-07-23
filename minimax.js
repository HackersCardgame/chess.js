    myboard = [ [0,0,0,0,0,0,0,0],
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
  console.log("VALUE: "+evaluateBoard());
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
              difference = valueBevore - evaluateBoard();
              moves.push(["f"+i+j, "f"+k+l, difference]);              
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
  if ( depth==0 || possibleMoves(myboard) == "" || win(myboard) != 0 )
    return win(myboard);

  var bestMove = [];
  var moves = possibleMoves(myboard);

  if(player==1)
  {
    var bestValue = -10000000;
    for (var i = 0; i < moves.length; i++)
    {
      myboard[moves[i][0]][moves[i][1]]=player;
      var value = minimax(depth-1, -player, false);
      if(value>bestValue)
      {
        bestValue=value;
        bestMove=moves[i];
        if(init)  drawHypothesis(myboard, "lightgreen", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
        if(debug) if(depth>1) drawHypothesis(myboard, "lightgreen", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
      }
      else
      {
        if(init)  drawHypothesis(myboard, "#f00", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
        if(debug) if(depth>1) drawHypothesis(myboard, "#f00", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
      }
      myboard[moves[i][0]][moves[i][1]]=0;
    }
  }

  if(player==-1)
  {
    var bestValue = 10000000;
    for (var i = 0; i < moves.length; i++)
    {
      myboard[moves[i][0]][moves[i][1]]=player;
      var value = minimax(depth-1, -player, false);
      if(value<bestValue)
      {
        bestValue=value;
        bestMove=moves[i];
        if(init)  drawHypothesis(myboard, "lightgreen", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
        if(debug) if(depth>1) drawHypothesis(myboard, "lightgreen", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);

      }
      else
      {
        if(init)  drawHypothesis(myboard, "#f00", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
        if(debug) if(depth>1) drawHypothesis(myboard, "#f00", "p:"+player+" d:"+depth+" m:"+moves.length+" i:"+i+" best:"+bestValue, depth);
      }
      myboard[moves[i][0]][moves[i][1]]=0;
    }
  }
    if (init) return bestMove;
    else return bestValue;
}

