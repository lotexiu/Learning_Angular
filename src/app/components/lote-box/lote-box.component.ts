import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { componentBaseImports } from '../components-import';
import { iconsName } from '../../icons/svg/svg-icons';
import { InputFields, LockType } from '../../interfaces/interfaces';
import { componentUtils } from '../../utils/utils';

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
  @Input() title?: string;
  @Input() allowMinimize: boolean = true;
  @Input() minimized: boolean = false;
  
  closeIcon?: iconsName;
  statusContent?: Status;
  statusBox?: Status;
  delay: number = 300;
  
  ngOnInit(): void {
    this.closeIcon = this.getIcon()
    this.statusContent = this.getStatus()
    this.statusBox = this.getStatus()
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["minimized"]){
      this.updateStatus()
    }
  }

  random() {
    this.title = componentUtils.generateUniqueId()
  }
  
  public switchMinimization(): void {
    this.minimized = !this.minimized
    this.updateStatus()
  }
  
  public getIcon(): iconsName {
    return this.minimized ? 'eye' : 'eyeSlash'
  }

  private getStatus(){
    return this.minimized ? 'hide' : 'show'
  }
  
  public updateStatus(): void {
    this.statusContent = this.getStatus()
    setTimeout(() => {
      this.statusBox = this.getStatus()
    }, this.minimized ? 0 : this.delay);
  }
}
