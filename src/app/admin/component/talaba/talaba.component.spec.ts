import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalabaComponent } from './talaba.component';

describe('TalabaComponent', () => {
  let component: TalabaComponent;
  let fixture: ComponentFixture<TalabaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalabaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalabaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
