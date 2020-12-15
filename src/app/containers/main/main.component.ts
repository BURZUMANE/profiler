import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public countriesList$: Observable<any>;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.countriesList$ = this.profileService.getCountries();
  }

}
