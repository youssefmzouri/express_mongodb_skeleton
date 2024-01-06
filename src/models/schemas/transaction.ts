import { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const TransactionSchema = new Schema({
  _id: String,
  amount: Number,
  commission: Number,
  isin: String,
  net_cash: Number,
  operation_date: Date,
  original_currency: String,
  reference_currency: String,
  retention: Number,
  symb: String,
  type: String,
  unit_price: Number,
  value_date: Date,
  position: {
    type: Schema.Types.String,
    ref: 'Position'
  }
})

TransactionSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

TransactionSchema.plugin(mongoosePaginate)

export default TransactionSchema
