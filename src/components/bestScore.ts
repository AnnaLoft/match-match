import IComponent from './IComponent';

class BestScore implements IComponent {
  public view: string;

  constructor() {
    this.view = `
      <section class='score'>
      <p class='score-title'>Best Players</p>
     
    </section>
              `;
  }

  render() {
    return this.view;
  }
}

export default BestScore;
