import {Game, isOver, O, Player, win, X, findBestMove} from "./minimax";


let game: Game = [X, ' ', ' ', O, X, ' ', ' ', ' ', ' ']
let player: Player = X
let score = 0
do {
    const [moveScore, move] = findBestMove(game, player)
    game = move
    score = moveScore

    if (win(game, player)) break
    if (isOver(game)) break
    player = "O"
} while (true)


