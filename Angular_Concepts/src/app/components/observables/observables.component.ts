import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of, fromEvent, interval, combineLatest, timer } from 'rxjs';
import { map, filter, reduce, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent {

  observableLog: string[] = [];
  combinedTimerLog: string[] = [];
  errorLog: string[] = [];
  subscriptionLog: string[] = [];

  constructor() {
    // Basic Observable Example
    const observable = new Observable<string>(subscriber => {
      subscriber.next('Hello');
      setTimeout(() => {
        subscriber.next('World');
        subscriber.complete();
      }, 2000);
    });

    observable.subscribe({
      next: value => this.observableLog.push(value),
      complete: () => this.observableLog.push('Stream completed')
    });

    // Observable from static values
    const numbers = of(1, 2, 3, 4, 5);
    numbers.pipe(map(x => x * x)).subscribe(value => this.subscriptionLog.push(`Squared: ${value}`));

    // Event-based Observable
    const clicks = fromEvent(document, 'click');
    clicks.subscribe(event => console.log('Page clicked', event));

    // Combining Observables using combineLatest
    const timerOne = timer(1000, 4000);
    const timerTwo = timer(2000, 4000);
    const combinedTimers = combineLatest([timerOne, timerTwo]);
    combinedTimers.subscribe(value => this.combinedTimerLog.push(`Combined: ${value}`));

    // Error handling in Observable
    const faultyObservable = new Observable<string>(subscriber => {
      try {
        subscriber.next('Start');
        throw new Error('Something went wrong!');
      } catch (error) {
        subscriber.error(error);
      }
    });

    faultyObservable.subscribe({
      next: value => this.errorLog.push(value),
      error: err => this.errorLog.push(`Error occurred: ${err.message}`)
    });

    // Higher-order Observable with switchMap
    const switched = clicks.pipe(
      switchMap(() => interval(1000))
    );
    switched.subscribe(x => this.subscriptionLog.push(`Switched Observable: ${x}`));
  }
}
