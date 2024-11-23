import { Injectable, ComponentRef, Type } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoteModalComponent } from './lote-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LoteModalService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  open<T>(component: Type<T>, data?: any): ComponentRef<LoteModalComponent> {
    this.overlayRef = this.overlay.create({
      hasBackdrop: false, // Alterado de true para false
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    const portal = new ComponentPortal(LoteModalComponent);
    const componentRef = this.overlayRef.attach(portal);

    // Adiciona estilos diretamente ao overlay
    const overlayElement = this.overlayRef.overlayElement;
    overlayElement.style.position = 'fixed';
    overlayElement.style.height = '100%';
    overlayElement.style.width = '100%';

    componentRef.instance.childComponent = component;
    componentRef.instance.data = data;
    componentRef.instance.overlayRef = this.overlayRef;

    return componentRef;
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
