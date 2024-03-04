import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer } from "./styles";

export default function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I will work in</label>
          <input id="task" />
          <label htmlFor="minutes">during</label>
          <input type="number" id="minutes" />
          <span>minutes</span>
        </FormContainer>

          <span>0</span>
        <CountdownContainer>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={28} />
          Start
        </button>
      </form>
    </HomeContainer>
  );
}
