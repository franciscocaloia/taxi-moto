import { ObjectId } from "mongodb";

export class MongoContainer {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll() {
    return await this.collection.find({}).toArray();
  }
  async getById(id) {
    const object = await this.collection.findOne({ _id: new ObjectId(id) });
    return object && { ...object, _id: object._id.toString() };
  }
  async getByFilter(filter) {
    const object = await this.collection.findOne(filter);
    return object && { ...object, _id: object._id.toString() };
  }

  async getManyByFilter(filter) {
    const array = await this.collection.find(filter).toArray();
    return array;
  }

  async save(object) {
    const result = await this.collection.insertOne(object);
    const _id = result.insertedId.toString();
    const newObject = { ...object, _id };
    return newObject;
  }

  async delete(idObject) {
    const result = await this.collection.deleteOne({
      _id: new ObjectId(idObject),
    });
    return result;
  }

  async update(id, object) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: object }
    );
    return result;
  }
}
