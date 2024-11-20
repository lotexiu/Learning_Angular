import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsTemplateComponent } from './buttons-template.component';

describe('ButtonsTemplateComponent', () => {
  let component: ButtonsTemplateComponent;
  let fixture: ComponentFixture<ButtonsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
