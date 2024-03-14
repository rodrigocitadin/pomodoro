import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { cycleContext } from "../../contexts/contexts";
import { formatDistanceToNow } from "date-fns";

export default function History() {
  const { cycles, activeCycleId } = useContext(cycleContext);

  return (
    <HistoryContainer>
      <h1>
        My History
      </h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cycles.map(c => {
                return (
                  <tr key={c.id}>
                    <td>{c.task}</td>
                    <td>{c.timeInMin} minutes</td>
                    <td>{formatDistanceToNow(new Date(c.date), { addSuffix: true })}</td>
                    <td>
                      {c.finishedDate && <Status kind="done">Finished</Status>}
                      {c.interruptedDate && <Status kind="stopped">Stopped</Status>}
                      {c.id === activeCycleId && <Status kind="inProgress">In Progress</Status>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
