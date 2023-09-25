import { ObjectId } from "mongodb";

export class MongoContainer {
  constructor(collection) {
    this.collection = collection;
  }
  async getAll() {
    const array = await this.collection.find({}).toArray();
    return array.map((element) => ({
      ...element,
      _id: element._id.toString(),
    }));
  }
  async getById(id) {
    console.log(id);
    const object = await this.collection.findOne({ _id: new ObjectId(id) });
    return object && { ...object, _id: object._id.toString() };
  }
  async getByFilter(filter) {
    const object = await this.collection.findOne(filter);
    return object && { ...object, _id: object._id.toString() };
  }

  async getManyByFilter(filter, sort = {}) {
    const array = await this.collection
      .find(filter)
      .sort(sort)
      .toArray();
    return array.map((element) => ({
      ...element,
      _id: element._id.toString(),
    }));
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
      object
    );
    return result;
  }

  async aggregate(match, group) {
    const result = await this.collection
      .aggregate([
        {
          $match: match,
        },
        {
          $group: group,
        },
      ])
      .toArray();
    console.log(result[0].totalQuantity);
    return result[0].totalQuantity;
  }
  async count(filter) {
    const result = await this.collection.countDocuments();
    return result;
  }
}
