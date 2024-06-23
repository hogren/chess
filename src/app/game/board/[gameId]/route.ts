import { getStartBoard } from '../../../../utils/boardMapHelper'
import { readChessGame } from '../../../../utils/readChessGame.ts'
import { NextResponse, NextRequest } from 'next/server'

type Params = {
  params: {
    gameId: string;
  }
}

export async function GET(request: NextRequest, { params }: Params) {

  return NextResponse.json(readChessGame(getStartBoard(), 'd2d3'));
}
