var myboard = [ [ 0,  0,  0 ],
                [ 0,  0,  0 ],
                [ 0,  0,  0 ] ];

var debug=false;
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

