import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { ServiceMessage, ServiceResponse, ServiceRoleMessage } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { TokenType } from '../types/Token';
import Jwt from '../utils/Jwt';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | TokenType>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = await Jwt.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  public async getRole(token: string):
  Promise<ServiceResponse<ServiceMessage | ServiceRoleMessage>> {
    const validateToken = Jwt.verify(token) as IUser;
    const user = await this.userModel.findByEmail(validateToken.email);
    if (user) {
      return { status: 'SUCCESSFUL', data: { role: user.role } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }
}
