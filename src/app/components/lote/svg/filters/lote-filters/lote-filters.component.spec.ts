import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteFiltersComponent } from './lote-filters.component';

describe('LoteFiltersComponent', () => {
  let component: LoteFiltersComponent;
  let fixture: ComponentFixture<LoteFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
