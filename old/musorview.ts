import Event from '../services/event';
import Container from './container';
import Validation from '../services/validation';
// import Card from './card';
// import CardContainer from './cardContainer';

class View {
  container: Container;

  body: HTMLBodyElement;

  toggleEvent: Event;

  navigationEvent: Event;

  modal: HTMLElement;

  validation: Validation;

  firstName: HTMLInputElement = null;

  lastName: HTMLInputElement = null;

  email: HTMLInputElement = null;

  constructor() {
    this.container = new Container();
    this.toggleEvent = new Event();
    this.navigationEvent = new Event();

    const id = 0;
    this.body = document.getElementsByTagName('body')[id];

    this.body.innerHTML = this.container.render();

    this.handleInput();
  }

  handleInput() {
    this.handleModalClick();
    this.handleHeaderLinks();
    this.modalAction();
    this.formValidation();
    this.handleSettingsClick();
  }

  handleModalClick() {
    const modalButton = document.getElementById('btnRegistry');
    modalButton.addEventListener('click', () => this.toggleEvent.trigger(null));
  }

  handleSettingsClick() {
    const mainSettings = document.getElementById('mainBtnSettings');

    mainSettings.addEventListener('click', () => {
      this.navigationEvent.trigger('/settings');
    });
  }

  handleHeaderLinks() {
    const pageLogoLink = document.getElementById('pageLogo');
    const btnAboutGame = document.getElementById('btnAboutGame');
    const btnBestScore = document.getElementById('btnBestScore');
    const btnGameSettings = document.getElementById('btnGameSettings');
    const start = document.getElementById('');

    const headerButtons = [btnAboutGame, btnBestScore, btnGameSettings, start];

    pageLogoLink.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnAboutGame.classList.add('navbar_active');

      this.navigationEvent.trigger('/');
    });

    btnAboutGame.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnAboutGame.classList.add('navbar_active');

      this.navigationEvent.trigger('/');
    });

    btnBestScore.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnBestScore.classList.add('navbar_active');

      this.navigationEvent.trigger('/score');
    });

    btnGameSettings.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnGameSettings.classList.add('navbar_active');

      this.navigationEvent.trigger('/settings');
    });

    start.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      start.classList.add('navbar_active');

      this.navigationEvent.trigger('/game');
    });
  }

  toggleModal(state: boolean) {
    this.modal = document.getElementById('modalRegistration');
    if (state) {
      this.modal.classList.remove('modal__hidden');
    } else {
      this.modal.classList.add('modal__hidden');
    }
  }

  modalAction() {
    // const btnAddUser = document.getElementById('btnAddUser');
    const closeModal = document.getElementById('btnCloseModal');
    closeModal.addEventListener('click', () => {
      const btnSubmit = document.getElementById('btnSubmit');
      this.modal.classList.add('modal__hidden');
      this.firstName.value = '';
      this.lastName.value = '';
      this.email.value = '';
      this.firstName.classList.remove('form-input-field__wrong');
      this.firstName.classList.remove('form-input-field__correct');
      this.lastName.classList.remove('form-input-field__wrong');
      this.lastName.classList.remove('form-input-field__correct');
      this.email.classList.remove('form-input-field__wrong');
      this.email.classList.remove('form-input-field__correct');
      btnSubmit.classList.add('btnSubmit__disabled');
    });
  }

  formValidation() {
    this.firstName = <HTMLInputElement>document.getElementById('name');
    this.lastName = <HTMLInputElement>document.getElementById('lastname');
    this.email = <HTMLInputElement>document.getElementById('email');

    const btnSubmit = document.getElementById('btnSubmit');

    this.firstName.addEventListener('keydown', () => {
      if (!Validation.validateName(this.firstName.value)) {
        this.firstName.classList.remove('form-input-field__correct');
        this.firstName.classList.add('form-input-field__wrong');
        btnSubmit.classList.add('btnSubmit__disabled');
      } else if (Validation.validateName(this.firstName.value)) {
        this.firstName.classList.remove('form-input-field__wrong');
        this.firstName.classList.add('form-input-field__correct');
        btnSubmit.classList.remove('btnSubmit__disabled');
      } else {
        this.firstName.classList.remove('form-input-field__wrong');
        this.firstName.classList.remove('form-input-field__correct');
      }
    });
    this.lastName.addEventListener('keydown', () => {
      if (!Validation.validateName(this.lastName.value)) {
        this.lastName.classList.remove('form-input-field__correct');
        this.lastName.classList.add('form-input-field__wrong');
        btnSubmit.classList.add('btnSubmit__disabled');
      } else if (Validation.validateName(this.firstName.value)) {
        this.lastName.classList.remove('form-input-field__wrong');
        this.lastName.classList.add('form-input-field__correct');
        btnSubmit.classList.remove('btnSubmit__disabled');
      } else {
        this.lastName.classList.remove('form-input-field__wrong');
        this.lastName.classList.remove('form-input-field__correct');
      }
    });
    this.email.addEventListener('keyup', () => {
      if (!Validation.validateEmail(this.email.value)) {
        this.email.classList.remove('form-input-field__correct');
        this.email.classList.add('form-input-field__wrong');
        btnSubmit.classList.add('btnSubmit__disabled');
      } else if (Validation.validateName(this.email.value)) {
        this.email.classList.remove('form-input-field__wrong');
        this.email.classList.add('form-input-field__correct');
        btnSubmit.classList.remove('btnSubmit__disabled');
      } else {
        this.email.classList.remove('form-input-field__wrong');
        this.email.classList.remove('form-input-field__correct');
      }
    });
  }
}

export default View;
