import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import { Concert } from '../model/concert.entity';
import { catchError, map, Observable } from 'rxjs';

const concertResourceEndpoint = environment.concertsEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class ConcertService extends BaseService<Concert> {

  constructor() {
    super();
    this.resourceEndpoint = concertResourceEndpoint;
  }

  override getAll(): Observable<Concert[]> {
    return this.http.get<any>(this.resourcePath(), this.httpOptions).pipe(
      map(data => {
        const concertsArray = Array.isArray(data)
          ? data
          : data.concerts || [];

        return concertsArray.map((item: any) => new Concert({
          id: Number(item.id),
          artistName: [item.artist?.name || ''],
          genre: [item.artist?.genre || ''],
          image: item.image || '',
          description: item.description || '',
          date: item.date || '',
          venueName: item.venue?.name || '',
          venueAddress: item.venue?.address || '',
          venueLocation: item.venue?.location || { lat: 0, lng: 0 }
        }));
      }),
      catchError(this.handleError)
    );
  }
}
