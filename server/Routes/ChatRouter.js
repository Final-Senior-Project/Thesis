const express = require("express")
const router = express.Router()
const {addMessage,getMessages,getRooms, addMessageOwner} = require("../Controllers/ChatController")

router.get("/getmsg/:userId/:ownerId",getMessages)
router.post("/addmsg/:userId/:ownerId",addMessage)
router.post("/addmsgO/:ownerId/:userId",addMessageOwner)
router.post('/getRoom',getRooms)

module.exports = router
