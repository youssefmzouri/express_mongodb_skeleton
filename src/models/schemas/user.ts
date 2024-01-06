import { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const UserSchema = new Schema({
  _id: String,
  name: String,
  email: String
})

UserSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

UserSchema.plugin(mongoosePaginate)

export default UserSchema
