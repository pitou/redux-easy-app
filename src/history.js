import { browserHistory } from 'react-router';

const isBrowser = typeof window !== 'undefined' && window.__CLIENT_;

export default isBrowser ? browserHistory : { listen: () => {} };
