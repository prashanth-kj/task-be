import express from 'express'
import taskController from '../controller/task.js'
import Auth from '../common/auth.js'
const router= express.Router()
   
  router.post('/create',Auth.validate,taskController.createTask)
  router.get('/user',Auth.validate,taskController.getTaskByUserId)
  

export default router