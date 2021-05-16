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

  constructor(public filtersService: FiltersService, public getShowService: QueryService) { }

  ngOnInit(): void {
    // this.getShow()
    // Instanciation de la classe
    this.userChoices = new UserFilters('', '', '', '', '', '');

    // Appel de la fonction qui crée les années disponibles
    this.years = this.filtersService.createYears();

    // Appel du tabelau de genres
    this.genres = this.filtersService.genres;
  }




  getFilters(): void {
    console.log(this.userChoices);
    this.getShow();
  }

  getShow(): void {
    this.getShowService.getShow(this.userChoices)
  }

  // Change type on button
  changeType(): void {
    this.selectedType = this.userChoices.type
  }
}
