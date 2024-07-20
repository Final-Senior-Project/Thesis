const User=require("../database/models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUser=async(req,res)=>{
  try {
      const user=await User.findAll({})
      res.json(user)
      console.log("test");
    } catch (err) {
        console.log(err);
    }
}
const register=(req,res)=>{
  bcrypt.hash(req.body.Password,10)
  .then((hashedPass)=>{
const user=new User({
   image:req.body.image,
     FirstName:req.body.FirstName,
   LastName:req.body.LastName,
   email:req.body.email,
   Password:hashedPass,
   DateOfBirth:req.body.DateOfBirth,
   gender:req.body.gender,
  
  
})
user.save().then((result)=>{
    res.json(result)
}).catch((err)=>console.log(err))
  })
} 

const getUserEmail=async(req,res)=>{
  console.log("email",req.params.email);
  
  try {
    const userEmail=await User.findOne({
      where:{email:req.params.email}
      
    })
    res.json(userEmail)
  } catch (err) {
    console.log(err)
    res.send("error")
  }
}
const getUserId = async (req, res) => {
  const {id}=req.params
  try {
    const userid = await User.findAll({
      where: { id: id },
    });
    console.log("userid",id);
    res.json(userid);
    console.log("user",userid);
  } catch (err) {
    console.error(err);
  }
};
const login=(req,res)=>{
  
  console.log(req.body,"req.body");
    User.findOne({ where: { email: req.params.email } }).then((user) => {
     
      if(user){
                bcrypt
          .compare(req.body.Password,user.Password)
          .then((passCheck) => {
            if (!passCheck) {
              return res.status(400).json({ message: "invalid user " });
            }
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                
              },
              "RandomToken",
           
            );
            return   res.status(200).json({ email: user.email,token:token,id:user.id });
          })
          .catch((err) => {
            console.log(err);
          });
      }});
}
const updateUser=async(req,res)=>{
  const  updeted=await User.update({image:req.body.image,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    email:req.body.email,
    
},
    { where: { id: req.params.id } })
    try {
     res.json(updeted)
    } catch (err) {
      console.log(err);
    }
}
const markAsPayed= async (req, res) => {
  

  try {
  
    const client = await User.findOne({
      where:{email:req.params.id}
    });

    if (!client) {
      return res.status(404).json({ message: 'client not found' });
    }

    
    client.payed = 1;
    await client.save();

    res.status(200).json({ message: 'client marked as payed', client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
const loginAdmin=(req,res)=>{
  
  console.log(req.body,"req.body");
    User.findOne({ where: { email: req.params.email } }).then((user) => {
     
      if(user){
                bcrypt
          .compare(req.body.Password,user.Password)
          .then((passCheck) => {
            if (!passCheck) {
              return res.status(400).json({ message: "invalid user " });
            }
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                
              },
              "RandomToken",
           
            );
            return   res.status(200).json({ email: user.email,token:token,id:user.id });
          })
          .catch((err) => {
            console.log(err);
          });
      }});
}
const deleteUser= (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
 res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}
module.exports={getUser,register,login,updateUser,getUserEmail,markAsPayed,loginAdmin,deleteUser,getUserId}