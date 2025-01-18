import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const tooltip = this.renderer.createElement('span');
    this.renderer.addClass(tooltip, 'tooltip');
    this.renderer.appendChild(this.el.nativeElement, tooltip);
    this.renderer.setStyle(tooltip, 'display', 'none');

    this.el.nativeElement.addEventListener('mouseover', () => {
      this.renderer.setStyle(tooltip, 'display', 'block');
      this.renderer.setProperty(tooltip, 'textContent', this.tooltipText);
    });

    this.el.nativeElement.addEventListener('mouseout', () => {
      this.renderer.setStyle(tooltip, 'display', 'none');
    });
  }
}
