import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoinputComponent } from './autoinput.component';

describe('AutoinputComponent', () => {
  let component: AutoinputComponent;
  let fixture: ComponentFixture<AutoinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
