const Users = require("../models/users.models");
const Conversations = require("../models/conversations.models");
const UserConversation = require("../models/usersConversations.models");
const Types = require("../models/types.models");
const Messages = require("../models/messages.models");
const UsersConversations = require("../models/usersConversations.models");

// 4.- Un endpoint que permita crear una nueva conversación en pareja
const conversationInPairs = async (req, res, next) => {
  try {
    const { title, typeId, createBy, pair } = req.body;
    const conversation = await Conversations.create({
      title,
      typeId,
      createBy,
    });
    const userId2 = pair;
    await UserConversation.create({
      conversationId: conversation.id,
      userId: createBy,
    });
    await UserConversation.create({
      conversationId: conversation.id,
      userId: userId2,
    });
    res.json(conversation);
  } catch (error) {
    next(error);
  }
};
//Un endpoint que permita crear una conversación grupal
const conversationInGroup = async (req, res, next) => {
  try {
    const { title, typeId, createBy, group } = req.body;
    const conversation = await Conversations.create({
      title,
      typeId,
      createBy,
    });
    await UserConversation.create({
      conversationId: conversation.id,
      userId: createBy,
    });
    const arrayForGroup = group.map((userId) => ({
      userId,
      conversationId: conversation.id,
    }));
    UserConversation.bulkCreate(arrayForGroup);
    res.json(conversation);
  } catch (error) {
    next(error);
  }
};
//Un endpoint que permita obtener todas las conversaciones en las que participa un usuario
const userInConversations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userConversations = await Users.findAll({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Conversations,
          attributes: {
            exclude: [ "createBy"],
          },
          include: [
            {
              model: Messages,
            },
          ],
        },
      ],
    });
    res.json(userConversations);
  } catch (error) {
    next(error);
  }
};
//Un endpoint que permita obtener una conversación incluyendo sus participantes y los mensajes
const conversationsIncludeUsersAndMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allConversations = await Conversations.findAll({
      where: { id },
      attributes: {
        exclude: [],
      },
      include: [
        {
          model: Messages,
          attributes: {
            exclude: [],
          },
          include: [  
            {
              model: Users,
              attributes: {
                exclude: ["password"],
                },
                },
              ]
        },
      ],

    });
    res.json(allConversations);
  } catch (error) {
    next(error);
  }
};
//Un endpoint que permita eliminar una conversación
const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await Conversations.destroy({
      where: { id },
      });
      res.json(conversation);
      } catch (error) {
        next(error);
        }
        };

module.exports = {
  conversationInPairs,
  conversationInGroup,
  userInConversations,
  conversationsIncludeUsersAndMessages,
  deleteConversation
};
