import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


declare global {
  interface Number {
    hasDecimals(): boolean;
    getDecimals(): string;
  }
  interface String {
    toUpperCaseFirstLetter(): string;
  }
}

Number.prototype.hasDecimals = function(): boolean {
  return this.toFixed(0) != this.toString()
}

Number.prototype.getDecimals = function(): string{
  let decimals = this.toString().split('.')[1]
  return decimals || ''
}

String.prototype.toUpperCaseFirstLetter = function(): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
}