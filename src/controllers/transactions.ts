import { Request, Response } from 'express'
import { PaginateOptions, PopulateOptions } from 'mongoose'
import Model from '../models/transaction'

const populatePositionOptions: PopulateOptions = {
  path: 'position',
  select: 'balance currency entity type valuation_date cost'
}

export const buildPaginateOptions = (query: any): PaginateOptions => {
  const { page, limit, offset, sort } = query

  const paginateOptions: PaginateOptions = {
    page: typeof page === 'string' ? parseInt(page, 10) : 1,
    limit: typeof limit === 'string' ? parseInt(limit, 10) : 5,
    offset: typeof offset === 'string' ? parseInt(offset, 10) : 0,
    sort: typeof sort === 'string' ? sort : '_id',
    populate: populatePositionOptions
  }

  return paginateOptions
}

const TransactionController = {
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
      .catch(() => {
        res.status(500).json({ message: 'Error getting transactions' })
      })
  },

  getOne: (req: Request, res: Response) => {
    Model.findById(req.params.id, populatePositionOptions)
      .then((transaction) => {
        if (transaction === null) return res.status(404).json({ results: [] })
        res.json({
          results: [transaction]
        })
      })
      .catch(() => {
        res.status(500).json({ message: 'Internal server error getting transaction: ' + req.params.id })
      })
  }
}

export default TransactionController
