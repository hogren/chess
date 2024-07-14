import { getStartBoard } from '../../../../utils/boardMapHelper'
import { readChessGame } from '../../../../utils/readChessGame'
import { NextResponse, NextRequest } from 'next/server'
import pool from '../../../../utils/db';
import { RowDataPacket } from 'mysql2';

type Params = {
  params: {
    gameId: string;
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT history FROM chess_game WHERE token LIKE ? LIMIT 1', [params.gameId]);

  if (0 === rows.length) {
    return NextResponse.json({ error: "No game found." }, { status: 404 });
  }

  return NextResponse.json(readChessGame(getStartBoard(), rows[0].history ?? ''));
}
