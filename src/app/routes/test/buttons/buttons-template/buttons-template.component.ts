import { Component } from '@angular/core';
import { componentImports } from '../../../../../utils/imports/import';

@Component({
  selector: 'app-buttons-template',
  imports: [
    ...componentImports,
  ],
  templateUrl: './buttons-template.component.html',
  styleUrl: './buttons-template.component.scss'
})
export class ButtonsTemplateComponent {

}
