import { normalize, denormalize } from './boardMapHelper'
import { BoardMap } from '../model/BoardMap'

test('normalize denormalize', () => {
  const denormalizedBoard = [
    'RbNbBbQbKbBbNbRb',
    'PbPbPbPbPbPbPbPb',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . Pw. . . . . ',
    'PwPw. PwPwPwPwPw',
    'RwNwBwQwKwBwNwRw',
  ];

  const expectedNormalizedBoard = [
    [
      { code: 'R', color: 'white' },
      { code: 'N', color: 'white' },
      { code: 'B', color: 'white' },
      { code: 'Q', color: 'white' },
      { code: 'K', color: 'white' },
      { code: 'B', color: 'white' },
      { code: 'N', color: 'white' },
      { code: 'R', color: 'white' }
    ],
    [
      { code: 'P', color: 'white' },
      { code: 'P', color: 'white' },
      null,
      { code: 'P', color: 'white' },
      { code: 'P', color: 'white' },
      { code: 'P', color: 'white' },
      { code: 'P', color: 'white' },
      { code: 'P', color: 'white' }
    ],
    [null, null, { code: 'P', color: 'white' }, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' },
      { code: 'P', color: 'black' }
    ],
    [
      { code: 'R', color: 'black' },
      { code: 'N', color: 'black' },
      { code: 'B', color: 'black' },
      { code: 'Q', color: 'black' },
      { code: 'K', color: 'black' },
      { code: 'B', color: 'black' },
      { code: 'N', color: 'black' },
      { code: 'R', color: 'black' }
    ],

  ] as BoardMap;

  const actualNormalizedBoard = normalize(denormalizedBoard);
  expect(actualNormalizedBoard).toEqual(expectedNormalizedBoard);

  expect(denormalize(expectedNormalizedBoard)).toEqual(denormalizedBoard);
});

