import { createStore, combineReducers } from 'redux';
import layout from './layoutReducer';
import blockset from './blockReducer';
import editor from './editorReducer';

const reducer = combineReducers({ layout, editor, blockset });
export default createStore(reducer)
