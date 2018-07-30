

var yourCallback = function (n) {
  console.log("Finished");
}

function minimaxParallel(depth, player, init) {
  var p = new Parallel([depth, player, init]);
  p.spawn(minimax).then(callback);
}

function test(depth, player, init)
{
  console.log("TEST");
  return [depth, player, init];
}

function callback(result) {
  console.log(result);
}


