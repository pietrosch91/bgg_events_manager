import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxmanagerComponent } from './boxmanager.component';

describe('BoxmanagerComponent', () => {
  let component: BoxmanagerComponent;
  let fixture: ComponentFixture<BoxmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
