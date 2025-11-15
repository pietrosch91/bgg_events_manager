import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpfakeinputComponent } from './ppfakeinput.component';

describe('PpfakeinputComponent', () => {
  let component: PpfakeinputComponent;
  let fixture: ComponentFixture<PpfakeinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpfakeinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpfakeinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
