var express =  require('express')
    app = express();
var re = require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });

app.use(devMiddleware);

app.listen(3000);


