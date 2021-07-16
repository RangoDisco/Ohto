import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  public quote;
  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService
      .getQuote()
      .subscribe((quote) => ((this.quote = quote), console.log(this.quote)));
  }
}
