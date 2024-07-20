import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { iconsName } from '../../icons/svg/svg-icons';
import { componentBaseImports } from '../../imports/import';
import { OptionalType, StateElement } from '../../interfaces/interfaces';
import { ComponentUtils } from '../../utils/component-utils';
import { ColorUtils } from '../../utils/color-utils';

type Status = "hide" | "show"

@Component({
  selector: 'lote-box',
  standalone: true,
  imports: [
    ...componentBaseImports,
  ],
  templateUrl: './lote-box.component.html',
  styleUrl: './lote-box.component.scss'
})
export class LoteBoxComponent implements OnInit, OnChanges {
  @Output() titleChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() allowMinimizeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() minimizedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: OptionalType
  @Input() allowMinimize: OptionalType<boolean> = true
  @Input() minimized: OptionalType<boolean> = false

  closeIcon?: iconsName;
  statusContent?: Status;
  statusBox?: Status;
  delay: number = 300;
  id: any = ComponentUtils.generateUniqueId();
  swapBlendMode?: boolean;

  ngOnInit(): void {
    this.closeIcon = this.getIcon()
    this.statusContent = this.getStatus()
    this.statusBox = this.getStatus()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["minimized"]) {
      this.updateStatus()
    }
  }

  changeColor(value: StateElement) {
    if (value.style) {
      let colors = ColorUtils.getRGBAColorFromString(value.style.background)
      this.swapBlendMode = colors.filter((color) => color.isBlack() || color.a == 0).length == colors.length
    }
  }

  random() {
    this.setTitle(ComponentUtils.generateUniqueId())
  }

  public switchMinimization(): void {
    this.setMinimized(!this.minimized)
    this.updateStatus()
  }
  public getIcon(): iconsName {
    return this.minimized ? 'eye' : 'eyeSlash'
  }

  private updateStatus(): void {
    this.statusContent = this.getStatus()
    setTimeout(() => {
      this.statusBox = this.getStatus()
    }, this.minimized ? 0 : this.delay);
  }

  private setTitle(value: OptionalType): void {
    this.title = value
    this.titleChange.emit(value)
  }

  private setAllowMinimize(value: OptionalType<boolean>): void {
    this.allowMinimize = value
    this.allowMinimizeChange.emit(value)
  }

  private setMinimized(value: OptionalType<boolean>): void {
    this.minimized = value
    this.minimizedChange.emit(value)
  }

  private getStatus() {
    return this.minimized ? 'hide' : 'show'
  }

}
