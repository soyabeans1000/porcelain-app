require('dotenv').config()
const Sequelize = require('sequelize')
var connection 

if(process.env.JAWSDB_URL && process.env.NODE_ENV === 'production') {
    connection = new Sequelize(process.env.JAWSDB_URL)
} else {
    const user = process.env.db_acc
    const password = process.env.db_pw
    const db = process.env.db
    const port = process.env.port

    connection = new Sequelize(`mysql://${user}:${password}@localhost:${port}/${db}`)
}

module.exports = connection