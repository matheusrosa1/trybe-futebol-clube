import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(q: boolean): Promise<IMatch[]>
}
