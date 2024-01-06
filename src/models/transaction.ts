import { model, PopulateOptions } from 'mongoose'
import { ITransaction, ITransactionModel } from '../types'
import TransactionSchema from './schemas/transaction'

const Transaction: ITransactionModel = model<ITransaction, ITransactionModel>('Transaction', TransactionSchema)

const TransactionModel = {
  async paginate(query?: any, options?: any) {
    return await Transaction.paginate(query, options)
  },

  async findById(id: string, populateOptions?: PopulateOptions) {
    if (populateOptions != null) {
      return await Transaction.findById(id).populate(populateOptions)
    }
    return await Transaction.findById(id)
  },

  async insertMany(transactions: ITransaction[]) {
    return await Transaction.insertMany(transactions)
  },

  async deleteMany(query: any) {
    return await Transaction.deleteMany(query)
  }
}

export default TransactionModel
