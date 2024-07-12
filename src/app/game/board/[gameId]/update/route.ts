import pool from '../../../../../utils/db';
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: {
    gameId: string;
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const body = await request.json();
  const result = await pool.query('UPDATE chess_game SET history = CONCAT(IFNULL(history, ""), IF(ISNULL(history), "", " "), ?) WHERE token LIKE ?', [body.move, params.gameId]);
  return NextResponse.json({});
}
