import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByQuery(q: string): Promise<IMatch[]>
}
