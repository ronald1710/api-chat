const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Types = require('./types.models')
const Users = require('./users.models')
const UsersConversations = require('./usersConversations.models')

const InitModels = () => {
// para una relacion de uno a muchos "belongsTo"  y luego "hasMany"

//un mensaje tiene 1 usuario
//un usuario tiene muchos mensajes
Messages.belongsTo(Users, {foreignKey: "createBy"})
Users.hasMany(Messages, {foreignKey: "createBy"})
//conversation tiene 1 usuario
//un usuarios tiene muchas conversation
Conversations.belongsTo(Users, {foreignKey: "createBy"})
Users.hasMany(Conversations, {foreignKey: "createBy"})
//menssages tiene 1 conversation
//conversations tiene muchos mensajes
Messages.belongsTo(Conversations, {foreignKey: "conversationId"})
Conversations.hasMany(Messages, {foreignKey: "conversationId"})
//conversations tiene 1 types
//types tiene muchos conversations
Conversations.belongsTo(Types, {foreignKey: "typeId"})
Types.hasMany(Conversations, {foreignKey: "typeId"})
//user_conversation tiene 1 usuario
//un usuario tiene muchas user_conversations
UsersConversations.belongsTo(Users, {foreignKey: "userId"})
Users.hasMany(UsersConversations, {foreignKey: "userId"})
//user_conversation tiene 1 conversations
//conversations tiene muchos users_conversations
UsersConversations.belongsTo(Conversations, {onDelete: 'CASCADE', foreignKey: "conversationId"})
Conversations.hasMany(UsersConversations, {onDelete: 'CASCADE', foreignKey: "conversationId"})
}


module.exports = InitModels