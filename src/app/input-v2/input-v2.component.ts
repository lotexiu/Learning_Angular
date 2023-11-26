import { Component, Input, OnChanges, OnInit, SimpleChanges, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { InputUtils } from './utils';

@Component({
    selector: 'input-v2',
    standalone: true,
    templateUrl: './input-v2.component.html',
    styleUrl: './input-v2.component.scss',
    imports: [
      CommonModule,
      FormsModule,
      NgxMaskDirective,
      NgxMaskPipe,
      InputUtils
    ],
    providers: [provideNgxMask()]
})
export class InputV2Component implements OnInit, OnChanges{
  
  @Input() drawPathIcon = "";
  @Input() title = "";
  @Input() mask = "";
  @Input() type = "text";
  @Input() ngModel:any = "";
  @Input() debounceTime: number|null = null;
  @Input() decimals = "2";
  @Input({transform:booleanAttribute}) allowNegative = false;
  @Input({transform:booleanAttribute}) require = false;
  @Input({transform:booleanAttribute}) optional = false;
  @Input({transform:booleanAttribute}) error = false;
  @Input() errorMessage = ""
  errorMessageView = "";
  genericError = false;
  ngModelMask:any = ""
  errorStatus = ""
  previousAllowNegative = this.allowNegative

  onchange = new Subject<string>();
  utils = new InputUtils()
  constructor(){
    this.onchange
    .pipe(debounceTime(300)) // valor de debounceTime (tempo que deve esperar apos a acao do usuario no input)
    .subscribe(() => {
      this.doOnChange();
    });
  }

  ngOnInit(): void { // excutado apenas uma vez na chamada do componente. <input-v2>
    this.type = this.type.toLowerCase()
    this.updateStatus()
    this.setDrawPathIcon()
  }

  ngOnChanges(changes: SimpleChanges): void { // executado a cada mudança externa em @inputs
    this.onchange
    .pipe(debounceTime(this.getDebounceTime())) // valor de debounceTime (tempo que deve esperar apos a acao do usuario no input)
    .subscribe(() => {
      this.doOnChange();
    });

    this.type = this.type.toLowerCase()
    
    if(this.type == "phone"){
      this.previousAllowNegative = this.allowNegative
      this.allowNegative=false
    }else{
      this.allowNegative = this.previousAllowNegative
    }
  }


  updateStatus() {
    if(this.error && this.errorMessage != '' && !this.genericError){
      this.setErrorStatus(this.errorMessage)
    }
    else if(this.ngModel == ""){
      this.require ? this.setErrorStatus('error', "Campo em Branco") : 
      this.optional ? this.setErrorStatus('warn', `${this.title} (Opcional)`) :
      this.setErrorStatus()
    }
    else if(this.type == "cpf"){
      this.setErrorStatus(
        !this.utils.isValidCPF(this.ngModelMask), "CPF"
      )
    }
    else if(this.type == "cnpj"){
      this.setErrorStatus(
        !this.utils.isValidCNPJ(this.ngModelMask), "CNPJ"
      )
    }
    else if(this.type == "email"){
      this.setErrorStatus(
        !this.utils.isValidEmail(this.ngModelMask), "Email"
      )
    }
    else{
      this.setErrorStatus()
    }
  }

  doOnChange() {
    switch(this.type){
      case "percent":
        this.ngModel = this.ngModelMask/100
        break
      case "phone":
        this.ngModel = this.utils.onlyDigits(this.ngModelMask)
        break
      case "cpf":
        this.ngModel = this.utils.onlyDigits(this.ngModelMask)
        break
      case "cnpj":
        this.ngModel = this.utils.onlyDigits(this.ngModelMask)
        break
      default:
        this.ngModel = this.ngModelMask
        break
    }
    this.updateStatus()
  }

  getDebounceTime(){
    let minDebouce = this.debounceTime && this.debounceTime == 0 ? 100 : this.debounceTime
    return(
      minDebouce ? minDebouce :
      300
    )
  }

  getMask(): string {
    switch(this.type){
      case "cpf":
        return "CPF_CNPJ";
      case "cnpj":
        return "CPF_CNPJ";
      case "time":
        return "Hh:m0:s0"
      case "date":
        return "d0/M0/0000"
      case "ip":
        return "IP"
      case "phone":
        return  '0000-0000||(00) 0000-0000||(00) 00000-0000||+00 (00) 0000-0000||+00 (00) 00000-0000'
      case "number":
        return `separator.${this.decimals}`;
      case "percent":
        return `separator.${this.decimals}`;
      case "money":
        return `separator.${this.decimals}`;
      default:
        return this.mask;
    }
  }

  setErrorStatus(error:any=null, message=""){
    if(error == null){
      this.errorStatus = ""
      this.errorMessageView = ""
    }
    else if(typeof error == "string" && this.error == true){
      this.errorStatus = "error"
      this.errorMessageView = error
    }else{
      this.genericError = error
      this.error = error
      this.errorStatus = error ? "error" : "success"
      this.errorMessageView = error ? `${message} inválido` : `${message} válido`
    }
  }

  setDrawPathIcon() {
    if(this.drawPathIcon == ''){
      this.drawPathIcon = this.utils.uploadIconPath
      }
  }
}
