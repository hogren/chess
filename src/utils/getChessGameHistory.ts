import { FieldPacket, QueryResult } from "mysql2";
import DataBase from "./db";

export async function getChessGameHistory(gameId: number): Promise<string | null> {
  const [rows]: [QueryResult, FieldPacket[]] = await DataBase.execute('SELECT history FROM chess_game WHERE id LIKE ? LIMIT 1', [gameId]);
  if (rows instanceof Array && rows.length > 0) {
    const row = rows[0];
    if (row instanceof Object && "history" in row) {
      return row.history ?? "";
    }
  }
  return null;
}
