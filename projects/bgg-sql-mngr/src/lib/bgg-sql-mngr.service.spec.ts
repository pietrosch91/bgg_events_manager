import { TestBed } from '@angular/core/testing';

import { BggSqlMngrService } from './bgg-sql-mngr.service';

describe('BggSqlMngrService', () => {
  let service: BggSqlMngrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BggSqlMngrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
