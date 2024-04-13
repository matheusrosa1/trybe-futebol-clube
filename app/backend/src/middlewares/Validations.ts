import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/Jwt';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }

  static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const verifyngToken = await Jwt.verify(token);
    if (verifyngToken === 'Token must be a valid token') {
      /*       console.log('verifytoken:', verifyngToken); */
      return res.status(401).json({ message: verifyngToken });
    }

    return next();
  }
}

export default Validations;
