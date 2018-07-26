
function alphabeta(depth, player, init, alpha, beta)
{
  console.log("depth: "+ depth + " player " + player + " alpha: " + alpha + " beta: " + beta );   

  FROM = 0; TO = 1; X = 0; Y = 1;
  //console.log("alphabeta("+depth+","+player+")");
  var bestMove = [[0,0],[0,0]];    

  if(depth < 1) return evaluateBoard();

  var moves = shuffle(possibleMoves(player));

  var bestValue = alpha;

  for(var i = 0; i < moves.length; i++)
  {
    //console.log(moves[i]);
    //Make the move
    var rollback = myboard[moves[i][TO][X]][moves[i][TO][Y]];
    myboard[moves[i][TO][X]][moves[i][TO][Y]] = myboard[moves[i][FROM][X]][moves[i][FROM][Y]];
    myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = "";

    if(init)
    {
      if(isInCheck(player))
      {
        //Revert the move
        myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = myboard[moves[i][TO][X]][moves[i][TO][Y]];
        myboard[moves[i][TO][X]][moves[i][TO][Y]] = rollback;
        continue;    
      }
    }

    value = -alphabeta(depth-1, -player, false, -beta, -bestValue);

    //Revert the move
    myboard[moves[i][FROM][X]][moves[i][FROM][Y]] = myboard[moves[i][TO][X]][moves[i][TO][Y]];
    myboard[moves[i][TO][X]][moves[i][TO][Y]] = rollback;

    if (value > bestValue) 
    {
      bestValue = value;
      bestMove = moves[i];
    
      if (bestValue >= beta)
         break;
    }
  }
  if (init)
    return bestMove;

  return bestValue;
}
 
 
