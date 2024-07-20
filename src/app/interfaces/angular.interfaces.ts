import { OnInit, AfterViewInit, OnChanges, OnDestroy } from "@angular/core"

type DefaultImplements = 
  OnInit & 
  OnDestroy &
  OnChanges &
  AfterViewInit

export {
  DefaultImplements
}