import { itemFromDb_I } from '../interfaces';

class ItemEntity {
  public itemId: string;
  public userId: string;
  public title: string;
  public priority: string;
  public description: string;
  public dueDate: Date;
  // public createdAt: Date;
  // public updatedAt: Date;

  constructor(
    title: string,
    priority: string,
    description: string,
    dueDate: Date
  ) {
    this.title = title;
    this.priority = priority;
    this.description = description;
    this.dueDate = dueDate;
  }

  setItemId(itemId: string) {
    this.itemId = itemId;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  // * factory method when we use data from incoming API call
  // TODO Ask if we can declare type to be of sequelize request or do we need it to be explicit type declarations
  public static fromAPI(obj) {
    return new ItemEntity(
      obj.body.title,
      obj.body.priority,
      obj.body.description,
      obj.body.dueDate
    );
  }

  // * factory method when we use data from DB
  public static fromDB(obj: itemFromDb_I) {
    return new ItemEntity(
      obj.title,
      obj.priority,
      obj.description,
      obj.dueDate
    );
  }

  // * Returns the current object
  public static fromObj() {
    return JSON.parse(JSON.stringify(this));
  }
}

export { ItemEntity };
