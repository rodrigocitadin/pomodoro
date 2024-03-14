import { Play, Stop } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import Countdown from "./components/Countdown";
import NewCycleForm from "./components/NewCycleForm";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";

const schema = z.object({
  task: z.string().min(1, 'Name your task'),
  timeInMin: z.number().min(5).max(60)
});

type FormData = z.infer<typeof schema>

export default function Home() {
  const { activeCycle, createNewCycle, interruptCycle } = useContext(CycleContext);

  const cycleForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      timeInMin: 0,
      date: new Date()
    }
  });

  const { handleSubmit, watch, reset } = cycleForm;

  const task = watch('task');
  const timeInMin = watch('timeInMin');

  function handleCreateNewCycle(data: FormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...cycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {
          activeCycle
            ? (
              <StopCountdownButton onClick={interruptCycle} type="button">
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
