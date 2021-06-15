export class UserFilters {
  public type: string;
  public format: string;
  public genre: string;
  public year: string;
  public season: string;
  public status: string;
  constructor(
    type: string,
    format: string,
    genre: string,
    year: string,
    season: string,
    status: string
  ) {
    this.type = type;
    this.format = format;
    this.genre = genre;
    this.year = year;
    this.season = season;
    this.status = status;
  }
}
