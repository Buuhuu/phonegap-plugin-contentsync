/**
 * This hook is executed right after the installation of the plugin to the project. It is meant to install the npm dependencies
 * required to run the plugin with cordova-browser platform into the current directory.
 * 
 * Note: npm is required to be installed
 */
module.exports = function(ctx) {
    var Q = ctx.requireCordovaModule('q'),
        spawn = ctx.requireCordovaModule('child_process').spawn;

    var deferral = new Q.defer(),
        child = spawn('npm', ['install'], { cwd: __dirname });

    child.on('error', function(error) {
        deferral.reject(error);
    })
    child.on('exit', function(code) {
        if (!code) {
            deferral.resolve();
        } else {
            deferral.reject(new Error('child process didn\'t exit without errors. Error code: ' + code));
        }
    })

    return deferral.promise;
}
