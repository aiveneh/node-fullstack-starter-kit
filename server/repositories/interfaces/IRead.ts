export interface IRead<T> {
  findOne(filter: object): Promise<T>;
  find(filter: object): Promise<T[]>;
}
