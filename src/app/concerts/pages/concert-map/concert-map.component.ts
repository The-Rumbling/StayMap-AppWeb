import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Concert} from '../../model/concert.entity';
import {ConcertApiService} from '../../services/concert-api.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-concert-map',
  imports: [
    GoogleMap,
    NgForOf,
    MapMarker,
    MapInfoWindow
  ],
  templateUrl: './concert-map.component.html',
  styleUrl: './concert-map.component.css'
})
export class ConcertMapComponent implements OnInit{
  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;
  concertSelected: Concert = new Concert();
  center: google.maps.LatLngLiteral = { lat: -12.080, lng: -77.070 };
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: [
    ]
  };
  customIcon: google.maps.Icon = {
    url: 'https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png',
    scaledSize: new google.maps.Size(40, 40)
  };
  concerts:Array<Concert>=[];
  concertApi=inject(ConcertApiService);

  openConcertInfo(concert: Concert, marker: MapMarker) {
    this.concertSelected = concert;
    this.infoWindow.open(marker);
  }

  ngOnInit() :void {
    this.concertApi.getConcerts().subscribe(concerts=>{
      console.log(concerts);
      this.concerts=concerts;
      for(let concert of this.concerts){
        concert.venueLocation.lat = concert.venueLocation.lat + this.getRandomOffset();
        concert.venueLocation.lng = concert.venueLocation.lng + this.getRandomOffset();
      }
      console.log(this.concerts);
    });
  }

  private getRandomOffset() {
    const offset = 0.00005;
    return (Math.random() - 0.5) * offset;
  }
}
