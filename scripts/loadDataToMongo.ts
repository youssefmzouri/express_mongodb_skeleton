import '../src/loadEnv'
import { mongoose } from '../src/mongo'
import UserModel from '../src/models/user'
import { IUser } from '../src/types'

const users: IUser[] = [
  {
    _id: '5f8f8d4d-8c5a-4f1f-9d4e-1a1b9b2c3d4e',
    name: 'John Doe',
    email: 'johndoe@mail.com'
  },
  {
    _id: '6f8f8d4d-8c5a-4f1f-9d4e-1a1b9b2c3d4e',
    name: 'Jane Doe',
    email: 'janedoe@mail.com'
  }
] as IUser[]

const insertData = (): void => {
  Promise.resolve(UserModel.insertMany(users))
    .then(() => console.log('Users inserted.'))
    .catch((error: Error) => console.error('Error inserting users:', error.message))
    .finally(() => {
      mongoose.disconnect()
        .then(() => console.log('Disconnected from MongoDB!'))
        .catch((error: Error) => console.error('Error closing connection from MongoDB:', error.message))
    })
}

// Main
mongoose.connection.on('connected', () => {
  Promise.resolve(UserModel.deleteMany({}))
    .then(() => {
      console.log('All data deleted.')
      insertData()
    })
    .catch((error: Error) => console.error('Error dropping collection users:', error.message))
})
