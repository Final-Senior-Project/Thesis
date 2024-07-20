const Chat = require("../database/models/Chat")
const Owner = require('../database/models/Owner');
const User = require('../database/models/User');
const getMessages=async(req,res) =>{
    try {
        const { userId, ownerId } = req.params;
console.log(userId,ownerId);
        const chats = await Chat.findAll({
            where: {
                userId,
                ownerId
            }
            ,
            include: [
                { model: Owner, as: 'Owner' },
                { model: User, as: 'User' }
            ]
        });
        
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
const addMessage=async(req,res)=>{
    try {
        
        const { userId, ownerId } = req.params;
        const { message,sender } = req.body;

        const newChat = await Chat.create({ message, userId, ownerId,sender });
        res.status(201).json(newChat);
    } catch (error) {
    console.log("err",error);
        res.status(500).json({ error: error.message });
    
    }
}
const addMessageOwner=async(req,res)=>{
    try {
        const { userId, ownerId } = req.params;
        const { message,sender } = req.body;

        const newChat = await Chat.create({ message, userId, ownerId,sender });
        res.status(201).json(newChat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
const getRooms=async(req,res)=>{
try {
    let room=[]
    const {userId,ownerId}=req.body
    let result=null
    if(userId){

        const chats=await Chat.findAll({where:{userId:userId}})
        room.push(chats[0].ownerId)
    for(let i=1;i<chats.length;i++){
        room.push(chats[i].ownerId)
    }
     result=Array.from(new Set(room))
     console.log(result);
    }else{
        const chats=await Chat.findAll({where:{ownerId:ownerId}})
        room.push(chats[0].userId)
    for(let i=1;i<chats.length;i++){
        room.push(chats[i].userId)
    }
    result=Array.from(new Set(room))
    }
res.json(result)
} catch (error) {
    console.log(error);
}
}
  
module.exports={getMessages,addMessage,getRooms,addMessageOwner}