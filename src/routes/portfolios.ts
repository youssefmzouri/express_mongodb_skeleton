import express from 'express'
import PortfolioController from '../controllers/portfolios'

const router = express.Router()

// get all info about a portfolio
router.get('/:id', PortfolioController.getAll)

router.get('/currencies/:client_id', PortfolioController.groupByCurrency)
router.get('/investmentsType/:client_id', PortfolioController.groupByInvestmentType)
router.get('/entities/:client_id', PortfolioController.groupByEntity)

export default router
