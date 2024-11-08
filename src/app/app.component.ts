import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { componentImports } from './imports/import';
import { Meta } from '@angular/platform-browser';
import { themeUtils } from './utils/theme-utils';

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
    // setTimeout(()=>{
      document.body.classList.add('mat-app-background', 'mat-typography')
      // this.meta.addTag({ name: 'theme-color', content: '' })
      // this.meta.addTag({ name: 'color-scheme', content: '' })

      themeUtils.initTheme()
      this.theme = themeUtils.getCurrentTheme()
      if (this.theme == 'dark') {
        this.value = true
      }
    // })
    setTimeout(()=>this.ngModel=1, 2000)
  }

  switchTheme() {
    themeUtils.setTheme(this.value ? 'dark' : 'light')
    // this.darkTheme = !this.darkTheme
    // this.setTheme()
  }

  private setTheme() {
    // if (this.darkTheme) {
    //   document.body.classList.add('dark')
    //   document.body.classList.remove('light')
    // } else {
    //   document.body.classList.add('light')
    //   document.body.classList.remove('dark')
    // }
  }

  title = 'Something About Poyo';
}
