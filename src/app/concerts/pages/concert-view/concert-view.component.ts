import { Component, OnInit, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Concert } from '../../model/concert.entity';
import { ConcertApiService } from '../../services/concert-api.service';
import { ConcertListComponent } from '../../components/concert-list/concert-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-concert-view',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    ConcertListComponent
  ],
  templateUrl: './concert-view.component.html',
  styleUrl: './concert-view.component.css'
})
export class ConcertViewComponent implements OnInit {
  concerts: Array<Concert> = [];
  private concertService = inject(ConcertApiService);

  ngOnInit(): void {
    this.concertService.getConcerts().subscribe(concerts => {
      console.log('🎵 Conciertos cargados:', concerts);
      this.concerts = concerts;
    });
  }
}
