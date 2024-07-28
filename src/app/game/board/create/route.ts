export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { generateGame } from '@/utils/generateGame';

export async function GET() {
  const game = await generateGame();

  if (null === game.id) {
    return NextResponse.json({ error: "Problem to create a game." }, { status: 404 });
  }

  return NextResponse.json({
    gameId: game.id,
    blackToken: game.blackToken,
    whiteToken: game.whiteToken,
  });
}
