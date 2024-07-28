import configureStore from 'redux-mock-store';
import { initialState } from '../redux/modules/app';

const mockStore = configureStore();
export const store = mockStore(initialState)