import {Game, GameSet, isOver, minimax, O, win, X} from "./minimax";


let game: Game = [X, ' ', ' ', O, X, ' ', ' ', ' ', ' ']
let set: GameSet = [O, X]
let score = 0
do {
    const [moveScore, move] = minimax(game, set)
    game = move
    score = moveScore
    console.log(set[0], score, game)
    if (win(game, set[0])) break
    if (isOver(game)) break
    set = [set[1], set[0]]
} while (true)


