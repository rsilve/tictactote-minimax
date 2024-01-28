import invariant from "tiny-invariant";

export const X = "X"
export const O = "O"
export const Empty = " "

export type Player = typeof X | typeof O
type GameValue = Player | typeof Empty
export type Game = [GameValue, GameValue, GameValue, GameValue, GameValue, GameValue, GameValue, GameValue, GameValue]

export type GameSet = [Player, Player]


const winBitmap = [
    Number.parseInt("111000000", 2),
    Number.parseInt("000111000", 2),
    Number.parseInt("000000111", 2),
    Number.parseInt("100010001", 2),
    Number.parseInt("001010100", 2),
    Number.parseInt("100100100", 2),
    Number.parseInt("010010010", 2),
    Number.parseInt("001001001", 2),
]

export const emptyGame: Game = [Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty, Empty]

export function move(game: Game, player: Player, position: number): Game {
    invariant(game[position] === Empty, `Cannot move to ${position}: ${game[position]}`)
    const moved: Game = [...game]
    moved[position] = player
    return moved
}

export function toBitmap(game: Game, player: Player) {
    const str = game.map(value => value === player ? 1 : 0).join('')
    return Number.parseInt(str, 2)
}

export function winningPosition(bitmap: number) {
    return bitmap.toString(2).padStart(9, '0').split('').map(v => v === "1")
}

export function win(game: Game, player: Player) {
    const bitmap = toBitmap(game, player)
    return winBitmap.find(value => (value & bitmap) === value)
}

export function isOver(game: Game) {
    return !game.includes(Empty)
}

export function isEmpty(game: Game) {
    return game.every(v => v === Empty)
}

export function availableMoves(game: Game) {
    return game.reduce((previousValue, currentValue, currentIndex) => {
        if (currentValue === Empty) {
            return [...previousValue, currentIndex]
        }
        return previousValue
    }, [] as number[])
}

export function gameScore(game: Game, [player, opponent]: GameSet, depth: number = 0): number {
    if (win(game, player)) return 100 - depth
    if (win(game, opponent)) return depth - 100
    return 0
}

export function minimax(game: Game, set: GameSet, activePlayer = true, depth = 0): [number, Game] {
    if (isEmpty(game)) return [0, move(game, set[0], Math.floor(Math.random() * 9))]

    const currentScore = gameScore(game, set, depth)
    if (isOver(game)) return [currentScore, game]
    if (currentScore !== 0) return [currentScore, game]

    type Result = { score: number, bestMove: Game }
    const results: Result[] = []

    availableMoves(game).map(index => {
        const moved = move(game, activePlayer ? set[0] : set[1], index)
        const [score] = minimax(moved, set, !activePlayer, depth + 1)
        results.push({score, bestMove: moved})
    })

    if (activePlayer) {
        const {score} = [...results]
            .sort((a, b) => b.score - a.score)
            .shift() ?? {score: 1000, bestMove: game}
        const bestResults = results.filter((v) => v.score === score)
        //console.log(activePlayer ? set[0] : set[1], score, results, bestResults)
        const random = bestResults[Math.floor(Math.random() * bestResults.length)]
        return [random.score, random.bestMove]
    } else {
        const {score} = [...results]
            .sort((a, b) => a.score - b.score)
            .shift() ?? {score: -1000, bestMove: game}
        const bestResults = results.filter((v) => v.score === score)
        //console.log(activePlayer ? set[0] : set[1], score, results, bestResults)
        const random = bestResults[Math.floor(Math.random() * bestResults.length)]
        return [random.score, random.bestMove]
    }

}

export function findBestMove(game: Game, player: Player) {
    const opponent = player === X ? O : X
    return minimax(game, [player, opponent])
}