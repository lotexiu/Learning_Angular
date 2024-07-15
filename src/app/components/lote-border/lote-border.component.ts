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

  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() title: string = '';

  @Output() radiusChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() radius: number = 2;

  public id: string = ComponentUtils.generateUniqueId()

  private opening: number = 0;
  private spacing: number = 5;
  private frameElement!: HTMLElement;
  private parentElement!: HTMLElement;
  private titleBoxElement!: HTMLElement;
  private contentElement!: HTMLElement;
  watchMain!: MutationObserver;
  
  private viewUpdating: boolean = false

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>
  ) { }


  ngAfterViewInit(): void {
    let mainElement: HTMLElement = this.el.nativeElement
    this.parentElement = mainElement.querySelector(`#parent-effect`)!
    this.frameElement = mainElement.querySelector(`#frame`)!
    this.titleBoxElement = mainElement.querySelector(`#title-box`)!
    this.contentElement = mainElement.querySelector(`#content`)!
    this.updateView()
    this.watchMain.observe(mainElement, {attributes: true, subtree: true, childList:true, characterData: true})

    setTimeout(()=>{
      this.title = 'Gengar'
      this.updateView()
      setTimeout(()=>{
        this.title = 'Reimu And Sakuya'
        this.updateView()
      },1000)      
    },1000)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateView()
  }

  ngOnInit(): void {
    this.watchMain = new MutationObserver(mutations =>{
      this.updateView()
    })
  }

  @HostListener('window:resize', ['$event'])  
  private onResize(): void{
    setTimeout(()=>{
      this.renderer.setStyle(
        this.parentElement,
        'filter',
        'none'
      )      
      this.updateView()
      setTimeout((): void=>{
        this.renderer.setStyle(
          this.parentElement,
          'filter',
          `url(#goo)`
        )
      },1)
    },1)
  }

  private updateView(): void{
    if (!this.viewUpdating) {
      this.viewUpdating = true
      setTimeout(()=>{   
        this.updateTitle()
        this.updateContent()
        this.updateFrame()
        this.renderer.setStyle(
          this.el.nativeElement.firstElementChild,
          'marginTop',
          `${Math.max(this.titleBoxElement.offsetHeight/2, 12)}px`
        )             
        setTimeout(()=>{
          this.viewUpdating = false
        },1)
      },1)
    }
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
    const titleSpacing: number = this.title.length > 0 ? this.spacing : 0
    if (this.titleBoxElement){
      this.renderer.setStyle(
        this.titleBoxElement,
        'marginLeft',
        `${this.width+titleSpacing}px`
      )
      this.renderer.setStyle(
        this.titleBoxElement,
        'transform',
        `translateY(calc(-55% + ${this.width/2}px))`
      )
      this.renderer.setStyle(
        this.titleBoxElement,
        'maxWidth',
        `${this.el.nativeElement.offsetWidth-(this.width*2)-(this.spacing*2)}px`
      )
    }
  }

  private updateFrame() {
    if (this.frameElement) {
      let frameWidth: number = this.frameElement.offsetWidth
      this.opening = this.titleBoxElement.offsetWidth + this.width + frameWidth
      this.opening += this.title.length > 0 ? this.spacing*2 : 0 
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
