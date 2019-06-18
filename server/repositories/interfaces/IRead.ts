export interface IRead<T> {
  findOne(filter: object): Promise<T>;
  findAll(filter: object): Promise<T[]>;
}
