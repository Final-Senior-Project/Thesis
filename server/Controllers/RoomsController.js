// const Owner=require('../database/models/Owner')
// const User =require('../database/models/User')
// // const Rooms=require('../database/models/Rooms')
// const Chat=require('../database/models/Chat')
// const getRooms=async(req,res)=>{
//     try {
//         const{userId,OwnerId}=req.params
//         const rooms=await Rooms.findAll({where:{userId,OwnerId},    include: [
//             { model: User, as: 'user' },
//             { model: Owner ,as:"owner"},
//             include
//             [{ model: Chat, as: 'Chat' }
//                 ]
           
//           ]})
//         res.json(rooms)
      
//     } catch (error) {
//         console.log('err',error);
//     }

// }
// module.exports={getRooms}