import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoteBoxComponent } from './components/lote-box/lote-box.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      CommonModule, 
      RouterOutlet,
      LoteBoxComponent
    ]

})
export class AppComponent {
  title = 'Learning_Angular';
}
