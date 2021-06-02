import DataBase, { User } from './DB/DB';

import IComponent from './IComponent';

class BestScore implements IComponent {
  public view: string;

  public state: {
    allPlayers: User[];
    getAllPlayers: () => void;
  };

  constructor() {
    this.state = {
      allPlayers: [] as User[],
      getAllPlayers: () => {
        this.setState(async () => {
          this.state.allPlayers = await DataBase.getPlayers();
        });
      },
    };
    this.state.getAllPlayers();
  }

  setState(callback: Function) {
    callback();
    this.updateTree();
  }

  updateTree() {
    const app = document.getElementById('app');
    if (app && this !== undefined) {
      app.innerHTML = this.render();

      this.populatePlayerList();
      // this.handleInput();
    }
  }

  populatePlayerList() {
    const playerList = document.getElementById('players-list');
    const person = `
    <ul>
    ${this.state.allPlayers.map((player) => `<li>${player.name} ${player.lastName} ${player.score}</li>`)}
    </ul>`;
    playerList.insertAdjacentHTML('afterbegin', person);
  }

  render() {
    this.view = `
    <section class='score'>
    <p class='score-title'>Best Players</p>
   <div class='score-list' id='players-list'></div>
  </section>
            `;
    return this.view;
  }
}

export default BestScore;
