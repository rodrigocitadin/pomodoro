import { Cycle } from "./reducer"

export enum CycleActions {
  ADD_CYCLE = 'ADD_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE'
}

export function addCycleAction(newCycle: Cycle) {
  return { type: CycleActions.ADD_CYCLE, payload: { newCycle } }
}

export function finishCycleAction() {
  return { type: CycleActions.FINISH_CYCLE }
}

export function stopCycleAction() {
  return { type: CycleActions.STOP_CYCLE }
}
