import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AgeValidator } from '../../custom-validators/age.validator';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  public countriesList$: Observable<any>;

  public languages: any[];

  public genders = ['male', 'female', 'other'];

  public onEdit = true;

  private resetForm(): void {
    const formData = JSON.parse(localStorage.getItem('profileData'));
    this.form.patchValue({ ...formData });
  }

  private unsubscribeAll: Subject<any>;

  public get fromFC(): any {
    return this.form.get('dateOfBirth');
  }

  public form = this.fb.group({
    name: ['', [Validators.required]],
    dateOfBirth: [moment(), [Validators.required, AgeValidator]],
    countryOfBirth: [null, [Validators.required]],
    languages: [[], [Validators.required]],
    gender: [null, [Validators.required]]
  });

  public toggleEdit(): void {
    this.form.enable();
    this.onEdit = !this.onEdit;
  }

  public onCancel(): void {
    this.resetForm();
    this.form.disable();
    this.onEdit = !this.onEdit;
  }

  public saveForm(): void {
    if (this.form.invalid) {
      return;
    }
    localStorage.setItem(
      'profileData',
      JSON.stringify({ ...this.form.value, dateOfBirth: moment(this.form.value.dateOfBirth).format('YYYY-MM-DD') }));
    this.form.disable();
    this.onEdit = !this.onEdit;
  }

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.countriesList$ = this.profileService.getCountries();
    this.countriesList$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
      this.languages = [...new Set(data.map(item => item.languages[0].name))].sort();
    });
    this.resetForm();
    this.form.disable();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
