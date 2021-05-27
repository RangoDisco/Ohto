import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {
  }

  public getShow(userChoices, randomShow) {
    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible
    var query = `
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

    // Define our query variables and values that will be used in the query request
    var variables = {
      type: userChoices.type,
      format: userChoices.format,
      seasonYear: userChoices.year,
      genre: userChoices.genre,
      season: userChoices.season,
      status: userChoices.status,
      page: 1,
      perPage: 10
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };
    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError);

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleData(data) {
      randomShow = data;
      return data as JSON
    }

    function handleError(error) {
      alert('Error, check console');
      console.error(error);
    }
  }
}