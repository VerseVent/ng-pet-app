import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptApi } from './service/interceptor.service';
import { HeaderComponent } from './components/ui/header/header.component';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './components/user/user.module';
import { reducers } from './app.reducer';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { WeatherModule } from './components/weather/weather.module';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageService } from './service/storage/localstorage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    UserModule,
    WeatherModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptApi,
      multi: true,
    },
    LocalStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
