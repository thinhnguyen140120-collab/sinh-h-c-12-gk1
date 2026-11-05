// GỘP CƠ SỞ DỮ LIỆU TOÀN BỘ 285 CÂU HỎI VÀ THÔNG TIN BÀI HỌC
window.LESSONS_INFO = {
    1: {
        id: 1,
        title: "Bài 1: DNA và Cơ Chế Tái Bản DNA",
        shortTitle: "Bài 1: DNA & Tái Bản",
        desc: "Cấu trúc hóa học của DNA, nguyên tắc bổ sung, bán bảo toàn và cơ chế tổng hợp mạch khuôn trên chạc chữ Y.",
        total: 37
    },
    2: {
        id: 2,
        title: "Bài 2: Gene, Hệ Gene và Quá Trình Truyền Đạt Thông Tin Di Truyền",
        shortTitle: "Bài 2: Gene & Phiên Mã - Dịch Mã",
        desc: "Cấu trúc gene, hệ gene người, phiên mã, dịch mã, mã di truyền và phiên mã ngược.",
        total: 54
    },
    3: {
        id: 3,
        title: "Bài 3: Điều Hoà Biểu Hiện Gene",
        shortTitle: "Bài 3: Điều Hoà Gene (Operon Lac)",
        desc: "Thí nghiệm Jacob - Monod, cấu trúc và cơ chế operon lac khi có/không có lactose, ứng dụng thực tiễn.",
        total: 48
    },
    4: {
        id: 4,
        title: "Bài 4: Đột Biến Gene",
        shortTitle: "Bài 4: Đột Biến Gene",
        desc: "Các dạng đột biến điểm (mất, thêm, thay thế), cơ chế base hiếm, hóa chất 5-BrU và hậu quả.",
        total: 63
    },
    5: {
        id: 5,
        title: "Bài 5: Công Nghệ Gene",
        shortTitle: "Bài 5: Công Nghệ Gene & GMO",
        desc: "Kỹ thuật DNA tái tổ hợp, plasmid, enzyme restrictase & ligase, sinh vật biến đổi gene và đạo đức sinh học.",
        total: 83
    }
};

window.RAW_DATABASE = [
    ...(window.DATA_B1 || []),
    ...(window.DATA_B2 || []),
    ...(window.DATA_B3 || []),
    ...(window.DATA_B4 || []),
    ...(window.DATA_B5 || [])
];

console.log("Đã tải thành công Database Sinh học 12:", window.RAW_DATABASE.length, "câu hỏi.");
