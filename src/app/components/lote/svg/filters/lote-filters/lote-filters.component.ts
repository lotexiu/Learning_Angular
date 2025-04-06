import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

interface Transition {
  value: number;
  direction: number;
  interval: any;
}
interface Transitions {
  [key: string]: Transition;
}

@Component({
  selector: 'lote-filters',
  standalone: true,
  templateUrl: './lote-filters.component.html',
  styleUrl: './lote-filters.component.scss'
})
export class LoteFiltersComponent implements OnInit, OnDestroy {  
  public turbulenceBaseFrequency: string = '0.01';
  public waveBaseFrequency: string = '0.05';

  constructor(private cdr: ChangeDetectorRef) {}

  private intervalId: number = -1
  counter: number = 0

  
  ngOnInit() {
    const a = setInterval(()=>{
      // console.log(MathUtils)
      // console.log(MathUtils.transition(this.counter['/'](5), 4))
      // const result = MathUtils.transition(this.counter['/'](5), 4)
      
      // console.log(result)

      if (this.counter == 5) {
        this.counter = 0
      } else {
        this.counter += 1
      }
    }, 500)
  }

  ngOnDestroy() {
    // Limpar todos os intervalos quando o componente for destruído
    clearInterval(this.intervalId)
  }



}
