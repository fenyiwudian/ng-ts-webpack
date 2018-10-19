import MyWorker from "./Worker";

export default class Team {
  workers: MyWorker[];
  constructor() {
    this.workers = [new MyWorker(this)];
  }
  show() {
    console.log(this.workers);
  }
}
