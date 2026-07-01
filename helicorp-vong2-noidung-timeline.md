# HELICORP - VÒNG 2 - TEST THIẾT KẾ LANDING PAGE
## Dự án: PulseRing AI - Nhẫn thông minh theo dõi sức khỏe

---

## 1. TỔNG QUAN SẢN PHẨM

**Tên sản phẩm:** PulseRing AI

**Mô tả ngắn:** Một chiếc nhẫn thông minh đeo ngón tay, nhỏ gọn hơn smartwatch, tích hợp cảm biến sức khỏe và AI phân tích dữ liệu, đưa ra gợi ý cá nhân hoá hàng ngày cho người dùng.

**Tagline:** "Sức khỏe của bạn, gọn trong một chiếc nhẫn"

**Đối tượng khách hàng:** Người quan tâm sức khỏe, dân văn phòng, người tập gym/thể thao, người lớn tuổi cần theo dõi sức khỏe liên tục.

**Công nghệ:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion

---

## 2. NỘI DUNG CHI TIẾT TỪNG SECTION

### 2.1. Hero Section
- **Tên sản phẩm:** PulseRing AI
- **Headline:** "Sức khỏe của bạn, gọn trong một chiếc nhẫn"
- **Subtext:** "Theo dõi nhịp tim, giấc ngủ và vận động 24/7. AI cá nhân hoá gợi ý mỗi ngày, giúp bạn sống khỏe hơn từng khoảnh khắc."
- **Ảnh:** Nhẫn kim loại nhiều màu (đen, bạc, vàng hồng), có thể làm ảnh 3D xoay hoặc ảnh tĩnh chất lượng cao
- **CTA chính:** "Đặt trước ngay"
- **CTA phụ:** "Khám phá tính năng"
- **Badge:** "New Arrival 2026"

### 2.2. Feature Section (Tính năng nổi bật)

| Tính năng | Mô tả |
|---|---|
| **Đo nhịp tim & SpO2** | Theo dõi liên tục 24/7, cảnh báo khi chỉ số bất thường |
| **Theo dõi giấc ngủ** | Phân tích các giai đoạn ngủ sâu / ngủ nhẹ / REM, chấm điểm giấc ngủ mỗi sáng |
| **AI gợi ý cá nhân hoá** | Mỗi sáng gợi ý "hôm nay nên nghỉ ngơi" hay "sẵn sàng tập luyện" dựa trên dữ liệu đêm qua |
| **Theo dõi hoạt động** | Đếm bước, tính calo tiêu thụ, nhắc vận động khi ngồi lâu |

### 2.3. Specs Section (Thông số kỹ thuật)

| Thông số | Basic | Pro |
|---|---|---|
| Chất liệu | Thép không gỉ | Titanium |
| Pin | 5 ngày/lần sạc | 7 ngày/lần sạc |
| Kháng nước | 5ATM | 10ATM (bơi được) |
| Kết nối | Bluetooth 5.2 | Bluetooth 5.2 |
| Cảm biến | PPG, gia tốc kế | PPG, nhiệt độ da, gia tốc kế, EKG |
| Size | 6 - 13 | 6 - 13 |
| Đồng bộ app | iOS / Android | iOS / Android |
| Giá tham khảo | 2.990.000đ | 4.990.000đ |

### 2.4. Scrollytelling Section (Hành trình một ngày với PulseRing AI)

1. **Sáng thức dậy** - Xem điểm giấc ngủ đêm qua, AI gợi ý mức độ sẵn sàng cho ngày mới
2. **Đi làm / tập gym** - Theo dõi nhịp tim thời gian thực, tính calo tiêu thụ
3. **Buổi chiều** - AI nhắc uống nước / đứng dậy vận động sau thời gian dài ngồi
4. **Buổi tối** - Theo dõi nhịp tim và chất lượng giấc ngủ khi ngủ

*(Kết hợp hiệu ứng Parallax + fade in theo scroll, mỗi mốc thời gian là một khung hình riêng)*

### 2.5. Chatbot AI (góc màn hình)

**Vai trò:** Nhân viên tư vấn ảo của PulseRing AI, trả lời các câu hỏi thường gặp:
- "Nhẫn có chống nước không?"
- "Pin dùng được bao lâu?"
- "Giá bao nhiêu? Có mấy phiên bản?"
- "Nhẫn có đo được huyết áp không?"
- "Làm sao để đồng bộ với điện thoại?"

**Kỹ thuật:** Gọi API route nội bộ (`/api/chat`) → route gọi qua Cockpit Tools proxy với system prompt định danh là tư vấn viên PulseRing AI.

### 2.6. Mini E-commerce
- **Chọn màu:** Đen, Bạc, Vàng hồng
- **Chọn size:** 6 - 13
- **Giỏ hàng:** thêm / xoá / cập nhật số lượng
- **Yêu thích (Wishlist):** lưu sản phẩm quan tâm
- **Đã xem gần đây:** danh sách sản phẩm/phiên bản đã xem
- Lưu trạng thái bằng Zustand + `localStorage` persist

### 2.7. Form đăng ký nhận tin
- **Tiêu đề:** "Đăng ký để nhận ưu đãi ra mắt sớm"
- **Field:** Email (validate định dạng, required)
- **Submit:** gửi dữ liệu về webhook thật (webhook.site hoặc Discord webhook), hiển thị thông báo (toast) khi thành công/thất bại
- **Bonus:** log thêm hành vi người dùng (click, scroll) gửi kèm về webhook

