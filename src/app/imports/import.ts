import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoteInputComponent } from "../components/lote-input/lote-input.component";
import { ClickDirective } from "../directives/click/click.directive";
import { IconDirective } from "../directives/icon/icon.directive";
import { LoteError } from "../directives/lote-error/lote-error.directive";
import { WritterAnimationDirective } from "../directives/writter-animation/writter-animation.directive";
import { LoteBorderComponent } from "../components/lote-border/lote-border.component";
import { FormsModule } from "@angular/forms";
import { LoteMaskDirective } from "../directives/lote-mask/lote-mask.directive";

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

