# Software Requirements Specification (SRS)

## Project: PomoHaven — The Deep Focus Sanctuary
**Version:** 4.0 (Production Ready)  
**Status:** Frontend Completed / Backend Integration Pending

---

## 1. Tổng quan dự án (Project Overview)

### 1.1. Mục tiêu
Tạo ra một hệ sinh thái làm việc tập trung (Deep Work Sanctuary). Hệ thống kết hợp giữa phương pháp Pomodoro khoa học và môi trường âm thanh (YouTube Music + Ambient Sounds) giúp người dùng đạt trạng thái "Flow" nhanh nhất.

### 1.2. Giá trị cốt lỗi
- **Esthetics:** Theo đuổi thiết kế Glassmorphism và chuyển cảnh mượt mà.
- **Precision:** Bộ đếm giờ hoạt động chính xác tuyệt đối ngay cả khi tab bị ẩn.
- **Portability:** Đồng bộ hóa cấu hình và lịch sử phiên trên mọi thiết bị thông qua Backend.

---

## 2. Đặc tả chức năng (Functional Specifications)

### 2.1. Focus Dashboard
- **Signature Timer Orb:** Hiển thị vòng tiến độ động (Dynamic Progress Ring). Hỗ trợ 3 chế độ: 
  - `Focus` (50 phút)
  - `Short Break` (10 phút)
  - `Long Break` (15 phút)
- **Session Control:** Tự động chuyển đổi chế độ (Auto-start) dựa trên thiết lập người dùng.

### 2.2. Audio Sanctuary
- **Hybrid Audio Engine:** Kết hợp YouTube Iframe API với HTML5 Audio cho âm thanh môi trường.
- **Persistence:** Ghi nhớ URL bài hát và âm lượng gần nhất vào hồ sơ người dùng.
- **Controls:** Thanh mini-player điều khiển xuyên suốt các trang (Contextual Player).

### 2.3. Analytics System
- **Weekly Insight:** Thống kê tổng số phút tập trung trong tuần qua biểu đồ cột.
- **Contribution Map:** Theo dõi tính kỷ luật hàng ngày qua bản đồ nhiệt.

---

## 3. Đặc tả kỹ thuật (Technical Specifications)

### 3.1. Tech Stack
- **Frontend:** React, Taiwind .
- **Backend (Proposed):** Supabase (PostgreSQL + Auth).
- **Hosting:** Vercel / Netlify.

### 3.2. Database Schema (Kiến trúc dữ liệu)

#### A. Table: `profiles`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key (PK) |
| `email` | text | Unique identifier |
| `created_at` | timestamptz | Thời gian đăng ký |

#### B. Table: `user_settings`
| Column | Type | Default |
| :--- | :--- | :--- |
| `user_id` | uuid | Foreign Key (FK) -> profiles.id |
| `focus_time` | integer | 3000 (seconds) |
| `break_time` | integer | 600 (seconds) |
| `yt_video_id` | text | 'jfKfPfyJRdk' |
| `volume` | integer | 100 |

#### C. Table: `pomo_sessions`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | PK |
| `user_id` | uuid | FK -> profiles.id |
| `task_id` | uuid | FK -> tasks.id (Lựa chọn context) |
| `type` | text | 'focus' / 'break' |
| `planned_duration` | integer | Số giây dự định tập trung (VD: 3000s) |
| `actual_duration` | integer | Số giây thực sự đã đếm ngược được |
| `status` | text | 'completed', 'stopped_early', 'abandoned' |
| `started_at` | timestamptz | Thời điểm bắt đầu phiên |
| `created_at` | timestamptz | Thời điểm kết thúc phiên |

#### D. Table: `tasks` (Phân loại sự tập trung)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | PK |
| `user_id` | uuid | FK -> profiles.id |
| `name` | text | Tên tag/task (VD: "Học tập", "Làm việc", "Code") |
| `color_code` | text | Mã màu hiển thị trên biểu đồ |

#### E. Table: `session_interruptions` (Nhật ký xao nhãng)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | PK |
| `session_id` | uuid | FK -> pomo_sessions.id |
| `interrupted_at`| timestamptz | Thời điểm bấm dừng/xao nhãng |
| `resumed_at` | timestamptz | Thời điểm bấm đếm tiếp (có thể null) |
| `duration` | integer | Thời gian đã tạm dừng (giây) |
| `cause` | text | Lý do tạm dừng (Tự bấm dừng, app detect chuyển tab, v.v...) |

---

## 4. Danh sách API Interface (API Endpoints)

- **Auth Services**: 
  - `SIGNUP/LOGIN` qua Google & Email.
- **Settings API**:
  - `GET /settings`: Tải cấu hình khi khởi động web.
  - `PATCH /settings`: Lưu thay đổi khi người dùng chỉnh sửa Option.
- **History API**:
  - `POST /sessions`: Lưu lại dữ liệu sau mỗi phiên kết thúc.
  - `GET /analytics`: Lấy dữ liệu cho trang thống kê.

---

## 5. Ràng buộc phi chức năng (Non-Functional)

1. **Anti-Drift Timer:** Sử dụng logic so sánh thời gian hệ thống (`new Date()`) thay vì chỉ dùng `setInterval` để chống lệch giờ trên Chrome.
2. **Persistence Strategy:** Ưu tiên State Hydration từ Backend trước, sau đó mới dùng LocalStorage dự phòng (Fallback).
3. **SEO Strategy:** Meta Title động theo trạng thái của Timer (vd: `(25:00) Focus Sanctuary`).

---

## 6. Kiến trúc phần mềm (Software Architecture)
Dự án áp dụng mô hình kiến trúc **Component-Based** đặc trưng của React. Cấu trúc này giúp phân tách rõ ràng UI, Logic, và Global State, đồng thời tối ưu hóa việc quản lý vòng đời (lifecycle) của ứng dụng.
### 6.1. Cấu trúc thư mục (Directory Structure)
```text
/src
 ├── /assets         # Hình ảnh, icon, âm thanh tĩnh
 ├── /components     # Các UI Component độc lập, tái sử dụng (Button, TimerOrb, MiniPlayer)
 ├── /contexts       # Quản lý Global State (Settings, Auth) bằng React Context
 ├── /hooks          # Custom Hooks chứa logic nghiệp vụ (useTimer, useYoutubePlayer)
 ├── /pages          # Tổ chức các trang chính (Dashboard, Analytics, Login)
 ├── /services       # Giao tiếp API và các bên thứ 3 (supabase.js, youtube.js)
 ├── /utils          # Hàm tiện ích dùng chung (formatTime.js, helpers.js)
 ├── /workers        # Web Worker đếm giờ ngầm (timer.worker.js)
 ├── App.jsx         # Component gốc, cấu hình định tuyến (Routing)
 ├── main.jsx        # Entry point (Điểm vào khởi tạo ứng dụng React)
 └── index.css       # File style chính (Tailwind)
```
