import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteBorderComponent } from './lote-border.component';

describe('LoteBorderComponent', () => {
  let component: LoteBorderComponent;
  let fixture: ComponentFixture<LoteBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteBorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
