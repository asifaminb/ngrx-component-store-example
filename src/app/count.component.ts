import { Component, Input } from '@angular/core';

@Component({
  selector: 'count',
  template: `<h1>Total Count: {{count}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class CountComponent {
  @Input() count!: number;
}
