import { ReactNode, createContext, useReducer, useState } from "react"

interface CycleData {
  task: string
  timeInMin: number
}

export interface Cycle {
  id: string
  task: string
  timeInMin: number,
  date: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassed: number
  finishCycle: () => void
  interruptCycle: () => void
  createNewCycle: (c: CycleData) => void
  setSecondsPassedProxy: (n: number) => void
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    if (action.type === 'ADD_CYCLE') state = {
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id
    }

    if (action.type === 'FINISH_CYCLE') state = {
      cycles: state.cycles.map(cycles => {
        return cycles.id === state.activeCycleId
          ? { ...cycles, finishedDate: new Date() }
          : cycles;
      }),
      activeCycleId: null
    }

    if (action.type === 'STOP_CYCLE') state = {
      cycles: state.cycles.map(cycles => {
        return cycles.id === state.activeCycleId
          ? { ...cycles, interruptedDate: new Date() }
          : cycles;
      }),
      activeCycleId: null
    }

    return state;
  }, { cycles: [], activeCycleId: null })

  const [secondsPassed, setSecondsPassed] = useState(0);

  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find(c => c.id === activeCycleId);

  function createNewCycle(data: CycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      timeInMin: data.timeInMin,
      date: new Date()
    };

    dispatch({ type: 'ADD_CYCLE', payload: newCycle });
    setSecondsPassed(0);
  }

  function finishCycle() { dispatch({ type: 'FINISH_CYCLE' }) }

  function interruptCycle() { dispatch({ type: 'STOP_CYCLE' }) }

  function setSecondsPassedProxy(n: number) { setSecondsPassed(n) }

  return (
    <CycleContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      finishCycle,
      secondsPassed,
      setSecondsPassedProxy,
      interruptCycle,
      createNewCycle
    }}>
      {children}
    </CycleContext.Provider>
  )
}
