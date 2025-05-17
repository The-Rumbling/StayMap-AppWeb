import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../users/services/user.service';
import {Concert} from '../../model/concert.entity';
import {ConcertService} from '../../services/concert.service';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {ConcertCreateAndEditComponent} from '../../components/concert-create-and-edit/concert-create-and-edit.component';
import {User} from '../../../users/model/user.entity';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-concert-view',
  imports: [
    MatButton,
    NgIf,
    ConcertCreateAndEditComponent,
    NgForOf
  ],
  templateUrl: './concert-view.component.html',
  styleUrl: './concert-view.component.css'
})
export class ConcertViewComponent implements OnInit{
  protected isArtist:boolean = false;
  protected currentUser:User=new User({});
  protected concertData: Concert=new Concert({});
  protected concertService: ConcertService = inject(ConcertService);
  concerts: Array<Concert>=[];
  protected selectedGenres: string[]=[];
  protected genres:string[] = [
    "Pop", "Rock", "K-pop", "Indie", "Urbano",
    "Electrónica", "Salsa", "Cumbia", "Jazz"
  ]

  constructor(private userService: UserService, private http:HttpClient) {
    this.userService.currentUser$.subscribe(user => {
      this.isArtist = user.type === 'artist';
      this.concerts = user;
    });
    this.concertData = new Concert({});
  }

  ngOnInit(): void {
    this.getAllConcerts();
  }

  private getAllConcerts() {
    this.concertService.getAll().subscribe((response: Array<Concert>) => {
      console.log(' Conciertos cargados desde el JSON:', response);
      this.concerts = response;
    });
  }

  private createCommunity() {
    this.concertData.venue.location = {
      lat: -12.07753941557825,
      lng: -77.08339150415082
    };
    this.concertData.status = "Available";
    console.log('3',this.concertData);
    this.concertService.create(this.concertData).subscribe(() => {
      this.getAllConcerts();
    });
  }

  private resetState() {
    this.concertData = new Concert({});
  }

  protected onCancelRequested() {
    this.resetState();
    this.formVisible = false;
  }

  protected onConcertAddRequested(item: Concert) {
    this.concertData = item;
    this.createCommunity();
    this.resetState();
  }
  protected formVisible = false;

  protected onAddConcertClicked() {
    this.resetState();
    this.formVisible = true;
  }

  get filteredConcerts() {
    if (this.selectedGenres.length === 0) {
      return this.concerts;
    }
    return this.concerts.filter(concert =>
      this.selectedGenres.includes(concert.artist.genre)
    );
  }

  onGenreChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const genre = input.value;

    if (input.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
  }
}
