import { Component } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { componentBaseImports, componentImports } from '../utils/imports/import';
import { LoteModalService } from './components/lote/modal/lote-modal/lote-modal.service';
import { LoteFiltersComponent } from './components/lote/svg/filters/lote-filters/lote-filters.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ...componentBaseImports,
    ...componentImports,
    LoteFiltersComponent
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

  }
}
