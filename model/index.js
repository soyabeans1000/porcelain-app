const Bathrooms = require('./bathrooms')
const Users = require('./users')
const Requests = require('./requests')
const Comments = require('./comments')
const Likes = require('./likes')

Users.hasMany(Bathrooms)
Bathrooms.belongsTo(Users)

Users.hasMany(Requests)
Requests.belongsTo(Users)

Bathrooms.hasMany(Comments)
Comments.belongsTo(Bathrooms)
Comments.belongsTo(Users)

Bathrooms.hasMany(Likes)
Likes.belongsTo(Bathrooms)
Likes.belongsTo(Users)

module.exports = {Bathrooms, Users, Requests, Comments, Likes}