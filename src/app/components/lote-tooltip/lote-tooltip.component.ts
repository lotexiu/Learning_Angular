import { Component, SimpleChanges } from '@angular/core';
import { DefaultImplements } from '../../interfaces/angular.interfaces';

@Component({
  selector: 'lote-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './lote-tooltip.component.html',
  styleUrl: './lote-tooltip.component.scss'
})
export class LoteTooltipComponent implements DefaultImplements{  
  text: string = 'tooltip text';
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngAfterViewInit(): void {
    
  }
}
