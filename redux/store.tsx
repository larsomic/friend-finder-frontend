import { createStore, combineReducers, applyMiddleware  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LoginActions, UserActions, StoreType } from './store_type';
import requiredInfoMiddleware from './requiredInfoMiddleware';

const authReducer = (state = { loggedIn: false }, action: LoginActions) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedIn: true };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
    case 'SIGNED_UP':
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

const userReducer = (state = { name: null, email: null }, action: UserActions) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return { ...state, name: action.payload?.name, email: action.payload?.email };
    case 'UPDATE_USER_INFO':
      return { ...state, name: action.payload?.name, email: action.payload?.email };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(requiredInfoMiddleware));
export const persistor = persistStore(store);
