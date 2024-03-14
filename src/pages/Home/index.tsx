import { Play, Stop } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { createContext, useState } from "react";
import Countdown from "./components/Countdown";
import NewCycleForm from "./components/NewCycleForm";

const schema = z.object({
  task: z.string().min(1, 'Name your task'),
  timeInMin: z.number().min(1).max(60)
});

type FormDataType = z.infer<typeof schema>;

interface Cycle {
  id: string
  task: string
  timeInMin: number,
  date: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  finishCurrentCycle: () => void
  secondsPassed: number
  setSecondsPassedProxy: (n: number) => void
}

export const CyclesContext = createContext({} as CycleContextType);

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const cycleForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      timeInMin: 0,
      date: new Date()
    }
  });

  const { handleSubmit, watch, reset } = cycleForm;

  function handleNewCycle(data: FormDataType) {
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

  const activeCycle = cycles.find(c => c.id === activeCycleId);

  const task = watch('task');
  const timeInMin = watch('timeInMin');

  function handleInterruptCycle() {
    setCycles(
      cycles.map(state => {
        if (state.id === activeCycleId) return { ...state, interruptedDate: new Date() };
        return state;
      })
    )

    setActiveCycleId(null);
  }

  function finishCurrentCycle() {
    setCycles(state => state.map(state => {
      console.log(state)
      return state.id === activeCycleId
        ? { ...state, finishedDate: new Date() }
        : state;
    }))

    setActiveCycleId(null);
  }

  function setSecondsPassedProxy(n: number) {
    setSecondsPassed(n)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle, 
            activeCycleId, 
            finishCurrentCycle, 
            secondsPassed,
            setSecondsPassedProxy
          }}
        >
          <FormProvider {...cycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {
          activeCycle
            ? (
              <StopCountdownButton onClick={handleInterruptCycle} type="button">
                <Stop size={28} />
              </StopCountdownButton>
            ) : (
              <StartCountdownButton disabled={!(task && timeInMin)} type="submit">
                <Play size={28} />
              </StartCountdownButton>
            )
        }
      </form>
    </HomeContainer >
  );
}
