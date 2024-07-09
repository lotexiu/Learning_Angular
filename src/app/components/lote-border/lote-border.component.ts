import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EventEmitter, Input, NO_ERRORS_SCHEMA, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lote-border',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lote-border.component.html',
  styleUrl: './lote-border.component.scss',
})
export class LoteBorderComponent implements OnInit, OnChanges {
  
  @Output() widthChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() width: number = 5;

  private opening: number = 0;
  private frame!: HTMLElement;
  
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["width"]){
      this.updateFrame()
    }
  }
  
  ngOnInit(): void {
    let mainElement: Element = this.el.nativeElement
    this.frame = mainElement.querySelector("#frame")!
    this.updateFrame()
    }
    
    updateFrame(){
      this.renderer.setStyle(this.frame, 
        'clipPath',
        `polygon(
          calc(${this.opening+this.width+100}px - 100%) 0, 
          calc(${this.opening+this.width+100}px - 100%) calc(${this.width}px), 
          calc(100% - ${this.width}px) calc(${this.width}px), 
          calc(100% - ${this.width}px) calc(100% - ${this.width}px), 
          calc(${this.width}px) calc(100% - ${this.width}px), 
          calc(${this.width}px) 0, 
        0 0, 
        0 100%, 
        100% 100%, 
        100% 0)`
    )
  }

  // getWidth(){
  //   return this.frame.offsetHeight
  // }
}
