import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export default function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <TaskInput id="task" placeholder="Task name" />
          <label htmlFor="minutes">during</label>
          <MinutesAmountInput
            type="number"
            id="minutes"
            placeholder="0"
            step={5}
            min={5}
            max={60}
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
