import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatImports } from "./mat-imports";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

const basicImports = [
  RouterOutlet,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ...MatImports,
]

export {
  basicImports,
};

