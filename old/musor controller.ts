import Model from './model';
import View from '../components/view';

class Controller {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.toggleEvent.addListener(() => {
      const modalState = this.model.toggleModal();
      this.view.toggleModal(modalState);
    });

    this.view.navigationEvent.addListener((ev: string) => {
      console.log('nav', ev);
      this.model.navigate(ev);
    });
  }
}

export default Controller;
