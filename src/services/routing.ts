import routes from './routes';

const navigate = (pathname : string): void => {
  const app = document.getElementById('app');
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  app.innerHTML = routes[pathname].render();
  if (routes[pathname].update) routes[pathname].update();
};
export default navigate;
