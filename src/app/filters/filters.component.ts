import { Component, OnInit, Output, Input } from '@angular/core';
import { FiltersService } from '../common/filters.service';
import { QueryService } from '../common/query.service';
import { UserFilters } from '../common/user-filters.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
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

  // Bool qui permet la desactivation de certaines filtres en fontion du type de show sélectionné
  disableSelect: boolean = false;
  constructor(
    public filtersService: FiltersService,
    public getShowService: QueryService
  ) {}

  ngOnInit(): void {
    // Instanciation de la classe
    this.userChoices = new UserFilters('', 'ANIME', '', '', '', '', '');

    // Appel de la fonction qui crée les années disponibles
    this.years = this.filtersService.createYears();

    // Appel du tabelau de genres
    this.genres = this.filtersService.genres;
  }

  getShow(): void {
    // Reset des tableaxu à chaque fois que la fonction est appellée
    this.genresFromShow = [];
    this.charactersList = [];

    // Sub à l'obs rendu par le service
    this.getShowService.getShow(this.userChoices).subscribe((data) => {
      // On vient chercher le resultat de la requete
      this.queryResult = data.data.Page.media;

      // On reçoit un tableau, je veux donc selectionner un élément aléatoirement dans le tableau
      // Création d'un chiffre contenu entre 0 et la longeur du tableau
      const randomNumber = Math.floor(Math.random() * this.queryResult.length);
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
    });
  }
  // // Change type on button
  // changeType(): void {
  //   this.selectedType = this.userChoices.type;
  //   // Désactive les différents filtres qui ne correspondent pas au choix Manga
  //   if (this.userChoices.type === "MANGA") this.disableSelect = !this.disableSelect;
  //   // Les réactives
  //   else if (this.userChoices.type === "ANIME") this.disableSelect = false;

  // }
}
