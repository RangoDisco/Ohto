import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  // Gets current year and add one bc anilist has data for the incomming year
  currentYear = new Date().getUTCFullYear() + 1;
  years: number[] = [];
  genres: string[];
  formats: string[];
  status: string[];
  seasons: string[];
  constructor() {
    // All the genres for the genre filter
    this.genres = [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Ecchi',
      'Fantasy',
      'Horror',
      'Mahou Shoujo',
      'Mecha',
      'Music',
      'Mystery',
      'Psychological',
      'Romance',
      'Sci-Fi',
      'Slice Of Life',
      'Sports',
      'Supernatural',
      'Thriller',
    ];

    // Liste des formats
    this.formats = ['TV'];
    // Liste des status
    this.status = ['RELEASING', 'FINISHED'];
    // Liste des saisons
    this.seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  }

  // Loop that creates all the year for the year filter
  createYears(): number[] {
    for (let i = this.currentYear; i >= 1980; i--) {
      this.years.push(i);
    }
    return this.years;
  }
}