import { addMove } from '@/utils/addMove';
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: {
    gameId: string;
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const body = await request.json();
  await addMove(Number(params.gameId), body.move);
  return NextResponse.json({});
}
