const { Requests } = require('../model')

module.exports = app => {
    // get all requests
    app.get('/request', (req, res) => {
        Requests.findAll()
        .then(request => res.json(request))
        .catch(e => console.log(e))
    })
    // create request to add bathroom
    app.post('/request', (req, res) => {
        Requests.create(req.body)
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    })
    // delete request when deny or approve
    app.delete('/request/:id', (req, res) => {
        Requests.destroy({where: {id: req.params.id}})
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    })
}