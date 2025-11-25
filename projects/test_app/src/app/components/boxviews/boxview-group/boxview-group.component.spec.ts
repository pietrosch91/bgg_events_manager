import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxviewGroupComponent } from './boxview-group.component';

describe('BoxviewGroupComponent', () => {
  let component: BoxviewGroupComponent;
  let fixture: ComponentFixture<BoxviewGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxviewGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxviewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
