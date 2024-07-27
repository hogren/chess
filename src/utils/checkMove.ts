import { getStartBoard } from "./boardMapHelper";
import { readChessGame } from "./readChessGame";

export function checkMove(gameHistory: string, move: string): boolean {
  return checkPlayer(gameHistory, move);
}

function checkPlayer(gameHistory: string, move: string): boolean {
  const isWhiteTurn = "" === gameHistory.trim() || 0 === gameHistory.trim().split(" ").length % 2;
  const map = readChessGame(getStartBoard(), gameHistory);
  const startColumn: number = ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(move.substring(0, 1));
  const startLine: number = Number(move.substring(1, 2)) - 1;
  const startCase = map[startLine][startColumn];

  return null !== startCase && (
    (isWhiteTurn && "white" === startCase.color) || (!isWhiteTurn && "black" === startCase.color)
  );
}
