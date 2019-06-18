export interface IWrite<T> {
  create(item: T): Promise<T>;
  createMany(item: T[]): Promise<object>;
}
