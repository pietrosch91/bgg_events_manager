import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodepanelComponent } from './barcodepanel.component';

describe('BarcodepanelComponent', () => {
  let component: BarcodepanelComponent;
  let fixture: ComponentFixture<BarcodepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodepanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
