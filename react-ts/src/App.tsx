import { AudioPlayer } from "./components/AudioPlayer";
import TimeOrb from "./components/TimeOrb";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center ">
      <TimeOrb />
      <AudioPlayer />
    </div>
  );
}
export default App;
