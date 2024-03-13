import { Play, Stop } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const schema = z.object({
  task: z.string().min(1, 'Name your task'),
  timeInMin: z.number().min(5).max(60)
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

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      timeInMin: 0,
      date: new Date()
    }
  });

  const activeCycle = cycles.find(c => c.id === activeCycleId);
  const timeInSec = activeCycle ? activeCycle.timeInMin * 60 : 0;
  const currentTimeInSec = activeCycle ? timeInSec - secondsPassed : 0;

  const minutes = Math.floor(currentTimeInSec / 60);
  const seconds = currentTimeInSec % 60;

  const minutesDisplay = String(minutes).padStart(2, '0');
  const secondsDisplay = String(seconds).padStart(2, '0');

  const task = watch('task');
  const timeInMin = watch('timeInMin');

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

  function handleInterruptCycle() {
    setCycles(
      cycles.map(state => {
        if (state.id === activeCycleId) return { ...state, interruptedDate: new Date() };
        return state;
      })
    )

    setActiveCycleId(null);
  }


  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(new Date(), activeCycle.date);
        setSecondsPassed(secondsDiff);

        if (secondsDiff >= seconds) {
          setCycles(state => state.map(state => {
            return state.id === activeCycleId
              ? { ...state, finishedDate: new Date() }
              : state;
          })
          )

          clearInterval(interval);
        }
      }, 1000)
    }

    return () => clearInterval(interval);
  }, [activeCycle, activeCycleId, seconds])

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${secondsDisplay} - Pomotimer`
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <TaskInput
            id="task"
            placeholder="Task name"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <label htmlFor="minutes">during</label>
          <MinutesAmountInput
            type="number"
            id="time"
            placeholder="0"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('timeInMin', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesDisplay[0]}</span>
          <span>{minutesDisplay[1]}</span>
          <Separator>:</Separator>
          <span>{secondsDisplay[0]}</span>
          <span>{secondsDisplay[1]}</span>
        </CountdownContainer>

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
    </HomeContainer>
  );
}
