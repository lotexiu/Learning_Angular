import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, Type, AfterViewInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { LoteFiltersComponent } from '../../svg/filters/lote-filters/lote-filters.component';
import { componentBaseImports } from 'src/utils/typescript/imports/import';

@Component({
  selector: 'app-lote-modal',
  imports: [
    ...componentBaseImports,
    LoteFiltersComponent
  ],
  templateUrl: './lote-modal.component.html',
  styleUrl: './lote-modal.component.scss'
})
export class LoteModalComponent implements AfterViewInit {
  @Input() data: any;
  @Input() childComponent!: Type<any>;
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent?: ViewContainerRef;
  
  overlayRef: OverlayRef | null = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    if (this.childComponent) {
      const componentRef = this.modalContent?.createComponent(this.childComponent);
      if (componentRef) {
        Object.assign(componentRef.instance, this.data);
      }
    }
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
