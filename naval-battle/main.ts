import * as readline from 'readline-sync';
import { createBoard, displayBoard } from './grille';
import { setupPlayerBoard, GenererNouveauxJoueurs } from './joueur';

function main() {
  const [player1, player2] = GenererNouveauxJoueurs();
  GenererNouveauxJoueurs();

  const boardPlayer1 = createBoard();
  const boardPlayer2 = createBoard();
  const numberOfBoats = readline.questionInt('Entrez le nombre de chaque type de bateaux à placer : ');

  setupPlayerBoard(player1, boardPlayer1, numberOfBoats);
  setupPlayerBoard(player2, boardPlayer2, numberOfBoats);

  console.log('Tous les bateaux sont placés. Le jeu peut commencer !');
  console.log('Voici les grilles des joueurs après placement des bateaux :');
  console.log(`Grille de ${player1} :`);
  displayBoard(boardPlayer1);
  console.log(`Grille de ${player2} :`);
  displayBoard(boardPlayer2);
}

main();
