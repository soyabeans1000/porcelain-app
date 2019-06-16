const { Bathrooms, Comments, Users } = require('../model')

module.exports = app => {
    // find all bathrooms in the city,state base on your location (will have to change bathroom schema for location)
    app.get('/bathrooms/:city/:state', (req, res) => {
        Bathrooms.findAll({where: {city: req.params.city, state: req.params.state}})
        .then(bathroom => res.json(bathroom))
        .catch(e => console.log(e))
    })
    // find bathroom w/ id will include comments(for when user click on specific bathroom on map)
    app.get('/bathrooms/:id', (req, res) => {
        Bathrooms.findOne({
            where: {id: req.params.id}, 
            include: [{
                model: Comments, 
                include: [{
                    model: Users, 
                    attributes: ['username']
                }]
            }]
        })
        .then(bathroom => res.json(bathroom))
        .catch(e => console.log(e))
    })
    // add a bathroom if admin
    app.post('/bathrooms', (req, res) => {
        Bathrooms.create(req.body) 
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    })
    // update bathroom's likecount
    app.put('/bathrooms/increase/:id', (req, res) => {
        Bathrooms.increment('likecount', {where: {id: req.params.id}})
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))    
    })

    app.put('/bathrooms/decrease/:id', (req, res) => {
        Bathrooms.decrement('likecount', {where: {id: req.params.id}})
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))    
    })
    // do we need option to delete bathroom as admin?
    // app.delete('/bathrooms/:id', (req, res) => {

    // })
}