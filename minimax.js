//constants
FROM = 0; TO = 1; X = 0; Y = 1;


//white = maximizing  // black = minimizing
function evaluateBoard() {
  var points=0;
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
    {
      points+=board[i*8+j]
    }
  return points;
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

//get list of possible moves
function possibleMoves(player)
{
  var moves=[];

  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      for(var k = 0; k < 8; k ++)
        for(var l = 0; l < 8; l++)
        {
          if( checking( [i,j], [k, l], player ) )
          {
            moves.push([[i, j], [k, l]]);
          }
        }

  return moves;
}

//TODO: braucht viel ressourcen wenn das bei jedem Zug aufgerufen wird => wird nur in der obersten instanz aufgerufen
function isInCheck(player) {
  moves = possibleMoves(-player);
  
  for(var i=0; i<moves.length; i++)
    if(board[moves[i][1][0]*8+moves[i][1][1]]==100*player)
      return true;
      
  return false;

}

var instances=0;

//minmax algorithm that does the game
function minimax(depth, player, init, resetCounter)
{
  if(resetCounter) instances=0;
  else instances+=1;
  
  var bestMove = [[0,0],[0,0]];

  if(depth < 1) return evaluateBoard();

  var moves = shuffle(possibleMoves(player));

  var bestValue=-1000000*player;
  for(var i = 0; i < moves.length; i++)
  {

    //Make the move  TODO: replace with commitMove(FROM, TO, MANUAL):returns savedata
    var savedData = commitMove(moves[i], player);

    if(init)
    {
      if(isInCheck(player))
      {
        //Revert the move: replace with revertMove(savedata)
        revertMove(savedData);
        continue;    
      }
    }

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

    //Revert the move replace with commitMove(FROM, TO, MANUAL):returns savedata
    revertMove(savedData);
  }

  //we return the points except the first move we return the move to play    
  if (init)
  {
    document.getElementById("instances").value=instances;
    return bestMove;
  }
  else return bestValue;

}


function commitMove(move, player) {
  var king=0;
  if(player==1) king=whiteKing;
  if(player==-1) king=blackKing;
  
  if(player==1) pawn=whitePawn;
  if(player==-1) pawn=blackPawn;
  
  var savedData = [];

  savedData.push([move, board[move[FROM][X]*8+move[FROM][Y]], board[move[TO][X]*8+move[TO][Y]] ]);
  
  if(board[move[FROM][X]*8+move[FROM][Y]]==king)
  {
      savedData.push( makeCastlingMove(move, player, false) );
  }

  board[move[TO][X]*8+move[TO][Y]] = board[move[FROM][X]*8+move[FROM][Y]];
  board[move[FROM][X]*8+move[FROM][Y]] = 0;

  if(board[move[FROM][X]*8+move[FROM][Y]]==pawn)
  {
      savedData.push( pawnPromotion(move, player) );
  }
  return savedData;
}

function revertMove(savedData)
{
  for(var i=0; i<savedData.length; i++)
  {
    if(savedData[i]==undefined) return false;
    board[savedData[i][0][FROM][X]*8+savedData[i][0][FROM][Y]] = savedData[i][1];
    board[savedData[i][0][TO][X]*8+savedData[i][0][TO][Y]] = savedData[i][2]; 
  }
}

