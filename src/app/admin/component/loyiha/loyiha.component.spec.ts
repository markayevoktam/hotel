import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyihaComponent } from './loyiha.component';

describe('LoyihaComponent', () => {
  let component: LoyihaComponent;
  let fixture: ComponentFixture<LoyihaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyihaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyihaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
