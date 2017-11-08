import { createStore, combineReducers } from 'redux';
import layout from './reducers/layoutReducer';
import blockset from './reducers/blockReducer';
import editor from './reducers/editorReducer';

const reducer = combineReducers({ layout, editor, blockset });
export default createStore(reducer)
