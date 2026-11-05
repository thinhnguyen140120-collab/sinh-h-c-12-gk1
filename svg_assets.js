// Thư viện hình vẽ vector SVG nội tuyến chuyên nghiệp cho Sinh học 12
const svgAssets = {
    // 1. Đơn vị tái bản DNA (chạc 2 phía, mạch I, II, III, IV)
    donViTaiBan: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 650 220" class="w-full max-w-2xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="325" y="24" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Sơ đồ một đơn vị tái bản (nhân đôi) DNA</text>
            <!-- Mạch khuôn DNA mẹ -->
            <path d="M 50 70 Q 150 70 230 45 Q 325 30 420 45 Q 500 70 600 70" stroke="#334155" stroke-width="3.5" fill="none" />
            <path d="M 50 150 Q 150 150 230 175 Q 325 190 420 175 Q 500 150 600 150" stroke="#334155" stroke-width="3.5" fill="none" />
            <text x="30" y="75" font-size="13" font-weight="bold" fill="#dc2626">3'</text>
            <text x="30" y="155" font-size="13" font-weight="bold" fill="#2563eb">5'</text>
            <text x="615" y="75" font-size="13" font-weight="bold" fill="#2563eb">5'</text>
            <text x="615" y="155" font-size="13" font-weight="bold" fill="#dc2626">3'</text>
            
            <!-- Enzyme tháo xoắn bên trái -->
            <circle cx="160" cy="110" r="18" fill="#0284c7" />
            <text x="160" y="114" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">Helicase</text>
            <path d="M 130 110 L 90 110 M 100 100 L 90 110 L 100 120" stroke="#0284c7" stroke-width="3" fill="none" />
            <text x="110" y="95" font-size="11" fill="#0369a1" font-weight="bold">Tháo xoắn ←</text>

            <!-- Enzyme tháo xoắn bên phải -->
            <circle cx="490" cy="110" r="18" fill="#0284c7" />
            <text x="490" y="114" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">Helicase</text>
            <path d="M 520 110 L 560 110 M 550 100 L 560 110 L 550 120" stroke="#0284c7" stroke-width="3" fill="none" />
            <text x="540" y="95" font-size="11" fill="#0369a1" font-weight="bold">→ Tháo xoắn</text>

            <!-- Mạch mới tổng hợp I (gián đoạn Okazaki) -->
            <g stroke="#e11d48" stroke-width="3">
                <line x1="280" y1="58" x2="230" y2="68" stroke-dasharray="8,4" />
                <line x1="220" y1="70" x2="175" y2="78" stroke-dasharray="8,4" />
                <polygon points="175,78 185,73 185,83" fill="#e11d48" />
            </g>
            <rect x="235" y="48" width="22" height="20" rx="4" fill="#fef2f2" stroke="#e11d48" />
            <text x="246" y="63" font-size="12" font-weight="bold" fill="#e11d48" text-anchor="middle">I</text>
            <text x="246" y="88" font-size="10" fill="#dc2626" font-weight="bold" text-anchor="middle">(gián đoạn)</text>

            <!-- Mạch mới tổng hợp III (liên tục) -->
            <g stroke="#16a34a" stroke-width="3">
                <path d="M 320 168 Q 230 160 180 142" fill="none" />
                <polygon points="180,142 192,142 188,152" fill="#16a34a" />
            </g>
            <rect x="235" y="152" width="22" height="20" rx="4" fill="#f0fdf4" stroke="#16a34a" />
            <text x="246" y="167" font-size="12" font-weight="bold" fill="#16a34a" text-anchor="middle">III</text>
            <text x="246" y="145" font-size="10" fill="#15803d" font-weight="bold" text-anchor="middle">(liên tục)</text>

            <!-- Mạch mới tổng hợp II (liên tục) -->
            <g stroke="#16a34a" stroke-width="3">
                <path d="M 330 52 Q 420 60 470 78" fill="none" />
                <polygon points="470,78 458,78 462,68" fill="#16a34a" />
            </g>
            <rect x="395" y="48" width="22" height="20" rx="4" fill="#f0fdf4" stroke="#16a34a" />
            <text x="406" y="63" font-size="12" font-weight="bold" fill="#16a34a" text-anchor="middle">II</text>
            <text x="406" y="88" font-size="10" fill="#15803d" font-weight="bold" text-anchor="middle">(liên tục)</text>

            <!-- Mạch mới tổng hợp IV (gián đoạn Okazaki) -->
            <g stroke="#e11d48" stroke-width="3">
                <line x1="370" y1="162" x2="420" y2="152" stroke-dasharray="8,4" />
                <line x1="430" y1="150" x2="475" y2="142" stroke-dasharray="8,4" />
                <polygon points="475,142 465,137 465,147" fill="#e11d48" />
            </g>
            <rect x="395" y="152" width="22" height="20" rx="4" fill="#fef2f2" stroke="#e11d48" />
            <text x="406" y="167" font-size="12" font-weight="bold" fill="#e11d48" text-anchor="middle">IV</text>
            <text x="406" y="145" font-size="10" fill="#dc2626" font-weight="bold" text-anchor="middle">(gián đoạn)</text>
        </svg>
    </div>
    `,

    // 2. Chạc chữ Y nhân đôi (Câu 16)
    chacChuY: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 650 190" class="w-full max-w-2xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="325" y="22" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Sơ đồ II: Kéo dài mạch polynucleotide mới trên 1 chạc chữ Y</text>
            <!-- Chạc chữ Y -->
            <path d="M 80 50 L 350 50 L 550 20" stroke="#334155" stroke-width="3.5" fill="none" />
            <path d="M 80 145 L 350 145 L 550 175" stroke="#334155" stroke-width="3.5" fill="none" />
            <text x="50" y="55" font-size="13" font-weight="bold" fill="#dc2626">3'</text>
            <text x="50" y="150" font-size="13" font-weight="bold" fill="#2563eb">5'</text>
            <text x="560" y="25" font-size="13" font-weight="bold" fill="#dc2626">3'</text>
            <text x="560" y="180" font-size="13" font-weight="bold" fill="#2563eb">5'</text>

            <!-- Enzyme tháo xoắn -->
            <polygon points="350,97 380,75 380,120" fill="#f59e0b" stroke="#d97706" />
            <text x="415" y="102" font-size="12" font-weight="bold" fill="#b45309">Chiều tháo xoắn →</text>

            <!-- Mạch trên: khuôn 3'->5', mạch mới 5'->3' liên tục cùng chiều chạc -->
            <path d="M 120 70 L 340 70" stroke="#16a34a" stroke-width="3.5" fill="none" />
            <polygon points="340,70 328,65 328,75" fill="#16a34a" />
            <text x="120" y="90" font-size="11" font-weight="bold" fill="#16a34a">5' ── Mạch liên tục (cùng chiều tháo xoắn) ──► 3'</text>

            <!-- Mạch dưới: khuôn 5'->3', mạch mới 5'->3' ngược chiều chạc (đoạn Okazaki gián đoạn) -->
            <g stroke="#e11d48" stroke-width="3.5">
                <line x1="330" y1="125" x2="260" y2="125" />
                <polygon points="260,125 270,120 270,130" fill="#e11d48" />
                <line x1="240" y1="125" x2="170" y2="125" />
                <polygon points="170,125 180,120 180,130" fill="#e11d48" />
            </g>
            <text x="170" y="112" font-size="11" font-weight="bold" fill="#e11d48">◄── Đoạn Okazaki (gián đoạn, ngược chiều) ── 5'</text>
        </svg>
    </div>
    `,

    // 3. Liên kết hydro đoạn DNA (Câu 27: T=A, G≡C, T=A, C≡G, A=T => 12 liên kết)
    lkHydroDNA: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 500 155" class="w-full max-w-lg mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="250" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Đoạn DNA với 5 cặp nucleotide: T - G - T - C - A</text>
            <g transform="translate(60, 35)">
                <!-- Mạch 1 -->
                <rect x="20" y="10" width="50" height="28" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="45" y="29" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">T</text>
                <rect x="90" y="10" width="50" height="28" rx="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
                <text x="115" y="29" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">G</text>
                <rect x="160" y="10" width="50" height="28" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="185" y="29" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">T</text>
                <rect x="230" y="10" width="50" height="28" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
                <text x="255" y="29" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">C</text>
                <rect x="300" y="10" width="50" height="28" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
                <text x="325" y="29" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">A</text>

                <!-- Liên kết hydro -->
                <line x1="40" y1="38" x2="40" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="50" y1="38" x2="50" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <text x="45" y="54" font-size="10" fill="#64748b" font-weight="bold" text-anchor="middle">2 lk</text>

                <line x1="108" y1="38" x2="108" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="115" y1="38" x2="115" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="122" y1="38" x2="122" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <text x="115" y="54" font-size="10" fill="#64748b" font-weight="bold" text-anchor="middle">3 lk</text>

                <line x1="180" y1="38" x2="180" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="190" y1="38" x2="190" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <text x="185" y="54" font-size="10" fill="#64748b" font-weight="bold" text-anchor="middle">2 lk</text>

                <line x1="248" y1="38" x2="248" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="255" y1="38" x2="255" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="262" y1="38" x2="262" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <text x="255" y="54" font-size="10" fill="#64748b" font-weight="bold" text-anchor="middle">3 lk</text>

                <line x1="320" y1="38" x2="320" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <line x1="330" y1="38" x2="330" y2="62" stroke="#64748b" stroke-width="2" stroke-dasharray="3,3" />
                <text x="325" y="54" font-size="10" fill="#64748b" font-weight="bold" text-anchor="middle">2 lk</text>

                <!-- Mạch 2 -->
                <rect x="20" y="62" width="50" height="28" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
                <text x="45" y="81" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">A</text>
                <rect x="90" y="62" width="50" height="28" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
                <text x="115" y="81" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">C</text>
                <rect x="160" y="62" width="50" height="28" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
                <text x="185" y="81" font-size="14" font-weight="bold" fill="#15803d" text-anchor="middle">A</text>
                <rect x="230" y="62" width="50" height="28" rx="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
                <text x="255" y="81" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">G</text>
                <rect x="300" y="62" width="50" height="28" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="325" y="81" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">T</text>
            </g>
            <text x="250" y="145" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">Tổng liên kết H = 2 + 3 + 2 + 3 + 2 = 12 liên kết</text>
        </svg>
    </div>
    `,

    // 4. Operon Lac ở vi khuẩn E. coli (Bài 3)
    operonLac: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 650 195" class="w-full max-w-2xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="325" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Mô hình cấu trúc & hoạt động của Operon Lac (E. coli)</text>
            <g transform="translate(30, 38)">
                <rect x="10" y="10" width="70" height="32" fill="#cbd5e1" stroke="#64748b" stroke-width="2" rx="4" />
                <text x="45" y="30" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">Gen lacI</text>
                
                <rect x="120" y="10" width="55" height="32" fill="#fef08a" stroke="#ca8a04" stroke-width="2" rx="4" />
                <text x="147" y="30" font-size="11" font-weight="bold" fill="#854d0e" text-anchor="middle">Vùng P</text>

                <rect x="175" y="10" width="55" height="32" fill="#fed7aa" stroke="#ea580c" stroke-width="2" rx="4" />
                <text x="202" y="30" font-size="11" font-weight="bold" fill="#9a3412" text-anchor="middle">Vùng O</text>

                <rect x="240" y="10" width="90" height="32" fill="#bbf7d0" stroke="#16a34a" stroke-width="2" rx="4" />
                <text x="285" y="30" font-size="11" font-weight="bold" fill="#14532d" text-anchor="middle">Gen lacZ</text>

                <rect x="330" y="10" width="80" height="32" fill="#99f6e4" stroke="#0d9488" stroke-width="2" rx="4" />
                <text x="370" y="30" font-size="11" font-weight="bold" fill="#115e59" text-anchor="middle">Gen lacY</text>

                <rect x="410" y="10" width="80" height="32" fill="#bae6fd" stroke="#0284c7" stroke-width="2" rx="4" />
                <text x="450" y="30" font-size="11" font-weight="bold" fill="#075985" text-anchor="middle">Gen lacA</text>

                <path d="M 120 4 L 120 -4 L 490 -4 L 490 4" stroke="#ea580c" stroke-width="2" fill="none" />
                <text x="305" y="-7" font-size="10" font-weight="bold" fill="#ea580c" text-anchor="middle">CẤU TRÚC OPERON LAC (Vùng P, Vùng O, lacZ, lacY, lacA)</text>

                <path d="M 45 42 L 45 65" stroke="#64748b" stroke-width="2" />
                <rect x="15" y="65" width="60" height="24" fill="#e2e8f0" rx="12" />
                <text x="45" y="81" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Protein ức chế</text>

                <circle cx="110" cy="77" r="9" fill="#f43f5e" />
                <text x="110" y="80" font-size="8" fill="#ffffff" font-weight="bold" text-anchor="middle">Lac</text>
                <text x="110" y="98" font-size="9" fill="#e11d48" font-weight="bold" text-anchor="middle">Allolactose</text>
                <path d="M 98 77 L 78 77" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="2,2" />

                <path d="M 285 42 L 285 65" stroke="#16a34a" stroke-width="2" />
                <text x="285" y="80" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">β-galactosidase</text>

                <path d="M 370 42 L 370 65" stroke="#0d9488" stroke-width="2" />
                <text x="370" y="80" font-size="10" font-weight="bold" fill="#0f766e" text-anchor="middle">Permease</text>

                <path d="M 450 42 L 450 65" stroke="#0284c7" stroke-width="2" />
                <text x="450" y="80" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">Transacetylase</text>
            </g>
        </svg>
    </div>
    `,

    // 5. Ba dạng đột biến điểm (Bài 4 - Câu 20 & 55)
    dotBienDiem: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 650 175" class="w-full max-w-2xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="325" y="18" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Ba dạng đột biến điểm: Mất (a), Thêm (b), Thay thế (c)</text>
            <rect x="220" y="28" width="210" height="26" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" rx="4" />
            <text x="325" y="45" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a" text-anchor="middle">TAC CA-A TA CGC</text>
            <text x="325" y="24" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">Đoạn DNA ban đầu</text>

            <!-- Hình a -->
            <g transform="translate(40, 80)">
                <rect x="0" y="0" width="160" height="42" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" rx="5" />
                <text x="80" y="16" font-size="11" font-weight="bold" fill="#b91c1c" text-anchor="middle">Hình a: Mất 1 cặp A-T</text>
                <text x="80" y="32" font-size="10" font-family="monospace" fill="#991b1b" text-anchor="middle">TAC CA_ TA CGC</text>
            </g>

            <!-- Hình b -->
            <g transform="translate(245, 80)">
                <rect x="0" y="0" width="160" height="42" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" rx="5" />
                <text x="80" y="16" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">Hình b: Thêm 1 cặp C-G</text>
                <text x="80" y="32" font-size="10" font-family="monospace" fill="#166534" text-anchor="middle">TAC CAC A TA CGC</text>
            </g>

            <!-- Hình c -->
            <g transform="translate(450, 80)">
                <rect x="0" y="0" width="160" height="42" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" rx="5" />
                <text x="80" y="16" font-size="11" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Hình c: Thay thế A-T → G-C</text>
                <text x="80" y="32" font-size="10" font-family="monospace" fill="#1e40af" text-anchor="middle">TAC CAG TA CGC</text>
            </g>

            <text x="325" y="155" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">Đột biến thêm 1 cặp nucleotide là Hình b (Option C)</text>
        </svg>
    </div>
    `,

    // 6. Kỹ thuật DNA tái tổ hợp (Bài 5 - Câu 70, 71, 72, 73, 77)
    taiToHopPlasmid: `
    <div class="my-4 flex flex-col items-center">
        <svg viewBox="0 0 650 190" class="w-full max-w-2xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
            <text x="325" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Kỹ thuật tạo phân tử DNA tái tổ hợp và chuyển vào tế bào nhận</text>
            <g transform="translate(30, 35)">
                <!-- Plasmid (1) -->
                <circle cx="80" cy="50" r="32" fill="none" stroke="#0284c7" stroke-width="4" stroke-dasharray="190,10" />
                <text x="80" y="54" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">Plasmid (1)</text>

                <!-- Restrictase -->
                <path d="M 125 50 L 165 50" stroke="#f59e0b" stroke-width="2" />
                <text x="145" y="42" font-size="9" font-weight="bold" fill="#b45309" text-anchor="middle">Cắt</text>

                <!-- Mở vòng -->
                <path d="M 230 25 A 32 32 0 1 0 230 75" fill="none" stroke="#0284c7" stroke-width="4" />
                <text x="205" y="54" font-size="10" font-weight="bold" fill="#0369a1" text-anchor="middle">Mở vòng</text>

                <!-- Gen cần chuyển (2) -->
                <rect x="270" y="42" width="50" height="16" rx="3" fill="#10b981" stroke="#059669" stroke-width="1.5" />
                <text x="295" y="54" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">Gen cần (2)</text>

                <!-- Ligase -->
                <path d="M 335 50 L 375 50" stroke="#10b981" stroke-width="2" />
                <text x="355" y="42" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">Ligase</text>

                <!-- DNA tái tổ hợp -->
                <path d="M 450 25 A 32 32 0 1 0 450 75" fill="none" stroke="#0284c7" stroke-width="4" />
                <path d="M 450 25 A 32 32 0 0 1 450 75" fill="none" stroke="#10b981" stroke-width="6" />
                <text x="425" y="51" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">DNA tái tổ hợp</text>
                <text x="425" y="65" font-size="9" fill="#059669" font-weight="bold" text-anchor="middle">(Cấu trúc X)</text>

                <!-- Biến nạp -->
                <path d="M 475 50 L 515 50" stroke="#6366f1" stroke-width="2" />
                <rect x="525" y="20" width="75" height="60" rx="12" fill="#f8fafc" stroke="#6366f1" stroke-width="2" />
                <text x="562" y="46" font-size="10" font-weight="bold" fill="#4338ca" text-anchor="middle">Tế bào</text>
                <text x="562" y="60" font-size="10" font-weight="bold" fill="#4338ca" text-anchor="middle">vi khuẩn nhận</text>
            </g>
        </svg>
    </div>
    `
};

// =========================================================================
// BỔ SUNG CÁC HÌNH VẼ VECTOR SVG CHI TIẾT (BÀI 3, BÀI 4, BÀI 5)
// =========================================================================

// 7. Đồ thị biểu hiện gen Z (Bài 3 - Câu 43)
svgAssets.doThiGenZ = `
<div class="my-4 flex flex-col items-center">
    <svg viewBox="0 0 600 220" class="w-full max-w-xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Đồ thị biểu hiện của gen Z mã hoá enzyme β-galactosidase</text>
        
        <!-- Trục tọa độ -->
        <line x1="60" y1="180" x2="550" y2="180" stroke="#475569" stroke-width="2" />
        <line x1="60" y1="180" x2="60" y2="40" stroke="#475569" stroke-width="2" />
        <polygon points="550,180 540,175 540,185" fill="#475569" />
        <polygon points="60,40 55,50 65,50" fill="#475569" />

        <!-- Nhãn trục -->
        <text x="540" y="200" font-size="11" font-weight="bold" fill="#475569">Thời gian (Phút)</text>
        <text x="30" y="45" font-size="11" font-weight="bold" fill="#475569" transform="rotate(-90 40,55)">Đơn vị tương đối</text>

        <!-- Mốc thời gian -->
        <text x="60" y="195" font-size="10" fill="#64748b" text-anchor="middle">0</text>
        <text x="140" y="195" font-size="10" fill="#64748b" text-anchor="middle">3' (Thêm Lac)</text>
        <line x1="140" y1="180" x2="140" y2="45" stroke="#cbd5e1" stroke-dasharray="3,3" />
        <text x="240" y="195" font-size="10" fill="#64748b" text-anchor="middle">5'</text>
        <text x="360" y="195" font-size="10" fill="#64748b" text-anchor="middle">10' (Hết Lac)</text>
        <line x1="360" y1="180" x2="360" y2="45" stroke="#cbd5e1" stroke-dasharray="3,3" />
        <text x="480" y="195" font-size="10" fill="#64748b" text-anchor="middle">15'</text>

        <!-- Đường (1): Lượng mRNA (đỉnh cao ở phút 8, sau phút 10 giảm mạnh về 0) -->
        <path d="M 60 178 L 140 178 Q 220 50 280 60 Q 340 70 360 120 Q 400 175 460 178 L 520 178" fill="none" stroke="#e11d48" stroke-width="3" />
        <text x="290" y="55" font-size="11" font-weight="bold" fill="#e11d48">Đường (1): mRNA gen Z</text>

        <!-- Đường (2): Lượng enzyme beta-galactosidase (tăng chậm hơn, duy trì bền vững hơn) -->
        <path d="M 60 178 L 160 178 Q 240 150 320 90 Q 400 65 520 65" fill="none" stroke="#2563eb" stroke-width="3" stroke-dasharray="5,2" />
        <text x="450" y="58" font-size="11" font-weight="bold" fill="#2563eb">Đường (2): Enzyme protein</text>
    </svg>
</div>
`;

// 8. Đột biến gen gây bệnh X: CGT -> AGT (Bài 4 - Câu 57)
svgAssets.benhXDotBien = `
<div class="my-4 flex flex-col items-center">
    <svg viewBox="0 0 600 210" class="w-full max-w-xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Sơ đồ đột biến điểm gây bệnh X: Thay thế cặp G-C thành T-A</text>
        
        <!-- Cột Bình Thường -->
        <g transform="translate(80, 35)">
            <rect x="0" y="0" width="180" height="160" rx="8" fill="#f0fdf4" stroke="#86efac" />
            <text x="90" y="20" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">Kiểu dại (Bình thường)</text>
            
            <text x="20" y="50" font-size="11" fill="#475569">DNA:</text>
            <text x="65" y="50" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">- CGT -</text>
            <text x="65" y="65" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">- GCA -</text>

            <text x="20" y="95" font-size="11" fill="#475569">mRNA:</text>
            <text x="75" y="95" font-size="12" font-family="monospace" font-weight="bold" fill="#059669">- CGU -</text>

            <text x="20" y="125" font-size="11" fill="#475569">tRNA:</text>
            <text x="75" y="125" font-size="12" font-family="monospace" font-weight="bold" fill="#0d9488">- GCA -</text>

            <text x="20" y="150" font-size="11" fill="#475569">A.acid:</text>
            <rect x="75" y="137" width="50" height="18" rx="4" fill="#22c55e" />
            <text x="100" y="150" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Arginine</text>
        </g>

        <!-- Cột Bệnh X (Đột biến) -->
        <g transform="translate(340, 35)">
            <rect x="0" y="0" width="180" height="160" rx="8" fill="#fef2f2" stroke="#fca5a5" />
            <text x="90" y="20" font-size="12" font-weight="bold" fill="#991b1b" text-anchor="middle">Thể đột biến (Bệnh X)</text>
            
            <text x="20" y="50" font-size="11" fill="#475569">DNA:</text>
            <text x="65" y="50" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">- AGT -</text>
            <text x="65" y="65" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">- TCA -</text>

            <text x="20" y="95" font-size="11" fill="#475569">mRNA:</text>
            <rect x="70" y="82" width="60" height="18" rx="3" fill="#ffffff" stroke="#ef4444" />
            <text x="100" y="95" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">(i) AGU</text>

            <text x="20" y="125" font-size="11" fill="#475569">tRNA:</text>
            <rect x="70" y="112" width="60" height="18" rx="3" fill="#ffffff" stroke="#ef4444" />
            <text x="100" y="125" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">(ii) UCA</text>

            <text x="20" y="150" font-size="11" fill="#475569">A.acid:</text>
            <rect x="70" y="137" width="80" height="18" rx="4" fill="#ef4444" />
            <text x="110" y="150" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">(iii) Serine ≠ Arg</text>
        </g>
    </svg>
</div>
`;

// 9. Bản đồ giới hạn cắt của Plasmid Z (Bài 5 - Câu 80)
svgAssets.plasmidZ = `
<div class="my-4 flex flex-col items-center">
    <svg viewBox="0 0 600 200" class="w-full max-w-xl mx-auto rounded-xl bg-slate-50 border border-slate-200 shadow-sm p-2" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="20" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">Sơ đồ tạo và cắt Plasmid Z bằng enzyme giới hạn S</text>
        
        <!-- Đoạn gen M -->
        <g transform="translate(40, 45)">
            <rect x="0" y="25" width="220" height="18" rx="3" fill="#cbd5e1" stroke="#475569" />
            <rect x="50" y="23" width="120" height="22" rx="4" fill="#3b82f6" />
            <text x="110" y="38" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Gen M (1700 bp)</text>
            <text x="25" y="37" font-size="8" fill="#475569">950 bp</text>
            <text x="195" y="37" font-size="8" fill="#475569">700 bp</text>

            <!-- Vị trí enzyme S -->
            <polygon points="50,15 45,5 55,5" fill="#ef4444" />
            <text x="50" y="0" font-size="9" font-weight="bold" fill="#dc2626" text-anchor="middle">▼ S</text>
            <polygon points="170,15 165,5 175,5" fill="#ef4444" />
            <text x="170" y="0" font-size="9" font-weight="bold" fill="#dc2626" text-anchor="middle">▼ S</text>
        </g>

        <!-- Plasmid T (3978 bp) -->
        <g transform="translate(100, 115)">
            <ellipse cx="60" cy="35" rx="45" ry="25" fill="none" stroke="#10b981" stroke-width="4" />
            <polygon points="60,5 55,-5 65,-5" fill="#ef4444" />
            <text x="60" y="-8" font-size="9" font-weight="bold" fill="#dc2626" text-anchor="middle">▼ S</text>
            <text x="60" y="38" font-size="10" font-weight="bold" fill="#047857" text-anchor="middle">Plasmid T (3978 bp)</text>
        </g>

        <!-- Mũi tên nối -->
        <path d="M 280 100 L 330 100" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)" />
        <text x="305" y="92" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">Ligase</text>

        <!-- Plasmid Z hoàn chỉnh -->
        <g transform="translate(360, 50)">
            <ellipse cx="90" cy="50" rx="75" ry="45" fill="none" stroke="#10b981" stroke-width="5" />
            <path d="M 125 12 A 75 45 0 0 1 155 60" fill="none" stroke="#3b82f6" stroke-width="7" />
            <polygon points="125,12 122,2 132,4" fill="#ef4444" />
            <polygon points="155,60 165,58 162,68" fill="#ef4444" />
            <text x="125" y="-3" font-size="9" font-weight="bold" fill="#dc2626">▼ S</text>
            <text x="180" y="65" font-size="9" font-weight="bold" fill="#dc2626">▼ S</text>
            
            <text x="90" y="48" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">PLASMID Z</text>
            <text x="90" y="65" font-size="9" font-weight="bold" fill="#059669" text-anchor="middle">Kích thước: 3978 + 1700</text>
            <text x="90" y="80" font-size="10" font-extrabold fill="#2563eb" text-anchor="middle">= 5678 bp</text>
        </g>
    </svg>
</div>
`;
