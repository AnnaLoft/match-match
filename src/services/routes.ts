import {
  ICmponent, Main, CardContainer, BestScore, GameSettings, Registration,
} from '../components';

const main = new Main();
const cardContainer = new CardContainer();
const score = new BestScore();
const settings = new GameSettings();
const registration = new Registration();

const routes: { [key: string]: ICmponent } = {
  '/': main,
  '/game': cardContainer,
  '/score': score,
  '/settings': settings,
  '/registration': registration,

};

export default routes;
