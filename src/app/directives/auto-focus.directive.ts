import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public autoFocus: boolean;

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    this.el.nativeElement.focus();
  }
}
