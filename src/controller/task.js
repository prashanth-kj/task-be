import TaskModel from '../models/task.js'


const createTask=async(req,res)=>{
  try {
        let {title,description}=req.body;

         if(title && description){

              await TaskModel.create({
                 title,
                 description,
                 createdBy:req.headers.userId
              })
            
            res.status(201).send({
                message:"task created sucessfully"
            })
         }
         else{
              res.status(400).send({
                  message:"All data field is required"
              })
         }
  } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Internal servar error",
        error:error.message
     })
  }
}

const getTaskByUserId=async(req,res)=>{
   try {
      
      let tasks = await TaskModel.find({createdBy:req.headers.userId})
        
      res.status(200).send({
            message:"Task fetched sucessfully",
            tasks
      })
   } catch (error) {
    res.status(500).send({
        message:"Internal servar error",
        error:error.message
     })
   }
}



export default {
      createTask,
      getTaskByUserId
}