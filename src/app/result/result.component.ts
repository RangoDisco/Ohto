import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
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

  // Boolean responsable de l'affichage de la boite modale
  showModal: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Display modal box if there is a random show
    if (this.randomShow) {
      this.showModal = true;
      console.log(this.randomShow)
    }

  }

  // Closes modal box when clicking outside it
  closeModal() {
    this.showModal = false;
  }


}