### 2.8. Dark Mode
- Toggle sáng/tối ở Navbar, dùng `next-themes`
- Palette chính: Xanh mint + trắng + accent cam nhẹ (light mode), chuyển tông tối hơn phù hợp cho dark mode

### 2.9. Footer
- Logo, tagline ngắn
- Menu: Tính năng, Thông số, Liên hệ
- Social links (placeholder)
- Copyright

---

## 3. CHIẾN LƯỢC NHÁNH GIT

### Cấu trúc nhánh
```
main                    ← production (chỉ merge cuối ngày 4 trước khi nộp)
└── dev                 ← integration branch (merge từng feature vào đây)
    ├── feat/layout          ← Navbar + Footer + global styles + design system
    ├── feat/hero            ← Hero section
    ├── feat/features        ← Feature section (4 cards tính năng)
    ├── feat/specs           ← Specs section (bảng so sánh Basic/Pro)
    ├── feat/newsletter      ← Form đăng ký + webhook + user tracking
    ├── feat/ecommerce       ← Giỏ hàng + wishlist + đã xem (Zustand)
    ├── feat/dark-mode       ← next-themes toggle
    ├── feat/chatbot         ← Chatbot AI góc màn hình (API route → proxy)
    ├── feat/scrollytelling  ← Scrollytelling section (Framer Motion parallax)
    └── feat/seo-perf        ← SEO meta, Lighthouse polish, responsive final
```

### Quy tắc commit
| Prefix | Dùng khi |
|---|---|
| `feat:` | Thêm tính năng mới |
| `fix:` | Sửa lỗi |
| `style:` | Chỉnh CSS/UI, không ảnh hưởng logic |
| `perf:` | Tối ưu hiệu năng |
| `chore:` | Cài package, cấu hình, tài liệu |

### Flow làm việc
1. `git checkout dev` → `git checkout -b feat/xxx`
2. Code + commit (message rõ ràng)
3. `git checkout dev` → `git merge feat/xxx` → `git branch -d feat/xxx`
4. **Ngày 4:** `git checkout main` → `git merge dev` → push → deploy Vercel

---

## 4. TIMELINE 4 NGÀY (1/7 - 4/7/2026, hạn nộp 18:00 4/7)

### Ngày 1 - 01/07 (Thứ Tư): Setup + Khung sườn
- [ ] Khởi tạo repo GitHub (public), `create-next-app` (TS, Tailwind, App Router, ESLint)
- [ ] Setup nhánh `dev` + quy ước commit (`feat:`, `fix:`, `style:`, `perf:`)
- [ ] Chuẩn bị assets: ảnh sản phẩm (.webp, nén sẵn), chọn palette + font
- [ ] Dựng layout tổng: Navbar, Footer, container responsive
- [ ] Code Hero Section
- [ ] Code Feature Section (4 card tính năng)

### Ngày 2 - 02/07 (Thứ Năm): Tính năng chính + Bonus quan trọng
- [ ] Specs Section (bảng thông số, tab so sánh Basic/Pro)
- [ ] Form đăng ký nhận tin (React Hook Form + Zod, submit qua API route → webhook thật)
- [ ] Mini e-commerce (yêu thích, giỏ hàng, đã xem) - Zustand + persist
- [ ] Dark mode (next-themes)
- [ ] Chatbot góc màn hình (API route → Cockpit Tools proxy)
- [ ] Bắt đầu track hành vi người dùng (click, scroll) gửi về webhook

### Ngày 3 - 03/07 (Thứ Sáu): Scrollytelling + Polish
- [ ] Scrollytelling section (Framer Motion `useScroll` + `useTransform`, parallax)
- [ ] Skeleton loading cho ảnh sản phẩm / chatbot
- [ ] Responsive polish: test kỹ trên mobile thật, sửa lỗi vỡ layout
- [ ] Micro-interactions: hover effect, transition mượt giữa section
- [ ] Cấu hình SEO: `metadata` trong `app/layout.tsx` (title, description, OG image/title/description, favicon)

### Ngày 4 - 04/07 (Thứ Bảy, đến trước 18:00): Tối ưu + Deploy + Nộp
- [ ] Chạy Lighthouse/PageSpeed local, fix lỗi (ảnh `next/image`, font `next/font`, dynamic import component nặng, giảm CLS)
- [ ] Deploy lên Vercel (kết nối GitHub, CI/CD tự động)
- [ ] Chụp ảnh PageSpeed Insights trên bản deploy thật
- [ ] Merge `dev` → `main`, dọn commit history
- [ ] Chuẩn bị minh chứng bonus (screenshot dark mode, chatbot, quay video ngắn scrollytelling)
- [ ] Soạn email nộp:
  - Tiêu đề: `[TTS IT WEBSITE - HỌ & TÊN - NỘP SẢN PHẨM VÒNG 2]`
  - Đính kèm: link GitHub (public), link deploy, ảnh PageSpeed, minh chứng bonus
  - Gửi về: `tuyendung@helicorp.vn`

---

## 4. ƯU TIÊN NẾU THIẾU THỜI GIAN

**Bắt buộc (làm chắc trước):** Hero, Feature, Specs, Form đăng ký, Responsive, PageSpeed ≥ 85, SEO meta tags, Deploy, Git rõ ràng.

**Bonus (ưu tiên theo độ dễ ăn điểm / thời gian):**
1. Dark Mode
2. Micro-interactions
3. Chatbot AI (tận dụng Cockpit Tools proxy có sẵn)
4. Mini e-commerce
5. Scrollytelling + Parallax (tốn thời gian nhất, ấn tượng nhất nếu kịp)
