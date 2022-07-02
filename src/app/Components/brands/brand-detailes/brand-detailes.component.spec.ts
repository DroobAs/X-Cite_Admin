import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetailesComponent } from './brand-detailes.component';

describe('BrandDetailesComponent', () => {
  let component: BrandDetailesComponent;
  let fixture: ComponentFixture<BrandDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandDetailesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
