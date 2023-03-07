import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { WeatherGuard } from 'src/app/guards/weather.guard';
import { WeatherBlockComponent } from './weather-block.component';
import { StoreModule } from '@ngrx/store';
import { WEATHER_FEATURE } from 'src/app/shared/stores/weather/weather.reducer';
import { weatherReducer } from '../../shared/stores/weather/weather.reducer';
import { WebsocketService } from 'src/app/service/weather/websocket.service';
import { WeatherUserSettingsComponent } from './weather-user-settings/weather-user-settings.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WeatherEffects } from '../../shared/stores/weather/weather.effects';
import { WeatherService } from 'src/app/service/weather/weather.service';
import { CityService } from '../../service/weather/city.service';
import { WeatherMainComponent } from './weather-main/weather-main.component';
import { MatIconModule } from '@angular/material/icon';
import { OneDayWidgetComponent } from './weather-main/one-day-widget/one-day-widget.component';
import { LoaderModule } from '../ui/loader/loader.module';
import { MatCardModule } from '@angular/material/card';
import { FiveDaysWidgetComponent } from './weather-main/five-days-widget/five-days-widget.component';
import { FiveDaysUnitComponent } from './weather-main/five-days-widget/five-days-unit/five-days-unit.component';
import { FlexDirective } from './weather-main/five-days-widget/flexDirective.directive';

const routes: Routes = [
  {
    path: 'weather-settings',
    canActivate: [WeatherGuard],
    component: WeatherUserSettingsComponent,
  },
  {
    path: 'weather',
    canActivate: [WeatherGuard],
    component: WeatherMainComponent,
  },
  // {
  //   path: 'settings',
  //   component: {},
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(WEATHER_FEATURE, weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoaderModule,
    MatCardModule,
  ],
  declarations: [
    WeatherBlockComponent,
    WeatherUserSettingsComponent,
    WeatherMainComponent,
    OneDayWidgetComponent,
    FiveDaysWidgetComponent,
    FiveDaysUnitComponent,
    FlexDirective
  ],
  providers: [WeatherGuard, WebsocketService, WeatherService, CityService],
})
export class WeatherModule {}
