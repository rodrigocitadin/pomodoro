import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  return (
    <HomeContainer>
      <form>
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
            {...register('time')}
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

        <StartCountdownButton disabled type="submit">
          <Play size={28} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
