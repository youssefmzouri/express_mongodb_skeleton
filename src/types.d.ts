import { Document, Model, PaginateOptions, PaginateResult } from 'mongoose'

/**
 * FI   -> Fondo de inversión
 * VI   -> Valores inmobiliarios
 * F    -> Futuros
 * ETF  -> Exchange Traded Funds (Fondo cotizado en bolsa)
 * O    -> Opciones
 */
type PositionType = 'FI' | 'VI' | 'F' | 'ETF' | 'O'

export interface IPosition extends Document {
  _id: string
  accrued_interest: number
  number_of_shares: number
  balance: number
  capital_gain: number
  cost: number
  currency: string
  entity: string
  expiration_date: Date
  initial_date: Date
  interest_rate: number
  is_nominal: boolean
  isin: string
  market: string
  name: string
  portfolio_id: string
  type: PositionType
  valuation_date: Date
  rate_to_euro: number
  [key: string]: any
}

export interface ITransaction extends Document {
  _id: string
  amount: number
  commission: number
  position: string
  isin: string
  net_cash: number
  operation_date: Date
  original_currency: string
  reference_currency: string
  retention: number
  symb: string
  type: string
  unit_price: number
  value_date: Date
}

export interface IPopulatedTransaction extends ITransaction {
  position: IPosition
}

export interface IPositionModel extends Model<IPosition> {
  paginate: (
    query?: any,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<IPosition>) => void,
  ) => Promise<PaginateResult<IPosition>>
}

export interface ITransactionModel extends Model<ITransaction> {
  paginate: (
    query?: any,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<ITransaction>) => void,
  ) => Promise<PaginateResult<ITransaction>>
}
