import { Component } from '@angular/core';
import { componentBaseImports } from '../../../../../utils/imports/import';

@Component({
  selector: 'app-buttons-template',
  imports: [
    ...componentBaseImports,
  ],
  templateUrl: './buttons-template.component.html',
  styleUrl: './buttons-template.component.scss'
})
export class ButtonsTemplateComponent {

}
