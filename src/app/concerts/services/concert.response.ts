export interface ConcertResponse {
  data: ConcertResource[];
}

export interface ConcertResource{
  id: number;
  artist: [{name: string, genre: string}];
  venue: {name: string, address: string, location: {lat: number, lng: number}};
  date: string;
  image: string;
  description: string;
}
