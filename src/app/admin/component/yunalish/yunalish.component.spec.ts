import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YunalishComponent } from './yunalish.component';

describe('YunalishComponent', () => {
  let component: YunalishComponent;
  let fixture: ComponentFixture<YunalishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YunalishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YunalishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
