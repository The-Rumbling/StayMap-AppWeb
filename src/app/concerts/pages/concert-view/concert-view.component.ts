import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from '@angular/common';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Concert} from '../../model/concert.entity';
import {ConcertApiService} from '../../services/concert-api.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {ConcertListComponent} from '../../components/concert-list/concert-list.component';

@Component({
  selector: 'app-concert-view',
  imports: [
    ConcertListComponent
  ],
  templateUrl: './concert-view.component.html',
  styleUrl: './concert-view.component.css'
})
export class ConcertViewComponent implements OnInit {
  concerts: Array<Concert>=[];
  private concertUrl=inject(ConcertApiService);
  ngOnInit() :void{
    this.concertUrl.getConcerts().subscribe(concerts=>{
      console.log(concerts);
      this.concerts=concerts;
      console.log(this.concerts);
    });
  }
}
