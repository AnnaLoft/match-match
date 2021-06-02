import routes from './routes';

const navigate = (pathname : string): void => {
  window.history.pushState(
    {
      currentPath: pathname,
    },
    pathname,
    window.location.origin + pathname,
  );
  if (routes[pathname].updateTree) routes[pathname].updateTree();
};

export default navigate;
