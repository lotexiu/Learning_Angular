import { Component } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { componentBaseImports, componentImports } from '../utils/imports/import';
import { lambda } from '../utils/component-utils';
import { themeUtils } from '../utils/theme-utils';
import { Nullable } from '../utils/interfaces/interfaces';
import { _Route } from '../utils/route/route';
import { RouteUtils } from '../utils/route/route-utils';
import { LoteModalService } from './components/lote/modal/lote-modal/lote-modal.service';
import { LoteInputComponent } from './components/lote/input/lote-input/lote-input.component';
import { RegexUtils } from 'src/utils/regex/regex-utils';
import { MachineLanguages } from 'src/utils/language/machine/constants/machine-special-characters-regex';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ...componentBaseImports,
    ...componentImports,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public currentRoute!: RoutesRecognized
  public title: string = 'Main'
  theme!: string
  value!: boolean

  constructor(
    private router: Router,
  private modalService: LoteModalService,
  ) {

  }

  ngOnInit(): void {
    const {reservedKeys,scopeKeys,indentifiers} = MachineLanguages['typescript']

  }
}
