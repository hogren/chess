import { getStartBoard } from '@/utils/boardMapHelper'
import { readChessGame } from '@/utils/readChessGame'
import { NextResponse, NextRequest } from 'next/server'
import { getChessGameHistory } from '@/utils/getChessGameHistory';

type Params = {
  params: {
    gameId: string;
    black_token?: string;
    white_token?: string;
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  let player: "black" | "white";
  let token: string;

  if (undefined !== params.white_token) {
    player = "white";
    token = params.white_token;
  } else if (undefined !== params.black_token) {
    player = "black";
    token = params.black_token;
  } else {
    return NextResponse.json({ error: "No token given." }, { status: 400 });
  }

  const history = await getChessGameHistory(Number(params.gameId), player, token);

  if (null === history) {
    return NextResponse.json({ error: "No game found." }, { status: 404 });
  }

  return NextResponse.json(readChessGame(getStartBoard(), history));
}
