import express from 'express'
import UserController from '../controllers/users'

const router = express.Router()

router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)

export default router