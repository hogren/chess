import { getStartBoard } from '@/utils/boardMapHelper'
import { readChessGame } from '@/utils/readChessGame'
import { NextResponse, NextRequest } from 'next/server'
import { getChessGameHistory } from '@/utils/getChessGameHistory';

type Params = {
  params: {
    gameId: string;
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const history = await getChessGameHistory(Number(params.gameId));

  if (null === history) {
    return NextResponse.json({ error: "No game found." }, { status: 404 });
  }

  return NextResponse.json(readChessGame(getStartBoard(), history));
}
