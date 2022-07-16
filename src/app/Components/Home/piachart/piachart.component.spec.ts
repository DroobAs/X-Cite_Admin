/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PiachartComponent } from './piachart.component';

describe('PiachartComponent', () => {
  let component: PiachartComponent;
  let fixture: ComponentFixture<PiachartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiachartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiachartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
