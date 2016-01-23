import createBrowserHistory from 'history/lib/createBrowserHistory';

const isBrowser = typeof window !== 'undefined' && window.__CLIENT_;

export default isBrowser ? createBrowserHistory() : { listen: () => {} };
