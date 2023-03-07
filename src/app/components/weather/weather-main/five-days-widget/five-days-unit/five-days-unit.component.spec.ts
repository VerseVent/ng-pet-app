import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDaysUnitComponent } from './five-days-unit.component';

describe('FiveDaysUnitComponent', () => {
  let component: FiveDaysUnitComponent;
  let fixture: ComponentFixture<FiveDaysUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveDaysUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDaysUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
