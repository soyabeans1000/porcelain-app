const Sequelize = require('sequelize')
const connection = require('../config')

class Requests extends Sequelize.Model {}

Requests.init ({
    street: {
        type: Sequelize.STRING,
        notNull: true,
        isAlphanumeric: true
    },
    city: {
        type: Sequelize.STRING,
        notNull: true,
        isAlpha: true
    },
    state: {
        type: Sequelize.STRING,
        notNull: true,
        isAlpha: true
    },
    zipcode: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    gender: {
        type: Sequelize.STRING,
        notNull: true,
        len: [1, 100]
    },
    stalls: {
        type: Sequelize.INTEGER,
        isNumeric: true, 
        notNull: true
    },
    level: {
        type: Sequelize.INTEGER,
        isNumeric: true, 
        notNull: true
    },
    cleanliness: {
        type: Sequelize.INTEGER,
        isNumeric: true, 
        notNull: true
    },
    caption: {
        type: Sequelize.STRING,
        allowNull: true,
        len: [1, 200]
    },
    image: {
        type: Sequelize.STRING,
        notNull: true
    }
},{
    sequelize: connection, 
    modelName: 'requests'
})


module.exports = Requests