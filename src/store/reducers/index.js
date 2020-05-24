import { combineReducers } from 'redux';
import ApartamentReducer from './apartament';

const rootReducer = combineReducers({
  apartament: ApartamentReducer,
});

export default rootReducer;
