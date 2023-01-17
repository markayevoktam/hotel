import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XarakterComponent } from './xarakter.component';

describe('XarakterComponent', () => {
  let component: XarakterComponent;
  let fixture: ComponentFixture<XarakterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XarakterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XarakterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
