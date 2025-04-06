// app.component.ts
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-container">
      <div class="scroll-controls">
        <button (click)="scrollUp()" [disabled]="scrollPosition <= 0">↑</button>
        <div class="scroll-track">
          <div 
            class="scroll-thumb" 
            [style.height.px]="thumbHeight" 
            [style.top.px]="thumbPosition"
            (mousedown)="startDrag($event)"
          ></div>
        </div>
        <button (click)="scrollDown()" [disabled]="scrollPosition >= maxScroll">↓</button>
      </div>
      
      <div #viewportRef class="viewport">
        <div 
          #contentRef 
          class="content" 
          [style.transform]="'translateY(' + (-scrollPosition) + 'px)'">
          <!-- Conteúdo com elementos filhos que podem estar fora do pai -->
          <div class="item" *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]">
            <div class="item-content">Item {{i}}</div>
            <!-- Elemento filho que ultrapassa os limites do pai -->
            <div class="overflow-child" *ngIf="i % 3 === 0">
              Elemento filho que se estende além do pai
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .scroll-container {
      display: flex;
      height: 400px;
      position: relative;
      border: 1px solid #ccc;
      margin: 20px;
    }

    .scroll-controls {
      display: flex;
      flex-direction: column;
      width: 30px;
      background: #f0f0f0;
      align-items: center;
    }

    button {
      width: 100%;
      height: 30px;
      cursor: pointer;
      border: none;
      background: #ddd;
    }

    button:hover:not([disabled]) {
      background: #ccc;
    }

    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .scroll-track {
      flex: 1;
      width: 20px;
      background: #e0e0e0;
      position: relative;
      margin: 5px 0;
    }

    .scroll-thumb {
      width: 100%;
      background: #999;
      position: absolute;
      border-radius: 3px;
      cursor: pointer;
    }

    .viewport {
      flex: 1;
      position: relative;
      overflow: hidden;  /* Importante: esconde o conteúdo mas permite que elementos filhos apareçam */
    }

    .content {
      position: absolute;
      width: 100%;
      will-change: transform;
    }

    .item {
      height: 80px;
      margin: 10px;
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      position: relative;
    }

    .overflow-child {
      position: absolute;
      right: -50px;
      top: 0;
      width: 150px;
      height: 100%;
      background: rgba(255, 0, 0, 0.2);
      padding: 10px;
      border: 1px dashed red;
      z-index: 10;
    }
  `]
})
export class AppComponent {
  @ViewChild('contentRef') contentRef!: ElementRef;
  @ViewChild('viewportRef') viewportRef!: ElementRef;

  scrollPosition = 0;
  maxScroll = 0;
  thumbHeight = 30;
  thumbPosition = 0;
  scrollStep = 50;
  isDragging = false;
  dragStartY = 0;
  dragStartScroll = 0;
  
  ngAfterViewInit() {
    this.updateScrollMetrics();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollMetrics();
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    
    event.preventDefault();
    const deltaY = event.clientY - this.dragStartY;
    const trackHeight = this.getTrackHeight();
    const scrollRatio = deltaY / trackHeight;
    const scrollAmount = scrollRatio * this.maxScroll;
    
    this.setScrollPosition(this.dragStartScroll + scrollAmount);
  }

  updateScrollMetrics() {
    if (!this.contentRef || !this.viewportRef) return;
    
    const contentHeight = this.contentRef.nativeElement.offsetHeight;
    const viewportHeight = this.viewportRef.nativeElement.offsetHeight;
    
    this.maxScroll = Math.max(0, contentHeight - viewportHeight);
    
    // Calculate thumb size based on viewport/content ratio
    const trackHeight = this.getTrackHeight();
    this.thumbHeight = Math.max(30, (viewportHeight / contentHeight) * trackHeight);
    
    this.updateThumbPosition();
  }

  getTrackHeight() {
    // Altura do track (menos os botões)
    return this.viewportRef.nativeElement.offsetHeight - 60;
  }

  scrollUp() {
    this.setScrollPosition(this.scrollPosition - this.scrollStep);
  }

  scrollDown() {
    this.setScrollPosition(this.scrollPosition + this.scrollStep);
  }

  setScrollPosition(position: number) {
    // Limita a posição dentro dos limites
    this.scrollPosition = Math.max(0, Math.min(this.maxScroll, position));
    this.updateThumbPosition();
  }

  updateThumbPosition() {
    if (this.maxScroll === 0) {
      this.thumbPosition = 0;
      return;
    }
    
    const trackHeight = this.getTrackHeight();
    const availableTrackHeight = trackHeight - this.thumbHeight;
    this.thumbPosition = (this.scrollPosition / this.maxScroll) * availableTrackHeight;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.dragStartY = event.clientY;
    this.dragStartScroll = this.scrollPosition;
    event.preventDefault();
  }
}