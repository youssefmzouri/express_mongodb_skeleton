import express from 'express'
import userRoutes from './users'

const router = express.Router()

// Ping
router.get('/ping', (_req, res) => {
  res.send('pong')
})

// Business routes
router.use('/user', userRoutes)

export default router
