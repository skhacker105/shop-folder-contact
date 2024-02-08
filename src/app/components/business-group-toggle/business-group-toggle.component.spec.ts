import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGroupToggleComponent } from './business-group-toggle.component';

describe('BusinessGroupToggleComponent', () => {
  let component: BusinessGroupToggleComponent;
  let fixture: ComponentFixture<BusinessGroupToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessGroupToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessGroupToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
