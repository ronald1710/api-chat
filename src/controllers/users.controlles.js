const Users = require("../models/users.models");
const UsersConversations = require("../models/usersConversations.models");
const Conversations = require("../models/conversations.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await Users.create({ username, email, password: hashed });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return next({
        status: 400,
        name: "invalid email",
        message: "Email not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({
        status: 400,
        name: "invalis password",
        message: "Password does not match with user email",
      });
    }

    const { firstname, lastname, id, username } = user;

    const userData = { firstname, lastname, id, username, email };
    const token = jwt.sign(userData, "apichat", {
      algorithm: "HS512",
      expiresIn: "55m",
    });
    userData.token = token;

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

//crear un endpoint para que el usuaurio pueda tener una imagen (avatar)


//Crear un endpoint que permita agregar usuarios a una conversación grupal.
const addUserInConversationGroup = async (req, res, next) => {
  try {
    const { userId, conversationId } = req.body;
    const user = await Users.findByPk(userId);
    const conversation = await Conversations.findByPk(conversationId);
    if (!user) {
      next({
        status: 400,
        name: "Error with the user",
        message: "It seems that this user does not exist",
      });
    }
    if (!conversation) {
      next({
        status: 400,
        name: "Error with the conversation",
        message: "It seems that this conversation does not exist",
      });
    }
    if (conversation.dataValues.typeId !== 2) {
      next({
        status: 400,
        name: "Error con la conversación",
        message: "El tipo de conversacion no existe",
      });
    }

    await UsersConversations.findOrCreate({
      where: { userId: userId, conversationId: conversationId },
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};
//Crear un endpoint que permita eliminar usuarios de una conversación grupal
const deletUserInConversationGroup = async (req, res, next) => {
  try {
    const { conversationId, id } = req.body;
    const usersDelete = await Users.findByPk(id);
    const conversationUser = await Conversations.findByPk(conversationId);

    if (!conversationUser) {
      next({
        status: 400,
        name: "Error con la conversación",
        message: "El tipo de conversacion no existe",
      });
    }

    if (conversationUser.dataValues.typeId !== 2) {
      next({
        status: 400,
        name: "Tipo de conversacion invalido",
        message: "La conversación debe ser grupal",
      });
    }
    await UsersConversations.destroy({
      where: { userId: usersDelete.id, conversationId: conversationUser.id },
    });
    res.status(204).send();
  } catch (error) {}
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  addUserInConversationGroup,
  deletUserInConversationGroup,
};
