import express from 'express'
import PositionController from '../controllers/positions'

const router = express.Router()

router.get('/', PositionController.getAll)
router.get('/:id', PositionController.getOne)
router.get('/portfolio/:client_id', PositionController.getByPortfolio)

export default router
