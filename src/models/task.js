import mongoose from './index.js'

const taskSchema= new  mongoose.Schema({
         title:{
           type:String,
           required:[true,'title is required']
         },
         description:{
           type:String,
           required:[true,'description is required']
         },
         status:{
            type:String,
            default:'pending'
         },
         createdBy:{
              type:String,
              required:[true,'createdby is required']
         },
         approvedBy:{type:String},
         createdAt:{
              type:Date,
              default:Date.now()
         }
},{
    collection:'tasks',
    versionKey:false
})

 const TaskModel = mongoose.model('tasks',taskSchema)

 export default TaskModel