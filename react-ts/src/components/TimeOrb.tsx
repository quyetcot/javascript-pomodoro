import { useTimer } from "../hooks/useTimer";
function TimeOrb() {
  const {
    formattedTime,
    totalTime,
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    mode,
    setMode,
  } = useTimer();
  //Bán kính SVG là 120 (vừa vặn với khung w-64 h-64)
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const percentage = timeLeft / totalTime; //Tỉ lệ phần trăm còn lại
  const strokeDashoffset = circumference - percentage * circumference;
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4 p-2 bg-gray-800 rounded-full shadow-lg">
        {(["focus", "shortBreak", "longBreak"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setIsRunning(false);
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m
                ? "bg-purple-500 text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {m === "focus"
              ? "Focus"
              : m === "shortBreak"
                ? "Short Break"
                : "Long Break"}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
        }}
      >
        <div className="relative flex items-center justify-center bg-gray-800 w-64 h-64 rounded-full shadow-xl">
          {/* Thẻ SVG được xoay ngược 90 độ để vòng tiến độ bắt đầu từ đỉnh 12h */}
          <svg className="absolute w-full h-full transform -rotate-90 -scale-y-100">
            {/* Vòng nền - Màu tối */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-700"
            />
            {/* Vòng tiến độ (Progress) - Màu phát sáng */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: strokeDashoffset }}
              strokeLinecap="round"
              className="text-purple-500 transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-mono font-bold text-white">
              {formattedTime}
            </span>

            <span className="text-gray-400 mt-2 uppercase text-sm tracking-widest font-semibold">
              {mode === "focus"
                ? "Focus"
                : mode === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
            </span>
          </div>
        </div>
      </button>
      <div className="flex gap-4 items-center mt-4">
        {/* Nút Reload (Icon Mũi tên xoay vòng) */}
        <button
          className="p-3 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all shadow-md"
          onClick={() => {
            setTimeLeft(totalTime);
            setIsRunning(false); // Đã sửa lại logic chuẩn
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>

        {/* Nút Start/Pause (To hơn một chút làm điểm nhấn) */}
        <button
          className="p-4 bg-purple-500 text-white hover:bg-purple-400 rounded-full transition-all shadow-lg transform hover:scale-105"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            // Icon Pause
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Icon Play
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Nút Next (Icon Chuyển bài) */}
        <button
          className="p-3 bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-all shadow-md"
          onClick={() => {
            mode === "focus"
              ? setMode("shortBreak")
              : mode === "shortBreak"
                ? setMode("longBreak")
                : setMode("focus");
            setIsRunning(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.623c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.468c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.19C13.555 6.475 12 7.377 12 8.817v2.468L5.055 7.06z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default TimeOrb;
