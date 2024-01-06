import { Request, Response } from 'express'
import { PaginateOptions } from 'mongoose'
import Model from '../models/user'

export const buildPaginateOptions = (query: any): PaginateOptions => {
  const { page, limit, offset, sort } = query

  const paginateOptions: PaginateOptions = {
    page: typeof page === 'string' ? parseInt(page, 10) : 1,
    limit: typeof limit === 'string' ? parseInt(limit, 10) : 5,
    offset: typeof offset === 'string' ? parseInt(offset, 10) : 0,
    sort: typeof sort === 'string' ? sort : '_id'
  }

  return paginateOptions
}

const UserController = {
  getAll: (req: Request, res: Response) => {
    const paginateOptions = buildPaginateOptions(req.query)
    Model.paginate({}, paginateOptions)
      .then((resultPaginated) => {
        const { docs, ...rest } = resultPaginated
        res.json({
          results: docs,
          ...rest
        })
      })
      .catch((err: Error) => {
        res.status(500).json({ message: 'Error getting users: ' + err.message })
      })
  },

  getOne: (req: Request, res: Response) => {
    Model.findById(req.params.id)
      .then((user) => {
        if (user === null) return res.status(404).json({ results: [] })
        res.json({
          results: [user]
        })
      })
      .catch(() => {
        res.status(500).json({ message: 'Internal server error getting user: ' + req.params.id })
      })
  }
}

export default UserController
