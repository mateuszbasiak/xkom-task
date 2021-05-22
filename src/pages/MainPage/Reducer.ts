import { useAppSelector } from '../../Reducer/hooks';
import {MainPageAction} from './Actions';

export interface MainPageState{
    connected: boolean;
    error: boolean;
    numSeats?: number;
}

export const initialState = (): MainPageState => {
	return {
		connected: useAppSelector(state => state.connected),
		error: useAppSelector(state => state.error),
	};
};

const MainReducer = (state: MainPageState = initialState(), action: MainPageAction): MainPageState => {
	switch(action.type){
	case 'SET_MAIN_ERROR':
		return {
			...state,
			error: action.payload.error,
		};
	case 'SET_NUMBER_CONNECTED':
		return {
			...state,
			connected: action.payload.connected,
			numSeats: action.payload.numSeats
		};
	default:
		return state;
	}
};

export default MainReducer;