import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteBoxComponent } from './lote-box.component';

describe('LoteBoxComponent', () => {
  let component: LoteBoxComponent;
  let fixture: ComponentFixture<LoteBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
