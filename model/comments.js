const Sequelize = require('sequelize')
const connection = require('../config')

class Comments extends Sequelize.Model {}

Comments.init({
    comments: {
        type: Sequelize.STRING,
        notNull: true,
        len: [1, 200]
    }
    },{
        sequelize: connection, 
        modelName: 'comments'
})

module.exports = Comments