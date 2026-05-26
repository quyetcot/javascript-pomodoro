// src/main.ts
import { App } from "./views/App";

// Chờ HTML load xong mới chạy JS
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("app");

  if (rootElement) {
    // Khởi tạo App và render
    const app = new App(rootElement);
    app.render();
  } else {
    console.error('Không tìm thấy element có id="app"');
  }
});
