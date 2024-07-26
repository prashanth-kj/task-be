import express from 'express'
import adminController from '../controller/admin.js'
import Auth from '../common/auth.js'
const router= express.Router()
  
  router.post('/create', Auth.validate, Auth.adminGuard,adminController.createUser)
  router.put('/edit/:id', Auth.validate,Auth.adminGuard,adminController.editUser)
  router.get('/tasks', Auth.validate,Auth.adminGuard, adminController.getAllTask)
  router.delete('/:id', Auth.validate,Auth.adminGuard,adminController.deleteUser)
  router.put('/task/:id/:status', Auth.validate,Auth.adminGuard,adminController.updateTaskStatus)
  router.get('/:id',Auth.validate,Auth.adminGuard, adminController.getUserById)
  router.get('/task/:id', Auth.validate,Auth.adminGuard,adminController.getTaskbyId)
  router.get('/', Auth.validate,Auth.adminGuard, adminController.getAllUser)

export default router