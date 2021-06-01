import ICmponent from './IComponent';

class Registration implements ICmponent {
  public view: string;

  constructor() {
    this.view = `
    <section id='registration-content'>
   
        <div class='form-board'>
            <div class='wrap'>
                <form action='' class='registration-form'>
                    <div class='form-title-wrapper'>
                        <p class='form-title'>Registrate new Player</p>
                    </div>
                    <input type='text' class='form-input-field' id='name' placeholder='First Name'>
                    <div class = 'name__error'></div>
                    <input type='text' class='form-input-field' id='lastname' placeholder='Last Name'>
                    <div class = 'lastname__error'></div>
                    <input type='email' class='form-input-field' id='email' placeholder='Email'>
                    <div class = 'email__error'></div>
                    <div class='btn-wrapper'>
                        <a id='btnSubmit' class="btnSubmit__disabled" href='#'>
                            <button class='btnSubmit ' id='btnAddUser'  onclick='return false;'>Add User</button>
                        </a>
                        <a id='btnCancel' href='#'>
                            <button class='btnCancel' id='btnCloseModal'  onclick='return false;'   >Cancel</button>
                        </a>   
                    </div>
                </form>
            </div>
            <div class='userpic-wrapper'>
                <div class='userpic'></div>
            </div>
        </div>
    

</section>
      `;
  }

  render() {
    return this.view;
  }
}
export default Registration;
