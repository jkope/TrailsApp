import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailPage } from './trail.page';

describe('TrailPage', () => {
  let component: TrailPage;
  let fixture: ComponentFixture<TrailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
