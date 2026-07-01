@AGENTS.md

## Coding Standards & Refactoring Guidelines
- **Modularization (Tách module):** Luôn chia nhỏ các component, logic và UI thành các phần riêng biệt. Tuyệt đối tránh việc dồn quá nhiều code (hàng trăm dòng) vào một file duy nhất.
- **Single Responsibility (Đơn nhiệm):** Mỗi file/component chỉ nên đảm nhiệm một chức năng cụ thể (ví dụ: tách riêng UI con, custom hooks, helper functions ra thư mục tương ứng).
- **Clean Code & Refactor:** Trong quá trình generate code mới, hãy tự động phân tích và refactor lại code sao cho hợp lý, dễ đọc, dễ bảo trì và dễ mở rộng.
