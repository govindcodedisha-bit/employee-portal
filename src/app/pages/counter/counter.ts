import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../../store/counter/counter.actions';
import { AsyncPipe } from '@angular/common';
import { CounterStore } from '../../store/counter/counter.reducer';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counterValue: Observable<number> = new Observable<number>
  constructor(private store: Store<CounterStore>) {
    this.counterValue = this.store.pipe(select('count'));
  }


  onIncrement() {
    this.store.dispatch(increment())
  }

  onDecrement() {
    this.store.dispatch(decrement())
  }

  onReset() {
    this.store.dispatch(reset())
  }
}




