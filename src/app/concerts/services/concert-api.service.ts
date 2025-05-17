import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ConcertAssembler } from './concert.assembler';
import { Concert } from '../model/concert.entity';

@Injectable({
  providedIn: 'root'
})
export class ConcertApiService {
  private concertUrl: string = 'assets/data/db.json'; // ✅ Ahora apunta al JSON estático

  constructor(private http: HttpClient) { }

  getConcerts() {
    return this.http.get<any>(this.concertUrl).pipe(
      map(response => {
        const concertsData = response.concerts?.data || [];
        return ConcertAssembler.toEntitiesFromResponse({ data: concertsData });
      })
    );
  }
}
