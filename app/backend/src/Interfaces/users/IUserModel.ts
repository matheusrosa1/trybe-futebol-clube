import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | null>,
  findByEmail(email: IUser['email']): Promise<IUser | null>
}
