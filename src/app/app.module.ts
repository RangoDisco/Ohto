import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { TruncateDesc } from './common/pipes/truncate-desc.pipe';

@NgModule({
  declarations: [AppComponent, ResultComponent, HeaderComponent, TruncateDesc],
  imports: [BrowserModule, FormsModule, HttpClientModule, GraphQLModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
