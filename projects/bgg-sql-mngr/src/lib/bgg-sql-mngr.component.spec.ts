import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BggSqlMngrComponent } from './bgg-sql-mngr.component';

describe('BggSqlMngrComponent', () => {
  let component: BggSqlMngrComponent;
  let fixture: ComponentFixture<BggSqlMngrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BggSqlMngrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BggSqlMngrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
