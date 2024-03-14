import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CycleContext";
import { formatDistanceToNow } from "date-fns";

export default function History() {
  const { cycles, activeCycleId } = useContext(CycleContext);

  return (
    <HistoryContainer>
      <h1>
        My History
      </h1>

      {/* <pre> */}
      {/*   {JSON.stringify(cycles, null,2)} */}
      {/* </pre> */}

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
                    <td>{c.timeInMin}</td>
                    <td>{formatDistanceToNow(c.date, { addSuffix: true })}</td>
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
