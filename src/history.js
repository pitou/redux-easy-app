import { browserHistory } from 'react-router';

const isBrowser = typeof window !== 'undefined' && window.__CLIENT__;

export default isBrowser ? browserHistory : { listen: () => {} };
