import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerDetailsComponent } from './proposer-details.component';

describe('ProposerDetailsComponent', () => {
  let component: ProposerDetailsComponent;
  let fixture: ComponentFixture<ProposerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
