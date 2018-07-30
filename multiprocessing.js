var cluster = require('cluster'),
    http = require('http'),
    cpuCount = require('os').cpus().length;
 
if (cluster.isMaster) {
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
 
    cluster.on('exit', function(worker) {
        console.log('Worker-' + Page on worker.id + ' with pid: ' + worker.process.pid + ' died.');
    });
} else {
    http.Server(function(req, res) {
        res.end('Stated http server of worker-' + cluster.worker.id + ' and pid:' + process.pid);
    }).listen(8000);
}
