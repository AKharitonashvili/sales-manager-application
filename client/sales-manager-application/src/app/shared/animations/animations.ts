import { trigger, transition, style, animate } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    style({ opacity: 0, height: 0 }),
    animate('300ms', style({ opacity: 1, height: '*' })),
  ]),
  transition(':leave', [animate('300ms', style({ opacity: 0, height: 0 }))]),
]);
