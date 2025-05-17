import { ConcertResource, ConcertResponse } from './concert.response';
import { Concert } from '../model/concert.entity';

export class ConcertAssembler {

  static toEntityFromResource(resource: ConcertResource): Concert {
    return {
      id: resource.id,
      artistName: [resource.artist.name], // convertimos en array
      genre: [resource.artist.genre],     // convertimos en array
      description: resource.description,
      image: resource.image,
      date: resource.date,
      venueName: resource.venue?.name || '',
      venueAddress: resource.venue?.address || '',
      venueLocation: resource.venue?.location || { lat: 0, lng: 0 }
    };
  }

  static toEntitiesFromResponse(response: ConcertResponse): Concert[] {
    return response.data.map(concert => this.toEntityFromResource(concert));
  }

}
