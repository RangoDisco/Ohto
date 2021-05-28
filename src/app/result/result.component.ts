import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input()
  randomShow;
  // Tableau des genres fourni par le parent
  @Input()
  genresFromShow: [];
  // Tableau de personnage fourni par le parent
  @Input()
  charactersList: [];

  showModal: boolean = true;
  constructor() { }

  ngOnInit(): void {
    if (this.randomShow) {
      this.showModal = true;

      console.log(this.randomShow)
    }

  }

  closeModal() {
    this.showModal = false;
    console.log(this.showModal)
  }


}