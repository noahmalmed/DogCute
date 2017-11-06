import appState from '../reducers'
import {
    ADD_CARD,
    CARD_SWIPED,
    DOG_DATA_WAS_REQUESTED,
    DOG_DATA_WAS_RECEIVED,
    DOG_DATA_REQUEST_FAILED,
} from '../actions';

describe('Test Reducers', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            network: {
                isFetchingData: false
            },
            swiper: {
                cardsRemoved: 0,
                cardUrls: [],
            },
            favorites: {
                favoritesUrls: []
            }
        }
    })

    /*
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
                    */

    describe('test favoritesReducer', () => {
        it('should add url to favorites if was liked', () => {
            const action = { type: CARD_SWIPED, wasLiked: true, url: 'testurl'};
            const modifiedState = appState(initialState, action);
            expect(modifiedState.favorites.favoritesUrls.length).toBe(1);
            expect(modifiedState.favorites.favoritesUrls[0]).toBe('testurl');
        });

        it('should not add url to favorites if wasn\'t liked', () => {
            const action = { type: CARD_SWIPED, wasLiked: false, url: 'testurl'};
            const modifiedState = appState(initialState, action);
            expect(modifiedState.favorites.favoritesUrls.length).toBe(0);
        });
    })

    describe('test networkReducer', () => {
        it('shouldSetIsFetchingData to true on request', () => {
            const action = { type: DOG_DATA_WAS_REQUESTED };
            const modifiedState = appState(initialState, action);
            expect(modifiedState.network.isFetchingData).toBeTruthy();
        });

        it('shouldSetIsFetchingData to true on request', () => {
            const action = { type: DOG_DATA_WAS_RECEIVED };
            initialState.network.isFetchingData = true;
            const modifiedState = appState(initialState, action);
            expect(modifiedState.network.isFetchingData).toBeFalsy();
        });

        it('shouldSetIsFetchingData to true on request', () => {
            const action = { type: DOG_DATA_REQUEST_FAILED };
            initialState.network.isFetchingData = true;
            const modifiedState = appState(initialState, action);
            expect(modifiedState.network.isFetchingData).toBeFalsy();
        });
    })

    describe('test swiperReducer', () => {
        it('should respond correct to add card', () => {
            const action = {type: ADD_CARD, dogResponse: { message: "testurl"} };
            const modifiedState = appState(initialState, action);
            expect(modifiedState.swiper.cardUrls.length).toBe(1);
            expect(modifiedState.swiper.cardUrls[0]).toBe("testurl");
        });

        it('should add 1 to cards removed', () => {
            const action = {type: CARD_SWIPED};
            const modifiedState = appState(initialState, action);
            expect(modifiedState.swiper.cardsRemoved).toBe(1);
        });
    });
});