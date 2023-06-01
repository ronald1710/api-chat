const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const UsersConversations = db.define(
  "users_conversations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "conversation_id",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = UsersConversations;
