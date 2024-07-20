const route =require('express').Router()

const {getUser,register,login,updateUser,getUserEmail,markAsPayed, loginAdmin, getUserId, deleteUser}=require('../Controllers/UserController')
const autoriser = require('../Middelware/Owner')
route.get('/get',getUser)
route.get('/:email',getUserEmail)
route.get('/user/:id',getUserId)
route.post('/reg',register)
route.post("/log/:email",login)
route.post("/logAdm/:email",loginAdmin)
route.put("/upd/:id",updateUser)
route.get("/payed/:id",markAsPayed)
route.delete("/del/:id",deleteUser)

module.exports=route