import { Document, Model, PaginateOptions, PaginateResult } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
}

export interface IUserModel extends Model<IUser> {
  paginate: (
    query?: any,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<IUser>) => void,
  ) => Promise<PaginateResult<IUser>>
}
