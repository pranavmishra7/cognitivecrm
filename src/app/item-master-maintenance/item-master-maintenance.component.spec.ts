import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterMaintenanceComponent } from './item-master-maintenance.component';

describe('ItemMasterMaintenanceComponent', () => {
  let component: ItemMasterMaintenanceComponent;
  let fixture: ComponentFixture<ItemMasterMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMasterMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMasterMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
