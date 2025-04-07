import { Component } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { ColorUtils } from 'src/utils/typescript/extras/color/color-utils';
import { MathUtils } from 'src/utils/typescript/natives/math/math-utils';
import { ObjectUtils } from 'src/utils/typescript/natives/object/object-utils';
import { LoteFiltersComponent } from './components/lote/svg/filters/lote-filters/lote-filters.component';
import { basicImports } from '@ts-angular/imports/import';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ...basicImports,
    LoteFiltersComponent,
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
  // private modalService: LoteModalService,
  ) {

  }

  ngOnInit(): void {
    ColorUtils
    ObjectUtils
    MathUtils
  }
}
