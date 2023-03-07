import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDaysWidgetComponent } from './five-days-widget.component';

describe('FiveDaysWidgetComponent', () => {
  let component: FiveDaysWidgetComponent;
  let fixture: ComponentFixture<FiveDaysWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveDaysWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDaysWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
