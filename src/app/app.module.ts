import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { FiltersComponent } from './filters/filters.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
  declarations: [AppComponent, ResultComponent, FiltersComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule, Apollo,
    HttpLinkModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
