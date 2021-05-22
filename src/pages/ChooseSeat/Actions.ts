export const ChooseSeatActionTypes = ['SET_CHOSEN_SEATS',  'SET_CHOOSE_SEAT_ERROR'];
export type ChooseSeatAction = SetNumberAndConnected | SetMainError;

export interface ISeat{
	id: string;
	cors: {
		x: number;
		y: number;
	};
	reserved: boolean;
}

export interface SetNumberAndConnected{
    type: 'SET_CHOSEN_SEATS';
    payload: {
        chosenSeats: Array<ISeat>;
    }
}

export interface SetMainError{
    type: 'SET_CHOOSE_SEAT_ERROR';
    payload: {
        error: boolean;
    }
}