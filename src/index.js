import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import App from './App';
import { toastr } from './services';
import { Store } from './store/store.js';
//import '../node_modules/jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import './index.scss';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Provider store ={Store}> 
        <div>     
            <NotificationSystem key="notificationSystem" ref= { (n) => toastr.setNotificationSystem(n)  } />
            <App />
        </div>  
    </Provider>  
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
