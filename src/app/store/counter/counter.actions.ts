import { createAction } from "@ngrx/store";
import { create } from "domain";

export const increment = createAction('[Counter] Increment counter value');
export const decrement = createAction('[Counter] Decrement counter value');
export const reset = createAction('[Counter] reset counter value');