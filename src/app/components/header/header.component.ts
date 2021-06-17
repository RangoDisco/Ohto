import { Component, OnInit, Output, Input } from '@angular/core';
import { FiltersService } from '../../common/services/filters.service';
import { QueryService } from '../../common/services/query.service';
import { UserFilters } from '../../common/models/user-filters.model';
import { RandomShowService } from '../../common/services/random-show.service';

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
    private queryService: QueryService,
    private randomShowService: RandomShowService
  ) { }

  ngOnInit(): void {
    // Instanciation de la classe
    this.userChoices = new UserFilters('ANIME', '', '', '', '', '');

    // Appel de la fonction qui crée les années disponibles
    this.years = this.filtersService.createYears();

    // Appel du tabelau de genres
    this.genres = this.filtersService.genres;
  }

  getShow(): void {
    this.queryResult = [];
    this.isLoading = true;

    // Permets de faire la requete même si certains champs ne sont pas remplis
    for (let choice in this.userChoices) {
      if (this.userChoices[choice] === '') this.userChoices[choice] = undefined;
    }
    console.log(this.userChoices);

    // Sub à l'obs rendu par le service
    this.queryService.getShow(this.userChoices).subscribe((data) => {
      this.isLoading = data.loading;

      this.randomShowService.createRandomShow(data.data.Page.media)
      this.randomShow = this.randomShowService.randomShow;
      this.genresFromShow = this.randomShowService.genresFromShow;
      this.charactersList = this.randomShowService.charactersList;

    });

    // Remise à 0 des filtres non selectionés par l'utilisateur
    for (let choice in this.userChoices) {
      if (this.userChoices[choice] === undefined) this.userChoices[choice] = '';
    }
  }
}
