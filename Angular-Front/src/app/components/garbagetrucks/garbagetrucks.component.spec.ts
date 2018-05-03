import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbagetrucksComponent } from './garbagetrucks.component';

describe('GarbagetrucksComponent', () => {
  let component: GarbagetrucksComponent;
  let fixture: ComponentFixture<GarbagetrucksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbagetrucksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbagetrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
