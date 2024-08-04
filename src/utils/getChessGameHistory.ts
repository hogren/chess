import { FieldPacket, QueryResult } from "mysql2";
import DataBase from "./db";

export async function getChessGameHistory(gameId: number, player: "black" | "white", token: string): Promise<string | null> {
  const tokenField = "black" === player ? "black_token" : "white_token";
  const [rows]: [QueryResult, FieldPacket[]] = await DataBase.execute(`SELECT history FROM chess_game WHERE id LIKE ? AND ${tokenField} = ? LIMIT 1`, [gameId, token]);
  if (rows instanceof Array && rows.length > 0) {
    const row = rows[0];
    if (row instanceof Object && "history" in row) {
      return row.history ?? "";
    }
  }
  return null;
}
