import { combineReducers, createStore } from 'redux';
import boxReducer from './reducers/boxReducers';

const rootReducer = combineReducers({
  boxList: boxReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
