import { MainPageAction, MainPageActionTypes } from '../pages/MainPage/Actions';
import MainReducer, { MainPageState } from '../pages/MainPage/Reducer';
import { ChooseSeatAction, ChooseSeatActionTypes, ISeat, SeatInfo } from '../pages/ChooseSeat/Actions';
import ChooseSeatReducer, { ChooseSeatState } from '../pages/ChooseSeat/Reducer';

export type pageType = 'mainpage' | 'chooseseat' | 'summary';
export type IAction = MainPageAction | ChooseSeatAction | RouteTo;

interface RouteTo {
	type: 'ROUTE_TO';
	payload: {
		location: pageType;
	};
}

export interface State{
	numSeats: number;
	connected: boolean;
	seats: Array<ISeat>;
	chosenSeats: Array<SeatInfo>;
	currPage: pageType;
	fetchingData: boolean;
	fetchingError: boolean;
	error: boolean;
}

const initialState: State = {
	numSeats: 0,
	connected: false,
	seats: [],
	chosenSeats: [],
	error: false,
	fetchingData: false,
	fetchingError: false,
	currPage: 'mainpage' as pageType,
};

const reducer = (state: State = initialState, action: IAction): State => {
	if(MainPageActionTypes.includes(action.type)){
		const tempState: MainPageState = {
			connected: state.connected,
			error: state.error,
			numSeats: state.numSeats
		};
		const newState = MainReducer(tempState, action as MainPageAction);
		return {
			...state,
			connected: newState.connected,
			numSeats: newState.numSeats,
			error: newState.error
		};
	}

	if(ChooseSeatActionTypes.includes(action.type)){
		const tempState: ChooseSeatState = {
			error: state.error,
			fetchingData: state.fetchingData,
			fetchingError: state.fetchingError,
			chosenSeats: state.chosenSeats,
			seats: state.seats
		};
		const newState = ChooseSeatReducer(tempState, action as ChooseSeatAction);
		return {
			...state,
			chosenSeats: newState.chosenSeats,
			error: newState.error,
			seats: newState.seats,
			fetchingData: newState.fetchingData,
			fetchingError: newState.fetchingError
		};
	}

	if(action.type === 'ROUTE_TO'){
		return {
			...state,
			currPage: action.payload.location,
		};
	}
	return state;
};

export const routeTo = (location: pageType): RouteTo => {
	return {
		type: 'ROUTE_TO',
		payload: {
			location
		}
	};
};

export default reducer;