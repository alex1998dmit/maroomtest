
import reducers from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers,
  compose(   
    applyMiddleware(reduxThunk), 
  ),
);

export default store;
