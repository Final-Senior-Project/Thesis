// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const User = require('./User');
// const Owner = require('./Owner');
// const Chat=require('./Chat')
// const Rooms=sequelize.define("Rooms",{
//     UserId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: User,
//           key: 'id'
//         },
//         allowNull: false
//       },
//       OwnerId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: Owner,
//           key: 'id'
//         },
//         allowNull: false
//       },
//       chatId:{
//         type: DataTypes.INTEGER,
//         references: {
//           model: Chat,
//           key: 'id'
//         },
//         allowNull: false
//       }

// })
// Owner.belongsToMany(User,{through:Rooms})
// User.belongsToMany(Owner,{through:Rooms})
// Rooms.belongsTo(User)
// Rooms.belongsTo(Owner)
// Owner.hasMany(Rooms)
// User.hasMany(Rooms)
// Owner.hasMany(Rooms,{foreignKey:"ownerId",as:"rooms"})
// Rooms.belongsTo(Owner,{foreignKey:"ownerId",as:"owner"})
// User.hasMany(Rooms,{foreignKey:"userId",as:"rooms"})
// Rooms.belongsTo(User,{foreignKey:"userId",as:"user"})
