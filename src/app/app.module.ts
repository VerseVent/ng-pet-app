import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptApi } from './service/interceptor.service';
import { HeaderComponent } from './components/ui/header/header.component';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './components/user/user.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './app.reducer';
import { LoaderComponent } from './components/ui/loader/loader.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    SharedModule,
    UserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptApi,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
