import { getLandCount, type GridData } from './island';

type TestCases = 'empty' | 'justWater' | 'peninsulas' | 'threeIslands' | 'fourIslands' | 'bigIsland';

const testCases: Record<TestCases, { grid: GridData; count: number }> = {
  empty: { grid: [], count: 0 },
  justWater: {
    grid: [
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O'],
    ],
    count: 0,
  },
  peninsulas: {
    grid: [
      ['X', 'X', 'X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'O', 'O', 'X'],
      ['X', 'O', 'O', 'O', 'O', 'X'],
      ['X', 'O', 'O', 'O', 'O', 'X'],
      ['X', 'O', 'O', 'O', 'O', 'X'],
      ['X', 'O', 'O', 'O', 'O', 'X'],
      ['X', 'X', 'X', 'X', 'X', 'X'],
    ],
    count: 0,
  },
  threeIslands: {
    grid: [
      ['O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'X', 'O'],
      ['O', 'O', 'X', 'O', 'O', 'O'],
      ['O', 'O', 'X', 'O', 'O', 'O'],
      ['O', 'O', 'X', 'O', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'X'],
    ],
    count: 3,
  },
  fourIslands: {
    grid: [
      ['O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'X', 'O', 'X', 'O'],
      ['O', 'X', 'X', 'O', 'O', 'O'],
      ['O', 'X', 'X', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'X', 'O'],
      ['O', 'X', 'O', 'O', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O'],
    ],
    count: 4,
  },
  bigIsland: {
    grid: [
      ['O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'X', 'X', 'X', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O'],
    ],
    count: 1,
  },
};

describe('getLandCount', () => {
  // Generate tests from testCases
  for (const [testCase, { grid, count }] of Object.entries(testCases)) {
    test(`test case: ${testCase}`, () => {
      expect(getLandCount(grid)).toBe(count);
    });
  }
});
