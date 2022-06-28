import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndUpdateComponent } from './edit-and-update.component';

describe('EditAndUpdateComponent', () => {
  let component: EditAndUpdateComponent;
  let fixture: ComponentFixture<EditAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAndUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
