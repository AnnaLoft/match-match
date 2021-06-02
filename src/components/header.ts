import ICmponent from './IComponent';
import NavBarButton from './navBarButton';

class Header implements ICmponent {
  public view: string;

  constructor() {
    this.view = `
      <header>
      <div class='wrapper'>
          <div class='header-content-wrapper'>
              <div class='logo'>
                  <div class='logo-pic-wrapper'>
                      <img src='./img/ui/puzzle.svg' class='logo' alt=''>
                  </div>
                  <div class='logo-link-wrapper'>
                      <a href="#" onclick='return false;' class='logo-link' id='pageLogo'> <span class='logo-second'>Match</span> <span
                              class='logo-first'>Match</span></a>
                  </div>
              </div>
              <ul class='navbar'>
                ${new NavBarButton('btnAboutGame', 'navbar_about nav_icon ', 'About Game', 'tab navbar_active').render()}
                ${new NavBarButton('btnBestScore', 'navbar_best nav_icon', 'Best Score', 'tab').render()}
                ${new NavBarButton('btnGameSettings', 'navbar_settings nav_icon', 'Game Settings', 'tab').render()}
              
              </ul>
              <ul class='buttons'>
              <a id='btnRegistry' onclick='return false;' href='#' style='display: block'>
                  <button class='btn_register'>Register new player</button>
              </a>
              <a id='btnStartGame' onclick='return false;' href='#' style='display: none;'>
                  <button class='btn_register'> Start Game</button>
              </a>
              </ul>
          </div>
      </div>
  </header>`;
  }

  updateTree() {
    const header = document.getElementById('headerPlace');
    if (this !== undefined) {
      header.insertAdjacentHTML('afterbegin', this.render());
    }
  }

  render() {
    return this.view;
  }
}

export default Header;
