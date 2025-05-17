import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConcertResponse } from './concert.response';
import { map } from 'rxjs';
import { ConcertAssembler } from './concert.assembler';

@Injectable({
  providedIn: 'root'
})
export class ConcertApiService {
  // ⚠️ IMPORTANTE: en producción esto será simplemente '/db.json'
  private dbUrl: string = '/db.json';

  constructor(private http: HttpClient) {}

  getConcerts() {
    return this.http.get<any>(this.dbUrl).pipe(
      map(response => {
        const concertResponse: ConcertResponse = response.concerts; // extrae "concerts"
        return ConcertAssembler.toEntitiesFromResponse(concertResponse);
      })
    );
  }
}
