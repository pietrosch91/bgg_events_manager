import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpChoiceComponent } from './pp-choice.component';

describe('PpChoiceComponent', () => {
  let component: PpChoiceComponent;
  let fixture: ComponentFixture<PpChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
