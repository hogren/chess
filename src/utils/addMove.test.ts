import { addMove } from "./addMove";
import DataBase from "./db";
import { generateGame } from "./generateGame";

afterAll(() => {
  DataBase.releaseConnection();
});

test('it updates a game', async () => {
  const game = await generateGame();
  expect(await addMove(Number(game.id), "e2e4")).toBeTruthy();
});
