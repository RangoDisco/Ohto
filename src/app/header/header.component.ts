import { Component, OnInit, Output, Input } from '@angular/core';
import { FiltersService } from '../common/services/filters.service';
import { QueryService } from '../common/services/query.service';
import { UserFilters } from '../common/models/user-filters.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Tableau contenant toutes les annnées
  years: number[];

  // Tableau contenant tous les genres
  genres: string[];

  // Type selectionné par l'utilisateur
  selectedType: string = '...';

  // Instance de la classe UserFilters
  userChoices: UserFilters;

  // Variable qui va stocker la réponse de l'API
  queryResult: [];

  // Notre show final
  randomShow;

  // Tableau qui va contenir les genres du show
  genresFromShow: string[] = [];

  // Tableau qui va contenir les personnages du show
  charactersList: any[] = [];

  // Boolean qui permet la desactivation de certaines filtres en fontion du type de show sélectionné
  disableSelect: boolean = false;
  // Boolean qui permet d'empecher l'utilisateur de faire plusieurs requetes en spammant le bouton
  isLoading: boolean = false;
  constructor(
    private filtersService: FiltersService,
    private getShowService: QueryService
  ) {}

  ngOnInit(): void {
    // Instanciation de la classe
    this.userChoices = new UserFilters('ANIME', '', '', '', '', '');

    // Appel de la fonction qui crée les années disponibles
    this.years = this.filtersService.createYears();

    // Appel du tabelau de genres
    this.genres = this.filtersService.genres;
  }

  getShow(): void {
    this.isLoading = true;
    // Reset des tableaxu à chaque fois que la fonction est appelée
    this.genresFromShow = [];
    this.charactersList = [];

    // Permets de faire la requete même si certains champs ne sont pas remplis
    for (let choice in this.userChoices) {
      if (this.userChoices[choice] === '') this.userChoices[choice] = undefined;
    }
    console.log(this.userChoices);

    // Sub à l'obs rendu par le service
    this.getShowService.getShow(this.userChoices).subscribe((data) => {
      this.isLoading = data.loading;
      // On vient chercher le resultat de la requete
      this.queryResult = data.data.Page.media;

      if (this.queryResult.length !== 0) {
        // On reçoit un tableau, je veux donc selectionner un élément aléatoirement dans le tableau
        // Création d'un chiffre contenu entre 0 et la longeur du tableau
        const randomNumber = Math.floor(
          Math.random() * this.queryResult.length
        );

        // Selection du show random dans la liste rendue par l'API
        this.randomShow = this.queryResult[randomNumber];

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
      } else alert('No result found');
    });

    // Remise à 0 des filtres non selectionés par l'utilisateur
    for (let choice in this.userChoices) {
      if (this.userChoices[choice] === undefined) this.userChoices[choice] = '';
    }
  }
}
