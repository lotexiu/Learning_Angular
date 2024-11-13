import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { componentImports } from '../utils/imports/import';
import { themeUtils } from '../utils/theme-utils';
import { lambda } from '../utils/component-utils';
import { Nullable } from '../utils/interfaces/interfaces';
import { _Route } from '../utils/route/route';
import { RouteUtils } from '../utils/route/route-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ...componentImports,
  ],
  // schemas:[
  //   NO_ERRORS_SCHEMA,
  // ]

})
export class AppComponent implements OnInit {
  public currentRoute!: RoutesRecognized
  public title: string = 'Main'
  theme!: string
  value!: boolean
  // ngModel: any;

  constructor(
    private router: Router,
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
