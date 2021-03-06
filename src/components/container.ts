import routes from '../services/routes';
import navigate from '../services/routing';
import Header from './header';
import ICmponent from './IComponent';
import Validation from '../services/validation';
import Registration from './registration';

import DataBase, { User } from './DB/DB';

class Container implements ICmponent {
  public view: string;

  private header: Header;

  modal: HTMLElement;

  validation: Validation;

  firstName: HTMLInputElement = null;

  lastName: HTMLInputElement = null;

  email: HTMLInputElement = null;

  db: DataBase;

  constructor() {
    this.state.updateUser();
  }

  public state = {
    route: '/',
    updateRoute: (newRoute: string) => {
      this.setState(() => {
        this.state.route = newRoute;
      });
    },
    modalOpen: false,
    toggleModal: () => {
      this.setState(() => {
        this.state.modalOpen = !this.state.modalOpen;
        this.openModal();
      });
    },
    currentUser: null as User,
    updateUser: () => {
      this.setState(async () => {
        this.state.currentUser = await DataBase.getLocalUser();
        if (this.state.currentUser) {
          const startGame = document.getElementById('btnStartGame');
          startGame.style.setProperty('display', 'block');
          // Remove register button
          // const regButton = document.getElementById('btn_register');
          // regButton.innerHTML = 'Chamge';
        }
      });
    },
    allPlayers: [] as User[],
    getAllUsers: () => {
      this.setState(async () => {
        this.state.allPlayers = await DataBase.getPlayers();
      });
    },
    registerUser: (newUser: User) => {
      this.state.currentUser = newUser;
      this.state.toggleModal();
      if (this.state.currentUser) {
        const startGame = document.getElementById('btnStartGame');
        startGame.style.setProperty('display', 'block');
        // Remove register button
        // const regButton = document.getElementById('btnRegistry');
        // regButton.style.setProperty('display', 'none');
      }
    },
    registrationFormValidation: {
      name: false,
      lastName: false,
      email: false,
      buttonEnabled: false,
    },
    validateName: (valid: boolean) => {
      this.state.registrationFormValidation.name = valid;

      this.state.enableRegistrationButton();
    },
    validateLastName: (valid: boolean) => {
      this.state.registrationFormValidation.lastName = valid;

      this.state.enableRegistrationButton();
    },
    validateEmail: (valid: boolean) => {
      this.state.registrationFormValidation.email = valid;
      this.state.enableRegistrationButton();
    },
    enableRegistrationButton: () => {
      if (this.state.registrationFormValidation.name
        && this.state.registrationFormValidation.lastName
        && this.state.registrationFormValidation.email) {
        this.state.registrationFormValidation.buttonEnabled = true;

        Container.formValidation(true);
      } else {
        this.state.registrationFormValidation.buttonEnabled = false;

        Container.formValidation(false);
      }
    },
  };

  render() {
    const modal = new Registration();
    this.header = new Header();

    this.view = `
    <div>
        <div id="headerPlace"></div>
        <div id="app"></div>
        <div id="modalRegistration" class="modal ${this.state.modalOpen ? '' : 'modal__hidden'}">
        <div class="modal-content">
            ${modal.render()}
        </div>
      </div>
    </div>
    `;
    return this.view;
  }

  setState(callback: Function) {
    callback();
    this.updateTree();
  }

  updateTree() {
    const id = 0;
    const body = document.getElementsByTagName('body')[id];
    if (this !== undefined) {
      body.innerHTML = this.render();

      this.header.updateTree(); // Update Header
      routes[window.location.pathname].updateTree(); // Update App Content

      window.onpopstate = (event: { state: { currentPath: string } }) => {
        let content = '';
        if (event.state.currentPath) {
          content = event.state.currentPath;
        }
        this.state.updateRoute(content);
      };

      this.handleInput();
    }
  }

  handleModalClick() {
    const modalButton = document.getElementById('btnRegistry');
    modalButton.addEventListener('click', () => this.state.toggleModal());
  }

  openModal() {
    this.modal = document.getElementById('modalRegistration');
    if (!this.state.modalOpen) {
      this.modal.classList.remove('modal__hidden');
    } else {
      this.modal.classList.add('modal__hidden');
    }
  }

