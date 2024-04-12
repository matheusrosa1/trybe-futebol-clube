import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { TokenType } from '../types/Token';
import Jwt from '../utils/Jwt';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    /*     private jwtService: Jwt, */
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | TokenType>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = Jwt.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }

/*   public async getRole(id: number):
  Promise<ServiceResponse<ServiceMessage | ServiceRoleMessage>> {

  } */
}
