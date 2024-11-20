import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteTemplateComponent } from './lote-template.component';

describe('LoteTemplateComponent', () => {
  let component: LoteTemplateComponent;
  let fixture: ComponentFixture<LoteTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
