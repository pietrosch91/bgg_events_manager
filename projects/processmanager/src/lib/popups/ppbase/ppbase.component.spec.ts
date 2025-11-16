import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpbaseComponent } from './ppbase.component';

describe('PpbaseComponent', () => {
  let component: PpbaseComponent;
  let fixture: ComponentFixture<PpbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpbaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
