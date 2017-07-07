const easyxml = require('easyxml');
var serializer = new easyxml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});
exports.send = function(req, res, data, status = 400){
    res.status(status);
    switch(req.get('Content-type')){
        default:
            res.setHeader('Content-type', 'application/json');
            res.json(data);
            break;

        case 'application/xml':
            res.setHeader('Content-type', 'application/xml');
            res.end(serializer.render(data));
            break;
    }
}

exports.typeOf = function(req, res, next){
    var obj;
    if(req.get('Content-type') == 'application/xml'){
       for(var prop in req.body){
           obj = req.body[prop];
       }
       req.body = obj;
    }
    next();
}