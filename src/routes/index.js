import express from 'express'
import userRoutes from './user.js'
import taskRoutes from './task.js'
import adminRoutes from './admin.js'
import dashboardRoutes from './dashboard.js'
const router=express.Router();

   router.use('/user', userRoutes)
   router.use('/tasks',taskRoutes)
   router.use('/admin',adminRoutes)
   router.use('/dashboard',dashboardRoutes)

export default router