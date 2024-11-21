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
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const portal = new ComponentPortal(LoteModalComponent);
    const componentRef = this.overlayRef.attach(portal);
    
    componentRef.instance.childComponent = component;
    componentRef.instance.data = data;
    componentRef.instance.overlayRef = this.overlayRef;

    return componentRef;
  }
}
