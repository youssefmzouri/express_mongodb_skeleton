import express from 'express'
import TransactionController from '../controllers/transactions'

const router = express.Router()

router.get('/', TransactionController.getAll)
router.get('/:id', TransactionController.getOne)

export default router
