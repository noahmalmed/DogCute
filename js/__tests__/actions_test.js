import {
    cardSwiped
} from '../actions';

describe('testActions', () => {
    it('cardSwipedReturnsCorrectAction', () => {
        const action = cardSwiped(false, 'test')
        expect(action.wasSwiped).toBeFalsy();
        expect(action.url).toBe('test');
    });
});