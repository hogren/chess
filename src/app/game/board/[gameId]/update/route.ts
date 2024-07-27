import { addMove } from '@/utils/addMove';
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: {
    gameId: string;
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const body = await request.json();
  const success = await addMove(Number(params.gameId), body.move);
  if (success) {
    return NextResponse.json({});
  } else {
    return NextResponse.json({ error: "Forbidden move." }, { status: 400 });
  }
}
