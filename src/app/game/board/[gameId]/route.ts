import { getStartBoard } from '@/utils/boardMapHelper'
import { readChessGame } from '@/utils/readChessGame'
import { NextResponse, NextRequest } from 'next/server'
import DataBase from '@/utils/db';
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2';

type Params = {
  params: {
    gameId: string;
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const [rows]: [QueryResult, FieldPacket[]] = await DataBase.execute('SELECT history FROM chess_game WHERE id LIKE ? LIMIT 1', [params.gameId]);

  if (rows instanceof Array && rows.length > 0) {
    const row = rows[0];
    if (row instanceof Object && "history" in row) {
      return NextResponse.json(readChessGame(getStartBoard(), row.history ?? ''));
    }
  }
  return NextResponse.json({ error: "No game found." }, { status: 404 });
}
