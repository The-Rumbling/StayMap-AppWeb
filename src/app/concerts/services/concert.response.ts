export interface ConcertResponse {
  data: ConcertResource[];
}

export interface ConcertResource {
  id: number | string;
  artist: {
    name: string;
    genre: string;
  };
  image: string;
  description: string;
  date: string;
  status?: string;
  venue: {
    name: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
}
