import { createStore } from 'redux';
import rootReducer from './reducers'; // Root reducer combining all reducers

const store = createStore(rootReducer); // Create Redux store

export default store;
