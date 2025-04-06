import { SimpleChanges } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"

type IModal<R=any, T=any> = MatDialogRef<T, R>

type INGOnChanges = (changes: SimpleChanges) => void

export {
  IModal as Modal,
  INGOnChanges as NGOnChanges
}