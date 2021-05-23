import { ChooseSeatAction, ISeat, SeatInfo } from './Actions';

export interface ChooseSeatState{
    error: boolean;
    chosenSeats: Array<SeatInfo>;
	fetchingError: boolean,
	fetchingData: boolean,
	seats: Array<ISeat>;
}

const initialState: ChooseSeatState = {
	error: false,
	chosenSeats: [],
	fetchingData: false,
	fetchingError: false,
	seats: []
};

const chooseSeatReducer = (state: ChooseSeatState = initialState, action: ChooseSeatAction): ChooseSeatState => {
	switch(action.type){
	case 'ADD_CHOSEN_SEATS':
		return {
			...state,
			chosenSeats: [...state.chosenSeats, ...action.payload.seats]
		};
	case 'DELETE_CHOSEN_SEAT':
		return{
			...state,
			chosenSeats: action.payload.chosenSeats
		};
	case 'SET_CHOOSE_SEAT_ERROR':
		return {
			...state,
			error: action.payload.error,
		};
	case 'SEATS_FETCHED':
		return {
			...state,
			seats: action.payload.seats,
		};
	case 'FETCHING_SEATS':
		return {
			...state,
			fetchingData: true
		};
	case 'FETCHING_ERROR':
		return {
			...state,
			fetchingError: true
		};
	case 'STOP_FETCHING_STATUS':
		return {
			...state,
			fetchingData: false
		};
	default:
		return state;
	}
};

export default chooseSeatReducer;