import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../contexts/CycleContext";

export default function Countdown() {
  const {
    activeCycle,
    finishCycle,
    secondsPassed,
    setSecondsPassedProxy
  } = useContext(CycleContext);

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
        setSecondsPassedProxy(differenceInSeconds(new Date(), activeCycle.date));

        if (currentTimeInSec <= 0) {
          finishCycle();
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
