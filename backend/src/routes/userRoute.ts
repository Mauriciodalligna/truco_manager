import express from 'express'   
import { UserController } from '../controllers/userController'
import authentication from '../middleware/authentication';

const userController = new UserController();
const router = express.Router()

router.post('/user', userController.create)
router.get('/users', userController.getAll)
router.get('/user/:id', userController.getById)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

export default router
