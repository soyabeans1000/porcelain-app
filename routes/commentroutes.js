const { Comments, Bathrooms } = require('../model')

module.exports = app => {
    app.get('/comment', (req, res) => {
        Comments.findAll()
            .then(comment => res.json(comment))
            .catch(e => console.log(e))
    })
    // get all comments posted by user
    app.get('/comment/:userId', (req, res) => {
        Comments.findAll({ where: { userId: req.params.userId }, include: [Bathrooms] })
            .then(comment => res.json(comment))
            .catch(e => console.log(e))
    })
    // adding comment to bathroom post
    app.post('/comment', (req, res) => {
        Comments.create(req.body)
            .then(comment => res.status(200).json(comment))
            .catch(e => console.log(e))
    })
    // delete comment from bathroom post
    // changed id to userId
    app.delete('/comment/:id', (req, res) => {
        Comments.destroy({where: {id: req.params.id}})
        .then(_ => res.sendStatus(200))
        .catch(e => console.log(e))
    // app.delete('/comment/:userId', (req, res) => {
    //     Comments.destroy({ where: { userId: req.params.userId } })
    //         .then(_ => res.sendStatus(200))
    //         .catch(e => console.log(e))
    
    })
}