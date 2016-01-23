import createBrowserHistory from 'history/lib/createBrowserHistory';

const isBrowser = window !== undefined && window.__CLIENT_;

export default history = isBrowser ? createBrowserHistory() : { listen: () => {} };
