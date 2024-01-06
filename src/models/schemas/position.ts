import { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const PositionSchema = new Schema({
  _id: String,
  accrued_interest: Number,
  number_of_shares: Number,
  balance: Number,
  capital_gain: Number,
  cost: Number,
  currency: String,
  entity: String,
  expiration_date: Date,
  initial_date: Date,
  interest_rate: Number,
  is_nominal: Boolean,
  isin: String,
  market: String,
  name: String,
  portfolio_id: String,
  type: String,
  valuation_date: Date,
  rate_to_euro: Number
})

PositionSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

PositionSchema.plugin(mongoosePaginate)

export default PositionSchema
