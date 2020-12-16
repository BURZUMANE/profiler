import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (moment().diff(control.value, 'years') <= 18) {
    return { 'age': true };
  }
  return null;
}
