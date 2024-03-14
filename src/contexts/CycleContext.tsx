import { ReactNode, createContext, useState } from "react"

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

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const activeCycle = cycles.find(c => c.id === activeCycleId);

  function createNewCycle(data: CycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      timeInMin: data.timeInMin,
      date: new Date()
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(id);
    setSecondsPassed(0);

    reset();
  }

  function finishCycle() {
    setCycles(state => state.map(state => {
      console.log(state)
      return state.id === activeCycleId
        ? { ...state, finishedDate: new Date() }
        : state;
    }))

    setActiveCycleId(null);
  }

  function interruptCycle() {
    setCycles(
      cycles.map(state => {
        if (state.id === activeCycleId) return { ...state, interruptedDate: new Date() };
        return state;
      })
    )

    setActiveCycleId(null);
  }

  function setSecondsPassedProxy(n: number) {
    setSecondsPassed(n)
  }

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
