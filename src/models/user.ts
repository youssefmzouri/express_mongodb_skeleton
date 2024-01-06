import { model, PaginateOptions, QueryOptions } from 'mongoose'
import UserSchema from './schemas/user'
import { IUser, IUserModel } from '../types'

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema)

const UserModel = {
  async paginate(query?: any, options?: PaginateOptions) {
    return await User.paginate(query, options)
  },

  async find(query: any, projection?: any, sort?: any) {
    const options: QueryOptions = { sort }
    return await User.find(query, projection, options)
  },

  async findById(id: string) {
    return await User.findById(id)
  },

  async insertMany(users: IUser[]) {
    return await User.insertMany(users)
  },

  async deleteMany(query: any) {
    return await User.deleteMany(query)
  }
}

export default UserModel
