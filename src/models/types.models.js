const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Types = db.define(
  "types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    typeName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "type_name",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Types;
