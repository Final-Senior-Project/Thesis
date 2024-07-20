const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Owner = require('./Owner');
const User = require('./User');

const Chat = sequelize.define('Chat', {
 
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId:{type:DataTypes.INTEGER},
  ownerId:{type:DataTypes.INTEGER},
  sender:{
    type:DataTypes.INTEGER,allowNull:false
  }

});
Owner.hasMany(Chat,{foreignKey:"ownerId",as:"Chat"})
Chat.belongsTo(Owner,{foreignKey:"ownerId",as:"Owner"})
User.hasMany(Chat,{foreignKey:"userId",as:"Chat"})
Chat.belongsTo(User,{foreignKey:"userId",as:"User"})
module.exports = Chat;
