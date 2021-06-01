import Event from './event';

import navigate from './routing';

type AppState = {
  currentRoute: string;
  modalState: boolean;
};

const state: AppState = {
  currentRoute: '/',
  modalState: false,
};

class Model {
  appState: AppState;

  modalEvent: Event;

  navigationEvent: Event;

  constructor() {
    this.appState = state;
    this.modalEvent = new Event();
    this.navigationEvent = new Event();
  }

  toggleModal(): boolean {
    this.appState.modalState = !this.appState.modalState;
    this.modalEvent.trigger(this.appState.modalState);

    return this.appState.modalState;
  }

  navigate(ev: string) {
    if (this.appState.currentRoute !== ev) {
      this.appState.currentRoute = ev;
      this.navigationEvent.trigger(ev);
      navigate(ev);
    }
  }
}

export default Model;
