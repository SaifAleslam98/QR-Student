// Routes
const indexRouter = require('../routes/index');
const adminRouter = require('../routes/admin');

//Use Routers
const routerHandler = (app) => {
    app.use('/', indexRouter);
    app.use('/admin', adminRouter);

}
module.exports = routerHandler;