import Worker from "./Worker";

export default class Team {
  workers: Worker[];
  constructor(){
    this.workers = [new Worker(this)];
  }
  show() {
    console.log(this.workers);
  }
}
