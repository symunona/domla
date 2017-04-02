import {Directive, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[ngModel][blurChange]',
})

/**
 * When applied, calls the function provided
 * only if the value changed.
 *
 * Example usage:
 * [blurChange] = "functionToBeCalled"
 *
 * (source of ideas: https://angular-2-training-book.rangle.io/handout/advanced-angular/directives/creating_an_attribute_directive.html)
 *
 */
export class BlurChangeDirective {
  lastFocusedValue: any;

  @Input('blurChange')
  blurChange: Function;

  constructor() { }
  @HostListener('focus', ['$event'])
  saveValue($event){
    this.lastFocusedValue = $event.target.value;
  }
  @HostListener('blur', ['$event'])
  dirtyCheck($event){
    if (this.lastFocusedValue != $event.target.value){
      if (this.blurChange instanceof Function) {
        this.blurChange();
      }
    }
  }


}
