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
    localStorage['title'] = this.title
    this.router.events.subscribe(lambda(this, 'updateRoute'))

    document.body.classList.add('mat-app-background', 'mat-typography')
    themeUtils.initTheme()
    this.theme = themeUtils.getCurrentTheme()
    if (this.theme == 'dark') {
      this.value = true
    }

    setTimeout(()=>{
      this.modalService.open(
        LoteInputComponent
      )
    },0)
  }
  

  public updateTheme(): void {
    this.theme = this.value ? 'dark' : 'light'
    themeUtils.setTheme(this.theme)
  }

  private updateRoute(value: any): void {
    if (value instanceof RoutesRecognized) {
      this.currentRoute = value
      const route: Nullable<_Route> = RouteUtils.getRoute(value.url)
      if (route) {
        this.title = route.subTitle!
      }
    }
  }
}
