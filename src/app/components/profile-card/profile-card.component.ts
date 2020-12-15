import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { J } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnChanges {
  @Input() countriesList: any;

  public languages: any[];

  public genders = ['male', 'female', 'other'];

  public onEdit = true;

  public form = this.fb.group({
    name: [''],
    dateOfBirth: [],
    countryOfBirth: [],
    languages: [[]],
    gender: []
  });

  public toggleEdit(): void {
    this.onEdit = !this.onEdit;
  }

  public onCancel(): void {
    console.log('fart');
    this.resetForm();
    this.toggleEdit();
  }

  public saveForm(): void {
    localStorage.setItem(
      'profileData',
      JSON.stringify({ ...this.form.value, dateOfBirth: moment(this.form.value.dateOfBirth).format('YYYY-MM-DD') }));
    this.toggleEdit();
  }

  private resetForm(): void {
    const formData = JSON.parse(localStorage.getItem('profileData'));
    this.form.patchValue({ ...formData });
  }


  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { countriesList } = changes;
    if (countriesList.currentValue) {
      this.languages = [...new Set(this.countriesList.map(item => item.languages[0].name))].sort();
    }
  }

  ngOnInit(): void {
    this.resetForm();
  }

}
