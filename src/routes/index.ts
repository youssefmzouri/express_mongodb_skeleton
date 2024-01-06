import express from 'express'
import positionRoutes from './positions'
import transactionRoutes from './transactions'
import portfolioRoutes from './portfolios'

const router = express.Router()

// Ping
router.get('/ping', (_req, res) => {
  res.send('pong')
})

// Business routes
router.use('/position', positionRoutes)
router.use('/transaction', transactionRoutes)
router.use('/portfolio', portfolioRoutes)

export default router
