import { model, PaginateOptions, QueryOptions } from 'mongoose'
import PositionSchema from './schemas/position'
import { IPosition, IPositionModel } from '../types'

const Position: IPositionModel = model<IPosition, IPositionModel>('Position', PositionSchema)

const PositionModel = {
  async paginate(query?: any, options?: PaginateOptions) {
    return await Position.paginate(query, options)
  },

  async find(query: any, projection?: any, sort?: any) {
    const options: QueryOptions = { sort }
    return await Position.find(query, projection, options)
  },

  async findById(id: string) {
    return await Position.findById(id)
  },

  async aggregate(query: any, group?: any) {
    return await Position.aggregate([
      { $match: query },
      {
        $group: group
      }
    ])
  },

  async aggregateTransactions(query: any, projection?: any, sort?: any) {
    return await Position.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'position',
          as: 'transactions'
        }
      },
      {
        $sort: sort
      }
    ]).project(projection)
  },

  async insertMany(positions: IPosition[]) {
    return await Position.insertMany(positions)
  },

  async deleteMany(query: any) {
    return await Position.deleteMany(query)
  }
}

export default PositionModel
