import { Component, Input, OnInit } from '@angular/core';
import { QueryService } from '../common/query.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  // Show reçu par le parent
  @Input()
  randomShow;

  // Tableau des genres fourni par le parent
  @Input()
  genresFromShow: [];

  // Tableau de personnage fourni par le parent
  @Input()
  charactersList: [];

  constructor() {}

  ngOnInit(): void {}

  // Closes modal box when clicking outside it
  closeModal() {
    this.randomShow = undefined;
  }
}