  modalAction() {
    const closeModal = document.getElementById('btnCloseModal');
    closeModal.addEventListener('click', () => {
      const btnSubmit = document.getElementById('btnSubmit');
      this.state.toggleModal();
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
    const addUser = document.getElementById('btnAddUser');
    addUser.addEventListener('click', async () => {
      this.saveNewUser({
        name: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        score: 0,
      });
    });
  }

  static formValidation(valid: boolean) {
    const btnSubmit = document.getElementById('btnSubmit');
    if (valid) {
      btnSubmit.classList.remove('btnSubmit__disabled');
    } else {
      btnSubmit.classList.add('btnSubmit__disabled');
    }
  }

  formValidateName(): boolean {
    let result = false;

    this.firstName = <HTMLInputElement>document.getElementById('name');
    this.firstName.addEventListener('input', () => {
      if (!Validation.validateName(this.firstName.value)) {
        this.firstName.classList.remove('form-input-field__correct');
        this.firstName.classList.add('form-input-field__wrong');
        result = false;
      } else if (Validation.validateName(this.firstName.value)) {
        this.firstName.classList.remove('form-input-field__wrong');
        this.firstName.classList.add('form-input-field__correct');
        result = true;
      } else {
        this.firstName.classList.remove('form-input-field__wrong');
        this.firstName.classList.remove('form-input-field__correct');
        result = false;
      }
    });
    this.firstName.addEventListener('keyup', () => this.state.validateName(result));

    return result;
  }

  formValidateLastName(): boolean {
    let result = false;

    this.lastName = <HTMLInputElement>document.getElementById('lastname');
    this.lastName.addEventListener('input', () => {
      if (!Validation.validateName(this.lastName.value)) {
        this.lastName.classList.remove('form-input-field__correct');
        this.lastName.classList.add('form-input-field__wrong');
        result = false;
      } else if (Validation.validateName(this.lastName.value)) {
        this.lastName.classList.remove('form-input-field__wrong');
        this.lastName.classList.add('form-input-field__correct');
        result = true;
      } else {
        this.lastName.classList.remove('form-input-field__wrong');
        this.lastName.classList.remove('form-input-field__correct');
        result = false;
      }
      this.state.validateLastName(result);
    });

    return result;
  }

  formValidateEmail(): boolean {
    let result = false;

    this.email = <HTMLInputElement>document.getElementById('email');
    this.email.addEventListener('input', () => {
      if (!Validation.validateEmail(this.email.value)) {
        this.email.classList.remove('form-input-field__correct');
        this.email.classList.add('form-input-field__wrong');
        result = false;
      } else if (Validation.validateEmail(this.email.value)) {
        this.email.classList.remove('form-input-field__wrong');
        this.email.classList.add('form-input-field__correct');
        result = true;
      } else {
        this.email.classList.remove('form-input-field__wrong');
        this.email.classList.remove('form-input-field__correct');
        result = false;
      }
      this.state.validateEmail(result);
    });

    return result;
  }

  static handleHeaderLinks() {
    const pageLogoLink = document.getElementById('pageLogo');
    const btnAboutGame = document.getElementById('btnAboutGame');
    const btnBestScore = document.getElementById('btnBestScore');
    const btnGameSettings = document.getElementById('btnGameSettings');

    // const bodySettings = document.getElementById('mainBtnSettings');
    const playButton = document.getElementById('btnStartGame');

    const headerButtons = [btnAboutGame, btnBestScore, btnGameSettings, playButton];

    pageLogoLink.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnAboutGame.classList.add('navbar_active');

      navigate('/');
    });

    btnAboutGame.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnAboutGame.classList.add('navbar_active');

      navigate('/');
    });

    btnBestScore.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnBestScore.classList.add('navbar_active');

      navigate('/score');
    });

    btnGameSettings.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));
      btnGameSettings.classList.add('navbar_active');

      navigate('/settings');
    });

    // bodySettings.addEventListener('click', () => {
    //   headerButtons.map((btn) => btn.classList.remove('navbar_active'));
    //   btnGameSettings.classList.add('navbar_active');
    //   navigate('/settings');
    // });

    playButton.addEventListener('click', () => {
      headerButtons.map((btn) => btn.classList.remove('navbar_active'));

      navigate('/game');
    });
  }

  registerUser() {
    if (this.state.enableRegistrationButton) {
      const btnSubmit = document.getElementById('btnSubmit');
      btnSubmit.addEventListener('click', () => {
        const newUser: User = {
          name: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,
          score: 0,
        };
        this.saveNewUser(newUser);
        console.log('newUser');
      });
    }
  }

  saveNewUser(user: User) {
    // save to db
    const result = DataBase.saveUser(user);

    // update currentUser in state
    this.state.registerUser(user);
  }

  handleInput() {
    Container.handleHeaderLinks();
    this.handleModalClick();
    this.modalAction();
    this.formValidateLastName();
    this.formValidateName();
    this.formValidateEmail();
  }
}

export default Container;
