// @flow
import type { 
    CardModel,
    Action,
    AddCardAction,
    PlainAction,
    SwipeAction,
} from './typeDefinitions';
import {
    ADD_CARD,
    CARD_SWIPED,
    DOG_DATA_WAS_REQUESTED,
    DOG_DATA_WAS_RECEIVED,
    DOG_DATA_REQUEST_FAILED,
} from './actions';
import { combineReducers } from 'redux';

type NetworkState = {
    isFetchingData: boolean,
}

type SwiperState = {
    cardsRemoved: number,
    cardUrls: Array<string>,
}

type FavoritesState = {
    favoritesUrls: Array<string>
}

export type AppState = {
    network: NetworkState,
    swiper: SwiperState,
    favorites: FavoritesState,
}

const initialNetworkState: NetworkState = {
    isFetchingData: false
}

const initialSwiperState: SwiperState = {
    cardsRemoved: 0,
    cardUrls: [],
}

const initialFavoritesState: FavoritesState = {
    favoritesUrls: [],
}

function swiperReducer(state: SwiperState = initialSwiperState, action: AddCardAction) {
    const {type, dogResponse} = action;
    switch (type) {
        case ADD_CARD:
            return { 
                ...state, 
                cardUrls: [...state.cardUrls, dogResponse.message]
            };
        case CARD_SWIPED:
            return {
                ...state, 
                cardsRemoved: state.cardsRemoved + 1
            }
        default: 
            return state;
    }
}

function networkReducer(state: NetworkState = initialNetworkState, action: PlainAction) {
    switch(action.type) {
        case DOG_DATA_WAS_REQUESTED:
            return {
                ...state,
                isFetchingData: true,
            }
        case DOG_DATA_WAS_RECEIVED:
        case DOG_DATA_REQUEST_FAILED:
            return {
                ...state,
                isFetchingData: false,
            }
        default: 
            return state;
    }
}

function favoritesReducer(state: FavoritesState = initialFavoritesState, action: SwipeAction) {
    switch (action.type) {
        case CARD_SWIPED: 
            return action.wasLiked ? 
                {
                    ...state,
                    favoritesUrls: [...state.favoritesUrls, action.url]
                }
            :
                state;
        default:
            return state;
    }
}

const appState: AppState = combineReducers({
    network: networkReducer,
    swiper: swiperReducer,
    favorites: favoritesReducer,
})

export default appState;