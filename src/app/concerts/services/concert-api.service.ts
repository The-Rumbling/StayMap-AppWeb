import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ConcertAssembler } from './concert.assembler';
import { Concert } from '../model/concert.entity';

@Injectable({
  providedIn: 'root'
})
export class ConcertApiService {
  private concertUrl: string = 'assets/data/db.json'; // correcto

  constructor(private http: HttpClient) { }

  getConcerts() {
    return this.http.get<any>(this.concertUrl).pipe(
      map(response => {
        const concertsData = response.concerts || []; // ✅ corregido aquí
        return ConcertAssembler.toEntitiesFromResponse({ data: concertsData });
      })
    );
  }
}
