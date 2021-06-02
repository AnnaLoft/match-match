import ICmponent from './IComponent';
import navigate from '../services/routing';

class Main implements ICmponent {
  public view: string;

  constructor() {
    this.view = `

      <section id='content'>

     
              <div class='htp-board'>
                  <div class='title-wrapper'>
                      <p class='title'>How to play?</p>
                  </div>
                  <div class='rules-wrapper'>
                      <div class='rule-card-wrapper'>
                          <div class='rule-card' id='ruleCardFirst'>
                              <div class='rule-card-num-wrapper'>
                                  <div class='rule-card-num'>
                                      <div class='num-wrap'>
                                      <span class='num'>1</span>
                                  </div>
                                  </div>
                              </div>
                              <div class='rule-card-txt-wrapper'>
                                  <p class='rule-card-txt'>Register new player in game.</p>
                              </div>
                          </div>
                      </div>
                      <div class='rule-card-wrapper'>
                          <div class='rule-card' id='ruleCardSecond'>
                              <div class='rule-card-num-wrapper'>
                                  <div class='rule-card-num'>
                                      <div class='num-wrap'>
                                      <span class='num'>2</span>
                                  </div>
                                  </div>
                              </div>
                              <div class='rule-card-txt-wrapper'>
                                  <p class='rule-card-txt'>Configure your game settings.</p>
                              </div>
                          </div>
                      </div>
                      <div class='rule-card-wrapper'>
                          <div class='rule-card' id='ruleCardThird'>
                              <div class='rule-card-num-wrapper'>
                                  <div class='rule-card-num'>
                                      <div class='num-wrap'>
                                      <span class='num'>3</span>
                                  </div>
                                  </div>
                              </div>
                              <div class='rule-card-txt-wrapper'>
                                  <p class='rule-card-txt'>Start your new game! Remember card positions and match it before times up.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class='instruction-wrapper'>
                      <img src='./img/ui/regscreen.png' alt='' class='regscreen'>
                  </div>
                  <div class='settings-btn-wrapper' id="mainBtnSettings" onclick='return false;'>
                      <img src='./img/ui/settings.png' id='btnSettings' alt=''>
                      <div class='btnsettings-txt-wrapper'>
                       <p class='btnsettings-txt'>Settings</p>
                      </div>
                  </div>
                  <div class='collection-wrapper'>
                      <img src='./img/ui/cardcollection.png' alt='game concept' class='collection-pic'>
                  </div>


              </div>
              
          
  </section>
          `;
  }

  updateTree() {
    const app = document.getElementById('app');
    if (this !== undefined) {
      app.insertAdjacentHTML('afterbegin', this.render());

      Main.handleInput();
    }
  }

  render() {
    return this.view;
  }

  static handleButtons() {
    const mainSettings = document.getElementById('mainBtnSettings');

    mainSettings.addEventListener('click', () => {
      navigate('/settings');
    });
  }

  static handleInput() {
    Main.handleButtons();
  }
}

export default Main;
