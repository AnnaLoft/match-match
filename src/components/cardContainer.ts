import ICmponent from './IComponent';
import Card from './card';

class CardContainer implements ICmponent {
  public view: string;

  private stuff: string;

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

  render() {
    return this.view;
  }

  update() {
    console.log(this.stuff = '');
    const startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() + 1);

    const countDownDate = new Date(startTime).getTime();
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      document.getElementById('gameTimer').innerHTML = `${minutes}m ${seconds}s `;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById('gameTimer').innerHTML = 'EXPIRED';
      }
    }, 1000);
  }
}

export default CardContainer;
