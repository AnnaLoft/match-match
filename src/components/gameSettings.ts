import ICmponent from './IComponent';

class GameSettings implements ICmponent {
  public view: string;

  constructor() {
    this.view = `
      <section class='settings'>
      <form class='settings-form'>
        <label class='settings_label' for='cardsType'>Game cards</label>
        <select class='gamepacktype' id='cardsType' name='cardsType'>
          <option class='placeholder' value='' disabled selected style='display:none;'>select game cards type</option>
          <option value='animal'>Animals</option>
          <option value='music'>Music</option>
          <option value='space'>Space</option>
          <option value='sweets'>Sweets</option>
        </select>
        <label class='settings_label' for='difficulty'>Difficulty</label>
        <select class='diffmode' id='difficulty' name='difficulty'>
          <option class='placeholder' value='' disabled selected style='display:none;'>select game type</option>
          <option value='easy'>Easy (4x4)</option>
          <option value='medium'>Medium (6x6)</option>
          <option value='hard'>Hard (8x8)</option>
        </select>
      </form>
    </section>`;
  }

  render() {
    return this.view;
  }
}

export default GameSettings;
