export interface Cycle {
  id: string
  task: string
  timeInMin: number,
  date: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum CycleActions {
  ADD_CYCLE = 'ADD_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE'
}

interface Actions {
  type: CycleActions,
  payload?: any
}

export default function cyclesReducer(state: CyclesState, action: Actions) {
  switch (action.type) {
    case CycleActions.ADD_CYCLE:
      return {
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }

    case CycleActions.FINISH_CYCLE:
      return {
        cycles: state.cycles.map(cycles => {
          return cycles.id === state.activeCycleId
            ? { ...cycles, finishedDate: new Date() }
            : cycles;
        }),
        activeCycleId: null
      }

    case CycleActions.STOP_CYCLE:
      return {
        cycles: state.cycles.map(cycles => {
          return cycles.id === state.activeCycleId
            ? { ...cycles, interruptedDate: new Date() }
            : cycles;
        }),
        activeCycleId: null
      }

    default:
      return state
  }
}
