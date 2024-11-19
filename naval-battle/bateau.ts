export type ShipType = {
  name: string;
  size: number;
  symbol: string;
};

export const ships: { [key: string]: ShipType } = {
  Destroyer: { name: 'Destroyer', size: 1, symbol: 'd' },
  Submarine: { name: 'Submarine', size: 1, symbol: 's' },
  Battleship: { name: 'Battleship', size: 1, symbol: 'b' },
  Cruser: { name: 'Cruser', size: 1, symbol: 'c' },
};
export function isValidPosition(board: string[][], position: string, orientation: string, size: number): boolean {
  const column = position[0].toUpperCase();
  const row = parseInt(position[1]);

  const validColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const validRows = ['1', '2', '3', '4', '5', '6', '7', '8'];

  if (!validColumns.includes(column) || !validRows.includes(position[1])) {
    return false;
  }
  const colIndex = column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

  switch (orientation.toUpperCase()) {
    case 'N':
      return row - size >= 0;
    case 'S':
      return row + size <= 8;
    case 'E':
      return colIndex + size <= 8;
    case 'W':
      return colIndex - size >= 0;
    default:
      return false;
  }
}
export function placeShipOnBoard(board: string[][], shipType: string, position: string, orientation: string) {
  const ship = ships[shipType];
  const column = position[0].toUpperCase();
  const row = parseInt(position[1]);
  const colIndex = column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

  for (let i = 0; i < ship.size; i++) {
    switch (orientation.toUpperCase()) {
      case 'N':
        board[row - i][colIndex] = ship.symbol;
        break;
      case 'S':
        board[row + i][colIndex] = ship.symbol;
        break;
      case 'E':
        board[row][colIndex + i] = ship.symbol;
        break;
      case 'W':
        board[row][colIndex - i] = ship.symbol;
        break;
      default:
        console.log('Orientation invalide');
        break;
    }
  }
}
