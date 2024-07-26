import UserModel from "../models/user.js"
import Auth from '../common/auth.js'

const createUser = async(req,res)=>{
      try {
          
        let user = await UserModel.findOne({email:req.body.email})

          if(!user){
              
             let {name,email,password}=req.body;

                 if(name && email && password){
                      
                    req.body.password= await Auth.hashPassword(password) 
                      await UserModel.create(req.body);

                      res.status(201).send({
                          message:"User created sucessfully"

                      })
                 }
                 else{
                      res.status(400).send({
                          message:"All data field is required"
                      })
                 }
          }else{
               res.status(400).send({
                  message:`user with ${req.body.email} already exists`
               })
          }
          
      } catch (error) {
          console.log(error);
          res.status(500).send({
              message:"internel server error",
              error:error.message
          })
      }
}

const login= async(req,res)=>{
     try {
         
         let user = await UserModel.findOne({email:req.body.email})

           if(user){
                
                  let hashCompare = await Auth.hashCompare(req.body.password,user.password)

                    if(hashCompare){
                          
                        let token= await Auth.createToken({
                               id:user._id,
                               name:user.name,
                               email:user.email,
                               role:user.role
                        })
                        
                         let userData= await UserModel.findOne({email:req.body.email},{_id:0,email:0,password:0,createdAt:0})
                        res.status(201).send({
                            message:"login sucessfull",
                            token,
                            userData
                          
                        })
                          
                    }else{
                         res.status(400).send({
                              message:"password does not match"
                         })
                    }
                
           }else{
               res.status(400).send({
                  message:`Account with ${req.body.email} does not exists`
               })
           }
          
     } catch (error) {
        console.log(error);
          res.status(500).send({
              message:"internel server error",
              error:error.message
          })
     }
}

export default {
      createUser,
      login
}