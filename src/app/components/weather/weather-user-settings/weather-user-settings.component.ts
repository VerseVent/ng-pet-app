import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject, of } from 'rxjs';
import { ISetting } from 'src/app/interfaces/ISetting';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setSettings } from 'src/app/shared/stores/weather/weather.actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CityService } from '../../../service/weather/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-user-settings',
  templateUrl: './weather-user-settings.component.html',
  styleUrls: ['./weather-user-settings.component.scss'],
})
export class WeatherUserSettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  isFormFilled$: any;
  destroy$: Subject<boolean> = new Subject();
  filteredCities$: Observable<string[]>;
  err$: Observable<string>;
  constructor(
    private fb: FormBuilder,
    private store$: Store,
    private router: Router,
    private cityService: CityService
  ) {
    this.settingsForm = this.fb.group({
      city: [''],
      isNewsletter: [false],
    });
  }

  get cityControl() {
    return this.settingsForm.get('city');
  }

  get isNewsletterControl() {
    return this.settingsForm.get('isNewsletter');
  }

  toWeather() {
    this.router.navigate(['/weather']);
  }

  ngOnInit() {
    if (this.cityControl) {
      this.filteredCities$ = this.cityControl.valueChanges.pipe(
        debounceTime(350),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap((value) => console.log(value)),
        switchMap((cityInput) => this.cityService.getCities$(cityInput)),
        tap((value) => console.log(value))
      );
    }
    if (this.cityControl && this.isNewsletterControl) {
      console.log(
        'ngOnInit:: cityControl and isNewsLetter:',
        this.cityControl,
        this.isNewsletterControl
      );
      this.isFormFilled$ = combineLatest([
        this.cityControl.valueChanges,
        this.isNewsletterControl.valueChanges,
      ]).pipe(map(([isNewsletter, city]) => isNewsletter && city));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    // const filteredItems = this.filteredCities$.filter((city) =>
    // city.toLowerCase().includes(filterValue)
    // );
    // return filteredItems;
  }

  selectFilteredItem(cityItem: MatAutocompleteSelectedEvent) {
    this.cityControl?.setValue(cityItem.option.value);
  }

  sendSettings() {
    debugger;
    this.store$.dispatch(setSettings(this.settingsForm.value));
  }
}
