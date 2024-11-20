import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteInputComponent } from './lote-input.component';

describe('LoteInputComponent', () => {
  let component: LoteInputComponent;
  let fixture: ComponentFixture<LoteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
