import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputV2Component } from './input-v2.component';

describe('InputV2Component', () => {
  let component: InputV2Component;
  let fixture: ComponentFixture<InputV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
