import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpChoiceCreateComponent } from './pp-choice_create.component';

describe('PpChoiceCreateComponent', () => {
  let component: PpChoiceCreateComponent;
  let fixture: ComponentFixture<PpChoiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpChoiceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpChoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
