import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from "@angular/forms";
import { LoteInputComponent } from "../../app/components/lote/input/lote-input/lote-input.component";
import { LoteBorderComponent } from "../../app/components/lote/border/lote-border/lote-border.component";
import { LoteListComponent } from "../../app/components/lote/list/lote-list/lote-list.component";
import { LoteModalComponent } from "../../app/components/lote/modal/lote-modal/lote-modal.component";
import { ClickDirective } from "src/app/directives/click/click.directive";
import { MaskDirective } from "src/app/directives/mask/mask.directive";

const basicImports = [
  CommonModule,
  FormsModule,
]

const directiveImports = [
  ClickDirective,
  MaskDirective,
]

const componentBaseImports = [
  ...basicImports,
  // ...directiveImports,
]

const componentImports = [
  LoteBorderComponent,
  LoteInputComponent,
  LoteListComponent,
  LoteModalComponent,
  // LoteBorderComponent,
  // LoteInputComponent,
]

export { 
  componentBaseImports,
  componentImports,
  directiveImports,
};

