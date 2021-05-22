import { MainPageAction, MainPageActionTypes } from '../pages/MainPage/Actions';
import MainReducer, { MainPageState } from '../pages/MainPage/Reducer';
import { ChooseSeatAction, ChooseSeatActionTypes, ISeat } from '../pages/ChooseSeat/Actions';
import ChooseSeatReducer, { ChooseSeatState } from '../pages/ChooseSeat/Reducer';

export type pageType = 'MainPage' | 'ChooseSeat' | 'Summary' | 'Error';
export type IAction = MainPageAction | ChooseSeatAction | RouteTo;

interface RouteTo {
	type: 'ROUTE_TO';
	payload: {
		location: pageType;
	};
}


export interface State{
	numSeats?: number;
	connected: boolean;
	seats: Array<ISeat>;
	chosenSeats: Array<ISeat>;
	currPage: pageType;
	error: boolean;
}

const initialState = {
	connected: false,
	seats: [],
	chosenSeats: [],
	error: false,
	currPage: 'MainPage' as pageType,
};

const reducer = (state: State = initialState, action: IAction): State => {
	if(MainPageActionTypes.includes(action.type)){
		const tempState: MainPageState = {
			connected: state.connected,
			error: state.error,
			numSeats: state.numSeats
		};
		return {
			...state,
			connected: MainReducer(tempState, action as MainPageAction).connected,
			numSeats: MainReducer(tempState, action as MainPageAction).numSeats,
			error: MainReducer(tempState, action as MainPageAction).error
		};
	}

	if(ChooseSeatActionTypes.includes(action.type)){
		const tempState: ChooseSeatState = {
			error: state.error,
			chosenSeats: state.chosenSeats,
		};
		return {
			...state,
			chosenSeats: ChooseSeatReducer(tempState, action as ChooseSeatAction).chosenSeats,
			error: ChooseSeatReducer(tempState, action as ChooseSeatAction).error
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

export default reducer;