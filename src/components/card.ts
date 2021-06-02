import ICmponent from './IComponent';

class Card implements ICmponent {
  public image: string;

  public imgBGColor: string;

  public back: string;

  public backBGColor: string;

  public view: string;

  public matchNumber: number;

  public cardId: number;

  constructor(
    image: string,
    imgBGColor: string,
    back: string,
    backBGColor: string,
    matchNumber: number,
    cardId: number,
  ) {
    this.image = image;
    this.imgBGColor = imgBGColor;
    this.back = back;
    this.backBGColor = backBGColor;
    this.matchNumber = matchNumber;
    this.cardId = cardId;

    this.view = `
         <div class='card-wrapper' id='card__${this.cardId}'>
                <div class='card animated open'>
                    <div class='card-back' id='cardBack__${this.cardId}'></div>
                    <div class='card-pic' id='cardPic__${this.cardId}'></div>
                </div>
            </div>
        `;
  }

  render() {
    return this.view;
  }

  update() {
    const card = document.getElementById(`card__${this.cardId}`);
    const cardBack = document.getElementById(`cardBack__${this.cardId}`);
    const cardPic = document.getElementById(`cardPic__${this.cardId}`);
    cardPic.setAttribute('background-image', `url(${this.image})`);
    cardPic.setAttribute('background-color', `rgb(${this.imgBGColor})`);
    cardBack.setAttribute('background-image', `url(${this.back})`);
    cardBack.setAttribute('background-color', `rgb(${this.backBGColor})`);
  }

  Flip() {
    const card = document.getElementById(`card__${this.cardId}`);
    card.classList.toggle('open');
    // if (card.classList.contains('open')) {
    //   card.classList.remove('open');
    // }
  }
}

export default Card;
