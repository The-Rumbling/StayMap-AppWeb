export class Concert {
  id: number;
  artist: {
    name: string,
    genre: string
  };
  image: string;
  description: string;
  date: string;
  venue: {
    name:string,
    address: string,
    location: {
      lat: number,
      lng: number
    }
  };
  status: string;

  constructor(concert:{id?:number,artist?:{name:string,genre:string},image?:string,description?:string,date?:string,venue?:{name:string,address:string,location:{lat:number,lng:number}}, status?:string}) {
    this.id=concert.id || 0;
    this.artist=concert.artist || {name:'',genre:''};
    this.image=concert.image || '';
    this.description=concert.description || '';
    this.date=concert.date || '';
    this.venue=concert.venue || {name:'',address:'',location:{lat:0,lng:0}};
    this.status=concert.status || '';
  }
}
