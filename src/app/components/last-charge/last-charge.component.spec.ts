import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastChargeComponent } from './last-charge.component';

describe('LastChargeComponent', () => {
  let component: LastChargeComponent;
  let fixture: ComponentFixture<LastChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastChargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
