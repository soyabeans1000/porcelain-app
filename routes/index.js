module.exports = (app) => {
    require('./bathroomroutes')(app)
    require('./commentroutes')(app)
    require('./userroutes')(app)
    require('./likeroutes')(app)
    require('./requestroutes')(app)
    require('./imageroutes')(app)
}