import DataBase from './db'
import { FieldPacket, QueryResult } from 'mysql2';

type Game = {
  id: number | null;
  blackToken: string;
  whiteToken: string;
}

const generateNewToken: () => string = () => {
  let allowedChars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

  let outString: string = '';
  for (let i = 0; i < 32; i++) {

    outString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

  }

  return outString;
}

export async function generateGame(): Promise<Game> {
  const blackToken = generateNewToken();
  const whiteToken = generateNewToken();

  const [result,]: [QueryResult, FieldPacket[]] = await DataBase.execute(
    'INSERT INTO chess_game (black_token, white_token) VALUES (?, ?)',
    [blackToken, whiteToken]
  );

  return {
    id: "insertId" in result ? result.insertId : null,
    blackToken: blackToken,
    whiteToken: whiteToken,
  };
}
