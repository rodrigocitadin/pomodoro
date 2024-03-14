import { ReactNode, createContext, useReducer, useState } from "react"
import cyclesReducer, { Cycle, CycleActions } from "../reducers/cycles"

interface CycleData {
  task: string
  timeInMin: number
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

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeCycleId: null })

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

    dispatch({ type: CycleActions.ADD_CYCLE, payload: { newCycle } });
    setSecondsPassed(0);
  }

  function finishCycle() { dispatch({ type: CycleActions.FINISH_CYCLE }) }

  function interruptCycle() { dispatch({ type: CycleActions.STOP_CYCLE }) }

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
