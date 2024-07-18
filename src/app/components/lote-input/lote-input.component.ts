import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { componentImports } from '../../imports/import';
import { LoteBorderComponent } from '../lote-border/lote-border.component';
import { InputTypes } from './interfaces/input-types.interface';

@Component({
  selector: 'lote-input',
  standalone: true,
  imports: [
    ...componentImports,
    LoteBorderComponent,
  ],
  templateUrl: './lote-input.component.html',
  styleUrl: './lote-input.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoteInputComponent implements OnInit {
  @Input() title = "test";
  @Input() type: InputTypes = "text";
  @Input() ngModel: any = "";



  private ngOnInit(): void {

  }


  public getInputType(): string {
    // switch (this.type)
  }

  public getMask(): string {
    switch (this.type) {
      case 'number':
      case 'email':
      case 'phone':
      case 'cpf':
      case 'cnpj':
      case 'ip':
      case 'password':
      case 'pass':
      case 'time':
      case 'date':
      case 'datetime':
      case 'percent':
      case 'money':
      case 'color':
      case 'slider':
      case 'checkbox':
      case 'file':
      case 'image':
      case 'text':
    }
  }

  public getInputData(){
    let data = {}

    if (!['image','file','checkbox','slider','color'].includes(this.type)){
      
    }


    if ([''].includes(this.type)){
      
    }
    if ([''].includes(this.type)){
      
    }
    if ([''].includes(this.type)){
      
    }
  }
  
}