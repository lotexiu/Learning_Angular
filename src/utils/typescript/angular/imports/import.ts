import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatImports } from "./mat-imports";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

const basicImports = [
  RouterOutlet,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // HttpClientModule, DEPRECATED version: 17 or lower
  ...MatImports,
]

export {
  basicImports,
};

