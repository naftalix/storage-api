

class Init {
    constructor(app) {

        const logger = require('morgan');
        const pe = require('parse-error');
        const CONFIG = require('../config/appConfig');

        app.listen(CONFIG.port, () => {
            console.log(`example app listening port ${CONFIG.port}!`);
        });

        app.use(logger('dev'));

        require('./routesLoader')(app);
        require('./middlewareLoader')(app);

        //This is here to handle all the uncaught promise rejections
        process.on('unhandledRejection', error => {
            console.error('Uncaught Error', pe(error));
        });
    }
}

module.exports = (app) => { return new Init(app) }




