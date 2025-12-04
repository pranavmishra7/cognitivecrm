import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAssuredComponent } from './life-assured.component';

describe('LifeAssuredComponent', () => {
  let component: LifeAssuredComponent;
  let fixture: ComponentFixture<LifeAssuredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeAssuredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAssuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
