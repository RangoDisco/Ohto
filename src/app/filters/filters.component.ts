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

  bobo: number;

  // Type selectionné par l'utilisateur
  selectedType: string = '...'

  // Instance de la classe UserFilters
  userChoices: UserFilters
  queryResult: [];
  randomShow;
  genresFromShow: any[] = [];
  charactersList: any[] = [];
  disableSelect: boolean = false;

  constructor(public filtersService: FiltersService, public getShowService: QueryService) { }

  ngOnInit(): void {
    // Instanciation de la classe
    this.userChoices = new UserFilters('', '', '', '', '', '', '');
    console.log(this.userChoices.status);

    // Appel de la fonction qui crée les années disponibles
    this.years = this.filtersService.createYears();

    // Appel du tabelau de genres
    this.genres = this.filtersService.genres;
  }




  getFilters(): void {
    this.getShow();
  }

  getShow(): void {
    this.genresFromShow = [];
    this.charactersList = [];
    console.log(this.userChoices.status);
    this.getShowService.getShow(this.userChoices).subscribe((data) => {
      this.queryResult = data.data.Page.media;
      const randomNumber = Math.floor(Math.random() * this.queryResult.length);
      this.randomShow = this.queryResult[randomNumber]

      for (let i = 0; i < 2; i++) {
        if (this.randomShow.genres[i]) {
          this.genresFromShow.push(this.randomShow.genres[i])
        }
      }
      for (let j = 0; j < 4; j++) {
        if (this.randomShow.characters.edges[j]) {
          this.charactersList.push(this.randomShow.characters.edges[j])
        }
      }

      console.log(this.randomShow)
    })
  }

  // Change type on button
  changeType(): void {
    this.selectedType = this.userChoices.type;
    if (this.userChoices.type === "MANGA") this.disableSelect = !this.disableSelect;
    else if (this.userChoices.type === "ANIME") this.disableSelect = false;



  }
}
