import { Model } from "objection";

export default class Trades extends Model {
  static tableName = "trades";
  $beforeInsert() {
    this.datetime = new Date().toISOString();
  }

  $beforeUpdate() {
    this.datetime = new Date().toISOString();
  }
}
