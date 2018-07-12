import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
<Provider store={store}>
    <CookiesProvider>
        <App />
    </CookiesProvider>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
