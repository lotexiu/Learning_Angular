import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { componentImports } from './imports/import';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ...componentImports,
  ]

})
export class AppComponent implements OnInit {
  darkTheme: boolean = true

  constructor(private meta: Meta) { }

  ngOnInit(): void {
    document.body.classList.add('mat-app-background', 'mat-typography')
    this.meta.addTag({ name: 'theme-color', content: '' })
    this.meta.addTag({ name: 'color-scheme', content: '' })
    this.setTheme()
  }

  switchTheme() {
    this.darkTheme = !this.darkTheme
    this.setTheme()
  }

  private setTheme() {
    if (this.darkTheme) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
    let hex = this.darkTheme ? '#000000' : '#ffffff'
    let theme = this.darkTheme ? 'dark' : 'light'
    this.meta.updateTag({ name: 'theme-color', content: hex });
    this.meta.updateTag({ name: 'color-scheme', content: theme });
  }

  title = 'Something About Poyo';
}
