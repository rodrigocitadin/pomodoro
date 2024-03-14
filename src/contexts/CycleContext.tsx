import { ReactNode, useEffect, useReducer, useState } from "react"
import { addCycleAction, finishCycleAction, stopCycleAction } from "../reducers/cycles/actions"
import cyclesReducer, { Cycle } from "../reducers/cycles/reducer"
import { cycleContext } from "./contexts"
import { differenceInSeconds } from "date-fns"

export interface CycleData {
  task: string
  timeInMin: number
}

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeCycleId: null }, () => {
    const stateFromStore = localStorage.getItem('@pomodoro:cycles-state-1.0.0')

    if (stateFromStore) return JSON.parse(stateFromStore);
  })

  const CycleContext = cycleContext
  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find(c => c.id === activeCycleId);

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) return differenceInSeconds(new Date(), activeCycle.date)
    return 0
  });

  function createNewCycle(data: CycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      timeInMin: data.timeInMin,
      date: new Date()
    };

    dispatch(addCycleAction(newCycle));
    setSecondsPassed(0);
  }

  function finishCycle() { dispatch(finishCycleAction()) }

  function interruptCycle() { dispatch(stopCycleAction()) }

  function setSecondsPassedProxy(n: number) { setSecondsPassed(n) }

  useEffect(() => {
    localStorage.setItem('@pomodoro:cycles-state-1.0.0', JSON.stringify(cyclesState));
  }, [cyclesState])

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
