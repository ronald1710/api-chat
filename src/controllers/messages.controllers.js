const Users = require("../models/users.models");
const Conversations = require("../models/conversations.models");
const UserConversation = require("../models/usersConversations.models");
const Types = require("../models/types.models");
const Messages = require("../models/messages.models");
const UsersConversations = require("../models/usersConversations.models");

//Un endpoint que permita crear mensajes en una conversación
const addNewMessageInConversation = async (req,res,next) =>{
    try {
        const {content, createdBy, conversationId} = req.body
        await Messages.create({content, createdBy, conversationId})
        res.status(201).send()
    } catch (error) {
        next(error)
    }
}




module.exports = {
 addNewMessageInConversation
  };
  