import { isValidPosition, placeShipOnBoard } from './bateau';
import * as readline from 'readline-sync';

export type Board = string[][];

export function createBoard(): Board {
  return [
    ['  ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
  ];
}

export function displayBoard(board: Board): void {
  console.log(board[0].join(' '));
  for (let i = 1; i < board.length; i++) {
    const rowString = board[i].slice(1).join(' ');
    console.log(`${board[i][0]} [${rowString}]`);
  }
}

function placeBoatsOnBoard(board: Board, boats: string[]) {
  for (const position of boats) {
    const column = position[0];
    const row = parseInt(position[1]);
    const colIndex = column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

    board[row][colIndex] = 'B';
  }
}

const board = createBoard();
const boats: string[] = [];
const numberOfBoats = readline.questionInt('Entrez le nombre de bateaux à placer (1-8) : ');

for (let i = 0; i < numberOfBoats; i++) {
  let position = '';
  let orientation = 'N';
  let size = 1;

  do {
    position = readline.question(`Entrez la position du bateau ${i + 1} (ex: A1) : `).toUpperCase();

    if (!isValidPosition(board, position, orientation, size)) {
      console.log('Position invalide. Veuillez entrer une position valide entre A1 et H8.');
    }
  } while (!isValidPosition(board, position, orientation, size));

  boats.push(position);
}

placeBoatsOnBoard(board, boats);
displayBoard(board);
