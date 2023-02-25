import { Component, OnInit } from '@angular/core';
import * as fromRoot from "./app.reducer";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getIsLoading } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-pet-project';
  isLoading$:Observable<boolean>;

  constructor(private store:Store<fromRoot.State>){}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }

}
