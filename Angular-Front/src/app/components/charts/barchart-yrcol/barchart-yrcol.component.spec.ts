import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartYrcolComponent } from './barchart-yrcol.component';

describe('BarchartYrcolComponent', () => {
  let component: BarchartYrcolComponent;
  let fixture: ComponentFixture<BarchartYrcolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartYrcolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartYrcolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
