import { Request, Response } from 'express'
import { PaginateOptions } from 'mongoose'
import { IPosition, ITransaction } from '../types'
import PositionModel from '../models/position'

const PortfolioController = {
  getAll: (req: Request, res: Response) => {
    PositionModel.aggregateTransactions(
      { portfolio_id: req.params.id },
      defaultProjection,
      defaultPaginateOptions.sort
    )
      .then((positions) => {
        if (positions === null || positions.length === 0) return res.status(404).json({ results: [] })

        const positionsWithBalance = positions.filter((position: IPosition) => position.balance > 0 && position.valuation_date !== null)
        const { index, roi, currentValue } = calculateValuesFromPositions(positionsWithBalance)

        const allTransactions = positions.reduce((transactions, position) => {
          transactions.push(...position.transactions)
          return transactions
        }, [])
        const { investmentValue } = calculateValuesFromTransactions(allTransactions)

        res.json({
          results: {
            groupByCurrency: groupAndSum(positions, 'currency'),
            groupByInvestmentType: groupAndSum(positions, 'type'),
            groupByEntity: groupAndSum(positions, 'entity'),
            index,
            roi,
            currentValue,
            investment: investmentValue,
            positions
          }
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Internal server error getting position: ' + req.params.id })
      })
  },

  groupByCurrency: (req: Request, res: Response) => {
    const query = { portfolio_id: req.params.client_id }
    const group = {
      _id: '$currency',
      total: { $sum: '$balance' }
    }

    PositionModel.aggregate(query, group)
      .then((result) => {
        res.json({
          results: result
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Internal server error getting position: ' + req.params.id })
      })
  },

  groupByInvestmentType: (req: Request, res: Response) => {
    const query = { portfolio_id: req.params.client_id }
    const group = {
      _id: '$type',
      total: { $sum: '$balance' }
    }

    PositionModel.aggregate(query, group)
      .then((result) => {
        res.json({
          results: result
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Internal server error getting position: ' + req.params.id })
      })
  },

  groupByEntity: (req: Request, res: Response) => {
    const query = { portfolio_id: req.params.client_id }
    const group = {
      _id: '$entity',
      total: { $sum: '$balance' }
    }

    PositionModel.aggregate(query, group)
      .then((result) => {
        res.json({
          results: result
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Internal server error getting position: ' + req.params.id })
      })
  }
}

const calculateValuesFromPositions = (positions: IPosition[]): any => {
  const totalIndexValue = positions
    .map((position: IPosition) => (position.balance * position.rate_to_euro) * position.number_of_shares)
    .reduce((a: number, b: number) => a + b, 0)

  let indexROI = 0
  const firstPosition = positions[0]
  const lastPosition = positions[positions.length - 1]

  if (!isNaN(firstPosition.balance)) {
    indexROI = ((totalIndexValue - firstPosition.balance) / firstPosition.balance) * 100
  }

  return {
    index: totalIndexValue,
    roi: indexROI,
    currentValue: lastPosition.balance * lastPosition.rate_to_euro
  }
}

const calculateValuesFromTransactions = (transactions: ITransaction[]): any => {
  const investmentValue = transactions.reduce((investment, transaction) => {
    return transaction.symb === '-' ? investment - transaction.amount : investment + transaction.amount
  }, 0)

  return {
    investmentValue
  }
}

const defaultProjection = {
  balance: 1,
  number_of_shares: 1,
  currency: 1,
  entity: 1,
  type: 1,
  valuation_date: 1,
  cost: 1,
  rate_to_euro: 1,
  transactions: {
    _id: 1,
    amount: 1,
    commission: 1,
    isin: 1,
    net_cash: 1,
    operation_date: 1,
    original_currency: 1,
    reference_currency: 1,
    retention: 1,
    symb: 1,
    type: 1,
    valueDate: 1
  }
}

const defaultPaginateOptions: PaginateOptions = {
  limit: 100,
  sort: {
    valuation_date: 1
  },
  projection: defaultProjection
}

const groupAndSum = (data: IPosition[], key: string): Record<string, number> => {
  const groupedData: Record<string, number> = {}
  data.forEach((item: IPosition) => {
    const value = item[key]
    if (groupedData[value] === undefined) groupedData[value] = 0
    groupedData[value] = groupedData[value] + item.balance
  })
  return groupedData
}

export default PortfolioController
