import { SimpleChanges } from "@angular/core"
import { MatDialogRef } from "@angular/material/dialog"

type Modal<R=any, T=any> = MatDialogRef<T, R>

type NGOnChanges = (changes: SimpleChanges) => void

export {
  Modal,
  NGOnChanges
}