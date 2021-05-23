import mainReducer, { MainPageState } from '../pages/MainPage/Reducer';
import chooseSeatReducer, { ChooseSeatState } from '../pages/ChooseSeat/Reducer';
import { combineReducers } from 'redux';

export type pageType = 'mainpage' | 'chooseseat' | 'summary';

export type RouteAction = RouteTo;

interface RouteTo {
	type: 'ROUTE_TO';
	payload: {
		location: pageType;
	};
}

export interface State{
	mainPage: MainPageState;
	chooseSeat: ChooseSeatState;
	currPage: pageType;
}

const routeReducer = (state: pageType = 'mainpage', action: RouteAction): pageType => {
	switch(action.type){
	case 'ROUTE_TO':
		return action.payload.location;
	default:
		return state;
	}
};

const reducer = combineReducers<State>({
	mainPage: mainReducer,
	chooseSeat: chooseSeatReducer,
	currPage: routeReducer
});

export const routeTo = (location: pageType): RouteTo => {
	return {
		type: 'ROUTE_TO',
		payload: {
			location
		}
	};
};

export default reducer;