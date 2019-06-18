import {
  Collection,
  Db,
  InsertOneWriteOpResult,
} from 'mongodb';
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

  protected readonly collection: Collection;

  constructor(db: Db, collectionName: string) {

    this.collection = db.collection(collectionName);

  }

  public async create(item: T): Promise<T> {

    const itemWithDate = Object.assign(item, { createdAt: new Date() });

    const result: InsertOneWriteOpResult = await this.collection.insertOne(itemWithDate);

    return result.ops[0];
  }

  public async createMany(item: T[]): Promise<T[]> {

    const result = await this.collection.insertMany(item);

    return result.ops;

  }

  public findAll(data: object): Promise<T[]> {

    return this.collection.find(data).toArray();

  }

  public async findOne(data: object): Promise<T> {

    return await this.collection.findOne(data);

  }
}
