import {MainPageAction} from './Actions';

export interface MainPageState{
    connected: boolean;
    error: boolean;
    numSeats: number;
}

const MainReducer = (state: MainPageState, action: MainPageAction): MainPageState => {
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