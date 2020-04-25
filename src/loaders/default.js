

class Init {
    constructor(app, express) {
        const fs = require('fs');
        const logger = require('morgan');
        const path = require('path');
        const pe = require('parse-error');
        const CONFIG = require('../config/appConfig');
        const fileUpload = require('express-fileupload');

        app.listen(CONFIG.port, () => {
            console.log(`App is listening on port ${CONFIG.port}!`);
        });
        app.use(fileUpload({createParentPath: true}));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(logger('common', { stream: fs.createWriteStream(`${__dirname}/../logs/access.log`, { flags: 'a' }) }))
        app.use(logger('dev'))
        initLoaders(app);

        //This is here to handle all the uncaught promise rejections
        process.on('unhandledRejection', error => {
            console.error('Uncaught Error', pe(error));
        });

        function initLoaders(app) {
            require('./routesLoader')(app);
            require('./middlewareLoader')(app);
        }
    }


}

module.exports = (app, express) => { return new Init(app, express) }




