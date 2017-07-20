module.exports = function(req, resp) {
    console.log('download called');
    console.log(req.body);
    res.json(req.body);
}