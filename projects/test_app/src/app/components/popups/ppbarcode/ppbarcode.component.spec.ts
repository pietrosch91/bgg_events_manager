import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpbarcodeComponent } from './ppbarcode.component';

describe('PpbarcodeComponent', () => {
  let component: PpbarcodeComponent;
  let fixture: ComponentFixture<PpbarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpbarcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpbarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
