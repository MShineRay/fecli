var spawn = require('child_process').spawn;
function server(repo, targetPath, opts, cb) {

    if (typeof opts === 'function') {
        cb = opts;
        opts = null;
    }

    opts = opts || {};

    var server = 'live-server2';
    var args = ['-v'];
    var process = spawn(server, args);
    process.on('close', function(status) {
        console.log('close code : ' + status);
        if (status == 0) {
            console.log('111')
            cb && cb();
        } else {
            cb && cb(new Error("'git clone' failed with status " + status));
        }
    });

    process.stdout.on('data', function(chunk) {
        console.log('spawn stdout data:');
        console.log(chunk.toString());
    });
    process.stderr.on('data', (data) => {
        console.log('spawn stderr data:');
        console.log(data);
    });
    process.on('exit', (code) => {
        console.log('exit code : ' + code);
        // fs.close(fd, function(err) {
        //     if(err) {
        //         console.error(err);
        //     }
        // });
    });

    process.on('error', function(err) {
        console.log('process error: ' + err);
    });

    //
    // function _checkout() {
    //     var args = ['checkout', opts.checkout];
    //     var process = spawn(git, args, { cwd: targetPath });
    //     process.on('close', function(status) {
    //         if (status == 0) {
    //             cb && cb();
    //         } else {
    //             cb && cb(new Error("'git checkout' failed with status " + status));
    //         }
    //     });
    // }

}
module.exports = server

server(

)
