import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

const AppWithStore = () => (
    <Provider store={store}>
        <App />
    </Provider>
);


ReactDOM.render(<AppWithStore />, document.getElementById('root'));
registerServiceWorker();
