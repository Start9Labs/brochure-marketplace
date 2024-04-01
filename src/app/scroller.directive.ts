import { Directive, ElementRef, inject } from '@angular/core'
import { ViewportScroller } from '@angular/common'

@Directive({
  standalone: true,
  selector: 'tui-root[appScroller]',
})
export class ScrollerDirective {
  private readonly el: HTMLElement = inject(ElementRef).nativeElement
  private readonly scroller = inject(ViewportScroller)

  ngOnInit() {
    this.scroller.scrollToPosition = ([x, y]) => this.el.scrollTo(x, y)
    this.scroller.getScrollPosition = () => [
      this.el.scrollLeft,
      this.el.scrollTop,
    ]
  }
}
