const Sequelize = require('sequelize')
const connection = require('../config')

class Likes extends Sequelize.Model {}

Likes.init({},{
    sequelize: connection, 
    modelName: 'likes'
})

module.exports = Likes