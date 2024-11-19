import { Board, createBoard, displayBoard } from './grille';
import { ships, isValidPosition, placeShipOnBoard } from './bateau';

const readline = require('readline-sync');

export function GenererNouveauxJoueurs(): [string, string] {
  let prenom1 : string = '';
  let prenom2 : string = '';
  while (prenom1 === '') {
    prenom1 = readline.question('Joueur 1: Entrez votre prenom : ');
    if (prenom1 === '') {
      prenom2 = readline.question('Erreur : Vous devez entrer un prénom.');
    }
  }
  while (prenom2 === '') {
    prenom2 = readline.question('Joueur 2: Entrez votre prenom : ');
    if (prenom2 === '') {
      prenom2 = readline.question('Erreur : Vous devez entrer un prénom.');
    }
  }
  console.log(`${prenom1} et ${prenom2} que la partie commence, bonne chance à vous :) !`);
  return [prenom1, prenom2];
}

export function setupPlayerBoard(player: string, board: Board, numberOfBoats: number): void {
  console.log(`${player} préparez-vous pour la bataille !`);
  const selectedShips: string[] = ['Destroyer', 'Submarine', 'Battleship', 'Cruser'];

  for (let i = 0; i < numberOfBoats; i++) {
    let shipType = '';
    do {
      shipType = readline.question(`${player} - Sélectionnez votre bateau (${i + 1}) (${selectedShips.join(', ')}) : `);
      if (!ships[shipType]) {
        console.log('Type de bateau invalide. Veuillez essayer à nouveau.');
      }
    } while (!ships[shipType]);

    let position = '';
    let orientation = '';
    let isValid = false;

    do {
      position = readline.question(`${player} - Entrez la position du bateau (ex: B5) : `);
      orientation = readline.question(`${player} - Entrez l'orientation du bateau (N/S/E/W) : `);
      if (!isValidPosition(board, position, orientation, ships[shipType].size)) {
        console.log('Position ou orientation invalide. Veuillez essayer à nouveau.');
      } else {
        isValid = true;
      }
    } while (!isValid);

    placeShipOnBoard(board, shipType, position, orientation);
    displayBoard(board);
  }

  console.log(`Tous les bateaux sont placés pour ${player} !`);
}
const [player1, player2] = GenererNouveauxJoueurs();
const boardPlayer1 = createBoard();
const boardPlayer2 = createBoard();
const numberOfBoats = readline.questionInt('Entrez le nombre de bateaux à placer : ');

setupPlayerBoard(player1, boardPlayer1, numberOfBoats);
setupPlayerBoard(player2, boardPlayer2, numberOfBoats);
