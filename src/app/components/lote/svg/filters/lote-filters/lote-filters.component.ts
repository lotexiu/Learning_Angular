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
  selector: 'lote-filters',
  standalone: true,
  templateUrl: './lote-filters.component.html',
  styleUrl: './lote-filters.component.scss'
})
export class LoteFiltersComponent implements OnInit, OnDestroy {  
  private transitions: Transitions = {};
  public turbulenceBaseFrequency: string = '0.01';
  public waveBaseFrequency: string = '0.05';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Iniciar com um efeito de turbulência animado
  }

  ngOnDestroy() {
    // Limpar todos os intervalos quando o componente for destruído
  }



}
