import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentdComponent } from './talentd.component';

describe('TalentdComponent', () => {
  let component: TalentdComponent;
  let fixture: ComponentFixture<TalentdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
