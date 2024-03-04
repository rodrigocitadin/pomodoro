import { Play } from "phosphor-react";

export default function Home() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="task">I will work in</label>
          <input id="task" />
          <label htmlFor="minutes">during</label>
          <input type="number" id="minutes" />
          <span>minutes</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit">
          <Play size={28} />
          Start
        </button>
      </form>
    </div>
  );
}
