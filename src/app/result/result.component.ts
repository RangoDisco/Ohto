import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input()
  randomShow;
  @Input()
  genresFromShow: [];
  @Input()
  charactersList: [];
  constructor() { }

  ngOnInit(): void {
    if (this.randomShow) {
      this.genresFromShow = this.randomShow.genres
    }

    console.log(this.randomShow)
  }

}
