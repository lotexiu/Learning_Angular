import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteTooltipComponent } from './lote-tooltip.component';

describe('LoteTooltipComponent', () => {
  let component: LoteTooltipComponent;
  let fixture: ComponentFixture<LoteTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
