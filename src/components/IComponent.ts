interface IComponent {
  render(): string;
  update?(): void;
  updateTree?(): void;
}

export default IComponent;
