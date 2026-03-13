import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

import { count, countReset } from 'console';

export const initialValue = 0;
export const counterReducer = createReducer(initialValue,    
    on(increment, (state:number) => state + 1 ),
    on(decrement, (state:number) => state - 1 ),
    on(reset, (state:number) => 0),
);

export interface CounterStore{
    count: number
}