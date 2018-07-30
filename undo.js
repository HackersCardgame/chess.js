var historyPointer=0;

function revert(index) {
  historyPointer-=index;
  current = boardHistory.pop();
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      board[i*8+j] = current[i*8+j];
  drawBoard();
}

function save()
{
  boardHistory.push(board.slice());
  historyPointer+=1;
}
