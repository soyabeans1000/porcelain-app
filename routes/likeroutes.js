const { Likes, Bathrooms  } = require('../model')

module.exports = app => {
    app.get('/like/:userId/:bathroomId', (req, res) => {
        Likes.findOne({where: {userId: req.params.userId, bathroomId: req.params.bathroomId}})
        .then(like => res.json(like))
        .catch(e => console.log(e))
    })
    app.get('/like/:userId', (req, res) => {
        Likes.findAll({where: {userId: req.params.userId}, include: [Bathrooms]})
        .then(like => res.json(like))
        .catch(e => console.log(e))
    })
    app.post('/like', (req, res) => {
        Likes.create(req.body)
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    })
    app.delete('/like/:id', (req, res) => {
        Likes.destroy({where: {id: req.params.id}})
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    })
}
