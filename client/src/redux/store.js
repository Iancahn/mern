import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

// next we combine reducers, this is abit advanced for me
const rootReducer = combineReducers({user: userReducer})

// this persisted reducer allows us to keep state/user on page refresh
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // set serializalbe Check will prevent some error later?
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:false,
  }),
});

export const persistor = persistStore(store);
