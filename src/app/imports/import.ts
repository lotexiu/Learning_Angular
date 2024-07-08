import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoteBoxComponent } from "../components/lote-box/lote-box.component";
import { LoteInputComponent } from "../components/lote-input/lote-input.component";
import { ClickDirective } from "../directives/click/click.directive";
import { IconDirective } from "../directives/icon/icon.directive";
import { ObserveDirective } from "../directives/observe/observe.directive";
import { WritterAnimationDirective } from "../directives/writter-animation/writter-animation.directive";
import { LoteBorderComponent } from "../components/lote-border/lote-border.component";

const componentBaseImports = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatSlideToggleModule,
  IconDirective,
  ClickDirective,
  WritterAnimationDirective,
  ObserveDirective,
]

const componentImports = [
  ...componentBaseImports,
  LoteBoxComponent,
  LoteInputComponent,
  LoteBorderComponent
]

const otherImports = [
  null
]

export { componentBaseImports, componentImports, otherImports };

