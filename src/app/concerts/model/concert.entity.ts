export class Concert {
  id: number;
  artistName: string[];
  genre: string[];
  image: string;
  description: string;
  date: string;
  venueName: string;
  venueAddress: string;
  venueLocation:{
    lat: number,
    lng: number
  };

  constructor() {
    this.id = 0;
    this.artistName = [];
    this.genre = [];
    this.image = '';
    this.description = '';
    this.date = '';
    this.venueName = '';
    this.venueAddress = '';
    this.venueLocation = {lat: 0, lng: 0};
  }
}
