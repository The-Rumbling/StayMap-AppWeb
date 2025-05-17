import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Concert} from '../../model/concert.entity';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {User} from '../../../users/model/user.entity';
import {UserService} from '../../../users/services/user.service';
import {ConcertService} from '../../services/concert.service';

@Component({
  selector: 'app-concert-map',
  imports: [
    GoogleMap,
    NgForOf,
    MapMarker,
    MapInfoWindow,
    NgIf,
    NgClass,
  ],
  templateUrl: './concert-map.component.html',
  styleUrl: './concert-map.component.css'
})
export class ConcertMapComponent implements OnInit{
  currentUser=new User({});
  @ViewChild(MapInfoWindow)
  infoWindow!: MapInfoWindow;
  concertSelected: Concert = new Concert({});
  center: google.maps.LatLngLiteral = { lat: -12.080, lng: -77.070 };
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: []
  };
  customIcon: google.maps.Icon = {
    url: 'https://the-rumbling.github.io/StayMap-Landing_Page/starymaplogo.png',
    scaledSize: new google.maps.Size(40, 40)
  };
  userIcon: google.maps.Icon={url:''};
  concerts:Array<Concert>=[];
  concertService=inject(ConcertService);

  openConcertInfo(concert: Concert, marker: MapMarker) {
    this.concertSelected = concert;
    this.infoWindow.open(marker);
  }

  ngOnInit() :void {
    this.concertService.getAll().subscribe(concerts=>{
      console.log(concerts);
      this.concerts=concerts;
      for(let concert of this.concerts){
        concert.venue.location.lat = concert.venue.location.lat + this.getRandomOffset();
        concert.venue.location.lng = concert.venue.location.lng + this.getRandomOffset();
      }
      console.log(this.concerts);
    });
  }

  private getRandomOffset() {
    const offset = 0.00005;
    return (Math.random() - 0.5) * offset;
  }

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user =>{
      this.currentUser = user;
      this.userIcon = {
        url: `${this.currentUser.profileImage}`,
        scaledSize: new google.maps.Size(40, 40)
      }
    })
  }
}
