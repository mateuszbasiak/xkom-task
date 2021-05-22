import { useAppSelector } from '../../Reducer/hooks';
import { ChooseSeatAction, ISeat } from './Actions';

export interface ChooseSeatState{
    error: boolean;
    chosenSeats: Array<ISeat>;
}

export const initialState = (): ChooseSeatState => {
	return{
		chosenSeats: useAppSelector(state => state.chosenSeats),
		error: useAppSelector(state => state.error),
	};
};

const ChooseSeatReducer = (state: ChooseSeatState = initialState(), action: ChooseSeatAction): ChooseSeatState => {
	switch(action.type){
	case 'SET_CHOSEN_SEATS':
		return {
			...state,
			chosenSeats: action.payload.chosenSeats,
		};
	case 'SET_CHOOSE_SEAT_ERROR':
		return {
			...state,
			error: action.payload.error,
		};
	default:
		return state;
	}
};

export default ChooseSeatReducer;