import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { componentImports } from '../utils/imports/import';
import { themeUtils } from '../utils/theme-utils';

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
  theme!: string
  value!: boolean
  ngModel: any;

  constructor(private meta: Meta) { }

  ngOnInit(): void {
    document.body.classList.add('mat-app-background', 'mat-typography')

    themeUtils.initTheme()
    this.theme = themeUtils.getCurrentTheme()
    if (this.theme == 'dark') {
      this.value = true
    }
    setTimeout(()=>this.ngModel=1, 2000)
  }

  switchTheme() {
    this.theme = this.value ? 'dark' : 'light'
    themeUtils.setTheme(this.theme)
  }

  title = 'Something About Poyo';
}
