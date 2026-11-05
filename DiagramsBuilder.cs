using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class DiagramsBuilder {
    public static void Run() {
        string imgDir = @"C:\Users\Admin\.gemini\antigravity\scratch\on-tap-sinh-12\images\";
        string outPath = @"C:\Users\Admin\.gemini\antigravity\scratch\on-tap-sinh-12\diagrams.js";

        Func<string, string> getB64 = delegate(string fileName) {
            byte[] bytes = File.ReadAllBytes(imgDir + fileName);
            return "data:image/jpeg;base64," + Convert.ToBase64String(bytes);
        };

        var dict = new Dictionary<string, string>();

        // 1. Bài 1: SVGs
        dict["b1_15"] = @"
<div class=""my-3 p-3 bg-slate-900 rounded-xl text-white shadow-sm border border-slate-700"">
    <div class=""text-xs text-center font-bold text-emerald-400 mb-2"">HÌNH CÂU 15: ĐƠN VỊ TÁI BẢN DNA (HAI CHẠC ĐỐI XỨNG)</div>
    <svg viewBox=""0 0 600 200"" class=""w-full h-auto max-h-56 mx-auto"">
        <path d=""M 40,60 L 180,60 L 250,90 L 350,90 L 420,60 L 560,60"" stroke=""#94a3b8"" stroke-width=""3"" fill=""none""/>
        <path d=""M 40,140 L 180,140 L 250,110 L 350,110 L 420,140 L 560,140"" stroke=""#94a3b8"" stroke-width=""3"" fill=""none""/>
        <text x=""18"" y=""65"" fill=""#f8fafc"" font-size=""13"" font-weight=""bold"">3'</text>
        <text x=""18"" y=""145"" fill=""#f8fafc"" font-size=""13"" font-weight=""bold"">5'</text>
        <text x=""568"" y=""65"" fill=""#f8fafc"" font-size=""13"" font-weight=""bold"">5'</text>
        <text x=""568"" y=""145"" fill=""#f8fafc"" font-size=""13"" font-weight=""bold"">3'</text>
        <ellipse cx=""170"" cy=""100"" rx=""16"" ry=""24"" fill=""#0284c7"" />
        <path d=""M 160,100 L 115,100 M 125,92 L 115,100 L 125,108"" stroke=""#38bdf8"" stroke-width=""3.5"" fill=""none"" stroke-linecap=""round""/>
        <text x=""105"" y=""80"" fill=""#38bdf8"" font-size=""11"" font-weight=""bold"">Enzyme tháo xoắn ◄</text>
        <ellipse cx=""430"" cy=""100"" rx=""16"" ry=""24"" fill=""#0284c7"" />
        <path d=""M 440,100 L 485,100 M 475,92 L 485,100 L 475,108"" stroke=""#38bdf8"" stroke-width=""3.5"" fill=""none"" stroke-linecap=""round""/>
        <text x=""415"" y=""80"" fill=""#38bdf8"" font-size=""11"" font-weight=""bold"">► Enzyme tháo xoắn</text>
        <g stroke=""#f59e0b"" stroke-width=""3"" stroke-linecap=""round"">
            <line x1=""200"" y1=""72"" x2=""230"" y2=""72"" /><polygon points=""202,68 194,72 202,76"" fill=""#f59e0b""/>
            <line x1=""240"" y1=""75"" x2=""275"" y2=""82"" /><polygon points=""242,71 234,75 242,79"" fill=""#f59e0b""/>
        </g>
        <text x=""235"" y=""60"" fill=""#f59e0b"" font-size=""14"" font-weight=""bold"">I</text>
        <g stroke=""#10b981"" stroke-width=""3"" stroke-linecap=""round"">
            <path d=""M 270,120 L 220,128 L 60,128"" fill=""none""/>
            <polygon points=""66,124 58,128 66,132"" fill=""#10b981""/>
        </g>
        <text x=""235"" y=""150"" fill=""#10b981"" font-size=""14"" font-weight=""bold"">III</text>
        <g stroke=""#10b981"" stroke-width=""3"" stroke-linecap=""round"">
            <path d=""M 330,80 L 380,72 L 540,72"" fill=""none""/>
            <polygon points=""534,68 542,72 534,76"" fill=""#10b981""/>
        </g>
        <text x=""365"" y=""60"" fill=""#10b981"" font-size=""14"" font-weight=""bold"">II</text>
        <g stroke=""#f59e0b"" stroke-width=""3"" stroke-linecap=""round"">
            <line x1=""400"" y1=""128"" x2=""370"" y2=""128"" /><polygon points=""398,124 406,128 398,132"" fill=""#f59e0b""/>
            <line x1=""360"" y1=""125"" x2=""325"" y2=""118"" /><polygon points=""358,121 366,125 358,129"" fill=""#f59e0b""/>
        </g>
        <text x=""365"" y=""150"" fill=""#f59e0b"" font-size=""14"" font-weight=""bold"">IV</text>
    </svg>
    <div class=""text-center text-xs text-slate-300 mt-2""><span class=""text-amber-400 font-bold"">I, IV:</span> Tổng hợp gián đoạn (ngược chiều chạc) | <span class=""text-emerald-400 font-bold"">II, III:</span> Tổng hợp liên tục</div>
</div>";

        dict["b1_16"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 16: CƠ CHẾ KÉO DÀI TRÊN 1 CHẠC CHỮ Y TÁI BẢN DNA</div>
    <div class=""grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700"">
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Sơ đồ I</div>
            <svg viewBox=""0 0 140 100"" class=""w-full h-auto"">
                <path d=""M 10,25 L 70,25 L 120,10"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <path d=""M 10,75 L 70,75 L 120,90"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <text x=""2"" y=""28"" font-size=""10"">3'</text><text x=""2"" y=""78"" font-size=""10"">5'</text>
                <text x=""125"" y=""13"" font-size=""10"">5'</text><text x=""125"" y=""93"" font-size=""10"">3'</text>
                <line x1=""30"" y1=""35"" x2=""90"" y2=""20"" stroke=""#ef4444"" stroke-width=""2""/>
                <line x1=""90"" y1=""80"" x2=""30"" y2=""65"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
        <div class=""border-2 border-emerald-500 rounded p-2 bg-emerald-50/50"">
            <div class=""font-bold text-emerald-800 mb-1"">Sơ đồ II (ĐÚNG)</div>
            <svg viewBox=""0 0 140 100"" class=""w-full h-auto"">
                <path d=""M 10,25 L 70,25 L 120,10"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <path d=""M 10,75 L 70,75 L 120,90"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <text x=""2"" y=""28"" font-size=""10"">3'</text><text x=""2"" y=""78"" font-size=""10"">5'</text>
                <text x=""125"" y=""13"" font-size=""10"">5'</text><text x=""125"" y=""93"" font-size=""10"">3'</text>
                <line x1=""25"" y1=""35"" x2=""105"" y2=""18"" stroke=""#10b981"" stroke-width=""2.5"" stroke-linecap=""round""/>
                <polygon points=""102,15 110,17 104,22"" fill=""#10b981""/>
                <g stroke=""#f59e0b"" stroke-width=""2.5"" stroke-linecap=""round"">
                    <line x1=""80"" y1=""82"" x2=""55"" y2=""77"" /><polygon points=""58,74 50,76 58,80"" fill=""#f59e0b""/>
                    <line x1=""105"" y1=""87"" x2=""85"" y2=""83"" /><polygon points=""88,80 80,82 88,86"" fill=""#f59e0b""/>
                </g>
            </svg>
        </div>
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Sơ đồ III</div>
            <svg viewBox=""0 0 140 100"" class=""w-full h-auto"">
                <path d=""M 10,25 L 70,25 L 120,10"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <path d=""M 10,75 L 70,75 L 120,90"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <text x=""2"" y=""28"" font-size=""10"">3'</text><text x=""2"" y=""78"" font-size=""10"">5'</text>
                <text x=""125"" y=""13"" font-size=""10"">5'</text><text x=""125"" y=""93"" font-size=""10"">3'</text>
                <line x1=""100"" y1=""18"" x2=""30"" y2=""35"" stroke=""#ef4444"" stroke-width=""2""/>
                <line x1=""30"" y1=""65"" x2=""100"" y2=""82"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Sơ đồ IV</div>
            <svg viewBox=""0 0 140 100"" class=""w-full h-auto"">
                <path d=""M 10,25 L 70,25 L 120,10"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <path d=""M 10,75 L 70,75 L 120,90"" stroke=""#64748b"" stroke-width=""2"" fill=""none""/>
                <text x=""2"" y=""28"" font-size=""10"">3'</text><text x=""2"" y=""78"" font-size=""10"">5'</text>
                <text x=""125"" y=""13"" font-size=""10"">5'</text><text x=""125"" y=""93"" font-size=""10"">3'</text>
                <line x1=""30"" y1=""35"" x2=""100"" y2=""18"" stroke=""#ef4444"" stroke-width=""2""/>
                <line x1=""30"" y1=""65"" x2=""100"" y2=""82"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
    </div>
</div>";

        dict["b1_17"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 17: CƠ CHẾ TÁI BẢN DNA TẠI MỘT ĐƠN VỊ NHÂN ĐÔI</div>
    <div class=""grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700"">
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Hình 1</div>
            <svg viewBox=""0 0 120 70"" class=""w-full h-auto"">
                <path d=""M 10,20 L 40,20 L 60,30 L 80,20 L 110,20 M 10,50 L 40,50 L 60,40 L 80,50 L 110,50"" stroke=""#64748b"" stroke-width=""1.5"" fill=""none""/>
                <line x1=""45"" y1=""24"" x2=""20"" y2=""24"" stroke=""#ef4444"" stroke-width=""2""/>
                <line x1=""75"" y1=""24"" x2=""100"" y2=""24"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Hình 2</div>
            <svg viewBox=""0 0 120 70"" class=""w-full h-auto"">
                <path d=""M 10,20 L 40,20 L 60,30 L 80,20 L 110,20 M 10,50 L 40,50 L 60,40 L 80,50 L 110,50"" stroke=""#64748b"" stroke-width=""1.5"" fill=""none""/>
                <line x1=""20"" y1=""46"" x2=""45"" y2=""46"" stroke=""#ef4444"" stroke-width=""2""/>
                <line x1=""100"" y1=""46"" x2=""75"" y2=""46"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
        <div class=""border-2 border-emerald-500 rounded p-2 bg-emerald-50/50"">
            <div class=""font-bold text-emerald-800 mb-1"">Hình 3 (ĐÚNG)</div>
            <svg viewBox=""0 0 120 70"" class=""w-full h-auto"">
                <path d=""M 10,20 L 40,20 L 60,30 L 80,20 L 110,20 M 10,50 L 40,50 L 60,40 L 80,50 L 110,50"" stroke=""#64748b"" stroke-width=""1.5"" fill=""none""/>
                <line x1=""55"" y1=""25"" x2=""20"" y2=""25"" stroke=""#f59e0b"" stroke-width=""2"" stroke-dasharray=""4,2""/>
                <line x1=""55"" y1=""45"" x2=""20"" y2=""45"" stroke=""#10b981"" stroke-width=""2""/>
                <line x1=""65"" y1=""25"" x2=""100"" y2=""25"" stroke=""#10b981"" stroke-width=""2""/>
                <line x1=""65"" y1=""45"" x2=""100"" y2=""45"" stroke=""#f59e0b"" stroke-width=""2"" stroke-dasharray=""4,2""/>
            </svg>
        </div>
        <div class=""border border-slate-200 rounded p-2 bg-slate-50"">
            <div class=""font-bold text-slate-600 mb-1"">Hình 4</div>
            <svg viewBox=""0 0 120 70"" class=""w-full h-auto"">
                <path d=""M 10,20 L 40,20 L 60,30 L 80,20 L 110,20 M 10,50 L 40,50 L 60,40 L 80,50 L 110,50"" stroke=""#64748b"" stroke-width=""1.5"" fill=""none""/>
                <line x1=""20"" y1=""25"" x2=""100"" y2=""25"" stroke=""#ef4444"" stroke-width=""2""/>
            </svg>
        </div>
    </div>
</div>";

        dict["b1_25"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 25: CHẠC THÁO XOẮN TÁI BẢN DNA</div>
    <svg viewBox=""0 0 450 140"" class=""w-full h-auto max-h-48 mx-auto"">
        <path d=""M 40,30 Q 120,30 180,60 Q 240,90 320,30 L 410,30"" stroke=""#3b82f6"" stroke-width=""3"" fill=""none""/>
        <path d=""M 40,90 Q 120,90 180,60 Q 240,30 320,90 L 410,90"" stroke=""#ef4444"" stroke-width=""3"" fill=""none""/>
        <path d=""M 320,30 L 410,20"" stroke=""#3b82f6"" stroke-width=""3.5"" fill=""none""/>
        <path d=""M 320,90 L 410,100"" stroke=""#ef4444"" stroke-width=""3.5"" fill=""none""/>
        <text x=""20"" y=""35"" font-size=""14"" font-weight=""bold"" fill=""#1e293b"">3'</text>
        <text x=""20"" y=""95"" font-size=""14"" font-weight=""bold"" fill=""#1e293b"">5'</text>
        <text x=""415"" y=""25"" font-size=""14"" font-weight=""bold"" fill=""#1e293b"">5'</text>
        <text x=""415"" y=""105"" font-size=""14"" font-weight=""bold"" fill=""#1e293b"">3'</text>
        <path d=""M 200,60 L 270,60 M 260,54 L 270,60 L 260,66"" stroke=""#0f766e"" stroke-width=""3.5"" fill=""none"" stroke-linecap=""round""/>
        <text x=""190"" y=""48"" font-size=""11"" font-weight=""bold"" fill=""#0f766e"">Chiều tháo xoắn ►</text>
    </svg>
</div>";

        dict["b1_27"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 27: ĐOẠN PHÂN TỬ DNA VỚI CÁC LIÊN KẾT HYDROGEN</div>
    <svg viewBox=""0 0 350 120"" class=""w-full h-auto max-h-40 mx-auto"">
        <rect x=""40"" y=""10"" width=""270"" height=""30"" fill=""#f1f5f9"" stroke=""#475569"" stroke-width=""2"" rx=""4""/>
        <rect x=""40"" y=""80"" width=""270"" height=""30"" fill=""#f1f5f9"" stroke=""#475569"" stroke-width=""2"" rx=""4""/>
        <text x=""65"" y=""31"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">T</text>
        <text x=""120"" y=""31"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">G</text>
        <text x=""175"" y=""31"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">T</text>
        <text x=""230"" y=""31"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">C</text>
        <text x=""285"" y=""31"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">A</text>
        <text x=""65"" y=""101"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">A</text>
        <text x=""120"" y=""101"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">C</text>
        <text x=""175"" y=""101"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">A</text>
        <text x=""230"" y=""101"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">G</text>
        <text x=""285"" y=""101"" font-size=""14"" font-weight=""bold"" fill=""#0f172a"">T</text>
        <g stroke=""#0284c7"" stroke-width=""2"" stroke-dasharray=""3,3"">
            <line x1=""65"" y1=""45"" x2=""65"" y2=""75"" /><line x1=""73"" y1=""45"" x2=""73"" y2=""75"" />
            <line x1=""116"" y1=""45"" x2=""116"" y2=""75"" /><line x1=""124"" y1=""45"" x2=""124"" y2=""75"" /><line x1=""132"" y1=""45"" x2=""132"" y2=""75"" />
            <line x1=""175"" y1=""45"" x2=""175"" y2=""75"" /><line x1=""183"" y1=""45"" x2=""183"" y2=""75"" />
            <line x1=""226"" y1=""45"" x2=""226"" y2=""75"" /><line x1=""234"" y1=""45"" x2=""234"" y2=""75"" /><line x1=""242"" y1=""45"" x2=""242"" y2=""75"" />
            <line x1=""285"" y1=""45"" x2=""285"" y2=""75"" /><line x1=""293"" y1=""45"" x2=""293"" y2=""75"" />
        </g>
    </svg>
    <div class=""text-xs text-slate-600 mt-2 font-semibold"">Tổng số liên kết hydrogen = 2(T=A) + 3(G≡C) + 2(T=A) + 3(C≡G) + 2(A=T) = <span class=""text-emerald-700 font-bold"">12 liên kết</span></div>
</div>";

        // 2. Bài 2: Embedded Base64 Images + SVGs
        dict["b2_3"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 3: CẤU TRÚC GENE Ở SINH VẬT</div>
    <img src=""{0}"" alt=""Cấu trúc gene không phân mảnh"" class=""max-h-56 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_1.jpg"));

        dict["b2_14"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 14: QUÁ TRÌNH PHIÊN MÃ RNA VÀ CẤU TRÚC A</div>
    <img src=""{0}"" alt=""Quá trình phiên mã RNA"" class=""max-h-56 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_2.jpg"));

        dict["b2_15"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 15: CƠ CHẾ DI TRUYỀN PHÂN TỬ - CẤU TRÚC X</div>
    <img src=""{0}"" alt=""Cơ chế di truyền cấp độ phân tử"" class=""max-h-56 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_3.jpg"));

        dict["b2_39"] = @"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 39: THUYẾT TRUNG TÂM CENTRAL DOGMA</div>
    <svg viewBox=""0 0 500 130"" class=""w-full h-auto max-h-36 mx-auto"">
        <rect x=""30"" y=""40"" width=""90"" height=""35"" fill=""#e0e7ff"" stroke=""#4f46e5"" stroke-width=""2"" rx=""6""/>
        <text x=""75"" y=""62"" font-size=""13"" font-weight=""bold"" fill=""#312e81"" text-anchor=""middle"">Gene X (DNA)</text>
        <path d=""M 35,40 C 25,20 60,15 70,35"" fill=""none"" stroke=""#4f46e5"" stroke-width=""2"" stroke-dasharray=""3,2""/>
        <polygon points=""72,32 70,39 65,34"" fill=""#4f46e5""/>
        <text x=""45"" y=""15"" font-size=""10"" font-weight=""bold"" fill=""#4f46e5"">(1)</text>
        <line x1=""125"" y1=""57"" x2=""195"" y2=""57"" stroke=""#4f46e5"" stroke-width=""2.5""/>
        <polygon points=""192,52 202,57 192,62"" fill=""#4f46e5""/>
        <text x=""160"" y=""48"" font-size=""11"" font-weight=""bold"" fill=""#4f46e5"">(2)</text>
        <rect x=""205"" y=""40"" width=""90"" height=""35"" fill=""#fef3c7"" stroke=""#d97706"" stroke-width=""2"" rx=""6""/>
        <text x=""250"" y=""62"" font-size=""13"" font-weight=""bold"" fill=""#78350f"" text-anchor=""middle"">mRNA</text>
        <line x1=""300"" y1=""57"" x2=""370"" y2=""57"" stroke=""#d97706"" stroke-width=""2.5""/>
        <polygon points=""367,52 377,57 367,62"" fill=""#d97706""/>
        <text x=""335"" y=""48"" font-size=""11"" font-weight=""bold"" fill=""#d97706"">(3)</text>
        <rect x=""380"" y=""40"" width=""100"" height=""35"" fill=""#d1fae5"" stroke=""#059669"" stroke-width=""2"" rx=""6""/>
        <text x=""430"" y=""62"" font-size=""13"" font-weight=""bold"" fill=""#064e3b"" text-anchor=""middle"">Polypeptide</text>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold"">(1) Tái bản DNA | (2) Phiên mã | <span class=""text-emerald-700 font-bold"">(3) Dịch mã</span></div>
</div>";

        dict["b2_45"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 45: BIỂU HIỆN TÍNH TRẠNG CƠ THỂ QUA CƠ CHẾ 1 VÀ CƠ CHẾ 2</div>
    <img src=""{0}"" alt=""Phân tử 1, Phân tử 2, Phân tử 3"" class=""max-h-72 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_4.jpg"));

        dict["b2_49"] = @"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 49: SƠ ĐỒ NGUYÊN LÝ CENTRAL DOGMA</div>
    <svg viewBox=""0 0 320 220"" class=""w-full h-auto max-h-52 mx-auto"">
        <circle cx=""80"" cy=""40"" r=""22"" fill=""none"" stroke=""#64748b"" stroke-width=""2"" stroke-dasharray=""4,2""/>
        <text x=""80"" y=""44"" font-size=""9"" font-weight=""bold"" text-anchor=""middle"" fill=""#475569"">Nhân đôi</text>
        <rect x=""140"" y=""25"" width=""80"" height=""35"" fill=""#e0e7ff"" stroke=""#4338ca"" stroke-width=""2"" rx=""6""/>
        <text x=""180"" y=""48"" font-size=""14"" font-weight=""bold"" text-anchor=""middle"" fill=""#312e81"">DNA</text>
        <line x1=""165"" y1=""65"" x2=""165"" y2=""105"" stroke=""#4338ca"" stroke-width=""2""/>
        <polygon points=""161,102 165,110 169,102"" fill=""#4338ca""/>
        <text x=""120"" y=""90"" font-size=""10"" font-weight=""bold"" fill=""#4338ca"">Phiên mã</text>
        <line x1=""195"" y1=""105"" x2=""195"" y2=""65"" stroke=""#dc2626"" stroke-width=""2""/>
        <polygon points=""191,68 195,60 199,68"" fill=""#dc2626""/>
        <text x=""200"" y=""85"" font-size=""9"" font-weight=""bold"" fill=""#dc2626"">Phiên mã</text>
        <text x=""200"" y=""95"" font-size=""9"" font-weight=""bold"" fill=""#dc2626"">ngược</text>
        <rect x=""140"" y=""115"" width=""80"" height=""35"" fill=""#fef3c7"" stroke=""#d97706"" stroke-width=""2"" rx=""6""/>
        <text x=""180"" y=""138"" font-size=""14"" font-weight=""bold"" text-anchor=""middle"" fill=""#78350f"">mRNA</text>
        <line x1=""180"" y1=""153"" x2=""180"" y2=""180"" stroke=""#d97706"" stroke-width=""2""/>
        <polygon points=""176,177 180,185 184,177"" fill=""#d97706""/>
        <text x=""145"" y=""172"" font-size=""10"" font-weight=""bold"" fill=""#d97706"">Dịch mã</text>
        <rect x=""130"" y=""188"" width=""100"" height=""30"" fill=""#d1fae5"" stroke=""#059669"" stroke-width=""2"" rx=""6""/>
        <text x=""180"" y=""208"" font-size=""13"" font-weight=""bold"" text-anchor=""middle"" fill=""#064e3b"">Polypeptide</text>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold"">Bao gồm 4 cơ chế: (1) Nhân đôi DNA, (2) Phiên mã, (3) Phiên mã ngược, (4) Dịch mã.</div>
</div>";

        // 3. Bài 3: Embedded Base64 Images
        dict["b3_23"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 23 & 27: SƠ ĐỒ HOẠT ĐỘNG CỦA OPERON LAC</div>
    <img src=""{0}"" alt=""Operon Lac hoạt động khi có lactose"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_5.jpg"));
        dict["b3_27"] = dict["b3_23"];

        dict["b3_30"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 30: CÁC TRÌNH TỰ OPERON TRÊN ĐOẠN NST VÀ 5 ĐỘT BIẾN MẤT ĐOẠN</div>
    <img src=""{0}"" alt=""Operon Lac đột biến mất đoạn"" class=""max-h-52 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_6.jpg"));

        dict["b3_39"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 39: OPERON LAC Ở 2 CHỦNG E. COLI BÌNH THƯỜNG VÀ ĐỘT BIẾN</div>
    <div class=""grid grid-cols-1 md:grid-cols-2 gap-3"">
        <div class=""border border-slate-200 rounded-lg p-2"">
            <div class=""text-xs font-bold text-slate-600 mb-1"">(a) Dạng bình thường</div>
            <img src=""{0}"" alt=""Operon lac dạng bình thường"" class=""max-h-52 mx-auto object-contain"" />
        </div>
        <div class=""border border-slate-200 rounded-lg p-2"">
            <div class=""text-xs font-bold text-slate-600 mb-1"">(b) Dạng đột biến</div>
            <img src=""{1}"" alt=""Operon lac dạng đột biến"" class=""max-h-52 mx-auto object-contain"" />
        </div>
    </div>
</div>", getB64("pdf_img_7.jpg"), getB64("pdf_img_8.jpg"));

        dict["b3_43"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 43: ĐỒ THỊ MỨC BIỂU HIỆN CỦA GENE Z KHI BỔ SUNG LACTOSE</div>
    <img src=""{0}"" alt=""Đồ thị biểu hiện gene Z"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_9.jpg"));

        // 4. Bài 4: Embedded Base64 Images + SVGs
        dict["b4_20"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 20: ĐOẠN DNA TRƯỚC ĐỘT BIẾN VÀ CÁC HÌNH a, b, c</div>
    <img src=""{0}"" alt=""Đoạn DNA trước đột biến và hình a, b, c"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_10.jpg"));

        dict["b4_32"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 32: ĐỘT BIẾN ĐIỂM THAY THẾ AMINO ACID (His -> Pro)</div>
    <img src=""{0}"" alt=""Đột biến thay thế làm thay đổi His thành Pro"" class=""max-h-56 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_11.jpg"));

        dict["b4_49"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 49: CƠ CHẾ GÂY ĐỘT BIẾN CỦA THYMINE DẠNG HIẾM (T*)</div>
    <img src=""{0}"" alt=""Cơ chế đột biến base hiếm T*"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_12.jpg"));

        dict["b4_52"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 52: CƠ CHẾ ĐỘT BIẾN THAY THẾ DO 5-BrU QUA 3 LẦN NHÂN ĐÔI</div>
    <img src=""{0}"" alt=""Cơ chế đột biến của hóa chất 5-BrU"" class=""max-h-72 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_13.jpg"));

        dict["b4_55"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 55: CÁC DẠNG ĐỘT BIẾN GENE (MẤT, THÊM, THAY THẾ CẶP NU)</div>
    <img src=""{0}"" alt=""Các dạng đột biến gene"" class=""max-h-60 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_14.jpg"));

        dict["b4_57"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 57: SƠ ĐỒ ĐỘT BIẾN ĐIỂM GÂY BỆNH X</div>
    <img src=""{0}"" alt=""Sơ đồ bệnh X"" class=""max-h-72 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_15.jpg"));

        dict["b4_62"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 62: BẮT CẶP BÌNH THƯỜNG VÀ BẮT CẶP NHẦM DO HỖ BIẾN</div>
    <img src=""{0}"" alt=""Bắt cặp bổ sung và bắt cặp nhầm do hỗ biến"" class=""max-h-60 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_16.jpg"));

        dict["b4_63"] = @"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 63: CẤU TRÚC GENE TỪ VỊ TRÍ 1 ĐẾN 3300</div>
    <svg viewBox=""0 0 500 130"" class=""w-full h-auto max-h-36 mx-auto"">
        <rect x=""30"" y=""50"" width=""70"" height=""30"" fill=""#cbd5e1"" stroke=""#475569"" stroke-width=""2""/>
        <text x=""65"" y=""70"" font-size=""11"" font-weight=""bold"" text-anchor=""middle"">Vùng điều hòa</text>
        <rect x=""105"" y=""45"" width=""280"" height=""40"" fill=""#f8fafc"" stroke=""#0284c7"" stroke-width=""2.5""/>
        <text x=""245"" y=""70"" font-size=""13"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">VÙNG MÃ HÓA (3300 nu)</text>
        <rect x=""390"" y=""50"" width=""80"" height=""30"" fill=""#cbd5e1"" stroke=""#475569"" stroke-width=""2""/>
        <text x=""430"" y=""70"" font-size=""11"" font-weight=""bold"" text-anchor=""middle"">Vùng kết thúc</text>
        <text x=""110"" y=""25"" font-size=""10"" font-weight=""bold"" fill=""#0f172a"">nucleotide số 1</text>
        <text x=""110"" y=""38"" font-size=""12"" font-weight=""bold"" fill=""#059669"">ATG</text>
        <line x1=""120"" y1=""40"" x2=""120"" y2=""45"" stroke=""#059669"" stroke-width=""2""/>
        <text x=""245"" y=""25"" font-size=""10"" font-weight=""bold"" fill=""#dc2626"">vị trí đột biến</text>
        <text x=""245"" y=""38"" font-size=""12"" font-weight=""bold"" fill=""#dc2626"">CAG -> TAG</text>
        <line x1=""245"" y1=""40"" x2=""245"" y2=""45"" stroke=""#dc2626"" stroke-width=""2""/>
        <text x=""370"" y=""25"" font-size=""10"" font-weight=""bold"" fill=""#0f172a"">nucleotide số 3300</text>
        <text x=""370"" y=""38"" font-size=""12"" font-weight=""bold"" fill=""#d97706"">TAG</text>
        <line x1=""380"" y1=""40"" x2=""380"" y2=""45"" stroke=""#d97706"" stroke-width=""2""/>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold"">Đột biến xảy ra tại nucleotide ở vị trí số: <span class=""text-emerald-700 font-bold"">2062</span></div>
</div>";

        // 5. Bài 5: Embedded Base64 Images + SVGs
        dict["b5_28"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 28: HAI GIAI ĐOẠN TRONG CÔNG NGHỆ GENE (Insulin + Plasmid)</div>
    <img src=""{0}"" alt=""Hai giai đoạn trong công nghệ gene"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_17.jpg"));

        dict["b5_29"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 29: QUY TRÌNH TẠO DÊ SẢN XUẤT TƠ NHỆN TRONG SỮA</div>
    <img src=""{0}"" alt=""Quy trình chuyển gene tơ nhện vào dê"" class=""max-h-56 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_18.jpg"));

        dict["b5_30"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 30: NỐI PLASMID VÀ GENE INSULIN TẠO CẤU TRÚC X</div>
    <img src=""{0}"" alt=""Plasmid + Gene insulin -> Cấu trúc X"" class=""max-h-48 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_19.jpg"));

        dict["b5_31"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 31: SƠ ĐỒ TOÀN CẢNH CÔNG NGHỆ DNA TÁI TỔ HỢP</div>
    <img src=""{0}"" alt=""Sơ đồ công nghệ DNA tái tổ hợp"" class=""max-h-72 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_20.jpg"));

        dict["b5_70"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 70 & 71: TẠO ĐẦU DÍNH BẰNG ENZYME CẮT EcoRI</div>
    <svg viewBox=""0 0 550 170"" class=""w-full h-auto max-h-44 mx-auto"">
        <circle cx=""100"" cy=""50"" r=""30"" fill=""none"" stroke=""#0284c7"" stroke-width=""4""/>
        <text x=""100"" y=""15"" font-size=""13"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">Plasmid (1)</text>
        <path d=""M 90,85 L 90,105 M 85,100 L 90,105 L 95,100"" stroke=""#0284c7"" stroke-width=""2""/>
        <text x=""90"" y=""95"" font-size=""10"" font-weight=""bold"" fill=""#0284c7"">Cắt EcoRI</text>
        <circle cx=""100"" cy=""135"" r=""25"" fill=""none"" stroke=""#0284c7"" stroke-width=""4"" stroke-dasharray=""140,20""/>
        <text x=""145"" y=""135"" font-size=""11"" font-weight=""bold"" fill=""#0284c7"">mở vòng (4)</text>
        <rect x=""250"" y=""35"" width=""180"" height=""20"" fill=""#f1f5f9"" stroke=""#475569"" stroke-width=""2"" rx=""3""/>
        <text x=""340"" y=""25"" font-size=""12"" font-weight=""bold"" fill=""#334155"" text-anchor=""middle"">Đoạn DNA ngoại lai mang gene cần chuyển (2)</text>
        <text x=""255"" y=""50"" font-size=""9"" font-family=""monospace"">...GAATTC...</text>
        <text x=""380"" y=""50"" font-size=""9"" font-family=""monospace"">...GAATTC...</text>
        <path d=""M 340,65 L 340,95 M 335,90 L 340,95 L 345,90"" stroke=""#475569"" stroke-width=""2""/>
        <text x=""350"" y=""80"" font-size=""10"" font-weight=""bold"" fill=""#475569"">Cắt EcoRI</text>
        <rect x=""290"" y=""105"" width=""100"" height=""20"" fill=""#fef3c7"" stroke=""#d97706"" stroke-width=""2"" rx=""3""/>
        <text x=""340"" y=""120"" font-size=""11"" font-weight=""bold"" fill=""#b45309"" text-anchor=""middle"">Gene cần chuyển (3)</text>
        <text x=""265"" y=""120"" font-size=""10"" font-weight=""bold"" fill=""#b45309"">AATT-</text>
        <text x=""395"" y=""120"" font-size=""10"" font-weight=""bold"" fill=""#b45309"">-TTAA</text>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold""><span class=""text-blue-700 font-bold"">(1):</span> Plasmid | <span class=""text-slate-700 font-bold"">(2):</span> DNA mang gen | <span class=""text-amber-700 font-bold"">(3):</span> Gen cần chuyển | <span class=""text-blue-700 font-bold"">(4):</span> Plasmid mở vòng</div>
</div>";
        dict["b5_71"] = dict["b5_70"];

        dict["b5_72"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 72 & 73: BƯỚC GHÉP NỐI TẠO DNA TÁI TỔ HỢP</div>
    <img src=""{0}"" alt=""Ghép nối DNA ngoại lai và plasmid"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_21.jpg"));
        dict["b5_73"] = dict["b5_72"];

        dict["b5_76"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 76: QUY TRÌNH CHUYỂN GENE TẾ BÀO NGƯỜI VÀO VI KHUẨN</div>
    <svg viewBox=""0 0 520 180"" class=""w-full h-auto max-h-44 mx-auto"">
        <rect x=""20"" y=""20"" width=""90"" height=""60"" fill=""#f8fafc"" stroke=""#475569"" stroke-width=""2"" rx=""8""/>
        <text x=""65"" y=""40"" font-size=""11"" font-weight=""bold"" text-anchor=""middle"">Tế bào người</text>
        <circle cx=""65"" cy=""60"" r=""12"" fill=""#e2e8f0"" stroke=""#334155"" stroke-width=""1.5""/>
        <path d=""M 115,50 L 165,50 M 160,45 L 165,50 L 160,55"" stroke=""#0f172a"" stroke-width=""2""/>
        <rect x=""175"" y=""40"" width=""50"" height=""20"" fill=""#dbeafe"" stroke=""#2563eb"" stroke-width=""1.5"" rx=""3""/>
        <text x=""200"" y=""55"" font-size=""10"" font-weight=""bold"" fill=""#1e40af"" text-anchor=""middle"">Gene</text>
        <rect x=""20"" y=""105"" width=""90"" height=""60"" fill=""#f0fdf4"" stroke=""#16a34a"" stroke-width=""2"" rx=""8""/>
        <text x=""65"" y=""125"" font-size=""11"" font-weight=""bold"" text-anchor=""middle"">Tế bào vi khuẩn</text>
        <circle cx=""65"" cy=""145"" r=""10"" fill=""none"" stroke=""#059669"" stroke-width=""2""/>
        <path d=""M 115,135 L 165,135 M 160,130 L 165,135 L 160,140"" stroke=""#0f172a"" stroke-width=""2""/>
        <circle cx=""190"" cy=""135"" r=""14"" fill=""none"" stroke=""#059669"" stroke-width=""2.5""/>
        <text x=""190"" y=""165"" font-size=""10"" font-weight=""bold"" fill=""#166534"" text-anchor=""middle"">Plasmid</text>
        <path d=""M 230,50 L 280,85 M 210,130 L 280,95"" stroke=""#0f172a"" stroke-width=""2""/>
        <circle cx=""310"" cy=""90"" r=""20"" fill=""none"" stroke=""#059669"" stroke-width=""3""/>
        <path d=""M 326,78 A 20 20 0 0 1 330 90"" stroke=""#2563eb"" stroke-width=""5"" fill=""none""/>
        <text x=""310"" y=""125"" font-size=""11"" font-weight=""bold"" fill=""#047857"" text-anchor=""middle"">DNA tái tổ hợp</text>
        <path d=""M 345,90 L 395,90 M 390,85 L 395,90 L 390,95"" stroke=""#0f172a"" stroke-width=""2""/>
        <rect x=""405"" y=""60"" width=""100"" height=""60"" fill=""#f0fdf4"" stroke=""#16a34a"" stroke-width=""2"" rx=""10""/>
        <circle cx=""435"" cy=""90"" r=""14"" fill=""none"" stroke=""#059669"" stroke-width=""2.5""/>
        <path d=""M 446,82 A 14 14 0 0 1 449 90"" stroke=""#2563eb"" stroke-width=""4"" fill=""none""/>
        <text x=""455"" y=""135"" font-size=""10"" font-weight=""bold"" fill=""#166534"" text-anchor=""middle"">Vi khuẩn mang gen</text>
    </svg>
</div>";

        dict["b5_77"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 77: CẮT MỞ VÒNG PLASMID VÀ GẮN NỐI TẠO CẤU TRÚC X</div>
    <img src=""{0}"" alt=""Cắt mở vòng plasmid và nối gene tạo cấu trúc X"" class=""max-h-52 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_22.jpg"));

        dict["b5_79"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 79: QUY TRÌNH CÔNG NGHỆ GENE VỚI CÁC BƯỚC (1) ĐẾN (6)</div>
    <svg viewBox=""0 0 550 170"" class=""w-full h-auto max-h-44 mx-auto"">
        <rect x=""30"" y=""30"" width=""120"" height=""25"" fill=""#f1f5f9"" stroke=""#475569"" stroke-width=""2"" rx=""4""/>
        <text x=""90"" y=""46"" font-size=""11"" font-weight=""bold"" text-anchor=""middle"">Gene cần chuyển</text>
        <polygon points=""90,15 85,25 95,25"" fill=""#ef4444""/>
        <text x=""90"" y=""10"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"" text-anchor=""middle"">1</text>
        <path d=""M 155,42 L 205,42 M 200,37 L 205,42 L 200,47"" stroke=""#475569"" stroke-width=""2""/>
        <text x=""180"" y=""35"" font-size=""11"" font-weight=""bold"" fill=""#0f172a"">2</text>
        <circle cx=""90"" cy=""125"" r=""25"" fill=""none"" stroke=""#0284c7"" stroke-width=""3""/>
        <text x=""90"" y=""165"" font-size=""11"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">Plasmid</text>
        <polygon points=""90,85 85,95 95,95"" fill=""#ef4444""/>
        <text x=""90"" y=""80"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"" text-anchor=""middle"">6</text>
        <path d=""M 120,125 L 175,125 M 170,120 L 175,125 L 170,130"" stroke=""#0284c7"" stroke-width=""2""/>
        <path d=""M 210,45 L 260,75 M 180,125 L 255,95"" stroke=""#0f172a"" stroke-width=""2""/>
        <circle cx=""300"" cy=""85"" r=""30"" fill=""none"" stroke=""#059669"" stroke-width=""3.5""/>
        <text x=""300"" y=""90"" font-size=""13"" font-weight=""bold"" fill=""#065f46"" text-anchor=""middle"">4</text>
        <polygon points=""265,55 260,65 270,65"" fill=""#3b82f6""/>
        <text x=""265"" y=""50"" font-size=""11"" font-weight=""bold"" fill=""#2563eb"" text-anchor=""middle"">3</text>
        <polygon points=""340,115 335,125 345,125"" fill=""#3b82f6""/>
        <text x=""340"" y=""140"" font-size=""11"" font-weight=""bold"" fill=""#2563eb"" text-anchor=""middle"">5</text>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold""><span class=""text-red-600 font-bold"">(1), (6):</span> Cùng loại restrictase | <span class=""text-blue-600 font-bold"">(3), (5):</span> Ligase | <span class=""text-slate-800 font-bold"">(2):</span> Gen cần chuyển | <span class=""text-emerald-700 font-bold"">(4):</span> DNA tái tổ hợp</div>
</div>";

        dict["b5_80"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 80: TẠO PLASMID Z TỪ PLASMID T (3978 bp) VÀ GENE M (1700 bp)</div>
    <svg viewBox=""0 0 520 180"" class=""w-full h-auto max-h-44 mx-auto"">
        <rect x=""30"" y=""35"" width=""200"" height=""20"" fill=""#e2e8f0"" stroke=""#475569"" stroke-width=""1.5"" rx=""3""/>
        <rect x=""75"" y=""35"" width=""100"" height=""20"" fill=""#fef08a"" stroke=""#ca8a04"" stroke-width=""2""/>
        <text x=""125"" y=""50"" font-size=""11"" font-weight=""bold"" fill=""#854d0e"" text-anchor=""middle"">Gene M (1700 bp)</text>
        <text x=""50"" y=""25"" font-size=""10"" fill=""#64748b"">950 bp</text>
        <text x=""200"" y=""25"" font-size=""10"" fill=""#64748b"">700 bp</text>
        <polygon points=""75,32 71,24 79,24"" fill=""#dc2626""/>
        <text x=""75"" y=""20"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"" text-anchor=""middle"">S</text>
        <polygon points=""175,32 171,24 179,24"" fill=""#dc2626""/>
        <text x=""175"" y=""20"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"" text-anchor=""middle"">S</text>
        <circle cx=""125"" cy=""130"" r=""28"" fill=""none"" stroke=""#0284c7"" stroke-width=""3""/>
        <text x=""125"" y=""125"" font-size=""10"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">Plasmid T</text>
        <text x=""125"" y=""138"" font-size=""10"" fill=""#0369a1"" text-anchor=""middle"">(3978 bp)</text>
        <polygon points=""125,98 121,90 129,90"" fill=""#dc2626""/>
        <text x=""125"" y=""86"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"" text-anchor=""middle"">S</text>
        <circle cx=""380"" cy=""95"" r=""40"" fill=""none"" stroke=""#0284c7"" stroke-width=""3.5""/>
        <path d=""M 352,67 A 40 40 0 0 1 408,67"" stroke=""#ca8a04"" stroke-width=""6"" fill=""none""/>
        <text x=""380"" y=""60"" font-size=""11"" font-weight=""bold"" fill=""#854d0e"" text-anchor=""middle"">Gene M</text>
        <text x=""380"" y=""100"" font-size=""13"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">Plasmid Z</text>
        <polygon points=""352,63 348,55 356,55"" fill=""#dc2626""/>
        <polygon points=""408,63 404,55 412,55"" fill=""#dc2626""/>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold"">Kích thước Plasmid Z = 3978 + 1700 = <span class=""text-emerald-700 font-bold"">5678 cặp nucleotide (bp)</span></div>
</div>";

        dict["b5_82"] = @"
<div class=""my-3 p-3 bg-white border border-slate-300 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-800 mb-2"">HÌNH CÂU 82: 4 GIAI ĐOẠN TRONG CÔNG NGHỆ DNA TÁI TỔ HỢP</div>
    <svg viewBox=""0 0 520 180"" class=""w-full h-auto max-h-44 mx-auto"">
        <rect x=""20"" y=""25"" width=""85"" height=""50"" fill=""#f8fafc"" stroke=""#475569"" stroke-width=""2"" rx=""6""/>
        <text x=""62"" y=""45"" font-size=""10"" font-weight=""bold"" text-anchor=""middle"">Tế bào người</text>
        <text x=""62"" y=""60"" font-size=""9"" fill=""#64748b"" text-anchor=""middle"">(Chứa gen)</text>
        <path d=""M 110,45 L 170,45 M 165,40 L 170,45 L 165,50"" stroke=""#475569"" stroke-width=""2""/>
        <text x=""140"" y=""38"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"">(1)</text>
        <text x=""180"" y=""40"" font-size=""10"" font-weight=""bold"" fill=""#b45309"">Gene cần chuyển</text>
        <rect x=""20"" y=""105"" width=""85"" height=""50"" fill=""#f0fdf4"" stroke=""#16a34a"" stroke-width=""2"" rx=""6""/>
        <text x=""62"" y=""125"" font-size=""10"" font-weight=""bold"" text-anchor=""middle"">Tế bào vi khuẩn</text>
        <text x=""62"" y=""140"" font-size=""9"" fill=""#64748b"" text-anchor=""middle"">(Chứa plasmid)</text>
        <path d=""M 110,125 L 170,125 M 165,120 L 170,125 L 165,130"" stroke=""#16a34a"" stroke-width=""2""/>
        <text x=""140"" y=""118"" font-size=""11"" font-weight=""bold"" fill=""#dc2626"">(2)</text>
        <circle cx=""190"" cy=""125"" r=""14"" fill=""none"" stroke=""#0284c7"" stroke-width=""2.5""/>
        <text x=""190"" y=""150"" font-size=""9"" font-weight=""bold"" fill=""#0369a1"" text-anchor=""middle"">Plasmid</text>
        <path d=""M 230,50 L 270,75 M 215,120 L 270,85"" stroke=""#0f172a"" stroke-width=""2""/>
        <text x=""255"" y=""70"" font-size=""11"" font-weight=""bold"" fill=""#2563eb"">(3)</text>
        <circle cx=""295"" cy=""80"" r=""18"" fill=""none"" stroke=""#059669"" stroke-width=""3""/>
        <text x=""295"" y=""110"" font-size=""10"" font-weight=""bold"" fill=""#047857"" text-anchor=""middle"">DNA tái tổ hợp</text>
        <path d=""M 325,80 L 375,80 M 370,75 L 375,80 L 370,85"" stroke=""#0f172a"" stroke-width=""2""/>
        <text x=""350"" y=""73"" font-size=""11"" font-weight=""bold"" fill=""#7c3aed"">(4)</text>
        <rect x=""385"" y=""50"" width=""115"" height=""60"" fill=""#f0fdf4"" stroke=""#16a34a"" stroke-width=""2"" rx=""8""/>
        <circle cx=""420"" cy=""80"" r=""14"" fill=""none"" stroke=""#059669"" stroke-width=""2.5""/>
        <text x=""442"" y=""125"" font-size=""9"" font-weight=""bold"" fill=""#166534"" text-anchor=""middle"">Tế bào vi khuẩn chứa DNA tái tổ hợp</text>
    </svg>
    <div class=""text-xs text-slate-600 mt-1 font-semibold""><span class=""text-red-600 font-bold"">Giai đoạn (1) và (2)</span> cần sử dụng enzyme restrictase (cắt DNA người và cắt mở vòng plasmid) => Có <span class=""text-emerald-700 font-bold"">2</span> giai đoạn.</div>
</div>";

        dict["b5_83"] = string.Format(@"
<div class=""my-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center"">
    <div class=""text-xs font-bold text-slate-700 mb-2"">HÌNH CÂU 83: 5 GIAI ĐOẠN TRONG CÔNG NGHỆ DNA TÁI TỔ HỢP</div>
    <img src=""{0}"" alt=""Biến nạp DNA tái tổ hợp vào tế bào nhận"" class=""max-h-64 mx-auto rounded object-contain border border-slate-100"" />
</div>", getB64("pdf_img_23.jpg"));

        var sb = new StringBuilder();
        sb.AppendLine("// =========================================================================");
        sb.AppendLine("// THƯ VIỆN ĐỒ HOẠ MINH HOẠ CHUẨN 100% ĐỀ CƯƠNG & SGK SINH HỌC 12 GDPT 2018");
        sb.AppendLine("// CHỨA CÁC ẢNH GỐC TỪ ĐỀ CƯƠNG (BASE64) + SƠ ĐỒ VECTOR CHUẨN KHOA HỌC");
        sb.AppendLine("// CHẠY OFFLINE 100% - KHÔNG CẦN KẾT NỐI MẠNG HOẶC HOST NGOÀI");
        sb.AppendLine("// =========================================================================");
        sb.AppendLine("window.BIO_DIAGRAMS = {");

        int count = 0;
        foreach (var kvp in dict) {
            count++;
            string comma = count < dict.Count ? "," : "";
            sb.AppendLine("    \"" + kvp.Key + "\": `" + kvp.Value + "`" + comma);
        }

        sb.AppendLine("};");
        File.WriteAllText(outPath, sb.ToString(), Encoding.UTF8);
        Console.WriteLine("Successfully generated diagrams.js with " + dict.Count + " diagrams!");
    }
}
