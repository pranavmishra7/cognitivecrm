import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointeeComponent } from './appointee.component';

describe('AppointeeComponent', () => {
  let component: AppointeeComponent;
  let fixture: ComponentFixture<AppointeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
