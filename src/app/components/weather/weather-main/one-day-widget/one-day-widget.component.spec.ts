import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayWidgetComponent } from './one-day-widget.component';

describe('OneDayWidgetComponent', () => {
  let component: OneDayWidgetComponent;
  let fixture: ComponentFixture<OneDayWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDayWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
