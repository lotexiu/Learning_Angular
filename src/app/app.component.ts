import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputV2Component } from "./input-v2/input-v2.component";
import { BoxComponent } from "./box/box.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      CommonModule, 
      RouterOutlet, 
      InputV2Component, 
      BoxComponent]

})
export class AppComponent {
  title = 'Learning_Angular';
}
