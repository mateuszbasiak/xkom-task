import {MainPageAction} from './Actions';

export interface MainPageState{
    connected: boolean;
    error: boolean;
    numSeats: number;
}

export const initialState: MainPageState = {
	connected: false,
	error: false,
	numSeats: 0
};

const mainReducer = (state: MainPageState = initialState, action: MainPageAction): MainPageState => {
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

export default mainReducer;