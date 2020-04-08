import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export const Store = createStore(
     rootReducer,
    composeWithDevTools(
         applyMiddleware (logger,loggerMiddleware)
    	)
   
);

export default Store;


// import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

// import reducers from './reducers';

// const store = createStore(
//     reducers,
//     applyMiddleware(logger)
// );

// export default store;