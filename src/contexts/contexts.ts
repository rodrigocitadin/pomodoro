import { createContext } from "react";
import { Cycle } from "../reducers/cycles/reducer";
import { CycleData } from "./CycleContext";

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
