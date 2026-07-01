import { NextResponse } from 'next/server'

// MOCK KNOWLEDGE BASE
const KNOWLEDGE = [
  { keywords: ['giá', 'nhiêu', 'tiền'], answer: 'PulseRing AI hiện có 2 phiên bản: Basic (2.990.000đ) và Pro (4.990.000đ).' },
  { keywords: ['pin', 'sạc'], answer: 'Phiên bản Basic có thời lượng pin lên đến 5 ngày, trong khi bản Pro có thể sử dụng liên tục 7 ngày chỉ với một lần sạc.' },
  { keywords: ['chống nước', 'nước', 'bơi', 'tắm'], answer: 'Có chứ! Bản Basic hỗ trợ chuẩn chống nước 5ATM, còn bản Pro lên đến 10ATM (hoàn toàn an tâm khi bơi lội hay lặn nông).' },
  { keywords: ['chất liệu', 'làm bằng gì'], answer: 'Bản Basic được chế tác từ Thép không gỉ siêu việt, bản Pro được làm từ Titanium cao cấp chuẩn hàng không vũ trụ.' },
  { keywords: ['kết nối', 'đồng bộ', 'app', 'điện thoại'], answer: 'PulseRing kết nối qua Bluetooth 5.2 cực kỳ ổn định, đồng bộ trơn tru với cả iOS và Android thông qua ứng dụng độc quyền.' },
  { keywords: ['chào', 'hi', 'hello'], answer: 'Xin chào! Mình là trợ lý ảo của PulseRing AI. Mình có thể giúp gì cho bạn hôm nay?' },
  { keywords: ['cảm ơn', 'thank', 'thanks'], answer: 'Không có chi! Bất cứ khi nào cần hỗ trợ, hãy nhắn tin cho mình nhé.' },
  { keywords: ['huyết áp', 'nhịp tim', 'đo'], answer: 'Nhẫn được trang bị cảm biến quang học PPG để đo nhịp tim & SpO2 liên tục 24/7. Riêng bản Pro còn có thêm tính năng đo thân nhiệt và cảm biến EKG (điện tâm đồ).' }
]

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

    // Simulate API delay (processing time)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Find a matching answer based on keywords
    let botResponse = 'Xin lỗi, tôi chưa hiểu rõ ý bạn. Bạn có thể hỏi về giá, thời lượng pin, tính năng chống nước hoặc các công nghệ đo sức khỏe của nhẫn nhé!'
    
    for (const item of KNOWLEDGE) {
      if (item.keywords.some(kw => lastMessage.includes(kw))) {
        botResponse = item.answer
        break
      }
    }

    return NextResponse.json({ reply: botResponse })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
