import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomShowService {
  // Notre show final
  randomShow: any;

  // Tableau qui va contenir les genres du show
  genresFromShow: string[] = [];

  // Tableau qui va contenir les personnages du show
  charactersList: any[] = [];
  constructor() { }

  createRandomShow(queryResult) {
    // Reset des tableaux de genres et de personnages à chaque appel de la fonction
    this.genresFromShow = [];
    this.charactersList = [];

    // On reçoit un tableau, je ne veux qu'un seul show donc selectionner un élément aléatoirement dans le tableau
    if (queryResult.length !== 0) {
      // Création d'un chiffre contenu entre 0 et la longeur du tableau
      const randomNumber = Math.floor(Math.random() * queryResult.length);
      // Selection du show random dans la liste rendue par l'API
      this.randomShow = queryResult[randomNumber];
      // Je veux afficher au maximum 3 genres, peu importe combien l'api m'en rend
      for (let i = 0; i < 2; i++) {
        // Je vérifie que ce que je veux push existe bien
        if (this.randomShow.genres[i]) {
          this.genresFromShow.push(this.randomShow.genres[i]);
        }
      }
      // Je veux afficher au maximum 4 personnages, peu importe combien l'api m'en rend
      for (let j = 0; j < 4; j++) {
        // Je vérifie que ce que je veux push existe bien
        if (this.randomShow.characters.edges[j]) {
          this.charactersList.push(this.randomShow.characters.edges[j]);
        }
      }
      // Si l'api ne me rend rien j'alerte l'utilisateur qu'aucun show n'a été trouvé
    } else alert('No result found');
  }
}
