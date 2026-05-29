import { useState, useEffect } from "react";
const TIME_CONFIG = {
  focus: 10,
  shortBreak: 8,
  longBreak: 9,
  //   focus: 50 * 60,
  //   shortBreak: 10 * 60,
  //   longBreak: 15 * 60,
};
let audioCtx: any = null;
export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(TIME_CONFIG.focus); //25 phút
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">(
    "focus",
  );

  const totalTime = TIME_CONFIG[mode];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const playBeep = () => {
    try {
      // Chỉ khởi tạo loa 1 lần duy nhất
      if (!audioCtx) {
        audioCtx = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
      }
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (error) {
      console.log("Không thể phát âm thanh: ", error);
    }
  };

  //Lắng nghe sự kiện thay đổi chế độ mode
  //   useEffect(() => {
  //     setTimeLeft(TIME_CONFIG[mode]);
  //   }, [mode]);

  //Lắng nghe sự kiện hết giờ
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 5 && timeLeft > 0) {
      playBeep();
    }
    if (timeLeft === 0 && isRunning) {
      // 1.Dừng đồng hồ
      setIsRunning(false);
      playBeep(); //Tiếng beep cuối cùng

      // 3. Tiến hành lưu lịch sử

      // Lấy lịch sử cũ từ bộ nhớ (nếu chưa có thì lấy mảng rỗng '[]')
      const historyStr = localStorage.getItem("pomo_history") || "[]";
      const historyArray = JSON.parse(historyStr); //Dịch String-> Array

      //Tạo thông tin cho phiên vừa xong
      const newSession = {
        mode: mode,
        completedAt: new Date().toISOString(), //Lấy giờ chuẩn quốc tế
      };

      // Nhét phiên mới vào mảng
      historyArray.push(newSession);

      // Dịch Array -> String rồi lưu lại
      localStorage.setItem("pomo_history", JSON.stringify(historyArray));

      //   Tự động chuyển chế độ
      // Tự động chuyển chế độ (Auto-Switch)
      if (mode === "focus") {
        setMode("shortBreak");
        setTimeLeft(TIME_CONFIG.shortBreak); // Ép thời gian lên 10 ngay lập tức
        setIsRunning(true);
      } else {
        setMode("focus");
        setTimeLeft(TIME_CONFIG.focus); // Ép thời gian lên 10 ngay lập tức
        setIsRunning(true);
      }
    }
  }, [timeLeft, isRunning, mode]);

  // Logic đếm ngược
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Chỉ đơn giản là trừ 1, nếu chạm 0 thì giữ nguyên số 0 (không để âm)
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    formattedTime,
    totalTime,
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    mode,
    setMode,
  };
}
