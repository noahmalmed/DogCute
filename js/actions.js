// @flow
import type { 
    AddCardAction,
    PlainAction,
    RandomDogResponse,
} from './typeDefinitions';

export const ADD_CARD = 'ADD_CARD';
export const CARD_SWIPED = 'CARD_SWIPED';
export const DOG_DATA_WAS_REQUESTED = 'DOG_DATA_WAS_REQUESTED';
export const DOG_DATA_WAS_RECEIVED = 'DOG_DATA_WAS_RECEIVED';
export const DOG_DATA_REQUEST_FAILED = 'DOG_DATA_REQUEST_FAILED';

export function requestRandomDogData() {
    return (dispatch) => {
        const handleFail = () => { dispatch(reportRequestFailed()) };
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((response: Response) => {
                response.json()
                .then((responseJson) => {
                    dispatch(addCard(responseJson));
                    dispatch(reportRequestSucceeded())
                })
                .catch(handleFail)
            })
            .catch(handleFail)

        dispatch(reportRequest());
    }
}

export function cardSwiped(wasLiked: boolean, url: string): PlainAction {
    return {
        type: CARD_SWIPED,
        wasLiked,
        url,
    }
}

function reportRequest(): PlainAction {
    return {
        type: DOG_DATA_WAS_REQUESTED,
    }
}

function reportRequestSucceeded(): PlainAction {
    return {
        type: DOG_DATA_WAS_RECEIVED,
    }
}

function reportRequestFailed(): PlainAction {
    return {
        type: DOG_DATA_REQUEST_FAILED
    }
}

function addCard(dogResponse: RandomDogResponse): AddCardAction {
    return ({
        type: ADD_CARD,
        dogResponse,
    });
}