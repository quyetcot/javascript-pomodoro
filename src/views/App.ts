// src/views/App.ts
import { Component } from "../core/Component";

export class App extends Component {
  constructor(hostElement: HTMLElement) {
    // Gọi constructor của class Component cha
    super(hostElement);
  }

  template(): string {
    return /* html */ `
      <div class="app-container">
        <!-- Sidebar -->
        <aside class="sidebar">
          <h2 class="logo">PomoHaven</h2>
          <nav>
            <a href="#/" class="nav-item">Timer</a>
            <a href="#/analytics" class="nav-item">Analytics</a>
            <a href="#/settings" class="nav-item">Settings</a>
          </nav>
        </aside>

        <!-- Main Content (Nơi Router sẽ đổ dữ liệu vào sau này) -->
        <main class="main-content">
          <div id="router-view">
             <h2>Chào mừng đến với PomoHaven!</h2>
             <p>Vùng này sẽ thay đổi nội dung khi bạn bấm menu.</p>
          </div>
        </main>
      </div>
    `;
  }
}
