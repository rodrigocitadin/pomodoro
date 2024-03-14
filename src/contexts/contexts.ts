import { createContext } from "react";
import { Cycle } from "../reducers/cycles/reducer";

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

export const cycleContext = createContext({} as CycleContextType)
