import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoinputsComponent } from './autoinputs.component';

describe('AutoinputsComponent', () => {
  let component: AutoinputsComponent;
  let fixture: ComponentFixture<AutoinputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoinputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
