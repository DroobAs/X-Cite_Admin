import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBrandComponent } from './add-update-brand.component';

describe('AddUpdateBrandComponent', () => {
  let component: AddUpdateBrandComponent;
  let fixture: ComponentFixture<AddUpdateBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
