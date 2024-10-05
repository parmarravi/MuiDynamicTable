// import { createStore } from 'redux';
import reducer from './reducer';
import { createStore } from '@reduxjs/toolkit';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
