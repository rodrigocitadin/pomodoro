import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { CyclesContext } from "../..";
import { differenceInSeconds } from "date-fns";

export default function Countdown() {
  const { activeCycle, finishCurrentCycle } = useContext(CyclesContext);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const timeInSec = activeCycle ? activeCycle.timeInMin * 60 : 0;
  const currentTimeInSec = activeCycle ? timeInSec - secondsPassed : 0;

  const minutes = Math.floor(currentTimeInSec / 60);
  const seconds = currentTimeInSec % 60;

  const minutesDisplay = String(minutes).padStart(2, '0');
  const secondsDisplay = String(seconds).padStart(2, '0');

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setSecondsPassed(differenceInSeconds(new Date(), activeCycle.date));

        if (currentTimeInSec <= 0) {
          finishCurrentCycle();
          clearInterval(interval);
        }
      }, 1000)
    }

    return () => clearInterval(interval);
  }, [activeCycle, currentTimeInSec])

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${secondsDisplay} - Pomotimer`
  }, [minutes, secondsDisplay, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesDisplay[0]}</span>
      <span>{minutesDisplay[1]}</span>
      <Separator>:</Separator>
      <span>{secondsDisplay[0]}</span>
      <span>{secondsDisplay[1]}</span>
    </CountdownContainer>
  )
}
