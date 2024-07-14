export const dynamic = 'force-dynamic'

import pool from '../../../../utils/db'
import { NextResponse } from 'next/server'

const generateNewToken: () => string = () => {
  let allowedChars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

  let outString: string = '';
  for (let i = 0; i < 32; i++) {

    outString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

  }

  return outString;
}

export async function GET() {
  const newToken: string = generateNewToken();
  await pool.query('INSERT INTO chess_game (token) VALUES (?)', [newToken]);
  return NextResponse.json({ link: '/game?id=' + newToken });
}
