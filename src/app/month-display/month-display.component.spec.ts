import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDisplayComponent } from './month-display.component';

describe('MonthDisplayComponent', () => {
  let component: MonthDisplayComponent;
  let fixture: ComponentFixture<MonthDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
