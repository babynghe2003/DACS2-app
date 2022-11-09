import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducer';
import storage from 'redux-persist/lib/storage';

// ==============================|| REDUX - MAIN STORE ||============================== //
const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['role']
};

const pReducer = persistReducer(persistConfig, reducer);

const store = configureStore({ reducer: pReducer });
const persister = persistStore(store);

export { store, persister };
