import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuruhComponent } from './guruh.component';

describe('GuruhComponent', () => {
  let component: GuruhComponent;
  let fixture: ComponentFixture<GuruhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuruhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuruhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
