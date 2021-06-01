import ICmponent from './IComponent';

class NavBarButton implements ICmponent {
  public view: string;

  constructor(
    public id: string,
    public className: string,
    public text: string,
    public isActive: string,
  ) {
    this.view = `
      <a class='${isActive}' href="#" onclick='return false;' id='${id}'>
                      <li>
                          <div class='${className}'></div>
                          <p class='navbar_text'>${text}</p>
                      </li>
                  </a>`;
  }

  render() {
    return this.view;
  }
}

export default NavBarButton;
