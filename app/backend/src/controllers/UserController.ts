import { Request, Response } from 'express';
/* import { TokenType } from '../types/Token'; */
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async gettingRole(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    const { status, data } = await this.userService.getRole(token as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
