import UserModel from "../models/user.js"
import TaskModel from "../models/task.js"

const dashboardState=async(req,res)=>{
            
   try {
       
    let activeUserCount= await UserModel.countDocuments({status:'Active'});
    let totalTaskCount= await  TaskModel.countDocuments();

      res.status(200).send({
           message:"active user count and total task count fetched sucessfully",
           activeUserCount,
           totalTaskCount
      })

   } catch (error) {
      res.status(500).send({
          message:"Internal server error",
          error:error.message
      })
   }
       
}


export default{
      dashboardState
}