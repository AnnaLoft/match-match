import ICmponent from './IComponent';
import Card from './card';

class CardContainer implements ICmponent {
  public view: string;

  private cards: Card[] = [];

  constructor() {
    this.view = `
    <div class='cards-board-wrapper'>
    <div class='cards-board'>
        <div class='timer-wrapper'>
            <div class='timer' id='gameTimer'></div>
        </div>
    </div>
</div>`;
  }

  updateTree() {
    const app = document.getElementById('app');
    if (this !== undefined) {
      app.innerHTML = this.render();
    }
  }

  render() {
    return this.view;
  }

  clear() {
    this.cards = [];
  }

  static updateTime() {
    const timer = document.getElementById('gameTimer');

    timer.innerHTML = `${CardContainer.timer()}`;
  }

  static timer() {
    const timeStart = new Date().getTime();
    return {
      /** <integer>s e.g 2s etc. */
      get seconds() {
        const seconds = `${Math.ceil((new Date().getTime() - timeStart) / 1000)}s`;
        return seconds;
      },
      /** Milliseconds e.g. 2000ms etc. */
      get ms() {
        const ms = `${new Date().getTime() - timeStart}ms`;
        return ms;
      },
    };
  }
}

export default CardContainer;
