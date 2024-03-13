import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

export default function Home() {
  function handleNewCycle(data: any) {
    console.log(data);
  }

  const schema = z.object({
    task: z.string().min(1, 'Name your task'),
    time: z.number().min(5).max(60)
  })

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema)
  });

  const task = watch('task');
  const time = watch('time');

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
            id="minutes"
            placeholder="0"
            step={5}
            min={5}
            max={60}
            {...register('time', { valueAsNumber: true })}
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

        <StartCountdownButton disabled={!(task && time)} type="submit">
          <Play size={28} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
