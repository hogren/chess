import DataBase from './db';
import { generateGame } from './generateGame'

afterAll(() => {
  DataBase.releaseConnection();
});

test('it generates random tokens', async () => {
  const game = await generateGame();

  expect(Object.keys(game)).toContain('id');
  expect(Object.keys(game)).toContain('blackToken');
  expect(Object.keys(game)).toContain('whiteToken');

  expect(game.blackToken.length).toBe(32);
  expect(game.whiteToken.length).toBe(32);
});
