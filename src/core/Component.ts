// src/core/Component.ts
export abstract class Component<T = any> {
  protected state: T;
  constructor(
    protected hostElement: HTMLElement,
    initialState: T = {} as T,
  ) {
    this.state = initialState;
  }
  // Hàm setState dùng để cập nhật dữ liệu và tự động render lại UI
  protected setState(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  // Các component con bắt buộc phải viết HTML ở hàm này
  abstract template(): string;
  // Thực thi gắn HTML vào DOM và kích hoạt sự kiện
  render(): void {
    this.hostElement.innerHTML = this.template();
    this.bindEvents();
  }
  // Ghi đè hàm này ở class con để gắn sự kiện (click, input...)
  protected bindEvents(): void {}
}
