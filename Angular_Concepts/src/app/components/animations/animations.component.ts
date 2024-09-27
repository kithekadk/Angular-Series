import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animations',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
    ]),

    trigger('slideInOut', [
      transition('void => *', [
        animate('2s', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ])
    ])
  ],
  templateUrl: './animations.component.html',
  styleUrl: './animations.component.css'
})
export class AnimationsComponent {
  isOpen = true;

  /**
   * Toggles the state of the open/close animation.
   */
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
