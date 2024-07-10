import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EventEmitter, HostListener, Input, NO_ERRORS_SCHEMA, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentUtils } from '../../utils/utils';
import { componentBaseImports } from '../../imports/import';

@Component({
  selector: 'lote-border',
  standalone: true,
  imports: [...componentBaseImports],
  templateUrl: './lote-border.component.html',
  styleUrl: './lote-border.component.scss',
})
export class LoteBorderComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() widthChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() width: number = 5;

  @Output() titleChange = new EventEmitter<string>();
  @Input() title: string = 'My Title';

  public id: string = ComponentUtils.generateUniqueId()

  private opening: number = 0;
  private spacing: number = 5;
  private frameElement!: HTMLElement;
  private titleElement!: HTMLElement;
  private contentElement!: HTMLElement;
  observer!: MutationObserver;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }


  ngAfterViewInit(): void {
    let mainElement: HTMLElement = this.el.nativeElement
    this.observer.observe(mainElement, {attributes: true, subtree: true})

    this.frameElement = mainElement.querySelector(`#frame`)!
    this.titleElement = mainElement.querySelector(`#title-box`)!
    this.contentElement = mainElement.querySelector(`#content`)!
    this.updateView()
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["width"]) {
      this.updateView()
    }
  }

  ngOnInit(): void {
    this.observer = new MutationObserver(mutations =>{
      this.updateView()
    })
  }

  @HostListener('window:resize', ['$event'])  
  private onResize(): void{
    this.setTransition(`none`)
    this.updateView()
    setTimeout((): void=>{
      this.setTransition(`all 500ms`)
    })
  }

  private setTransition(value: string): void{
    this.renderer.setStyle(
      this.frameElement,
      'transition',
      value
    )   
  }

  private updateView(): void{
    this.updateTitle()
    this.updateFrame()
    this.updateContent()
  }

  private updateContent(){
    if(this.contentElement){
      this.renderer.setStyle(
        this.contentElement,
        'padding',
        `${this.width+this.spacing}px`
      )
    }
  }

  private updateTitle(): void{
    if (this.titleElement){
      this.renderer.setStyle(
        this.titleElement,
        'marginLeft',
        `${this.width+this.spacing}px`
      )
      this.renderer.setStyle(
        this.titleElement,
        'transform',
        `translateY(calc(-55% + ${this.width/2}px))`
      )
    }
  }

  private updateFrame() {
    if (this.frameElement) {
      let frameWidth: number = this.frameElement.offsetWidth
      this.opening = this.titleElement.offsetWidth
      this.opening += this.spacing*2 + this.width + frameWidth
      this.renderer.setStyle(
        this.frameElement,
        'clipPath',
        `polygon(
            calc(${this.opening}px - 100%) 0, 
            calc(${this.opening}px - 100%) calc(${this.width}px), 
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
  }
}
