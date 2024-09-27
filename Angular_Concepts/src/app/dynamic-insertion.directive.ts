import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicInsertion]',
  standalone: true
})
export class DynamicInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
