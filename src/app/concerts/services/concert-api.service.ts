import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConcertResponse} from './concert.response';
import {map} from 'rxjs';
import {ConcertAssembler} from './concert.assembler';

@Injectable({
  providedIn: 'root'
})
export class ConcertApiService {
  private concertUrl: string = 'http://localhost:3000/concerts';
  constructor(private http: HttpClient) { }
  getConcerts() {
    return this.http.get<ConcertResponse>(`${this.concertUrl}`).pipe(
      map(response=>ConcertAssembler.toEntitiesFromResponse(response))
    );
  }
}
