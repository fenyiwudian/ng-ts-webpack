import Team from "./Team";

export default class Worker {
  team: Team;
  constructor(team: Team) {
    this.team = team;
  }
}
