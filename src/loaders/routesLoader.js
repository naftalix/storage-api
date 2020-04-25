
module.exports = function (app) {

    app.use('/', require('../routes/default'));
    app.use('/storage', require('../routes/storage'));
};

