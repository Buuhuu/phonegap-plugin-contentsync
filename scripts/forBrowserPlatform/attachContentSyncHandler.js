module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.platforms.indexOf('browser') < 0) {
        return;
    }

    var path = ctx.requireCordovaModule('path');
    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/browser');
    var express = require(path.join(platformRoot, 'cordova/node_modules/cordova-serve/node_modules/express')),
        server = require(path.join(platformRoot, 'cordova/lib/run')).server,
        bodyParser = require('body-parser'),
        contentSyncApp = express();

    contentSyncApp.use(bodyParser.json());
    contentSyncApp.post('/download', require('../../src/browser/server/downloadCall'));
    contentSyncApp.post('/sync', require('../../src/browser/server/syncCall'));
    contentSyncApp.post('/unzip', require('../../src/browser/server/unzipCall'));
    contentSyncApp.get('/status', require('../../src/browser/server/statusCall'));

    server.app.use('/phonegap-contentsync-plugin', contentSyncApp);
};