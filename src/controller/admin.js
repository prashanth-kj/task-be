import UserModel from "../models/user.js";
import TaskModel from "../models/task.js";

import Auth from "../common/auth.js";
const createUser=async(req,res)=>{
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
        console.log(error)
         res.status(500).send({
            message:"Internal servar error",
            error:error.message
         })
       }
      
}

const getAllUser= async(req,res)=>{
     try {
          let getAllusers= await UserModel.find({})
           res.status(200).send({
             message:"All users fetched sucessfully",
             getAllusers
           })
     } catch (error) {
        console.log(error)
        res.status(500).send({
           message:"Internal servar error",
           error:error.message
        })
      }
     
}

const getUserById=async(req,res)=>{
       
     try {
        let userId=req.params.id;
        console.log(userId);
          if(userId){
               let user= await UserModel.findById(userId)
               res.status(200).send({
                   message:"user fetched sucessfully",
                   user
               })
          }
     } catch (error) {
        console.log(error);
     }


}

const getAllTask=async(req,res)=>{
   try {
        let getTasks=await TaskModel.find({})
        res.status(200).send({
              message:"tasks fetched sucessfully",
              getTasks
        })
   } catch (error) {
      console.log(error);
   }
}




const getTaskbyId =async(req,res)=>{
        try {
            let taskId= req.params.id;
            if(taskId){
                  let task = await TaskModel.findById(taskId)
                  res.status(200).send({
                     message:"task fetched sucessfully",
                     task
                  })
            }else{
                 res.status(400).send({
                      message:"task id not found "
                 })
            }
        } catch (error) {
            console.log(error);
        }
}
const editUser=async(req,res)=>{
     try {
          
        let userId= req.params.id;

          if(userId){
                 let user= await UserModel.findById({_id:userId})
                   if(user){
                        let {name,email,password,role}=req.body;
                    
                
                        user.name=name;
                        user.email=email;
                        user.password = await Auth.hashPassword(password);
                        user.role=role;
        
                        await user.save();
        
                        res.status(200).send({
                            message:"user updated sucessfully",
                            user
                        })
                   }else{
                      res.status(400).send({
                         message:"user is not found"
                      })
                   }
             
                
          }
          else{
              res.status(400).send({
                 message:"userId not found"
              })
          }
     } catch (error) {
        console.log(error)
        res.status(500).send({
           message:"Internal servar error",
           error:error.message
        })
      
     }
}

const deleteUser=async(req,res)=>{
      try {
           let userId=req.params.id;
           
           if(userId){
                
                     let deleteUser= await UserModel.deleteOne({_id:userId})
                     res.status(200).send({
                        message:"user deleted sucessfully",
                        deleteUser
                     })
               }
               else{
                res.status(400).send({
                      message:"userId not found"
                })
           }
      } catch (error) {
        console.log(error)
        res.status(500).send({
           message:"Internal servar error",
           error:error.message
        })
      
      }
}

const updateTaskStatus=async(req,res)=>{
      try {
          let taskId=req.params.id;
          let status=req.params.status;
            if(taskId && status){
                   
                   let task = await TaskModel.findById(taskId);

                      if(status=="completed"){
                            task.status="completed";
                            task.approvedBy=req.headers.userId;
                      }else{
                           task.status="pending"
                      }
                    
                    await task.save();

                    res.status(200).send({
                        message:"Task status updated sucessfully"
                    })

            }else{
                   res.status(400).send({
                      message:'task Id and status not found'
                   })
            }
      } catch (error) {
        console.log(error)
        res.status(500).send({
           message:"Internal servar error",
           error:error.message
        })
      
      }
}
export default {
     createUser,
     getAllUser,
     getUserById,
     getAllTask,
     getTaskbyId,
     editUser,
     deleteUser,
     updateTaskStatus
}