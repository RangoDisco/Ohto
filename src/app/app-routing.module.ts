import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuoteComponent } from './pages/quote/quote.component';

const routes: Routes = [
  { path: 'show', component: HomePageComponent },
  { path: '', redirectTo: '/show', pathMatch: 'full' },
  { path: 'quote', component: QuoteComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
