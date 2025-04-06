import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

const MatImports: any[] = [ 
  /* Form */
  MatFormFieldModule, 
  /* Extra */
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressBarModule,
  /* Input/Select/Button */
  MatInputModule, 
  MatSelectModule,
  MatButtonModule, 
  /* List */
  MatTableModule, 
  MatPaginatorModule,
  MatSortModule, 
  MatSlideToggleModule,
  /* DatePicker */
  MatDatepickerModule,
  /* ToolTip */
  MatTooltip,
  /* Modal */
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
]

export {
  MatImports
};
