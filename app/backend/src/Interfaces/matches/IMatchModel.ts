import { NewEntity } from '../NewEntity';
/* import { ServiceMessage } from '../ServiceResponse'; */
import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findById(id: number): Promise<IMatch | null>;
  findByQuery(q: boolean): Promise<IMatch[]>;
  update(id: IMatch['id'], data: Partial<NewEntity<IMatch>>): Promise<IMatch | null>
}
