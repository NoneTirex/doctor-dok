import { eq } from "drizzle-orm";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// import all interfaces
export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(query: Record<string, any>, item: T): Promise<T>;
    delete(query: Record<string, any>): Promise<boolean>;
  }

  export interface IRead<T> {
    findAll(): Promise<T[]>;
    findOne(query: Record<string, any>): Promise<T>;
  }

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    async create(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async update(query: Record<string, any>, item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async upsert(query: Record<string, any>, item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }    
    async delete(query: Record<string, any>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async findOne(query: Record<string, any>): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

    // create a new patient record
export async function create<T extends { [key:string]: any }>(item: T, schema: any, db:BetterSQLite3Database<Record<string, never>>): Promise<T> {
        const returnedItem = db.insert(schema).values(item).returning().get();
        return Promise.resolve(returnedItem as T);
    }
