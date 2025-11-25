import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxpanelGroupsComponent } from './boxpanel-groups.component';

describe('BoxpanelGroupsComponent', () => {
  let component: BoxpanelGroupsComponent;
  let fixture: ComponentFixture<BoxpanelGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxpanelGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxpanelGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
