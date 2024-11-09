import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from "@angular/forms";
import { IconDirective } from "../../app/directives/icon/icon.directive";
import { ClickDirective } from "../../app/directives/click/click.directive";
import { WritterAnimationDirective } from "../../app/directives/writter-animation/writter-animation.directive";
import { LoteMaskDirective } from "../../app/directives/lote-mask/lote-mask.directive";
import { LoteError } from "../../app/directives/lote-error/lote-error.directive";
import { LoteBorderComponent } from "../../app/components/lote-border/lote-border.component";
import { LoteInputComponent } from "../../app/components/lote-input/lote-input.component";

const componentBaseImports = [
  MatButtonModule, // Uso de componentes do angular
  MatIconModule, // Uso de componentes do angular
  MatDividerModule, // Uso de componentes do angular
  MatSlideToggleModule, // Uso de componentes do angular
  CommonModule, // Basico para criação do componente
  FormsModule, // Utilização de parametros,validações e funções de formulario (ngmodel) 
  MatTooltipModule,
  IconDirective,
  ClickDirective,
  WritterAnimationDirective,
  LoteMaskDirective,
  LoteError,
]

const componentImports = [
  ...componentBaseImports,
  LoteBorderComponent,
  LoteInputComponent,
]

const otherImports = [
  null
]

export { componentBaseImports, componentImports, otherImports };

