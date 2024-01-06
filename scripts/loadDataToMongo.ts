import '../src/loadEnv'
import { mongoose } from '../src/mongo'
import * as fs from 'fs'
import csv from 'csv-parser'
import * as path from 'path'
import { IPosition, ITransaction } from '../src/types'
import PositionModel from '../src/models/position'
import TransactionModel from '../src/models/transaction'

const readAndInsertPositions = async (csvPath: string): Promise<void> => {
  return await new Promise((resolve, reject) => {
    const jsonArr: IPosition[] = []
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data: any) => {
        const {
          id,
          is_nominal: isNominal,
          'interest.rate': interestRate,
          expiration_date: expirationDate,
          initial_date: initialDate,
          valuation_date: valuationDate,
          ...restOfData
        } = data
        const newData: IPosition = {
          _id: id,
          interest_rate: interestRate,
          is_nominal: isNominal === 'True',
          expiration_date: expirationDate !== '' ? new Date(expirationDate) : null,
          initial_date: initialDate !== '' ? new Date(initialDate) : null,
          valuation_date: valuationDate !== '' ? new Date(valuationDate) : null,
          ...restOfData
        }
        jsonArr.push(newData)
      })
      .on('end', () => {
        PositionModel.insertMany(jsonArr)
          .then((docs) => {
            console.log(`${docs.length} documents inserted into Positions collection`)
            resolve()
          })
          .catch((error: Error) => {
            console.error('Error inserting into Positions collection: ', error.message)
            reject(error)
          })
      })
  })
}

const readAndInsertTransactions = async (csvPath: string): Promise<void> => {
  return await new Promise((resolve, reject) => {
    const jsonArr: ITransaction[] = []
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data: any) => {
        const {
          _id,
          amount,
          commission,
          'investment_id|account_id|liability_id': positionId,
          netCash,
          operationDate,
          originalCurrency,
          referenceCurrency,
          retention,
          unitPrice,
          valueDate,
          ...restOfData
        } = data
        const newData: ITransaction = {
          _id,
          amount: amount !== '' ? parseFloat(amount.replace(',', '.')) : null,
          commission: commission !== '' ? parseFloat(commission.replace(',', '.')) : null,
          position: positionId,
          net_cash: netCash !== '' ? parseFloat(netCash.replace(',', '.')) : null,
          operation_date: operationDate !== '' ? new Date(operationDate) : null,
          original_currency: originalCurrency,
          reference_currency: referenceCurrency,
          retention: retention !== '' ? parseFloat(retention.replace(',', '.')) : null,
          unit_price: unitPrice !== '' ? parseFloat(unitPrice.replace(',', '.')) : null,
          value_date: valueDate !== '' ? new Date(valueDate) : null,
          ...restOfData
        }
        jsonArr.push(newData)
      })
      .on('end', () => {
        // there ara some duplicated ids in the csv file, so we need to remove them
        const filteredTransactions = jsonArr.filter((transaction, index, self) => self.findIndex(t => t._id === transaction._id) === index)
        TransactionModel.insertMany(filteredTransactions)
          .then((docs) => {
            console.log(`${docs.length} documents inserted into Transactions collection`)
            resolve()
          })
          .catch((error: Error) => {
            console.error('Error inserting into Transactions collection: ', error.message)
            reject(error)
          })
      })
  })
}

const readAndInsertProcess = (): void => {
  Promise.all([
    readAndInsertPositions(path.resolve(__dirname, '../data/positionDataset.csv')),
    readAndInsertTransactions(path.resolve(__dirname, '../data/transactionsDataset.csv'))
  ])
    .then(() => {
      console.log('All data loaded successfully')
    })
    .catch((error: Error) => {
      console.error('Error inserting data:', error.message)
    })
    .finally(() => {
      mongoose.disconnect()
        .then(() => console.log('Disconnected from MongoDB!'))
        .catch((error: Error) => console.error('Error disconnecting from MongoDB:', error.message))
    })
}

// Main
mongoose.connection.on('connected', () => {
  Promise.all([
    PositionModel.deleteMany({}),
    TransactionModel.deleteMany({})
  ])
    .then(() => {
      console.log('Collections positions and transactions dropped successfully')
      readAndInsertProcess()
    })
    .catch((error: Error) => {
      console.error('Error dropping collections:', error.message)
    })
})
