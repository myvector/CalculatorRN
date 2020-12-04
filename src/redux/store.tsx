import { createStore, combineReducers } from 'redux';
import { calc } from './reducer/reducer';

const reducer = combineReducers({ calc });
const store = createStore(reducer);
export { store };
