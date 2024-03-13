import { CountdownContainer, Separator } from "./styles";

export default function Countdown({minutesDisplay, secondsDisplay} : {
  minutesDisplay: string,
  secondsDisplay: string
}) {
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
