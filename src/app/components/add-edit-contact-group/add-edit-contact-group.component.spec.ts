import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContactGroupComponent } from './add-edit-contact-group.component';

describe('AddEditContactGroupComponent', () => {
  let component: AddEditContactGroupComponent;
  let fixture: ComponentFixture<AddEditContactGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditContactGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditContactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
