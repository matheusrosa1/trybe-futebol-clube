import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { TokenType } from '../types/Token';
import Jwt from '../utils/Jwt';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwt: Jwt,
  ) { }

  public async login(login: ILogin): Promise<ServiceResponse<TokenType | null>> {
    const user: IUser | null = await this.userModel.findByEmail(login.email);
    if (user) {
      if (!bcrypt.compareSync(login.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email }: IUser = user;
      const token = Jwt.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }
}
