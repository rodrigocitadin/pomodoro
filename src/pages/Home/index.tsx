import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useState } from "react";

const schema = z.object({
  task: z.string().min(1, 'Name your task'),
  timeInSec: z.number().min(5).max(60)
});

type FormDataType = z.infer<typeof schema>;

interface Cycle {
  id: string
  task: string
  timeInMin: number
}

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      timeInSec: 0
    }
  });

  const task = watch('task');
  const timeInSec = watch('timeInSec');

  function handleNewCycle(data: FormDataType) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      timeInMin: data.timeInSec
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <TaskInput
            id="task"
            placeholder="Task name"
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
            {...register('timeInSec', { valueAsNumber: true })}
          />
          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!(task && timeInSec)} type="submit">
          <Play size={28} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
