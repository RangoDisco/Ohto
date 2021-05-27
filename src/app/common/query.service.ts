import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root',
})
export class QueryService {

  constructor(private apollo: Apollo) {
  }

  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  public queryShow = gql`
query ($id: Int, $page: Int, $perPage: Int, $type: MediaType, $format: MediaFormat, $genre: String, $seasonYear: Int, $season: MediaSeason,  $status: MediaStatus, ) { # Define which variables will be used in the query (id)
  Page(page: $page, perPage: $perPage){
    pageInfo{
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
  media (id: $id, type: $type, format: $format, genre: $genre, seasonYear: $seasonYear season: $season, status: $status, ) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
    }
    coverImage{
      large
    }
    startDate{
      year
    }
    type
    format
    status
    description
    season
    episodes
    duration
    chapters
    genres
    meanScore
    characters(sort: ROLE){
      edges{
        node{
          name{
            first
            last
          }
          image{
            large
          }
        }
      }
    }
  }
  }
}
`;

  public getShow(userChoices): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: this.queryShow,
      variables: {
        type: userChoices.type,
        format: userChoices.format,
        seasonYear: userChoices.year,
        genre: userChoices.genre,
        season: userChoices.season,
        status: userChoices.status,
        page: 1,
        perPage: 10
      },
    }).valueChanges
  }

}