import {availableMoves, Empty, emptyGame, gameScore, isOver, minimax, move, O, toBitmap, win, X} from "./minimax";

describe('move', () => {
    it('should move', () => {
        const game = move(emptyGame, X, 0)
        expect(game[0]).toBe(X)
    });
});

describe('toBitmap', () => {
    it('should return bitmap representation', () => {
        const bitmap = toBitmap(emptyGame, X)
        expect(bitmap).toBe(0)
    });

    it('should return bitmap representation', () => {
        const bitmap = toBitmap(move(emptyGame, X, 0), X)
        expect(bitmap).toBe(256)
    });
});

describe('win', () => {
    it('should check win', () => {
        expect(win(emptyGame, X)).toBeFalsy()
    });

    it('should check win', () => {
        expect(win([X, X, X, Empty, Empty, Empty, Empty, Empty, Empty], X)).toBeTruthy()
    });
});

describe('over', () => {
    it('should return true if game is complete', () => {
        const over = isOver([X, X, X, X, X, X, X, X, Empty])
        expect(over).toBeFalsy()
    });

    it('should return true if game is complete', () => {
        const over = isOver([X, X, X, X, X, X, X, X, X])
        expect(over).toBeTruthy()
    });
});

describe('availableMove', () => {
    it('should return available Moves', () => {
        const moves = availableMoves([X, X, X, X, X, X, X, X, Empty])
        expect(moves).toEqual([8])
    });
});

describe('score', () => {
    it('should return score 0', () => {
        expect(gameScore(emptyGame, [X, O])).toBe(0)
    });

    it('should return score 100', () => {
        expect(gameScore([X, X, X, Empty, Empty, Empty, Empty, Empty, Empty], [X, O])).toBe(100)
    });

    it('should return score -100', () => {
        expect(gameScore([X, X, X, Empty, Empty, Empty, Empty, Empty, Empty], [O, X])).toBe(-100)
    });

});

describe('minimax', () => {
    it('give next move win', () => {
        const [score, move] = minimax([X, X, X, X, X, X, X, X, X], [X, O])
        expect(score).toBe(100)
        expect(move).toEqual([X, X, X, X, X, X, X, X, X])
    });

    it('give next move lose', () => {
        const [score, move] = minimax([X, X, X, X, X, X, X, X, X], [O, X])
        expect(score).toBe(-100)
        expect(move).toEqual([X, X, X, X, X, X, X, X, X])
    });

    it('give next move 001', () => {
        const [score, move] = minimax([X, X, X, X, X, X, X, X, Empty], [X, O])
        expect(score).toBe(100)
        expect(move).toEqual([X, X, X, X, X, X, X, X, Empty])
    });

    it('give next move 002', () => {
        const [score, move] = minimax([O, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty], [X, O])
        expect(score).toBe(0)
        expect(move).toContain(X)
    });

    it('give next move 003', () => {
        const [score, move] = minimax(emptyGame, [X, O])
        expect(score).toBe(0)
        expect(move.filter(v => v === X)).toBeTruthy()
    });

    it('give next move 004', () => {
        const [score, move] = minimax([X, X, Empty, Empty, Empty, Empty, Empty, Empty, Empty], [X, O])
        expect(score).toBe(99)
        expect(move).toEqual([X, X, X, Empty, Empty, Empty, Empty, Empty, Empty])
    });
});