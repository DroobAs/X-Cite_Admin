import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryiesComponent } from './categoryies.component';

describe('CategoryiesComponent', () => {
  let component: CategoryiesComponent;
  let fixture: ComponentFixture<CategoryiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
