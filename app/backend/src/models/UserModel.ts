import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }
    ));
  }

  async findById(id: number): Promise<IUser | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { username, role, email, password }: IUser = dbData;
    return { id, username, role, email, password };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (dbData == null) return null;
    const { id, username, role, password }: IUser = dbData;
    return { id, username, role, email, password };
  }
}
