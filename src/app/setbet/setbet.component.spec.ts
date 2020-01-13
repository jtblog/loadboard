import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetbetComponent } from './setbet.component';

describe('SetbetComponent', () => {
  let component: SetbetComponent;
  let fixture: ComponentFixture<SetbetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetbetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
