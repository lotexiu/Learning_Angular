import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isNull } from 'src/utils/easy-use';

interface Transition {
  value: number;
  direction: number;
  interval: any;
}
interface Transitions {
  [key: string]: Transition;
}

@Component({
  selector: 'app-lote-filters',
  standalone: true,
  templateUrl: './lote-filters.component.html',
  styleUrl: './lote-filters.component.scss'
})
export class LoteFiltersComponent implements OnInit, OnDestroy {  
  private transitions: Transitions = {};
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  transition(id: string, min: number, max: number, interval: number, setps: number): number {
    if(isNull(this.transitions[id])){
      this.transitions[id] = {
        value: min,
        direction: setps,
        interval: setInterval((): void => {
          let objSelf: Transition = this.transitions[id];

          if(objSelf.value >= max){
            objSelf.direction = -setps;      
            objSelf.value = max;
          }
          if (objSelf.value <= min){
            objSelf.direction = setps;
            objSelf.value = min;
          }
          objSelf.value += objSelf.direction;

        }, interval)
      }

      return min;
    } else {
      return this.transitions[id].value;
    }
  }
}
