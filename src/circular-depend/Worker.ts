import Team from "./Team";

export default class MyWorker {
  team: Team;
  constructor(team?: Team) {
    this.team = team || new Team();
  }
}
