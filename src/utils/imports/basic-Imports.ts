import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatImports } from "./mat-imports";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SGCListComponent } from "src/app/components/sgcloud/list/sgc-list/sgc-list.component";
import { SGCButtonComponent } from "src/app/components/sgcloud/button/sgc-button/sgc-button.component";
import { SGCInputComponent } from "src/app/components/sgcloud/input/sgc-input/sgc-input.component";
import { SGCNotificationComponent } from "src/app/components/sgcloud/notification/sgc-notification/sgc-notification.component";
import { SGCSelectComponent } from "src/app/components/sgcloud/select/sgc-select/sgc-select.component";
import { MaskDirective } from "src/app/directives/mask/mask.directive";
import { ErrorDirective } from "src/app/directives/error/error.directive";
import { ClickDirective } from "src/app/directives/click/click.directive";
import { SGCCheckBoxComponent } from "src/app/components/sgcloud/checkbox/sgc-checkbox/sgc-checkbox.component";
import { ScrollDirective } from "src/app/directives/scroll/scroll.directive";
import { SGCSwitchComponent } from "src/app/components/sgcloud/switch/sgc-switch/sgc-switch.component";
import { SGCProgressBarComponent } from "src/app/components/sgcloud/progress-indicator/sgc-progress-bar/sgc-progress-bar.component";
import { HttpClientModule } from "@angular/common/http";
import { SGCSideMenuComponent } from "src/app/components/sgcloud/side-menu/sgc-side-menu/sgc-side-menu.component";
import { BrowserModule } from "@angular/platform-browser";

const basicImports = [
  RouterOutlet,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ...MatImports,
]

const directiveImports = [
  ClickDirective,
  MaskDirective,
  ErrorDirective,
  ScrollDirective,
]

const sgcloudImports = [
  SGCButtonComponent,
  SGCInputComponent,
  SGCSelectComponent,
  SGCListComponent,
  SGCNotificationComponent,
  SGCCheckBoxComponent,
  SGCSwitchComponent,
  SGCProgressBarComponent,
  SGCSideMenuComponent,
]

const componentImports = [
  ...sgcloudImports
]

export {
  basicImports,
  componentImports,
  directiveImports,
  sgcloudImports
};

