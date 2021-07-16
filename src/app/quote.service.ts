import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getQuote(): Observable<any> {
    const obs: Observable<any> = this.http.get(
      'https://animechan.vercel.app/api/random'
    );
    const result = (data: JSON) => {
      return data as JSON;
    };

    return obs.pipe(map(result));
  }
}
