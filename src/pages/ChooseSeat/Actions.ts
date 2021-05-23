import { Action } from 'redux';
export type ChooseSeatAction = AddChosenSeats | SetChooseError | SeatsFetched | DeleteChosenSeat | SetFetchingStatus | FetchingError;

export interface ISeat{
	id: string;
	cords: {
		x: number;
		y: number;
	};
	reserved: boolean;
}

export interface SeatInfo{
    x: number;
    y: number;
    id: string;
}

export interface SetFetchingStatus extends Action{
    type: 'SET_FETCHING_STATUS';
	payload: {
		status: boolean;
	}
}

export interface FetchingError extends Action{
    type: 'FETCHING_ERROR';
}

export interface AddChosenSeats extends Action{
    type: 'ADD_CHOSEN_SEATS';
    payload: {
        seats: Array<SeatInfo>;
    }
}

export interface DeleteChosenSeat extends Action{
    type: 'DELETE_CHOSEN_SEAT';
    payload: {
        chosenSeats: Array<SeatInfo>;
    }
}

export interface SetChooseError extends Action{
    type: 'SET_CHOOSE_SEAT_ERROR';
    payload: {
        error: boolean;
    }
}

export interface SeatsFetched extends Action{
    type: 'SEATS_FETCHED';
    payload: {
        seats: Array<ISeat>;
    }
}

export const addChosenSeats = (seats: Array<SeatInfo>): AddChosenSeats => {
	return {
		type: 'ADD_CHOSEN_SEATS',
		payload: {
			seats
		}
	};
};

export const deleteChosenSeat = (seat: SeatInfo, chosenSeats: Array<SeatInfo>): DeleteChosenSeat => {

	return {
		type: 'DELETE_CHOSEN_SEAT',
		payload: {
			chosenSeats: chosenSeats.filter(_seat => _seat.x !== seat.x || _seat.y !== seat.y)
		}
	};
};

export const setChooseError = (error: boolean): SetChooseError => {
	return {
		type: 'SET_CHOOSE_SEAT_ERROR',
		payload: {
			error
		}
	};
};

export const seatsFetched = (seats: Array<ISeat>): SeatsFetched => {
	return {
		type: 'SEATS_FETCHED',
		payload: {
			seats
		}
	};
};

export const setFetchingStatus = (status: boolean): SetFetchingStatus => {
	return {
		type: 'SET_FETCHING_STATUS',
		payload: {
			status
		},
	};
};

export const fetchError = (): FetchingError => {
	return {
		type: 'FETCHING_ERROR',
	};
};
