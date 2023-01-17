import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YutuqComponent } from './yutuq.component';

describe('YutuqComponent', () => {
  let component: YutuqComponent;
  let fixture: ComponentFixture<YutuqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YutuqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YutuqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
