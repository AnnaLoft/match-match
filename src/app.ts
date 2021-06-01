import Container from './components/container';

class App {
  container: Container;

  public init(): void {
    this.container = new Container();

    this.container.updateTree();
  }
}

export default App;
