import { Component, HostListener, Input, OnInit } from '@angular/core';

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

  public windowWidth: number;
  constructor() { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }
  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }
  // Closes modal box when clicking outside it
  closeModal() {
    this.randomShow = undefined;
  }
}
