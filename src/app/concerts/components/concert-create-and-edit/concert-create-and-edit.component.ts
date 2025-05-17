import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Concert} from '../../model/concert.entity';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-concert-create-and-edit',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './concert-create-and-edit.component.html',
  styleUrl: './concert-create-and-edit.component.css'
})
export class ConcertCreateAndEditComponent extends BaseFormComponent {
  @Input() concert!: Concert;
  @Output() add = new EventEmitter<Concert>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('concertForm', { static: false }) protected concertForm!: NgForm;

  constructor() {
    super();
    this.concert = new Concert({});
  }

  showForm = false;

  private isValid = () => this.concertForm.valid;

  onSubmit() {
    if (!this.isValid()) return;
    this.add.emit(this.concert);
  }

  onCancel() {
    this.cancel.emit();
  }
}
