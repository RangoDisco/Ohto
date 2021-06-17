import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResultComponent } from './components/result/result.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { TruncateDesc } from './common/pipes/truncate-desc.pipe';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, ResultComponent, HeaderComponent, TruncateDesc, HomePageComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, GraphQLModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
