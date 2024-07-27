import { checkMove } from "./checkMove";

test('It doesn\'t allow black to play when it\'s the turn of white', () => {
  const history = "e2e4 e7e6";
  const move = "e6e5";
  expect(checkMove(history, move)).toBeFalsy();
});

test('It doesn\'t allow white to play when it\'s the turn of black', () => {
  const history = "e2e3";
  const move = "e3e4";
  expect(checkMove(history, move)).toBeFalsy();
});
