export enum CellData {
  LAND = 'X',
  WATER = 'O',
}

export enum CellState {
  VISITED = 'V', // replaced with land id
  UNVISITED = ' ',
}

export type GridData = (CellData | string)[][];

/**
 * Get the number of islands in the grid
 * Logic:
 *  Walk through the grid recursively to identify islands.
 *  Land cells are denoted by 'X' and water cells by 'O' (CellData).
 *  Adjacent land cells are grouped into possible islands.
 *  Islands are characterized by being surrounded by water
 *  on all sides, except for those touching the grid's edge,
 *  which are termed peninsulas.
 *  It's ensured that each island is completely surrounded by water cells.
 *
 * @param data GridDeck - 2D array of land and water cells
 */
export const getLandCount = (data: GridData): number => {
  // Check if data is empty
  if (!data || !data.length) return 0;

  // Grid size
  const rows = data.length - 1;
  const cols = data[0].length - 1;

  // Island count
  let count = 0;

  // 2D array of visited cells
  const visited: string[][] = Array.from({ length: rows + 1 }, () => Array.from({ length: cols + 1 }, () => ''));
  // tuple of [row, col] -> merged island cells
  const currentIsland: number[][] = [];

  // Recursive walk
  const walk = (r: number, c: number, id: string) => {
    const isOutOfBounds = r < 0 || c < 0 || r > rows || c > cols;

    // Skip visited cells and water
    if (isOutOfBounds || data[r][c] === CellData.WATER || visited[r][c]) {
      return 0;
    }

    // Add current cell to the island
    currentIsland.push([r, c]);

    visited[r][c] = id ?? CellState.VISITED; // mark as visited

    // console.log(`> ${currentIsland.length ? 'extended' : 'new'} island: %s:%s`, r, c, 'cells:', currentIsland);

    // Check surrounding cells
    const landWalkthrough: Array<[number, number]> = [
      [r + 1, c], // Down
      [r - 1, c], // Up
      [r, c + 1], // Right
      [r, c - 1], // Left
      [r + 1, c + 1], // Down Right
      [r + 1, c - 1], // Down Left
      [r - 1, c + 1], // Up Right
      [r - 1, c - 1], // Up Left
    ];

    // find island cells -> connect to the current island
    landWalkthrough.forEach(([sr, sc]) => walk(sr, sc, id) === 0);

    if (r === 0 || c === 0 || r === rows || c === cols) {
      // console.log('border:', { r, c }, visited[r][c], currentIsland);
      return 0;
    }

    // Looking for water around the island
    const isWaterAround = landWalkthrough.reduce((flag, [sr, sc]) => {
      if (
        // Skip current island cells -> merge with the current island
        currentIsland.reduce((f, [_r, _c]) => f && _r === sr && _c === sc, true)
      ) {
        return flag; // Skip all island cells -> return true
      }
      return walk(sr, sc, id) === 0 && flag;
    }, true);

    return isWaterAround ? 1 : 0;
  };

  // Iterate over the grid
  let i = 0;
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      if (visited[r][c]) continue; // Skip visited cells
      if (data[r][c] === CellData.LAND) {
        i = i + 1;
        // console.log(`Checking island: #${i} by coords: %s:%s`, r, c);
        currentIsland.length = 0; // Reset current island cells
        count = count + walk(r, c, `${i}`);
      } else {
        visited[r][c] = CellState.UNVISITED;
      }
    }
  }

  console.dir(visited);
  console.log('[Grid %s×%s]: %s islands found', rows + 1, cols + 1, count);

  return count;
};
