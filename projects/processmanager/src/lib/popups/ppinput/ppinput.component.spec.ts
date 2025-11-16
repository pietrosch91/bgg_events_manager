import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpinputComponent } from './ppinput.component';

describe('PpinputComponent', () => {
  let component: PpinputComponent;
  let fixture: ComponentFixture<PpinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
