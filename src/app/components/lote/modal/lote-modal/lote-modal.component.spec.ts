import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteModalComponent } from './lote-modal.component';

describe('LoteModalComponent', () => {
  let component: LoteModalComponent;
  let fixture: ComponentFixture<LoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
