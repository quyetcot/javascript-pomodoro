import { useState } from "react";

export function AudioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoId = "EWrX250Zhko";
  return (
    <div
      className="mt-10 bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl 
    shadow-2xl border border-gray-700 transition-all hover:scale-105"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🎧</span>
          <h3 className="text-white text-sm font-semibold tracking-wide">
            Audio Sanctuary
          </h3>
        </div>
        {/* Icon mũi tên lên/xuống báo hiệu trạng thái */}
        <span className="text-gray-400 text-xs">
          {isExpanded ? "▲ Thu gọn" : "▼ Mở rộng"}
        </span>
      </div>
      {/* Vùng chứa Iframe của Youtube */}
      {isExpanded && (
        <div className=" mt-3 rounded-lg overflow-hidden border border-gray-700 shadow-inner">
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
            title="Youtube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
      )}
    </div>
  );
}
