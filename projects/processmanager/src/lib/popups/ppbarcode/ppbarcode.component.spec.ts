import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpBarcodeComponent } from './ppbarcode.component';

describe('PpBarcodeComponent', () => {
  let component: PpBarcodeComponent;
  let fixture: ComponentFixture<PpBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpBarcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
