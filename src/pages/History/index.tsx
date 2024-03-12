import { HistoryContainer, HistoryList, Status } from "./styles";

export default function History() {
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
            <tr>
              <td>Task name</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td><Status kind="done">Finished</Status></td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>30 minutes</td>
              <td>4 months ago</td>
              <td><Status kind="paused">Paused</Status></td>
            </tr>
            <tr>
              <td>Task name</td>
              <td>15 minutes</td>
              <td>7 months ago</td>
              <td><Status kind="stopped">Stopped</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
