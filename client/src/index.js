import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker'
import ApolloProvider from './ApolloProvider'

ReactDOM.render(ApolloProvider, document.getElementById('root'));

serviceWorker.unregister();
