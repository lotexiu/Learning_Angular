import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { mathRandom } from '@ts-natives/math/math-utils';
import { SVG } from '@ts-utils/html/svg/models/svg';

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

  counter: number = 0
  transition: string[] = []

  
  ngOnInit() {
    const svg: SVG = new SVG({
      tickInterval: 100, /* TODO tentar atualizar TS ou alguma lib para resolver problema de atualizar variaveis */
    })
    console.log(svg)
  }

  ngOnDestroy() {
  }

  test() {
    const a = setInterval(()=>{
      this.transition[0] = `${mathRandom(0.2, 0.8)}`
      this.transition[1] = `${mathRandom(0.2, 0.8)}`
      this.transition[2] = `${mathRandom(0.2, 0.8)}`
      // this.transition = MathUtils.transition(this.counter['/'](5), 4).join(" ")
      // if (this.counter == 5) {
      //   this.counter = 1
      // } else {
      //   this.counter += 1
      // }
    }, 100)
  }



}
