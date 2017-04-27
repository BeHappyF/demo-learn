let path = require('path');
let express = require('express');
let ftl = require('node-ftl');

let Config = {
    "port": 9003,
    "defaultFtlOptions": {
        "defaultSkin": "classic",
        "optjs": "false",
        "ie": "1",
        "locale": "ru_RU"
    },
    "forward": []
};

let app = express();

app.get('/', function (req, res) {
    res.redirect('/index.ftl');
});

app.engine('ftl', ftl.__express);
app.set('views', path.join(__dirname, './views'));

app.use('/*.ftl', function ( req, res ) {

    var view = req.params[0] + '.ftl';
    var options = {};

    // options.data = {
    //     user: 'humiliter',
    //     lastest: {
    //         name: 'xxx',
    //         url: 'c.163.com'
    //     }
    // };

    options.query = Object.assign({}, {user: 'humiliter'}, Config.defaultFtlOptions, req.query);
    res.set('Content-Type', 'text/html');

    res.render(view, options, function(err, html) {
        err && console.log(err);
        res.send(html);
    });
});

app.listen(Config.port);
