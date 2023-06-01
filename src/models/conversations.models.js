const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Conversations = db.define(
  "conversations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "type_id",
    },
    createBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "create_by",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Conversations;
